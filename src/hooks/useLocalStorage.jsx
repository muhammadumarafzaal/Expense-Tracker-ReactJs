import { useEffect, useState } from 'react'

export default function useLocalStorage(key, initialValue) {
  const [storedValue, setStoredValue] = useState(() => {
    if (typeof window === 'undefined') {
      return initialValue
    }

    try {
      const item = window.localStorage.getItem(key)
      return item ? JSON.parse(item) : initialValue
    } catch (error) {
      console.warn('Failed to read localStorage key', key, error)
      return initialValue
    }
  })

  useEffect(() => {
    if (typeof window === 'undefined') return
    window.localStorage.setItem(key, JSON.stringify(storedValue))
  }, [key, storedValue])

  return [storedValue, setStoredValue]
}
