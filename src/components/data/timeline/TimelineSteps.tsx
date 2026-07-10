import { Check } from '@tamagui/lucide-icons-2'
import { useState } from 'react'
import { Button, Text, View, XStack, YStack, isWeb } from 'tamagui'

const steps = [
  {
    id: 'account',
    title: 'Account details',
    detail: 'Profile and company information',
  },
  {
    id: 'team',
    title: 'Invite your team',
    detail: 'Add collaborators or skip for now',
  },
  {
    id: 'data',
    title: 'Connect data',
    detail: 'Choose your first integration',
  },
]

export function TimelineSteps() {
  const [current, setCurrent] = useState(1)

  return (
    <YStack
      width="100%"
      maxW={620}
      self="center"
      m={0}
      p={0}
      aria-label="Onboarding progress"
      render={isWeb ? <ol style={{ listStyleType: 'none' }} /> : undefined}
    >
      {steps.map((step, index) => {
        const state =
          index < current ? 'done' : index === current ? 'current' : 'upcoming'
        return (
          <XStack
            key={step.id}
            render={isWeb ? <li /> : undefined}
            gap="$4"
            aria-current={state === 'current' ? 'step' : undefined}
          >
            <YStack width={32} items="center">
              {/* completed steps navigate back; others are milestones, not buttons */}
              <Button
                unstyled
                aria-label={
                  state === 'done'
                    ? `Return to step ${index + 1}, ${step.title}`
                    : `Step ${index + 1}, ${step.title}, ${state}`
                }
                disabled={state !== 'done'}
                cursor={state === 'done' ? 'pointer' : 'default'}
                onPress={() => state === 'done' && setCurrent(index)}
                width={28}
                height={28}
                rounded={1000}
                items="center"
                justify="center"
                borderWidth={2}
                borderColor={state === 'upcoming' ? '$color6' : '$accentColor'}
                bg={state === 'done' ? '$accentColor' : '$background'}
                hoverStyle={state === 'done' ? { opacity: 0.85 } : undefined}
                focusVisibleStyle={{
                  outlineColor: '$outlineColor',
                  outlineOffset: 2,
                  outlineStyle: 'solid',
                  outlineWidth: 2,
                }}
              >
                {state === 'done' ? (
                  <Check size={16} color="$background" />
                ) : (
                  <Text
                    fontWeight="700"
                    color={state === 'current' ? '$accentColor' : '$color8'}
                  >
                    {index + 1}
                  </Text>
                )}
              </Button>
              {index < steps.length - 1 && (
                <View
                  flex={1}
                  width={2}
                  bg={state === 'done' ? '$accentColor' : '$color5'}
                />
              )}
            </YStack>
            <YStack flex={1} gap="$1" pt="$1" pb="$5">
              <Text
                fontSize="$5"
                fontWeight="700"
                color={state === 'upcoming' ? '$color9' : '$color'}
              >
                {step.title}
              </Text>
              <Text color="$color10">{step.detail}</Text>
              {state === 'current' && (
                <Button
                  mt="$2"
                  self="flex-start"
                  size="$2.5"
                  onPress={() => setCurrent(Math.min(steps.length, current + 1))}
                >
                  {index === steps.length - 1 ? 'Finish' : 'Complete step'}
                </Button>
              )}
            </YStack>
          </XStack>
        )
      })}
      <Text
        render="output"
        aria-live="polite"
        position="absolute"
        width={1}
        height={1}
        opacity={0}
        overflow="hidden"
      >
        {current >= steps.length
          ? 'All steps complete'
          : `Step ${current + 1} of ${steps.length}: ${steps[current].title}`}
      </Text>
    </YStack>
  )
}

TimelineSteps.fileName = 'TimelineSteps'
