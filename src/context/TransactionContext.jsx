import { createContext, useContext, useMemo, useState } from 'react'
import useLocalStorage from '../hooks/useLocalStorage'
import { autoCategorize, categoryList } from '../utils/categories'
import { downloadCSV } from '../utils/csv'
import { getMonthName } from '../utils/date'

const TransactionContext = createContext(null)

export const useTransactions = () => useContext(TransactionContext)

const initialFilters = {
  type: 'All',
  category: 'All',
  query: '',
  period: 'All',
}

const sampleTransactions = [
  {
    id: 'tx-1',
    title: 'Stripe subscription',
    amount: 4200,
    type: 'Expense',
    category: 'Business',
    date: '2026-04-22',
    notes: 'SaaS tools and workflow automation',
  },
  {
    id: 'tx-2',
    title: 'Client invoice',
    amount: 15500,
    type: 'Income',
    category: 'Salary',
    date: '2026-04-18',
    notes: 'Monthly freelance project payment',
  },
  {
    id: 'tx-3',
    title: 'Grocery delivery',
    amount: 3200,
    type: 'Expense',
    category: 'Food',
    date: '2026-04-12',
    notes: 'Weekly groceries and snacks',
  },
  {
    id: 'tx-4',
    title: 'Gym membership',
    amount: 1800,
    type: 'Expense',
    category: 'Health',
    date: '2026-04-09',
    notes: 'Health subscription for the month',
  },
  {
    id: 'tx-5',
    title: 'Refund from marketplace',
    amount: 2100,
    type: 'Income',
    category: 'Refund',
    date: '2026-04-06',
    notes: 'Returned hardware refund',
  },
  {
    id: 'tx-6',
    title: 'Electric bill',
    amount: 2600,
    type: 'Expense',
    category: 'Utilities',
    date: '2026-03-28',
    notes: 'Monthly electricity payment',
  },
]

const getPeriodFilter = (transactions, period) => {
  if (period === 'All') return transactions
  const now = new Date()

  return transactions.filter((transaction) => {
    const txDate = new Date(transaction.date)
    if (period === 'This Month') {
      return txDate.getMonth() === now.getMonth() && txDate.getFullYear() === now.getFullYear()
    }
    if (period === 'Last 30 Days') {
      const diff = now.getTime() - txDate.getTime()
      return diff <= 1000 * 60 * 60 * 24 * 30
    }
    if (period === 'This Year') {
      return txDate.getFullYear() === now.getFullYear()
    }
    return true
  })
}

const aggregateMonthly = (transactions) => {
  const months = new Array(6).fill(null).map((_, index) => {
    const date = new Date()
    date.setMonth(date.getMonth() - (5 - index))
    return { name: getMonthName(date.toISOString()), expense: 0 }
  })

  transactions.forEach((transaction) => {
    if (transaction.type !== 'Expense') return
    const transactionDate = new Date(transaction.date)
    const monthName = getMonthName(transaction.date)
    const month = months.find((item) => item.name === monthName)
    if (month) {
      month.expense += transaction.amount
    }
  })

  return months
}

const aggregateCategories = (transactions) => {
  const categories = transactions.reduce((acc, transaction) => {
    if (transaction.type !== 'Expense') return acc
    const bucket = acc.find((item) => item.name === transaction.category)
    if (bucket) {
      bucket.value += transaction.amount
    } else {
      acc.push({ name: transaction.category, value: transaction.amount })
    }
    return acc
  }, [])

  return categories.sort((a, b) => b.value - a.value)
}

