export const downloadCSV = (transactions = []) => {
  const headers = ['Date', 'Title', 'Category', 'Type', 'Amount', 'Notes']
  const rows = transactions.map((transaction) => [
    transaction.date,
    transaction.title,
    transaction.category,
    transaction.type,
    transaction.amount,
    transaction.notes || '',
  ])
  const csv = [headers, ...rows]
    .map((row) => row.map((cell) => `"${String(cell).replace(/"/g, '""')}"`).join(','))
    .join('\n')

  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' })
  const url = URL.createObjectURL(blob)
  const anchor = document.createElement('a')
  anchor.href = url
  anchor.download = 'expense-tracker-data.csv'
  anchor.click()
  URL.revokeObjectURL(url)
}
