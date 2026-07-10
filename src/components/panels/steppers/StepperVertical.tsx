import { Text, View, XStack, YStack } from 'tamagui'
import { StepIndicator, type StepState } from './common/StepIndicator'

const steps: { description: string; label: string; state: StepState }[] = [
  { label: 'Workspace created', description: 'Your team space is ready.', state: 'done' },
  {
    label: 'Invite collaborators',
    description: 'Add teammates to the project.',
    state: 'current',
  },
  {
    label: 'Connect tools',
    description: 'Choose your first integration.',
    state: 'upcoming',
  },
]

export function StepperVertical() {
  return (
    <YStack width="100%" maxW={480} self="center" px="$4" role="list" aria-label="Setup progress">
      {steps.map((step, index) => (
        <XStack
          key={step.label}
          role="listitem"
          aria-current={step.state === 'current' ? 'step' : undefined}
          aria-label={`Step ${index + 1} of ${steps.length}: ${step.label}, ${step.state === 'done' ? 'completed' : step.state}`}
          gap="$4"
          minH={96}
        >
          <YStack items="center">
            <StepIndicator number={index + 1} state={step.state} />
            {index < steps.length - 1 ? (
              <View
                width={2}
                flex={1}
                bg={step.state === 'done' ? '$accentColor' : '$color5'}
              />
            ) : null}
          </YStack>
          <YStack flex={1} pt="$1" gap="$1">
            <Text
              fontSize="$5"
              fontWeight="700"
              color={step.state === 'upcoming' ? '$color9' : '$color12'}
              letterSpacing={0}
            >
              {step.label}
            </Text>
            <Text color="$color9" letterSpacing={0}>
              {step.description}
            </Text>
          </YStack>
        </XStack>
      ))}
    </YStack>
  )
}

StepperVertical.fileName = 'StepperVertical'
