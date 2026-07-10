import { Text, View, XStack, YStack } from 'tamagui'
import { StepIndicator, type StepState } from './common/StepIndicator'

const labels = ['Account', 'Profile', 'Confirm']

export function StepperHorizontal({ currentStep = 1 }: { currentStep?: number }) {
  const steps = labels.map((label, index) => ({
    label,
    state: (index < currentStep
      ? 'done'
      : index === currentStep
        ? 'current'
        : 'upcoming') as StepState,
  }))
  return (
    <XStack width="100%" maxW={720} self="center" items="flex-start" px="$4">
      {steps.map((step, index) => (
        <XStack
          key={step.label}
          flex={index === steps.length - 1 ? 0 : 1}
          items="flex-start"
        >
          <YStack width={88} items="center" gap="$2">
            <StepIndicator number={index + 1} state={step.state} />
            <Text
              fontSize="$3"
              fontWeight={step.state === 'current' ? '700' : '500'}
              color={step.state === 'upcoming' ? '$color9' : '$color12'}
              letterSpacing={0}
            >
              {step.label}
            </Text>
          </YStack>
          {index < steps.length - 1 ? (
            <View
              flex={1}
              height={2}
              mt={16}
              mx="$2"
              bg={step.state === 'done' ? '$accentColor' : '$color5'}
            />
          ) : null}
        </XStack>
      ))}
    </XStack>
  )
}

StepperHorizontal.fileName = 'StepperHorizontal'
