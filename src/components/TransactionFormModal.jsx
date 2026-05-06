import { useEffect, useState } from 'react'
import { useTransactions } from '../context/TransactionContext'
import Button from './Button'
import Modal from './Modal'
import { categoryList } from '../utils/categories'

export default function TransactionFormModal({ transaction, onClose }) {
  const { addTransaction, updateTransaction } = useTransactions()
  const [form, setForm] = useState({
    title: transaction?.title || '',
    amount: transaction?.amount || '',
    type: transaction?.type || 'Expense',
    category: transaction?.category || 'Other',
    date: transaction?.date || new Date().toISOString().slice(0, 10),
    notes: transaction?.notes || '',
  })

  useEffect(() => {
    if (transaction) {
      setForm({
        title: transaction.title,
        amount: transaction.amount,
        type: transaction.type,
        category: transaction.category,
        date: transaction.date,
        notes: transaction.notes || '',
      })
    }
  }, [transaction])

  const handleChange = (field, value) => {
    setForm((prev) => ({ ...prev, [field]: value }))
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    const payload = {
      ...form,
      amount: Number(form.amount),
      id: transaction?.id,
    }

    if (transaction) {
      updateTransaction(payload)
    } else {
      addTransaction(payload)
    }

    onClose()
  }

  return (
    <Modal title={transaction ? 'Update transaction' : 'New transaction'} onClose={onClose}>
      <form className="space-y-5" onSubmit={handleSubmit}>
        <div className="grid gap-4 sm:grid-cols-2">
          <label className="block text-sm text-slate-600 dark:text-slate-300">
            Title
            <input
              required
              value={form.title}
              onChange={(event) => handleChange('title', event.target.value)}
              placeholder="Payment description"
              className="mt-2 w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100 dark:focus:border-cyan-400 dark:focus:ring-cyan-800"
            />
          </label>

          <label className="block text-sm text-slate-600 dark:text-slate-300">
            Amount
            <input
              required
              type="number"
              min="0"
              value={form.amount}
              onChange={(event) => handleChange('amount', event.target.value)}
              placeholder="0"
              className="mt-2 w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100 dark:focus:border-cyan-400 dark:focus:ring-cyan-800"
            />
          </label>
        </div>

        <div className="grid gap-4 sm:grid-cols-3">
          <label className="block text-sm text-slate-600 dark:text-slate-300">
            Type
            <select
              value={form.type}
              onChange={(event) => handleChange('type', event.target.value)}
              className="mt-2 w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100 dark:focus:border-cyan-400 dark:focus:ring-cyan-800"
            >
              <option value="Expense">Expense</option>
              <option value="Income">Income</option>
            </select>
          </label>

          <label className="block text-sm text-slate-600 dark:text-slate-300">
            Category
            <select
              value={form.category}
              onChange={(event) => handleChange('category', event.target.value)}
              className="mt-2 w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100 dark:focus:border-cyan-400 dark:focus:ring-cyan-800"
            >
              {categoryList().map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </label>

          <label className="block text-sm text-slate-600 dark:text-slate-300">
            Date
            <input
              required
              type="date"
              value={form.date}
              onChange={(event) => handleChange('date', event.target.value)}
              className="mt-2 w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100 dark:focus:border-cyan-400 dark:focus:ring-cyan-800"
            />
          </label>
        </div>

        <label className="block text-sm text-slate-600 dark:text-slate-300">
          Notes
          <textarea
            rows="4"
            value={form.notes}
            onChange={(event) => handleChange('notes', event.target.value)}
            placeholder="Optional details"
            className="mt-2 w-full rounded-3xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100 dark:focus:border-cyan-400 dark:focus:ring-cyan-800"
          />
        </label>

        <div className="flex flex-col gap-3 sm:flex-row sm:justify-end">
          <Button type="button" variant="secondary" className="w-full sm:w-auto" onClick={onClose}>
            Cancel
          </Button>
          <Button type="submit" variant="primary" className="w-full sm:w-auto">
            {transaction ? 'Save changes' : 'Add transaction'}
          </Button>
        </div>
      </form>
    </Modal>
  )
}
