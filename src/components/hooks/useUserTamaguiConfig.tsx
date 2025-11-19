import { useState, useEffect } from 'react'

/**
 * SSR-safe localStorage hook that returns the raw string value
 */
function useLocalStorage(key: string, initialValue: string) {
  const [storedValue, setStoredValue] = useState<string>(initialValue)

  useEffect(() => {
    try {
      const item = window.localStorage.getItem(key)
      if (item) {
        setStoredValue(item)
      }
    } catch (error) {
      console.error(`Error reading localStorage key "${key}":`, error)
    }
  }, [key])

  const setValue = (value: string | ((val: string) => string)) => {
    try {
      const valueToStore = value instanceof Function ? value(storedValue) : value
      setStoredValue(valueToStore)

      if (typeof window !== 'undefined') {
        window.localStorage.setItem(key, valueToStore)
      }
    } catch (error) {
      console.error(`Error setting localStorage key "${key}":`, error)
    }
  }

  return [storedValue, setValue] as const
}

/**
 * Retrieves the user's Tamagui configuration from localStorage as a raw string.
 * @returns {string | null} userTamaguiConfig - The user's tamagui configuration
 */
export const useUserTamaguiConfig = () => {
  const [userTamaguiConfig] = useLocalStorage('userTamaguiConfig', '')
  return userTamaguiConfig || null
}
