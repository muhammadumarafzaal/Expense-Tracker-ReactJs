import { useTransactions } from '../context/TransactionContext'
import Button from './Button'

export default function FilterPanel() {
  const { filters, setFilters, categoryOptions, exportTransactions } = useTransactions()

  const updateField = (field, value) => {
    setFilters((prev) => ({ ...prev, [field]: value }))
  }

  return (
    <div className="space-y-5">
      <div className="rounded-[2rem] border border-slate-200/80 bg-slate-50/75 p-5 dark:border-slate-800/80 dark:bg-slate-950/80">
        <p className="text-sm font-semibold text-slate-700 dark:text-slate-300">Filter by</p>
        <div className="mt-4 grid gap-4 sm:grid-cols-2">
          <label className="block text-sm text-slate-600 dark:text-slate-400">
            Search
            <input
              type="search"
              value={filters.query}
              onChange={(event) => updateField('query', event.target.value)}
              placeholder="Search transactions"
              className="mt-2 w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100 dark:focus:border-cyan-400 dark:focus:ring-cyan-800"
            />
          </label>

          <label className="block text-sm text-slate-600 dark:text-slate-400">
            Type
            <select
              value={filters.type}
              onChange={(event) => updateField('type', event.target.value)}
              className="mt-2 w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100 dark:focus:border-cyan-400 dark:focus:ring-cyan-800"
            >
              {['All', 'Income', 'Expense'].map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </label>

          <label className="block text-sm text-slate-600 dark:text-slate-400">
            Category
            <select
              value={filters.category}
              onChange={(event) => updateField('category', event.target.value)}
              className="mt-2 w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100 dark:focus:border-cyan-400 dark:focus:ring-cyan-800"
            >
              {categoryOptions.map((name) => (
                <option key={name} value={name}>
                  {name}
                </option>
              ))}
            </select>
          </label>

          <label className="block text-sm text-slate-600 dark:text-slate-400">
            Date range
            <select
              value={filters.period}
              onChange={(event) => updateField('period', event.target.value)}
              className="mt-2 w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100 dark:focus:border-cyan-400 dark:focus:ring-cyan-800"
            >
              {['All', 'This Month', 'Last 30 Days', 'This Year'].map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </label>
        </div>
      </div>

      <div className="grid gap-3 sm:grid-cols-2">
        <Button type="button" variant="secondary" className="w-full" onClick={exportTransactions}>
          Export CSV
        </Button>
        <Button
          type="button"
          variant="primary"
          className="w-full"
          onClick={() => setFilters({ type: 'All', category: 'All', query: '', period: 'All' })}
        >
          Clear filters
        </Button>
      </div>
    </div>
  )
}
