import { Text, View, XStack, YStack } from 'tamagui'
import { StepIndicator, type StepState } from './common/StepIndicator'

const defaultLabels = ['Account', 'Profile', 'Confirm']

export function StepperHorizontal({
  currentStep = 1,
  labels = defaultLabels,
}: {
  currentStep?: number
  labels?: string[]
}) {
  const steps = labels.map((label, index) => ({
    label,
    state: (index < currentStep
      ? 'done'
      : index === currentStep
        ? 'current'
        : 'upcoming') as StepState,
  }))
  return (
    <XStack
      width="100%"
      maxW={720}
      self="center"
      items="flex-start"
      px="4"
      role="list"
      aria-label="Progress"
    >
      {steps.map((step, index) => (
        <XStack
          key={step.label}
          // biome-ignore lint/a11y/useSemanticElements: React Native has no equivalent semantic element; the demo shares one tree across platforms.
          role="listitem"
          aria-current={step.state === 'current' ? 'step' : undefined}
          aria-label={`Step ${index + 1} of ${steps.length}: ${step.label}, ${step.state === 'done' ? 'completed' : step.state}`}
          flex={index === steps.length - 1 ? 0 : 1}
          items="flex-start"
        >
          <YStack width={88} items="center" gap="2">
            <StepIndicator number={index + 1} state={step.state} />
            <Text
              fontSize="3"
              fontWeight={step.state === 'current' ? '700' : '500'}
              color={`${step.state === 'upcoming' ? 'color8' : 'color11'}`}
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
              mx="2"
              bg={`${step.state === 'done' ? 'accent-color' : 'color5'}`}
            />
          ) : null}
        </XStack>
      ))}
    </XStack>
  )
}

StepperHorizontal.fileName = 'StepperHorizontal'
