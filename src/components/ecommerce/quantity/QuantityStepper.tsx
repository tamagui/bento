import { Text, YStack } from 'tamagui'
import { SpinControl } from './common/SpinControl'
import { useHoldQuantity } from './common/useHoldQuantity'

export function QuantityStepper() {
  const { value, announced, setValue, start, stop } = useHoldQuantity(2, 1, 10)
  return (
    <YStack
      width="100%"
      maxW={360}
      self="center"
      items="center"
      gap="3"
      p="5"
      rounded="8"
      borderWidth={1}
      borderColor="border-color"
      bg="background"
    >
      <Text fontSize="5" fontWeight="800" letterSpacing={0}>
        Quantity
      </Text>
      <SpinControl
        label="Quantity"
        value={value}
        min={1}
        max={10}
        size={48}
        onStart={start}
        onStop={stop}
        onSet={setValue}
      />
      <Text fontSize="2" color="color8">
        Press and hold to change quickly · max 10
      </Text>
      <Text
        render="output"
        aria-live="polite"
        position="absolute"
        width={1}
        height={1}
        opacity={0}
        overflow="hidden"
      >
        {`Quantity ${announced}`}
      </Text>
    </YStack>
  )
}

QuantityStepper.fileName = 'QuantityStepper'
