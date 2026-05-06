import { motion } from 'framer-motion'
import { formatCurrency, formatDate } from '../utils/date'
import { useTransactions } from '../context/TransactionContext'
import Button from './Button'

export default function TransactionTable() {
  const { transactions, setEditingTransaction, deleteTransaction } = useTransactions()

  if (transactions.length === 0) {
    return (
      <div className="rounded-[2rem] border border-dashed border-slate-300 bg-slate-50/70 p-10 text-center text-slate-600 dark:border-slate-700 dark:bg-slate-950/80 dark:text-slate-400">
        No transactions match the selected filters.
      </div>
    )
  }

  return (
    <div className="overflow-hidden rounded-[2rem] border border-slate-200/80 bg-white/95 shadow-soft dark:border-slate-800/80 dark:bg-slate-900/95">
      <div className="overflow-x-auto">
        <table className="min-w-full border-separate border-spacing-0 text-left">
          <thead className="bg-slate-100 text-sm uppercase tracking-[0.24em] text-slate-500 dark:bg-slate-950 dark:text-slate-400">
            <tr>
              <th className="px-6 py-4">Date</th>
              <th className="px-6 py-4">Title</th>
              <th className="px-6 py-4">Category</th>
              <th className="px-6 py-4">Amount</th>
              <th className="px-6 py-4">Type</th>
              <th className="px-6 py-4">Actions</th>
            </tr>
          </thead>
          <tbody>
            {transactions.map((transaction) => (
              <motion.tr
                key={transaction.id}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.25 }}
                className="border-b border-slate-200/80 last:border-none dark:border-slate-800/80"
              >
                <td className="px-6 py-5 text-sm text-slate-600 dark:text-slate-300">{formatDate(transaction.date)}</td>
                <td className="px-6 py-5 text-sm font-medium text-slate-900 dark:text-slate-100">{transaction.title}</td>
                <td className="px-6 py-5 text-sm text-slate-600 dark:text-slate-300">{transaction.category}</td>
                <td className={`px-6 py-5 text-sm font-semibold ${transaction.type === 'Income' ? 'text-emerald-600 dark:text-emerald-400' : 'text-rose-600 dark:text-rose-400'}`}>
                  {formatCurrency(transaction.amount)}
                </td>
                <td className="px-6 py-5 text-sm text-slate-600 dark:text-slate-300">{transaction.type}</td>
                <td className="px-6 py-5 text-sm text-slate-600 dark:text-slate-300">
                  <div className="flex flex-wrap gap-2">
                    <Button type="button" variant="secondary" className="px-3 py-2 text-xs" onClick={() => setEditingTransaction(transaction)}>
                      Edit
                    </Button>
                    <Button type="button" variant="danger" className="px-3 py-2 text-xs" onClick={() => deleteTransaction(transaction.id)}>
                      Delete
                    </Button>
                  </div>
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
