import { useEffect, useRef, useState } from 'react'

export function useHoldQuantity(initial: number, min: number, max: number) {
  const [value, setValue] = useState(initial)
  const delayRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null)
  const change = (delta: number) =>
    setValue((current) => Math.max(min, Math.min(max, current + delta)))
  const stop = () => {
    if (delayRef.current) clearTimeout(delayRef.current)
    if (intervalRef.current) clearInterval(intervalRef.current)
    delayRef.current = null
    intervalRef.current = null
  }
  const start = (delta: number) => {
    stop()
    change(delta)
    delayRef.current = setTimeout(() => {
      intervalRef.current = setInterval(() => change(delta), 90)
    }, 360)
  }
  useEffect(() => stop, [])
  return { value, setValue, start, stop }
}
