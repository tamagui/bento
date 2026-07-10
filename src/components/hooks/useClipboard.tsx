import { useEffect, useRef, useState } from 'react'
import { isWeb, useEvent } from 'tamagui'

export const copyToClipboard = async (text: string) => {
  if (isWeb) {
    await navigator.clipboard.writeText(text)
    return
  }
  // deprecated in RN core but still shipped; swap for expo-clipboard in your app
  const { Clipboard } = require('react-native')
  Clipboard?.setString?.(text)
}

export function useClipboard(text = '', timeout = 1500) {
  const [hasCopied, setHasCopied] = useState(false)
  const timer = useRef<ReturnType<typeof setTimeout>>(undefined)

  const onCopy = useEvent(async () => {
    try {
      await copyToClipboard(text)
      setHasCopied(true)
      clearTimeout(timer.current)
      timer.current = setTimeout(() => setHasCopied(false), timeout)
    } catch {
      setHasCopied(false)
    }
  })

  useEffect(() => () => clearTimeout(timer.current), [])

  const resetState = useEvent(() => {
    clearTimeout(timer.current)
    setHasCopied(false)
  })

  return { value: text, onCopy, hasCopied, resetState }
}
