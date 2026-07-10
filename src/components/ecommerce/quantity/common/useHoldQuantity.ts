import { useEffect, useRef, useState } from 'react'

export function useHoldQuantity(initial: number, min: number, max: number) {
  const [value, setValue] = useState(initial)
  // announce at rest, not per 90ms tick — live regions must not spam
  const [announced, setAnnounced] = useState(initial)
  const valueRef = useRef(initial)
  const delayRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null)
  const announceRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  const set = (next: number) => {
    const clamped = Math.max(min, Math.min(max, next))
    valueRef.current = clamped
    setValue(clamped)
    if (announceRef.current) clearTimeout(announceRef.current)
    announceRef.current = setTimeout(() => setAnnounced(clamped), 350)
  }

  const stop = () => {
    if (delayRef.current) clearTimeout(delayRef.current)
    if (intervalRef.current) clearInterval(intervalRef.current)
    delayRef.current = null
    intervalRef.current = null
  }

  const start = (delta: number) => {
    stop()
    set(valueRef.current + delta)
    delayRef.current = setTimeout(() => {
      intervalRef.current = setInterval(() => {
        const next = valueRef.current + delta
        // the hold ends itself at either bound
        if (next < min || next > max) {
          stop()
          return
        }
        set(next)
      }, 90)
    }, 360)
  }

  useEffect(
    () => () => {
      stop()
      if (announceRef.current) clearTimeout(announceRef.current)
    },
    []
  )

  return { value, announced, setValue: set, start, stop, min, max }
}
