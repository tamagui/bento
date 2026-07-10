import { useEffect, useState } from 'react'
import { AccessibilityInfo } from 'react-native'
import { isWeb } from 'tamagui'

export function useReducedMotion() {
  const [reducedMotion, setReducedMotion] = useState(false)

  useEffect(() => {
    if (isWeb && typeof window !== 'undefined') {
      const query = window.matchMedia('(prefers-reduced-motion: reduce)')
      const update = () => setReducedMotion(query.matches)
      update()
      query.addEventListener?.('change', update)
      return () => query.removeEventListener?.('change', update)
    }

    AccessibilityInfo.isReduceMotionEnabled().then(setReducedMotion)
    const subscription = AccessibilityInfo.addEventListener(
      'reduceMotionChanged',
      setReducedMotion
    )
    return () => subscription.remove()
  }, [])

  return reducedMotion
}
