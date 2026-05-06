import { useEffect, useState } from 'react'
import { TransactionProvider } from './context/TransactionContext'
import DashboardPage from './pages/DashboardPage'
import AuthPage from './pages/AuthPage'
import './index.css'

function App() {
  const [authenticated, setAuthenticated] = useState(false)
  const [darkMode, setDarkMode] = useState(() => {
    if (typeof window !== 'undefined') {
      return window.localStorage.getItem('expenseTrackerTheme') === 'dark'
    }
    return false
  })

  useEffect(() => {
    document.documentElement.classList.toggle('dark', darkMode)
    window.localStorage.setItem('expenseTrackerTheme', darkMode ? 'dark' : 'light')
  }, [darkMode])

  return (
    <TransactionProvider>
      <div className="min-h-screen text-slate-900 selection:bg-indigo-500/30 dark:text-slate-100 transition-colors duration-500">
        <div className="fixed inset-0 -z-10 bg-[radial-gradient(45%_45%_at_50%_50%,oklch(0.9_0.05_264/0.05)_0%,transparent_100%)] dark:bg-[radial-gradient(45%_45%_at_50%_50%,oklch(0.2_0.1_264/0.1)_0%,transparent_100%)]" />
        <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
          {authenticated ? (
            <DashboardPage 
              onLogout={() => setAuthenticated(false)} 
              darkMode={darkMode} 
              onToggleDark={() => setDarkMode((prev) => !prev)} 
            />
          ) : (
            <AuthPage onAuthenticate={() => setAuthenticated(true)} />
          )}
        </div>
      </div>
    </TransactionProvider>
  )
}

export default App
