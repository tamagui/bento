import { useState } from 'react'
import { Text, YStack } from 'tamagui'
import { PricingCard, plans } from './common/PricingCard'

export function PricingSimple() {
  const [selected, setSelected] = useState(false)
  return (
    <YStack width="100%" maxW={420} self="center" gap="4">
      <YStack items="center" gap="1">
        <Text fontSize="8" fontWeight="900" letterSpacing={-0.5}>
          One simple plan
        </Text>
        <Text color="color8" text="center" letterSpacing={0}>
          Everything a small product team needs.
        </Text>
      </YStack>
      <PricingCard
        plan={plans[1]}
        annual={false}
        featured
        selected={selected}
        onSelect={() => setSelected(true)}
      />
    </YStack>
  )
}

PricingSimple.fileName = 'PricingSimple'
