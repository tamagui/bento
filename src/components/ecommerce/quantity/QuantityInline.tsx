import { Package } from '@tamagui/lucide-icons-2'
import { Button, Text, View, XStack, YStack } from 'tamagui'
import { SpinControl, formatMoney } from './common/SpinControl'
import { useHoldQuantity } from './common/useHoldQuantity'

const UNIT_PRICE = 128

export function QuantityInline() {
  const { value, announced, setValue, start, stop } = useHoldQuantity(2, 0, 8)

  if (value === 0) {
    return (
      <XStack
        width="100%"
        maxW={620}
        self="center"
        justify="space-between"
        items="center"
        p="4"
        rounded="6"
        borderWidth={1}
        borderColor="border-color"
        bg="color2"
      >
        <Text color="color8" aria-live="polite">
          Item removed from cart
        </Text>
        <Button size="3" onPress={() => setValue(1)}>
          Undo
        </Button>
      </XStack>
    )
  }

  return (
    // wraps into two comfortable rows on narrow screens instead of
    // crushing the title one character per line
    <XStack
      width="100%"
      maxW={620}
      self="center"
      items="center"
      flexWrap="wrap"
      gap="3"
      p="4"
      rounded="6"
      borderWidth={1}
      borderColor="border-color"
      bg="background"
    >
      <XStack items="center" gap="3" flex={1} minW={200}>
        <View
          width={52}
          height={52}
          rounded="5"
          bg="blue-300"
          items="center"
          justify="center"
        >
          <Package size={22} color="color10" aria-hidden />
        </View>
        <YStack flex={1} minW={0} gap="1">
          <Text fontWeight="800" letterSpacing={0} numberOfLines={1}>
            Contour desk lamp
          </Text>
          <Text fontSize="2" color="color8">
            {formatMoney(UNIT_PRICE)} each
          </Text>
        </YStack>
      </XStack>
      <XStack items="center" gap="3" justify="space-between" grow={1} flexBasis={220}>
        <SpinControl
          label="Contour desk lamp quantity"
          value={value}
          min={0}
          max={8}
          onStart={start}
          onStop={stop}
          onSet={setValue}
          decreaseLabel={value === 1 ? 'Remove item' : 'Decrease quantity'}
        />
        <Text minW={72} text="right" fontWeight="900">
          {formatMoney(value * UNIT_PRICE)}
        </Text>
      </XStack>
      <Text
        render="output"
        aria-live="polite"
        position="absolute"
        width={1}
        height={1}
        opacity={0}
        overflow="hidden"
      >
        {`Quantity ${announced}, total ${formatMoney(announced * UNIT_PRICE)}`}
      </Text>
    </XStack>
  )
}

QuantityInline.fileName = 'QuantityInline'
