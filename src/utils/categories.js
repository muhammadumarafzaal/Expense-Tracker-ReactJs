export const categories = {
  Income: ['Salary', 'Freelance', 'Investment', 'Refund', 'Gift'],
  Expense: [
    'Food',
    'Transport',
    'Utilities',
    'Shopping',
    'Health',
    'Entertainment',
    'Travel',
    'Education',
    'Business',
    'Other',
  ],
}

const keywordMap = [
  { category: 'Food', keywords: ['food', 'grocery', 'coffee', 'dinner', 'lunch', 'restaurant'] },
  { category: 'Transport', keywords: ['taxi', 'uber', 'bus', 'train', 'fuel', 'metro', 'flight'] },
  { category: 'Utilities', keywords: ['electric', 'internet', 'water', 'bill', 'gas', 'utility'] },
  { category: 'Health', keywords: ['gym', 'doctor', 'pharmacy', 'health', 'medical'] },
  { category: 'Entertainment', keywords: ['movie', 'netflix', 'concert', 'music', 'game', 'streaming'] },
  { category: 'Travel', keywords: ['hotel', 'airbnb', 'trip', 'flight', 'travel', 'taxi'] },
  { category: 'Education', keywords: ['course', 'book', 'learning', 'school', 'training'] },
  { category: 'Business', keywords: ['saas', 'subscription', 'software', 'tools', 'hosting', 'domain'] },
  { category: 'Salary', keywords: ['invoice', 'salary', 'payroll', 'client', 'payment'] },
  { category: 'Freelance', keywords: ['freelance', 'contract', 'project', 'consulting', 'gig'] },
  { category: 'Refund', keywords: ['refund', 'reimburse', 'returned'] },
]

export const categoryList = () => [
  ...categories.Income,
  ...categories.Expense,
]

export const autoCategorize = (title = '', type = 'Expense') => {
  const normalized = title.toLowerCase()
  const match = keywordMap.find((entry) => entry.keywords.some((keyword) => normalized.includes(keyword)))
  if (match) {
    return match.category
  }

  if (type === 'Income') {
    return 'Salary'
  }

  return 'Other'
}
