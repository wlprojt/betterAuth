'use client'

import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { authClient } from '@/lib/auth-client'
import { Button } from '@/components/ui/button'

export default function LoginPage() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const { data: session, isPending } = authClient.useSession()

  useEffect(() => {
    if (session) {
      router.push('/dashboard')
    }
  }, [session, router])

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setError(null)

    try {
      const { error } = await authClient.signIn.email(
        {
          email,
          password,
          callbackURL: '/dashboard',
        },
        {
          onRequest: () => console.log('Login request started'),
          onSuccess: () => {
            router.push('/dashboard')
          },
          onError: (ctx) => {
            console.error('Login error:', ctx.error.message)
            setError(ctx.error.message)
            setLoading(false)
          },
        }
      )

      if (error) {
        setError(error?.message?? null)
      }
    } catch (err) {
      console.error('Unexpected login error:', err)
      setError('Something went wrong. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const handleGoogleSignup = async () => {
    try {
      const data = await authClient.signIn.social({
        provider: 'google',
        callbackURL: '/dashboard',
      })
      console.log('Google signup response:', data)
    } catch (err) {
      console.error('Google signup failed:', err)
      setError('Google sign-in failed. Please try again.')
    }
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900 px-4">
      <div className="w-full max-w-md bg-white dark:bg-gray-800 shadow-lg rounded-2xl p-8">
        <h1 className="text-2xl font-semibold mb-6 text-center text-gray-900 dark:text-gray-100">
          Log In
        </h1>

        {/* Google sign-in */}
        <Button
          onClick={handleGoogleSignup}
          className="w-full py-2 rounded-lg flex items-center justify-center gap-2 transition disabled:opacity-50"
          disabled={loading}
        >
          <img src="/google-icon.svg" alt="Google" className="w-5 h-5" />
          Sign in with Google
        </Button>

        <div className="flex items-center my-6">
          <div className="flex-grow border-t border-gray-300 dark:border-gray-700"></div>
          <span className="mx-2 text-gray-500 dark:text-gray-400 text-sm">OR</span>
          <div className="flex-grow border-t border-gray-300 dark:border-gray-700"></div>
        </div>

        {/* Email login form */}
        <form onSubmit={handleSubmit} className="space-y-4">
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

          <Link
            href="/forgot-password"
            className="flex justify-end text-sm mb-1 underline-offset-4 hover:underline text-blue-600"
          >
            Forgot your password?
          </Link>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg transition disabled:opacity-50"
          >
            {loading ? 'Logging in...' : 'Log In'}
          </button>
        </form>

        {error && (
          <p className="mt-4 text-sm text-red-500 text-center">{error}</p>
        )}

        <p className="mt-6 text-center text-sm text-gray-600 dark:text-gray-300">
          Don’t have an account?{' '}
          <Link
            href="/signup"
            className="text-blue-600 hover:text-blue-800 font-medium"
          >
            Sign up
          </Link>
        </p>
      </div>
    </div>
  )
}
