import {
  createContext,
  type ReactNode,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react'
import { type GetProps, View, isWeb } from 'tamagui'
import { useReducedMotion } from '../../../hooks'

const SHIMMER_DURATION = 1600
const SHARED_CLOCK_STARTED_AT = Date.now()

const SkeletonClockContext = createContext({
  delay: 0,
  pulse: false,
  reducedMotion: false,
})

export function SkeletonScene({ children }: { children: ReactNode }) {
  const reducedMotion = useReducedMotion()
  const [pulse, setPulse] = useState(false)
  const delay = useMemo(
    () => -((Date.now() - SHARED_CLOCK_STARTED_AT) % SHIMMER_DURATION),
    []
  )

  useEffect(() => {
    if (isWeb || reducedMotion) return
    const timer = setInterval(() => setPulse((value) => !value), 700)
    return () => clearInterval(timer)
  }, [reducedMotion])

  return (
    <SkeletonClockContext.Provider value={{ delay, pulse, reducedMotion }}>
      {isWeb && (
        <style>{`
          @keyframes bento-skeleton-shimmer {
            0% { background-position: 200% 0; }
            100% { background-position: -200% 0; }
          }
          @media (prefers-reduced-motion: reduce) {
            [data-bento-skeleton] { animation: none !important; }
          }
        `}</style>
      )}
      {children}
    </SkeletonClockContext.Provider>
  )
}

type SkeletonProps = Omit<GetProps<typeof View>, 'children'>

export function Skeleton(props: SkeletonProps) {
  const { delay, pulse, reducedMotion } = useContext(SkeletonClockContext)

  return (
    <View
      aria-hidden
      data-bento-skeleton
      bg="$color4"
      opacity={!isWeb && !reducedMotion && pulse ? 0.55 : 1}
      {...props}
      style={
        isWeb
          ? {
              backgroundImage:
                'linear-gradient(100deg, var(--color4) 20%, var(--color6) 45%, var(--color4) 70%)',
              backgroundSize: '220% 100%',
              animation: reducedMotion
                ? undefined
                : `bento-skeleton-shimmer ${SHIMMER_DURATION}ms linear infinite`,
              animationDelay: `${delay}ms`,
            }
          : undefined
      }
    />
  )
}
