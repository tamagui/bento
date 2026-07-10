import { Check, Sparkles } from '@tamagui/lucide-icons-2'
import { useEffect, useState } from 'react'
import { Button, Text, View, XStack, YStack, isWeb } from 'tamagui'

type Rect = { x: number; y: number; width: number; height: number }

const steps = [
  {
    id: 'inbox',
    title: 'Start with your inbox',
    body: 'Everything that needs attention appears here first.',
  },
  {
    id: 'projects',
    title: 'Organize with projects',
    body: 'Group work into focused spaces your whole team can follow.',
  },
  {
    id: 'invite',
    title: 'Invite your team',
    body: 'Bring collaborators in when your workspace is ready.',
  },
] as const

const CANVAS_H = 480

export function FeatureTour({
  onComplete,
  onSkip,
}: {
  onComplete?: () => void
  onSkip?: () => void
}) {
  const [step, setStep] = useState(0)
  const [outcome, setOutcome] = useState<'active' | 'completed' | 'skipped'>('active')
  // live-measured target rects — the ring and card anchor to real layout,
  // so resizes and content changes stay correct on web and native
  const [rects, setRects] = useState<Record<string, Rect>>({})
  const current = steps[step]
  const target = rects[current.id]
  const container = rects[current.id === 'projects' ? 'rightPane' : 'sidebar']

  const measure = (id: string) => (event: any) => {
    const { x, y, width, height } = event.nativeEvent.layout
    setRects((prev) => {
      const existing = prev[id]
      if (
        existing &&
        existing.x === x &&
        existing.y === y &&
        existing.width === width &&
        existing.height === height
      )
        return prev
      return { ...prev, [id]: { x, y, width, height } }
    })
  }

  useEffect(() => {
    if (outcome !== 'active' || !isWeb) return
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setOutcome('skipped')
        onSkip?.()
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [outcome, onSkip])

  // keep the reader in the dialog as steps change
  useEffect(() => {
    if (outcome === 'active' && isWeb) {
      requestAnimationFrame(() => document.getElementById('feature-tour-card')?.focus())
    }
  }, [step, outcome])

  const skip = () => {
    setOutcome('skipped')
    onSkip?.()
  }

  const finish = () => {
    setOutcome('completed')
    onComplete?.()
  }

  // place the card in whichever half the target doesn't occupy
  const targetTop = target && container ? container.y + target.y : 96
  const targetBottom = target && container ? targetTop + target.height : 132
  const cardTop =
    targetTop + (target?.height ?? 0) / 2 > CANVAS_H / 2
      ? Math.max(16, targetTop - 228)
      : targetBottom + 16

  return (
    <View
      width="100%"
      maxW={760}
      height={CANVAS_H}
      self="center"
      position="relative"
      overflow="hidden"
      rounded="$9"
      borderWidth={1}
      borderColor="$borderColor"
      bg="$color2"
    >
      <XStack height="100%">
        {/* containers are measured too, so target coordinates compose to
            canvas space without any hard-coded offsets */}
        <YStack onLayout={measure('sidebar')} width={150} p="$3" gap="$2" bg="$background">
          <View width={88} height={18} rounded="$3" bg="$color5" mb="$3" />
          {/* the inbox row is a real measured tour target */}
          <View onLayout={measure('inbox')} width={116} height={34} rounded="$4" bg="$color4" />
          {[1, 2, 3].map((item) => (
            <View key={item} width={92} height={34} rounded="$4" bg="transparent" />
          ))}
          <View onLayout={measure('invite')} mt="auto" width={116} height={38} rounded="$4" bg="$color4" items="center" justify="center">
            <Text fontSize="$1" color="$color9">
              Invite
            </Text>
          </View>
        </YStack>
        <YStack onLayout={measure('rightPane')} flex={1} p="$5" gap="$4">
          <View width="48%" height={24} rounded="$3" bg="$color5" />
          <XStack gap="$3" onLayout={measure('projects')}>
            <View flex={1} height={104} rounded="$6" bg="$background" />
            <View flex={1} height={104} rounded="$6" bg="$background" />
          </XStack>
          <View height={180} rounded="$6" bg="$background" />
        </YStack>
      </XStack>
      {outcome === 'active' ? (
        <>
          {target && container && (
            <View
              aria-hidden
              position="absolute"
              l={container.x + target.x - 6}
              t={container.y + target.y - 6}
              width={target.width + 12}
              height={target.height + 12}
              rounded="$5"
              borderWidth={3}
              borderColor="$accentColor"
              shadowColor="$accentColor"
              shadowOpacity={0.45}
              shadowRadius={14}
            />
          )}
          <YStack
            id="feature-tour-card"
            role="dialog"
            aria-label={`Quick tour step ${step + 1} of ${steps.length}: ${current.title}`}
            tabIndex={-1}
            position="absolute"
            r={18}
            t={cardTop}
            width={310}
            maxW="86%"
            gap="$4"
            p="$5"
            rounded="$8"
            bg="$color12"
            shadowColor="$shadowColor"
            shadowOpacity={0.3}
            shadowRadius={24}
          >
            <XStack justify="space-between" items="center">
              <XStack items="center" gap="$2">
                <Sparkles size={18} color="$color1" aria-hidden />
                <Text color="$color1" fontWeight="800">
                  Quick tour · {step + 1} of {steps.length}
                </Text>
              </XStack>
              <Button
                chromeless
                size="$3"
                color="$color1"
                hitSlop={isWeb ? undefined : 8}
                aria-label="Skip the tour"
                onPress={skip}
              >
                Skip
              </Button>
            </XStack>
            <YStack gap="$2">
              <Text color="$color1" fontSize="$7" fontWeight="900" letterSpacing={0}>
                {current.title}
              </Text>
              <Text color="$color5" lineHeight="$5" letterSpacing={0}>
                {current.body}
              </Text>
            </YStack>
            <XStack justify="space-between" items="center">
              <XStack gap="$1.5" aria-hidden>
                {steps.map((item, index) => (
                  <View
                    key={item.id}
                    width={index === step ? 18 : 7}
                    height={7}
                    rounded={999}
                    bg={index === step ? '$color1' : '$color7'}
                  />
                ))}
              </XStack>
              <XStack gap="$2">
                {step > 0 && (
                  <Button
                    chromeless
                    color="$color3"
                    onPress={() => setStep(step - 1)}
                  >
                    Back
                  </Button>
                )}
                <Button
                  bg="$color1"
                  color="$color12"
                  onPress={() => (step === steps.length - 1 ? finish() : setStep(step + 1))}
                >
                  {step === steps.length - 1 ? 'Finish' : 'Next'}
                </Button>
              </XStack>
            </XStack>
          </YStack>
        </>
      ) : (
        <YStack
          position="absolute"
          inset={0}
          items="center"
          justify="center"
          gap="$3"
          bg="$background"
          aria-live="polite"
        >
          <View
            width={56}
            height={56}
            rounded={999}
            bg={outcome === 'completed' ? '$green4' : '$color3'}
            items="center"
            justify="center"
          >
            <Check size={28} color={outcome === 'completed' ? '$green11' : '$color9'} aria-hidden />
          </View>
          <Text fontSize="$8" fontWeight="900" letterSpacing={0}>
            {outcome === 'completed' ? 'Tour complete' : 'Tour skipped'}
          </Text>
          <Button
            onPress={() => {
              setStep(0)
              setOutcome('active')
            }}
          >
            Restart tour
          </Button>
        </YStack>
      )}
    </View>
  )
}

FeatureTour.fileName = 'FeatureTour'
