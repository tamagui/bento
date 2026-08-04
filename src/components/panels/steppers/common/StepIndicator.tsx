import { Check } from '@tamagui/lucide-icons-2'
import { Text, View } from 'tamagui'

export type StepState = 'done' | 'current' | 'upcoming'

export function StepIndicator({
  number,
  state,
}: {
  number: number
  state: StepState
}) {
  const active = state !== 'upcoming'
  return (
    <View
      width={34}
      height={34}
      rounded={999}
      items="center"
      justify="center"
      bg={`${state === 'done' ? 'accent-color' : 'background'}`}
      borderWidth={2}
      borderColor={`${active ? 'accent-color' : 'color6'}`}
    >
      {state === 'done' ? (
        <Check size={17} color="white" />
      ) : (
        <Text
          fontWeight="700"
          fontSize="3"
          color={`${state === 'current' ? 'accent-color' : 'color8'}`}
          letterSpacing={0}
        >
          {number}
        </Text>
      )}
    </View>
  )
}
