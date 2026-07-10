import { Minus, Package, Plus } from '@tamagui/lucide-icons-2'
import { Button, Text, View, XStack, YStack } from 'tamagui'
import { useHoldQuantity } from './common/useHoldQuantity'

export function QuantityInline() {
  const { value, setValue, start, stop } = useHoldQuantity(2, 0, 8)
  if (value === 0) {
    return (
      <XStack
        width="100%"
        maxW={620}
        self="center"
        justify="space-between"
        items="center"
        p="$4"
        rounded="$6"
        borderWidth={1}
        borderColor="$borderColor"
        bg="$color2"
      >
        <Text color="$color9">Item removed from cart</Text>
        <Button size="$3" onPress={() => setValue(1)}>
          Undo
        </Button>
      </XStack>
    )
  }
  return (
    <XStack
      width="100%"
      maxW={620}
      self="center"
      items="center"
      gap="$3"
      p="$4"
      rounded="$6"
      borderWidth={1}
      borderColor="$borderColor"
      bg="$background"
    >
      <View
        width={52}
        height={52}
        rounded="$5"
        bg="$blue5"
        items="center"
        justify="center"
      >
        <Package size={22} color="$color11" />
      </View>
      <YStack flex={1} gap="$1">
        <Text fontWeight="800" letterSpacing={0}>
          Contour desk lamp
        </Text>
        <Text fontSize="$2" color="$color9">
          $128 each
        </Text>
      </YStack>
      <XStack items="center" rounded="$5" borderWidth={1} borderColor="$borderColor">
        <Button
          width={38}
          height={36}
          rounded={0}
          chromeless
          icon={Minus}
          aria-label={value === 1 ? 'Remove item' : 'Decrease quantity'}
          onPressIn={() => start(-1)}
          onPressOut={stop}
        />
        <Text width={34} text="center" fontWeight="800" aria-live="polite">
          {value}
        </Text>
        <Button
          width={38}
          height={36}
          rounded={0}
          chromeless
          icon={Plus}
          disabled={value >= 8}
          aria-label="Increase quantity"
          onPressIn={() => start(1)}
          onPressOut={stop}
        />
      </XStack>
      <Text width={72} text="right" fontWeight="900">
        ${value * 128}
      </Text>
    </XStack>
  )
}

QuantityInline.fileName = 'QuantityInline'
