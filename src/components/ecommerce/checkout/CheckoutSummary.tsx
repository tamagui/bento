import { Package, Tag, Truck } from '@tamagui/lucide-icons-2'
import { useState } from 'react'
import { Button, Input, Separator, Text, View, XStack, YStack } from 'tamagui'

const items = [
  { name: 'Contour desk lamp', detail: 'Graphite · 1', price: 128, color: '$blue5' },
  { name: 'Wool desk mat', detail: 'Stone · 1', price: 46, color: '$orange5' },
] as const

export function CheckoutSummary() {
  const [code, setCode] = useState('')
  const [applied, setApplied] = useState(false)
  const subtotal = items.reduce((sum, item) => sum + item.price, 0)
  const discount = applied ? 18 : 0
  const tax = 13.92
  const total = subtotal - discount + tax
  return (
    <YStack
      width="100%"
      maxW={560}
      self="center"
      gap="$5"
      p="$5"
      rounded="$8"
      borderWidth={1}
      borderColor="$borderColor"
      bg="$background"
    >
      <XStack justify="space-between" items="center">
        <Text fontSize="$7" fontWeight="900" letterSpacing={0}>
          Order summary
        </Text>
        <Package size={22} color="$color9" />
      </XStack>
      <YStack gap="$4">
        {items.map((item) => (
          <XStack key={item.name} items="center" gap="$3">
            <View
              width={64}
              height={64}
              rounded="$5"
              bg={item.color}
              items="center"
              justify="center"
            >
              <Package size={24} color="$color11" />
            </View>
            <YStack flex={1} gap="$1">
              <Text fontWeight="700" letterSpacing={0}>
                {item.name}
              </Text>
              <Text fontSize="$2" color="$color9">
                {item.detail}
              </Text>
            </YStack>
            <Text fontWeight="700">${item.price.toFixed(2)}</Text>
          </XStack>
        ))}
      </YStack>
      <Separator />
      <YStack gap="$2">
        <Text fontWeight="700" letterSpacing={0}>
          Promo code
        </Text>
        <XStack gap="$2">
          <Input
            flex={1}
            value={code}
            onChangeText={setCode}
            placeholder="SAVE10"
            aria-label="Promo code"
            autoCapitalize="characters"
          />
          <Button
            icon={Tag}
            disabled={!code.trim() || applied}
            onPress={() => setApplied(true)}
          >
            {applied ? 'Applied' : 'Apply'}
          </Button>
        </XStack>
        {applied ? (
          <Text fontSize="$2" color="$green10">
            SAVE10 applied · $18 off
          </Text>
        ) : null}
      </YStack>
      <Separator />
      <YStack gap="$3">
        <XStack justify="space-between">
          <Text color="$color9">Subtotal</Text>
          <Text>${subtotal.toFixed(2)}</Text>
        </XStack>
        {applied ? (
          <XStack justify="space-between">
            <Text color="$green10">Discount</Text>
            <Text color="$green10">−${discount.toFixed(2)}</Text>
          </XStack>
        ) : null}
        <XStack justify="space-between">
          <Text color="$color9">Shipping</Text>
          <XStack items="center" gap="$1">
            <Truck size={14} color="$green10" />
            <Text color="$green10">Free</Text>
          </XStack>
        </XStack>
        <XStack justify="space-between">
          <Text color="$color9">Estimated tax</Text>
          <Text>${tax.toFixed(2)}</Text>
        </XStack>
        <Separator />
        <XStack justify="space-between" items="center">
          <Text fontSize="$6" fontWeight="800">
            Total
          </Text>
          <Text fontSize="$7" fontWeight="900">
            ${total.toFixed(2)}
          </Text>
        </XStack>
      </YStack>
    </YStack>
  )
}

CheckoutSummary.fileName = 'CheckoutSummary'
