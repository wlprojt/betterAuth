'use client'

import { Button } from '@/components/ui/button'
import { authClient } from '@/lib/auth-client'
import Link from 'next/link'
import { redirect, useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'


export default function SignupPage() {
  const router = useRouter()
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)

  const { 
        data: session, 
        isPending, //loading state
        refetch //refetch the session
    } = authClient.useSession() 

  useEffect(() => {
    if (session) {
      redirect('/dashboard')
    }
  }, [session])

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()

    setLoading(true)
    setError(null)
    setSuccess(false)

    const { data, error } = await authClient.signUp.email(
      {
        name,
        email,
        password,
        callbackURL: '/login',
      },
      {
        onRequest: () => {
          console.log('Sign up request started')
        },
        onSuccess: () => {
          setSuccess(true)
          router.push('/login')
        },
        onError: (ctx) => {
          console.error('Signup error:', ctx.error.message)
          setError(ctx.error.message)
          setLoading(false)
        },
      }
    )

    console.log('Signup response:', data)
    setLoading(false)
  }

  const handleGoogleSignup = async () => {
    const data = await authClient.signIn.social({
      provider: "google",
      callbackURL: '/dashboard',
    });
    console.log('Google signup response:', data);
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900 px-4">
      <div className="w-full max-w-md bg-white dark:bg-gray-800 shadow-lg rounded-2xl p-8">
        <h1 className="text-2xl font-semibold mb-6 text-center text-gray-900 dark:text-gray-100">
          Sign Up
        </h1>

        <Button
         onClick={handleGoogleSignup}
         className="w-full py-2 rounded-lg transition disabled:opacity-50"
        >
          <img
            src="/google-icon.svg"
            alt="Google"
            className="w-5 h-5"
          />
          Sign up with Google
        </Button>

        <div className="flex items-center my-6">
          <div className="flex-grow border-t border-gray-300 dark:border-gray-700"></div>
          <span className="mx-2 text-gray-500 dark:text-gray-400 text-sm">OR</span>
          <div className="flex-grow border-t border-gray-300 dark:border-gray-700"></div>
        </div>


        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 dark:bg-gray-700 dark:text-white"
          />

          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 dark:bg-gray-700 dark:text-white"
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 dark:bg-gray-700 dark:text-white"
          />

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg transition disabled:opacity-50"
          >
            {loading ? 'Signing Up...' : 'Sign Up'}
          </button>
        </form>

        {error && (
          <p className="mt-4 text-sm text-red-500 text-center">{error}</p>
        )}

        {success && (
          <p className="mt-4 text-sm text-green-500 text-center">
            Signed up successfully!
          </p>
        )}

        <p className="mt-6 text-center text-sm text-gray-600 dark:text-gray-300">
          Already have an account?{' '}
          <Link
            href="/login"
            className="text-blue-600 hover:text-blue-800 font-medium"
          >
            Log in
          </Link>
        </p>
      </div>
    </div>
  )
}
