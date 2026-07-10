import { Check } from '@tamagui/lucide-icons-2'
import { Text, View, XStack, YStack } from 'tamagui'

const steps = [
  { title: 'Account details', detail: 'Profile and company information', state: 'done' },
  {
    title: 'Invite your team',
    detail: 'Add collaborators or skip for now',
    state: 'current',
  },
  { title: 'Connect data', detail: 'Choose your first integration', state: 'upcoming' },
] as const

export function TimelineSteps() {
  return (
    <YStack width="100%" maxW={620} self="center">
      {steps.map((step, index) => (
        <XStack
          key={step.title}
          gap="$4"
          minH={104}
          aria-current={step.state === 'current' ? 'step' : undefined}
        >
          <YStack width={32} items="center">
            <View
              width={28}
              height={28}
              rounded={1000}
              items="center"
              justify="center"
              borderWidth={2}
              borderColor={step.state === 'upcoming' ? '$color6' : '$blue9'}
              bg={step.state === 'done' ? '$blue9' : '$background'}
            >
              {step.state === 'done' ? (
                <Check size={16} color="white" />
              ) : (
                <Text
                  fontWeight="700"
                  color={step.state === 'current' ? '$blue10' : '$color8'}
                >
                  {index + 1}
                </Text>
              )}
            </View>
            {index < steps.length - 1 && (
              <View
                flex={1}
                width={2}
                bg={step.state === 'done' ? '$blue9' : '$color5'}
              />
            )}
          </YStack>
          <YStack flex={1} gap="$1" pt="$1" pb="$5">
            <Text
              fontSize="$5"
              fontWeight="700"
              color={step.state === 'upcoming' ? '$color9' : '$color'}
            >
              {step.title}
            </Text>
            <Text color="$color10">{step.detail}</Text>
          </YStack>
        </XStack>
      ))}
    </YStack>
  )
}

TimelineSteps.fileName = 'TimelineSteps'
