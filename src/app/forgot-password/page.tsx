'use client'

import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { authClient } from '@/lib/auth-client'
import { Button } from '@/components/ui/button'

export default function ForgotPassword() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState<string | null>(null)

  // ✅ Use authClient.useSession correctly
  const { data: session, isPending } = authClient.useSession()

  // ✅ redirect() should not be used directly in client components
  useEffect(() => {
    if (session) {
      router.replace('/dashboard')
    }
  }, [session, router])

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setError(null)
    setSuccess(null)

    try {
      // ✅ Correct better-auth call
      const { error } = await authClient.requestPasswordReset({
        email,
        redirectTo: `${window.location.origin}/reset-password`,
      })

      if (error) {
        setError(error?.message ?? null)

      } else {
        setSuccess('A password reset link has been sent to your email.')
      }
    } catch (err) {
      console.error('Unexpected error:', err)
      setError('Something went wrong. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900 px-4">
      <div className="w-full max-w-md bg-white dark:bg-gray-800 shadow-lg rounded-2xl p-8">
        <h1 className="text-2xl font-semibold mb-6 text-center text-gray-900 dark:text-gray-100">
          Forgot Password
        </h1>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="email"
            placeholder="Enter your email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 dark:bg-gray-700 dark:text-white"
          />

          <Button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg transition disabled:opacity-50"
          >
            {loading ? 'Sending...' : 'Send Reset Link'}
          </Button>
        </form>

        {error && <p className="mt-4 text-sm text-red-500 text-center">{error}</p>}
        {success && <p className="mt-4 text-sm text-green-600 text-center">{success}</p>}

        <p className="mt-6 text-center text-sm text-gray-600 dark:text-gray-300">
          Remembered your password?{' '}
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
