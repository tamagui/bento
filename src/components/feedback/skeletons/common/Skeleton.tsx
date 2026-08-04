import {
  createContext,
  type ReactNode,
  useContext,
  useEffect,
  useMemo,
  useRef,
} from 'react'
import { Animated } from 'react-native'
import { type GetProps, View, isWeb, useTheme } from 'tamagui'
import { useReducedMotion } from '../../../hooks'

const SHIMMER_DURATION = 1600
const SHARED_CLOCK_STARTED_AT = Date.now()
const STYLE_ID = 'bento-skeleton-keyframes'

const SkeletonClockContext = createContext<{
  delay: number
  pulse: Animated.Value | null
  reducedMotion: boolean
}>({
  delay: 0,
  pulse: null,
  reducedMotion: false,
})

/** inject the shimmer keyframes once per document, not once per scene */
function useShimmerStylesheet() {
  useEffect(() => {
    if (!isWeb || document.getElementById(STYLE_ID)) return
    const style = document.createElement('style')
    style.id = STYLE_ID
    style.textContent = `
      @keyframes bento-skeleton-shimmer {
        0% { background-position: 200% 0; }
        100% { background-position: -200% 0; }
      }
      @media (prefers-reduced-motion: reduce) {
        [data-bento-skeleton] { animation: none !important; }
      }
    `
    document.head.appendChild(style)
  }, [])
}

export function SkeletonScene({ children }: { children: ReactNode }) {
  const reducedMotion = useReducedMotion()
  const delay = useMemo(
    () => -((Date.now() - SHARED_CLOCK_STARTED_AT) % SHIMMER_DURATION),
    []
  )
  useShimmerStylesheet()

  // native pulse runs on the native driver — zero JS-thread rerenders
  const pulse = useRef(!isWeb ? new Animated.Value(0) : null).current
  useEffect(() => {
    if (isWeb || !pulse || reducedMotion) return
    const loop = Animated.loop(
      Animated.sequence([
        Animated.timing(pulse, {
          toValue: 1,
          duration: 700,
          useNativeDriver: true,
        }),
        Animated.timing(pulse, {
          toValue: 0,
          duration: 700,
          useNativeDriver: true,
        }),
      ])
    )
    loop.start()
    return () => loop.stop()
  }, [pulse, reducedMotion])

  const content = (
    <SkeletonClockContext.Provider value={{ delay, pulse, reducedMotion }}>
      {children}
    </SkeletonClockContext.Provider>
  )

  // announce the whole scene as busy while placeholders show
  return isWeb ? (
    <div aria-busy="true" style={{ display: 'contents' }}>
      {content}
    </div>
  ) : (
    content
  )
}

type SkeletonProps = Omit<GetProps<typeof View>, 'children'>

export function Skeleton(props: SkeletonProps) {
  const { delay, pulse, reducedMotion } = useContext(SkeletonClockContext)
  const theme = useTheme()

  return (
    <View
      aria-hidden
      data-bento-skeleton
      bg="color4"
      overflow="hidden"
      {...props}
      style={
        isWeb
          ? {
              backgroundImage:
                'linear-gradient(100deg, var(--color4) 20%, var(--color6) 45%, var(--color4) 70%)',
              backgroundSize: '220% 100%',
              // one shorthand (delay included) so reduced-motion toggles
              // never mix shorthand and longhand across renders
              animation: reducedMotion
                ? 'none'
                : `bento-skeleton-shimmer ${SHIMMER_DURATION}ms linear ${delay}ms infinite`,
            }
          : undefined
      }
    >
      {!isWeb && pulse && !reducedMotion && (
        <Animated.View
          pointerEvents="none"
          style={{
            position: 'absolute',
            top: 0,
            right: 0,
            bottom: 0,
            left: 0,
            backgroundColor: theme.background?.val,
            opacity: pulse.interpolate({
              inputRange: [0, 1],
              outputRange: [0, 0.45],
            }),
          }}
        />
      )}
    </View>
  )
}
