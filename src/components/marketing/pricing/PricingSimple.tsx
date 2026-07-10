import { Text, YStack } from 'tamagui'
import { PricingCard, plans } from './common/PricingCard'

export function PricingSimple() {
  return (
    <YStack width="100%" maxW={420} self="center" gap="$4">
      <YStack items="center" gap="$1">
        <Text fontSize="$8" fontWeight="900" letterSpacing={-0.5}>
          One simple plan
        </Text>
        <Text color="$color9" text="center" letterSpacing={0}>
          Everything a small product team needs.
        </Text>
      </YStack>
      <PricingCard plan={plans[1]} annual={false} featured />
    </YStack>
  )
}

PricingSimple.fileName = 'PricingSimple'
