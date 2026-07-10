import { useState } from 'react'
import { Text, XStack, YStack } from 'tamagui'
import { SegmentedFrame } from '../../elements/segmented-controls/common/SegmentedFrame'
import { PricingCard, plans } from './common/PricingCard'

const cadence = [
  { label: 'Monthly', value: 'monthly' },
  { label: 'Annual · save 20%', value: 'annual' },
]

export function PricingTiers() {
  const [billing, setBilling] = useState('annual')
  const [selected, setSelected] = useState<string | null>(null)
  return (
    <YStack width="100%" maxW={1080} self="center" gap="$6">
      <YStack self="center" items="center" gap="$3" maxW={520}>
        <Text text="center" fontSize="$9" fontWeight="900" letterSpacing={-0.8}>
          Plans that grow with you
        </Text>
        <Text text="center" color="$color10" letterSpacing={0}>
          Start small, then unlock more collaboration when your team is ready.
        </Text>
        <YStack width={280} mt="$2">
          <SegmentedFrame label="Billing period" options={cadence} value={billing} onValueChange={setBilling} />
        </YStack>
      </YStack>
      <XStack flexWrap="wrap" gap="$4" items="stretch">
        {plans.map((plan, index) => (
          <PricingCard
            key={plan.name}
            plan={plan}
            featured={index === 1}
            annual={billing === 'annual'}
            selected={selected === plan.name}
            onSelect={() => setSelected(plan.name)}
          />
        ))}
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
        {selected ? `${selected} plan selected, billed ${billing}` : ''}
      </Text>
    </YStack>
  )
}

PricingTiers.fileName = 'PricingTiers'
