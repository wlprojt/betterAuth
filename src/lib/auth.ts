import { betterAuth } from "better-auth";
import { MongoClient } from "mongodb";
import { mongodbAdapter } from "better-auth/adapters/mongodb";
import VerifyEmail from "@/components/verify-email";
import { Resend } from "resend";
import ForgotPasswordEmail from "@/components/reset-password";

const client = new MongoClient(process.env.MONGODB_URI!);
const db = client.db();
const resend = new Resend(process.env.RESEND_API_KEY as string);

export const auth = betterAuth({
  emailVerification: {
        sendVerificationEmail: async ({ user, url, token }, request) => {
            resend.emails.send({
                from: `${process.env.EMAIL_SENDER_NAME} <${process.env.EMAIL_SENDER_ADDRESS}>`,
                to: user.email,
                subject: "Verify your email",
                react: VerifyEmail({ username: user.name, verifyUrl: url }),
            });
        },
        sendOnSignUp: true,
    },
  database: mongodbAdapter(db, {
    client
  }),
  emailAndPassword: { 
    enabled: true, 
    sendResetPassword: async ({ user, url }) => {
      resend.emails.send({
        from: `${process.env.EMAIL_SENDER_NAME} <${process.env.EMAIL_SENDER_ADDRESS}>`,
        to: user.email,
        subject: "Reset your password",
        react: ForgotPasswordEmail({ username: user.name, resetUrl: url, userEmail: user.email }),
      });
    },
    requireEmailVerification: true
  },
  socialProviders: {
        google: { 
            clientId: process.env.GOOGLE_CLIENT_ID as string, 
            clientSecret: process.env.GOOGLE_CLIENT_SECRET as string, 
        }, 
  },
});