import { useRef, useState } from 'react'
import type { ScrollView } from 'react-native'

/**
 * shared carousel engine: measures the real rendered slide width (fixed
 * widths get clamped by maxW on small screens, so the snap interval must
 * follow), and commits the active index only when scrolling rests instead
 * of on every scroll frame
 */
export function useCarousel(count: number, fallbackWidth: number, gap: number) {
  const scrollRef = useRef<ScrollView>(null)
  const [index, setIndex] = useState(0)
  const [itemWidth, setItemWidth] = useState(fallbackWidth)
  const restTimer = useRef<ReturnType<typeof setTimeout>>(undefined)

  const interval = itemWidth + gap
  const clampIndex = (i: number) => Math.max(0, Math.min(count - 1, i))

  const onItemLayout = (event: any) => {
    const width = Math.round(event.nativeEvent.layout.width)
    if (width > 0) setItemWidth((current) => (current === width ? current : width))
  }

  const updateFromOffset = (x: number, maxX: number) => {
    // the tail slides can never reach the left edge, so end-of-scroll
    // always means the last index
    const next = maxX > 0 && x >= maxX - 4 ? count - 1 : clampIndex(Math.round(x / interval))
    setIndex((current) => (current === next ? current : next))
  }

  const goTo = (i: number, animated = true) => {
    const next = clampIndex(i)
    setIndex(next)
    scrollRef.current?.scrollTo({ x: next * interval, animated })
  }

  // touch fires momentum-end; mouse wheel / scrollbar only fire scroll, so
  // debounce those to the rest point
  const maxOffset = (event: any) =>
    event.nativeEvent.contentSize.width - event.nativeEvent.layoutMeasurement.width

  const onScroll = (event: any) => {
    const x = event.nativeEvent.contentOffset.x
    const maxX = maxOffset(event)
    clearTimeout(restTimer.current)
    restTimer.current = setTimeout(() => updateFromOffset(x, maxX), 90)
  }

  const onMomentumScrollEnd = (event: any) => {
    clearTimeout(restTimer.current)
    updateFromOffset(event.nativeEvent.contentOffset.x, maxOffset(event))
  }

  return {
    goTo,
    index,
    interval,
    itemWidth,
    onItemLayout,
    onMomentumScrollEnd,
    onScroll,
    scrollRef,
  }
}
