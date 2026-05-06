import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { useTransactions } from '../context/TransactionContext'
import Button from '../components/Button'
import Card from '../components/Card'
import SummaryCard from '../components/SummaryCard'
import FilterPanel from '../components/FilterPanel'
import ChartBar from '../components/ChartBar'
import ChartPie from '../components/ChartPie'
import TransactionTable from '../components/TransactionTable'
import TransactionFormModal from '../components/TransactionFormModal'
import { formatCurrency } from '../utils/date'

export default function DashboardPage({ onLogout, darkMode, onToggleDark }) {
  const {
    summary,
    monthlyData,
    categoryData,
    insights,
    setEditingTransaction,
    editingTransaction,
  } = useTransactions()
  const [isFormOpen, setIsFormOpen] = useState(false)

  useEffect(() => {
    if (editingTransaction) {
      setIsFormOpen(true)
    }
  }, [editingTransaction])

  const handleCreate = () => {
    setEditingTransaction(null)
    setIsFormOpen(true)
  }

  const closeForm = () => {
    setIsFormOpen(false)
    setEditingTransaction(null)
  }

  return (
    <main className="space-y-10 py-6">
      <motion.div 
        initial={{ opacity: 0, y: 20 }} 
        animate={{ opacity: 1, y: 0 }} 
        className="relative overflow-hidden rounded-5xl border border-white/20 bg-gradient-to-br from-indigo-600 via-violet-600 to-fuchsia-500 p-10 text-white shadow-2xl dark:border-slate-800/50"
      >
        <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-white/10 blur-3xl" />
        <div className="absolute -bottom-20 -left-20 h-64 w-64 rounded-full bg-indigo-500/20 blur-3xl" />
        
        <div className="relative flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-1.5 backdrop-blur-md">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500"></span>
              </span>
              <p className="text-xs font-bold uppercase tracking-widest text-white/90">System Live</p>
            </div>
            <h1 className="mt-4 text-4xl font-extrabold tracking-tight sm:text-5xl">
              Wealth <span className="text-white/80 font-medium">Dashboard</span>
            </h1>
            <p className="mt-4 max-w-xl text-lg text-indigo-50/80 leading-relaxed">
              Precision tracking for your financial journey. Analyze trends, manage goals, and master your cashflow.
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-4">
            <button 
              onClick={onToggleDark}
              className="group flex items-center gap-2 rounded-2xl bg-white/10 px-5 py-3 font-semibold backdrop-blur-md transition-all hover:bg-white/20 active:scale-95"
            >
              {darkMode ? '🌙 Dark Mode' : '☀️ Light Mode'}
            </button>
            <button 
              onClick={onLogout}
              className="flex items-center gap-2 rounded-2xl bg-white/10 px-5 py-3 font-semibold backdrop-blur-md transition-all hover:bg-white/20 active:scale-95"
            >
              Logout →
            </button>
          </div>
        </div>
      </motion.div>

      <div className="grid gap-4 md:grid-cols-3">
        <SummaryCard
          title="Total balance"
          value={formatCurrency(summary.balance)}
          change="Net cashflow across all accounts"
          tone={summary.balance >= 0 ? 'positive' : 'negative'}
          icon={<span className="text-xl">💎</span>}
        />
        <SummaryCard
          title="Total income"
          value={formatCurrency(summary.income)}
          change="Income from salary and projects"
          tone="positive"
          icon={<span className="text-xl">💼</span>}
        />
        <SummaryCard
          title="Total expenses"
          value={formatCurrency(summary.expense)}
          change="Expenses across categories"
          tone="negative"
          icon={<span className="text-xl">🔥</span>}
        />
      </div>

      <div className="grid gap-4 xl:grid-cols-[1.6fr_1fr]">
        <Card title="Monthly expenses">
          <ChartBar data={monthlyData} />
        </Card>
        <Card title="Expenses by category">
          <ChartPie data={categoryData} />
        </Card>
      </div>

      <div className="grid gap-4 lg:grid-cols-[1.1fr_0.9fr]">
        <Card title="Insights">
          <div className="space-y-4">
            {insights.map((item) => (
              <div key={item.title} className="rounded-[1.5rem] border border-slate-200/80 bg-slate-50 p-5 dark:border-slate-800/80 dark:bg-slate-950/80">
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <p className="text-sm font-semibold text-slate-900 dark:text-slate-100">{item.title}</p>
                    <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">{item.label}</p>
                  </div>
                  <span className={`rounded-3xl px-3 py-2 text-sm font-semibold ${item.tone === 'negative' ? 'bg-rose-100 text-rose-700 dark:bg-rose-900/40 dark:text-rose-200' : item.tone === 'positive' ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-200' : 'bg-slate-100 text-slate-800 dark:bg-slate-800 dark:text-slate-100'}`}>
                    {item.value}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </Card>

        <Card title="Quick actions">
          <div className="space-y-4">
            <Button type="button" variant="primary" className="w-full" onClick={handleCreate}>
              Add new transaction
            </Button>
            <div className="rounded-[1.5rem] border border-slate-200/80 bg-slate-50 p-5 dark:border-slate-800/80 dark:bg-slate-950/80">
              <p className="text-sm font-semibold text-slate-900 dark:text-slate-100">Action center</p>
              <p className="mt-3 text-sm text-slate-600 dark:text-slate-400">
                Use the filters to find activity, then manage transactions with editing and export tools.
              </p>
            </div>
          </div>
        </Card>
      </div>

      <div className="grid gap-4 lg:grid-cols-[0.65fr_1fr]">
        <Card title="Filters & controls">
          <FilterPanel />
        </Card>
        <Card title="Recent transactions">
          <TransactionTable />
        </Card>
      </div>

      {isFormOpen && <TransactionFormModal transaction={editingTransaction} onClose={closeForm} />}
    </main>
  )
}
