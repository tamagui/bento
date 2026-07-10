import { Minus, Plus } from '@tamagui/lucide-icons-2'
import { Button, Text, XStack, YStack } from 'tamagui'
import { useHoldQuantity } from './common/useHoldQuantity'

export function QuantityStepper() {
  const { value, start, stop } = useHoldQuantity(2, 1, 10)
  return (
    <YStack
      width="100%"
      maxW={360}
      self="center"
      items="center"
      gap="$3"
      p="$5"
      rounded="$8"
      borderWidth={1}
      borderColor="$borderColor"
      bg="$background"
    >
      <Text fontSize="$5" fontWeight="800" letterSpacing={0}>
        Quantity
      </Text>
      <XStack
        items="center"
        overflow="hidden"
        rounded="$6"
        borderWidth={1}
        borderColor="$borderColor"
      >
        <Button
          width={52}
          height={48}
          rounded={0}
          chromeless
          icon={Minus}
          disabled={value <= 1}
          aria-label="Decrease quantity"
          onPressIn={() => start(-1)}
          onPressOut={stop}
        />
        <Text width={64} text="center" fontSize="$6" fontWeight="900" aria-live="polite">
          {value}
        </Text>
        <Button
          width={52}
          height={48}
          rounded={0}
          chromeless
          icon={Plus}
          disabled={value >= 10}
          aria-label="Increase quantity"
          onPressIn={() => start(1)}
          onPressOut={stop}
        />
      </XStack>
      <Text fontSize="$2" color="$color9">
        Press and hold to change quickly · max 10
      </Text>
    </YStack>
  )
}

QuantityStepper.fileName = 'QuantityStepper'
