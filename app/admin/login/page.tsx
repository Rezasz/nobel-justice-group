'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function AdminLogin() {
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setError('')
    try {
      const res = await fetch('/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password }),
      })
      if (res.ok) {
        router.push('/admin/team')
      } else {
        setError('رمز عبور اشتباه است')
      }
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-navy flex items-center justify-center p-4">
      <div className="bg-navy-light border border-white/10 rounded-xl p-8 w-full max-w-sm">
        <div className="text-center mb-8">
          <div className="w-12 h-12 bg-gold rounded-lg flex items-center justify-center mx-auto mb-4">
            <span className="text-navy font-bold text-sm">NJG</span>
          </div>
          <h1 className="text-cream font-morabba text-2xl">پنل مدیریت</h1>
          <p className="text-cream/50 text-sm mt-1">Nobel Justice Group</p>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4" dir="rtl">
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="رمز عبور"
            required
            className="w-full bg-navy border border-white/20 rounded-lg px-4 py-3 text-cream placeholder-cream/30 focus:border-gold focus:outline-none"
            dir="ltr"
          />
          {error && <p className="text-red-400 text-sm text-center">{error}</p>}
          <button
            type="submit"
            disabled={loading || !password}
            className="w-full bg-gold text-navy font-bold rounded-lg py-3 hover:bg-gold-light disabled:opacity-50 transition-colors"
          >
            {loading ? '...' : 'ورود به پنل'}
          </button>
        </form>
      </div>
    </div>
  )
}
