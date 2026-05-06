import { useState } from 'react'
import Button from '../components/Button'

const initialState = {
  email: '',
  password: '',
  name: '',
}

export default function AuthPage({ onAuthenticate }) {
  const [authMode, setAuthMode] = useState('login')
  const [form, setForm] = useState(initialState)

  const handleChange = (field, value) => {
    setForm((prev) => ({ ...prev, [field]: value }))
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    onAuthenticate()
  }

  return (
    <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center py-12">
      <div className="relative mx-auto w-full max-w-6xl overflow-hidden rounded-5xl border border-white/40 bg-white/60 p-1 shadow-2xl backdrop-blur-2xl dark:border-slate-800/40 dark:bg-slate-950/40">
        <div className="absolute -right-20 -top-20 h-80 w-80 rounded-full bg-indigo-500/10 blur-[100px]" />
        <div className="absolute -bottom-20 -left-20 h-80 w-80 rounded-full bg-fuchsia-500/10 blur-[100px]" />
        
        <div className="relative grid gap-12 lg:grid-cols-[1fr_1.1fr] p-8 md:p-12">
          <div className="flex flex-col justify-center space-y-8">
            <div className="inline-flex w-fit items-center gap-2 rounded-full bg-indigo-50 px-4 py-2 text-xs font-bold uppercase tracking-widest text-indigo-600 dark:bg-indigo-900/30 dark:text-indigo-400">
              <span className="h-1.5 w-1.5 rounded-full bg-indigo-500 shadow-[0_0_8px_rgba(99,102,241,0.8)]" />
              Intelligence Layer
            </div>
            <h1 className="text-5xl font-black tracking-tight text-slate-900 dark:text-slate-100 lg:text-6xl">
              Financial <span className="bg-gradient-to-r from-indigo-600 to-fuchsia-500 bg-clip-text text-transparent">Clarity</span> starts here
            </h1>
            <p className="max-w-md text-lg leading-relaxed text-slate-600 dark:text-slate-400">
              Join thousands of users who have mastered their expenses with our state-of-the-art tracking engine.
            </p>
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="rounded-3xl bg-white/50 p-6 shadow-sm ring-1 ring-slate-200/50 dark:bg-slate-900/50 dark:ring-slate-800/50 transition-all hover:shadow-md">
                <p className="text-sm font-bold text-slate-900 dark:text-slate-100">Smart Insights</p>
                <p className="mt-2 text-xs text-slate-500 dark:text-slate-400 leading-relaxed">Auto-categorized spending patterns for maximum efficiency.</p>
              </div>
              <div className="rounded-3xl bg-white/50 p-6 shadow-sm ring-1 ring-slate-200/50 dark:bg-slate-900/50 dark:ring-slate-800/50 transition-all hover:shadow-md">
                <p className="text-sm font-bold text-slate-900 dark:text-slate-100">Bank-Grade</p>
                <p className="mt-2 text-xs text-slate-500 dark:text-slate-400 leading-relaxed">Your data is local and encrypted within your workspace.</p>
              </div>
            </div>
          </div>

          <div className="rounded-4xl bg-white/40 p-8 md:p-10 dark:bg-slate-900/40 ring-1 ring-slate-200/50 dark:ring-slate-800/50 shadow-inner">
            <div className="mb-10 flex items-center justify-between">
              <div>
                <h2 className="text-3xl font-black text-slate-900 dark:text-slate-100">{authMode === 'login' ? 'Sign in' : 'Create account'}</h2>
                <p className="mt-3 text-sm font-medium text-slate-500 dark:text-slate-400">
                  {authMode === 'login' ? 'Welcome back to your dashboard' : 'Start your financial journey today'}
                </p>
              </div>
              <button
                type="button"
                className="group flex h-10 w-10 items-center justify-center rounded-full bg-indigo-600 text-white transition-all hover:scale-110 active:scale-95"
                onClick={() => setAuthMode(authMode === 'login' ? 'signup' : 'login')}
                title={authMode === 'login' ? 'Sign up' : 'Sign in'}
              >
                {authMode === 'login' ? '+' : '←'}
              </button>
            </div>

            <form className="space-y-6" onSubmit={handleSubmit}>
              {authMode === 'signup' && (
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-widest text-slate-400 dark:text-slate-500 ml-1">
                    Full Name
                  </label>
                  <input
                    required
                    value={form.name}
                    onChange={(event) => handleChange('name', event.target.value)}
                    className="w-full rounded-2xl border border-slate-200 bg-white/50 px-5 py-4 text-sm font-medium text-slate-900 outline-none backdrop-blur-sm transition-all focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 dark:border-slate-800 dark:bg-slate-950/50 dark:text-slate-100 dark:focus:border-indigo-400 dark:focus:ring-indigo-400/10"
                    placeholder="Enter your name"
                  />
                </div>
              )}
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-widest text-slate-400 dark:text-slate-500 ml-1">
                  Email Address
                </label>
                <input
                  required
                  type="email"
                  value={form.email}
                  onChange={(event) => handleChange('email', event.target.value)}
                  className="w-full rounded-2xl border border-slate-200 bg-white/50 px-5 py-4 text-sm font-medium text-slate-900 outline-none backdrop-blur-sm transition-all focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 dark:border-slate-800 dark:bg-slate-950/50 dark:text-slate-100 dark:focus:border-indigo-400 dark:focus:ring-indigo-400/10"
                  placeholder="you@example.com"
                />
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-widest text-slate-400 dark:text-slate-500 ml-1">
                  Secure Password
                </label>
                <input
                  required
                  type="password"
                  value={form.password}
                  onChange={(event) => handleChange('password', event.target.value)}
                  className="w-full rounded-2xl border border-slate-200 bg-white/50 px-5 py-4 text-sm font-medium text-slate-900 outline-none backdrop-blur-sm transition-all focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 dark:border-slate-800 dark:bg-slate-950/50 dark:text-slate-100 dark:focus:border-indigo-400 dark:focus:ring-indigo-400/10"
                  placeholder="••••••••"
                />
              </div>

              <Button type="submit" variant="primary" className="mt-4 w-full py-4 text-lg">
                {authMode === 'login' ? 'Access Dashboard' : 'Create My Account'}
              </Button>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}
