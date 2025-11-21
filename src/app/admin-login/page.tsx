'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { signIn } from '@/lib/supabase.auth'
import { supabase } from '@/lib/supabase.client'

export default function AdminLoginPage() {
  const [isSignUp, setIsSignUp] = useState(false)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const router = useRouter()

  async function handleSignIn(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setError('')

    const { data, error: signInError } = await signIn(email, password)

    if (signInError) {
      setError(signInError.message)
      setLoading(false)
      return
    }

    if (data.user) {
      router.push('/players')
      router.refresh()
    }

    setLoading(false)
  }

  async function handleSignUp(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setError('')
    setSuccess('')

    if (password !== confirmPassword) {
      setError('Passwords do not match')
      setLoading(false)
      return
    }

    if (password.length < 6) {
      setError('Password must be at least 6 characters')
      setLoading(false)
      return
    }

    if (!supabase) {
      setError('Supabase not configured')
      setLoading(false)
      return
    }

    const { data, error: signUpError } = await supabase.auth.signUp({
      email,
      password,
    })

    if (signUpError) {
      setError(signUpError.message)
      setLoading(false)
      return
    }

    if (data.user) {
      setSuccess('Account created! You can now sign in.')
      setEmail('')
      setPassword('')
      setConfirmPassword('')
      setTimeout(() => {
        setIsSignUp(false)
        setSuccess('')
      }, 2000)
    }

    setLoading(false)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 to-primary-100 flex items-center justify-center p-4">
      <div className="max-w-md w-full">
        {/* Logo/Header */}
        <div className="text-center mb-8">
          <div className="inline-block p-4 bg-white rounded-full shadow-lg mb-4">
            <div className="text-5xl">🏏</div>
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            {isSignUp ? 'Create Account' : 'Admin Login'}
          </h1>
          <p className="text-gray-600">
            {isSignUp ? 'Sign up to manage your cricket team' : 'Sign in to manage your cricket team'}
          </p>
        </div>

        {/* Form */}
        <div className="bg-white rounded-2xl shadow-xl p-8">
          {/* Toggle Tabs */}
          <div className="flex gap-2 mb-6 bg-gray-100 p-1 rounded-lg">
            <button
              type="button"
              onClick={() => {
                setIsSignUp(false)
                setError('')
                setSuccess('')
              }}
              className={`flex-1 py-2 rounded-lg font-medium transition-all ${
                !isSignUp
                  ? 'bg-white text-primary-600 shadow'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Sign In
            </button>
            <button
              type="button"
              onClick={() => {
                setIsSignUp(true)
                setError('')
                setSuccess('')
              }}
              className={`flex-1 py-2 rounded-lg font-medium transition-all ${
                isSignUp
                  ? 'bg-white text-primary-600 shadow'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Sign Up
            </button>
          </div>

          <form onSubmit={isSignUp ? handleSignUp : handleSignIn} className="space-y-6">
            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">
                {error}
              </div>
            )}

            {success && (
              <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-lg text-sm">
                {success}
              </div>
            )}

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                Email Address
              </label>
              <input
                id="email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                placeholder="admin@example.com"
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                Password
              </label>
              <input
                id="password"
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                placeholder="••••••••"
              />
              {isSignUp && (
                <p className="mt-1 text-xs text-gray-500">Must be at least 6 characters</p>
              )}
            </div>

            {isSignUp && (
              <div>
                <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-2">
                  Confirm Password
                </label>
                <input
                  id="confirmPassword"
                  type="password"
                  required
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  placeholder="••••••••"
                />
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-primary-600 to-primary-700 hover:from-primary-700 hover:to-primary-800 text-white font-semibold py-3 rounded-lg transition-all duration-200 disabled:opacity-50 shadow-lg hover:shadow-xl"
            >
              {loading ? (isSignUp ? 'Creating Account...' : 'Signing in...') : (isSignUp ? 'Create Account' : 'Sign In')}
            </button>
          </form>

          {!isSignUp && (
            <div className="mt-6 text-center text-sm text-gray-600">
              <p>
                Don't have an account?{' '}
                <button
                  onClick={() => setIsSignUp(true)}
                  className="text-primary-600 hover:text-primary-700 font-medium"
                >
                  Sign up here
                </button>
              </p>
            </div>
          )}

          {isSignUp && (
            <div className="mt-6 text-center text-sm text-gray-600">
              <p>
                Already have an account?{' '}
                <button
                  onClick={() => setIsSignUp(false)}
                  className="text-primary-600 hover:text-primary-700 font-medium"
                >
                  Sign in here
                </button>
              </p>
            </div>
          )}
        </div>

        {/* Info */}
        <div className="mt-6 text-center text-sm text-gray-600">
          <p>Protected by Supabase Authentication</p>
        </div>

        {isSignUp && (
          <div className="mt-4 bg-yellow-50 border border-yellow-200 rounded-lg p-4 text-sm text-yellow-800">
            <p className="font-medium mb-1">⚠️ Note:</p>
            <p>After signing up, you need to be added as an admin by running SQL in Supabase:</p>
            <code className="block mt-2 bg-yellow-100 p-2 rounded text-xs">
              INSERT INTO admin_users (email) VALUES ('your-email@example.com');
            </code>
          </div>
        )}
      </div>
    </div>
  )
}