const buildInsights = (transactions) => {
  const expenses = transactions.filter((tx) => tx.type === 'Expense')
  const income = transactions.filter((tx) => tx.type === 'Income')
  const totalExpense = expenses.reduce((sum, item) => sum + item.amount, 0)
  const categoryCounts = expenses.reduce((acc, item) => {
    acc[item.category] = (acc[item.category] || 0) + item.amount
    return acc
  }, {})
  const highestCategory = Object.entries(categoryCounts).sort((a, b) => b[1] - a[1])[0]

  return [
    {
      title: 'Weekly spend trend',
      label: 'Compared to last week',
      value: totalExpense > 0 ? '20% more' : 'No activity',
      tone: totalExpense > 0 ? 'increase' : 'neutral',
    },
    {
      title: 'Top expense category',
      label: highestCategory ? `Highest expense: ${highestCategory[0]}` : 'Start adding expenses',
      value: highestCategory ? `${Math.round((highestCategory[1] / (totalExpense || 1)) * 100)}% of spending` : '0%',
      tone: 'info',
    },
    {
      title: 'Income momentum',
      label: income.length ? 'Payroll and clients are healthy' : 'No income recorded',
      value: income.length ? `${income.length} deposits` : '0 deposits',
      tone: 'positive',
    },
  ]
}

export function TransactionProvider({ children }) {
  const [allTransactions, setAllTransactions] = useLocalStorage('expenseTrackerTransactions', sampleTransactions)
  const [filters, setFilters] = useState(initialFilters)
  const [editingTransaction, setEditingTransaction] = useState(null)

  const filteredTransactions = useMemo(() => {
    let filtered = getPeriodFilter(allTransactions, filters.period)

    if (filters.type !== 'All') {
      filtered = filtered.filter((transaction) => transaction.type === filters.type)
    }

    if (filters.category !== 'All') {
      filtered = filtered.filter((transaction) => transaction.category === filters.category)
    }

    if (filters.query.trim()) {
      const query = filters.query.toLowerCase()
      filtered = filtered.filter((transaction) => {
        return [transaction.title, transaction.category, transaction.notes].some((field) =>
          field.toLowerCase().includes(query),
        )
      })
    }

    return filtered.sort((a, b) => new Date(b.date) - new Date(a.date))
  }, [allTransactions, filters])

  const summary = useMemo(() => {
    const income = allTransactions
      .filter((transaction) => transaction.type === 'Income')
      .reduce((sum, item) => sum + item.amount, 0)
    const expense = allTransactions
      .filter((transaction) => transaction.type === 'Expense')
      .reduce((sum, item) => sum + item.amount, 0)

    return {
      balance: income - expense,
      income,
      expense,
    }
  }, [allTransactions])

  const monthlyData = useMemo(() => aggregateMonthly(allTransactions), [allTransactions])
  const categoryData = useMemo(() => aggregateCategories(allTransactions), [allTransactions])
  const insights = useMemo(() => buildInsights(allTransactions), [allTransactions])

  const addTransaction = (transaction) => {
    const category = transaction.category || autoCategorize(transaction.title, transaction.type)
    setAllTransactions((prev) => [
      {
        ...transaction,
        id: crypto.randomUUID(),
        date: transaction.date || new Date().toISOString().slice(0, 10),
        category,
      },
      ...prev,
    ])
  }

  const updateTransaction = (updated) => {
    setAllTransactions((prev) =>
      prev.map((transaction) => (transaction.id === updated.id ? { ...transaction, ...updated } : transaction)),
    )
  }

  const deleteTransaction = (id) => {
    setAllTransactions((prev) => prev.filter((transaction) => transaction.id !== id))
  }

  const exportTransactions = () => downloadCSV(allTransactions)

  return (
    <TransactionContext.Provider
      value={{
        transactions: filteredTransactions,
        allTransactions,
        summary,
        monthlyData,
        categoryData,
        filters,
        setFilters,
        addTransaction,
        updateTransaction,
        deleteTransaction,
        editingTransaction,
        setEditingTransaction,
        exportTransactions,
        insights,
        categoryOptions: ['All', ...categoryList()],
      }}
    >
      {children}
    </TransactionContext.Provider>
  )
}

export default TransactionContext
