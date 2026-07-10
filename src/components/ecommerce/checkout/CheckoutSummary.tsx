import { Package, Tag, Truck } from '@tamagui/lucide-icons-2'
import { useState } from 'react'
import { Button, Input, Separator, Text, View, XStack, YStack } from 'tamagui'

// integer cents everywhere — floats never touch money math
const items = [
  {
    name: 'Contour desk lamp',
    detail: 'Graphite · 1',
    priceCents: 12800,
    color: '$blue5',
  },
  { name: 'Wool desk mat', detail: 'Stone · 1', priceCents: 4600, color: '$orange5' },
] as const

// promo codes are validated against a known table with real effects;
// a live store would revalidate these server-side
const promoCodes: Record<string, { percentOff: number }> = {
  SAVE10: { percentOff: 10 },
  WELCOME5: { percentOff: 5 },
}

const TAX_RATE = 0.08

const money = (cents: number) =>
  new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(
    cents / 100
  )

export function CheckoutSummary() {
  const [code, setCode] = useState('')
  const [applied, setApplied] = useState<string | null>(null)
  const [promoError, setPromoError] = useState('')

  const subtotal = items.reduce((sum, item) => sum + item.priceCents, 0)
  const discount = applied
    ? Math.round((subtotal * promoCodes[applied].percentOff) / 100)
    : 0
  const tax = Math.round((subtotal - discount) * TAX_RATE)
  const total = subtotal - discount + tax

  const applyCode = () => {
    const normalized = code.trim().toUpperCase()
    if (promoCodes[normalized]) {
      setApplied(normalized)
      setPromoError('')
    } else {
      setPromoError(`“${normalized}” isn’t a valid code.`)
    }
  }

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
        <Package size={22} color="$color9" aria-hidden />
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
              <Package size={24} color="$color11" aria-hidden />
            </View>
            <YStack flex={1} gap="$1">
              <Text fontWeight="700" letterSpacing={0}>
                {item.name}
              </Text>
              <Text fontSize="$2" color="$color9">
                {item.detail}
              </Text>
            </YStack>
            <Text fontWeight="700">{money(item.priceCents)}</Text>
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
            onChangeText={(value) => {
              setCode(value)
              setPromoError('')
            }}
            placeholder="SAVE10"
            aria-label="Promo code"
            aria-invalid={!!promoError}
            aria-describedby={promoError ? 'promo-error' : undefined}
            autoCapitalize="characters"
          />
          <Button icon={Tag} disabled={!code.trim() || !!applied} onPress={applyCode}>
            {applied ? 'Applied' : 'Apply'}
          </Button>
        </XStack>
        {applied ? (
          <Text fontSize="$2" color="$green10" aria-live="polite">
            {applied} applied · {promoCodes[applied].percentOff}% off ({money(discount)})
          </Text>
        ) : null}
        {promoError ? (
          <Text id="promo-error" fontSize="$2" color="$red10" aria-live="polite">
            {promoError}
          </Text>
        ) : null}
      </YStack>
      <Separator />
      <YStack gap="$3">
        <XStack justify="space-between">
          <Text color="$color9">Subtotal</Text>
          <Text>{money(subtotal)}</Text>
        </XStack>
        {applied ? (
          <XStack justify="space-between">
            <Text color="$green10">Discount ({promoCodes[applied].percentOff}%)</Text>
            <Text color="$green10">−{money(discount)}</Text>
          </XStack>
        ) : null}
        <XStack justify="space-between">
          <Text color="$color9">Shipping</Text>
          <XStack items="center" gap="$1">
            <Truck size={14} color="$green10" aria-hidden />
            <Text color="$green10">Free</Text>
          </XStack>
        </XStack>
        <XStack justify="space-between">
          <Text color="$color9">Estimated tax (8%)</Text>
          <Text>{money(tax)}</Text>
        </XStack>
        <Separator />
        <XStack justify="space-between" items="center">
          <Text fontSize="$6" fontWeight="800">
            Total
          </Text>
          <Text fontSize="$7" fontWeight="900">
            {money(total)}
          </Text>
        </XStack>
      </YStack>
    </YStack>
  )
}

CheckoutSummary.fileName = 'CheckoutSummary'
