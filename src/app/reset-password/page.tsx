'use client'

import React, { useEffect, useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { authClient } from '@/lib/auth-client'
import { Button } from '@/components/ui/button'

export default function ResetPassword() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const token = searchParams.get('token') // token from reset link

  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)

  const { data: session } = authClient.useSession()

  useEffect(() => {
    if (session) router.push('/dashboard')
  }, [session, router])

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError(null)

    if (password !== confirmPassword) {
      setError('Passwords do not match')
      return
    }

    if (!token) {
      setError('Reset token missing or invalid.')
      return
    }

    setLoading(true)

    try {
      // adjust this depending on your auth client method
      const { error } = await authClient.resetPassword({
        token,
        newPassword: password,
      })

      if (error) throw new Error(error.message)

      setSuccess(true)
      setTimeout(() => router.push('/login'), 2000)
    } catch (err: any) {
      setError(err.message || 'Something went wrong. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900 px-4">
      <div className="w-full max-w-md bg-white dark:bg-gray-800 shadow-lg rounded-2xl p-8">
        <h1 className="text-2xl font-semibold mb-6 text-center text-gray-900 dark:text-gray-100">
          Reset Password
        </h1>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="password"
            placeholder="New Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 dark:bg-gray-700 dark:text-white"
          />

          <input
            type="password"
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 dark:bg-gray-700 dark:text-white"
          />

          <Button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg transition disabled:opacity-50"
          >
            {loading ? 'Resetting...' : 'Reset Password'}
          </Button>
        </form>

        {error && <p className="mt-4 text-sm text-red-500 text-center">{error}</p>}
        {success && (
          <p className="mt-4 text-sm text-green-500 text-center">
            Password reset successful! Redirecting...
          </p>
        )}

        <p className="mt-6 text-center text-sm text-gray-600 dark:text-gray-300">
          Back to{' '}
          <Link
            href="/login"
            className="text-blue-600 hover:text-blue-800 font-medium"
          >
            Login
          </Link>
        </p>
      </div>
    </div>
  )
}
