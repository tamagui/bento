import { Check } from '@tamagui/lucide-icons-2'
import { Button, Paragraph, Text, XStack, YStack } from 'tamagui'

export type PricingPlan = {
  annual: number
  description: string
  features: string[]
  monthly: number
  name: string
}

const money = (value: number) =>
  new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0,
  }).format(value)

export function PricingCard({
  annual,
  featured = false,
  plan,
  selected = false,
  onSelect,
}: {
  annual: boolean
  featured?: boolean
  plan: PricingPlan
  selected?: boolean
  onSelect?: () => void
}) {
  const price = annual ? plan.annual : plan.monthly
  const yearlySavings = (plan.monthly - plan.annual) * 12
  return (
    <YStack
      flex={1}
      flexBasis={0}
      minW={250}
      gap="$5"
      p="$5"
      rounded="$8"
      borderWidth={featured || selected ? 2 : 1}
      borderColor={selected ? '$green9' : featured ? '$accentColor' : '$borderColor'}
      bg="$background"
      position="relative"
    >
      {featured ? (
        <Text
          self="flex-start"
          px="$2.5"
          py="$1"
          rounded={999}
          bg="$color12"
          color="$color1"
          fontSize="$1"
          fontWeight="800"
          textTransform="uppercase"
          letterSpacing={0.8}
        >
          Most popular
        </Text>
      ) : null}
      <YStack gap="$2">
        <Text fontSize="$6" fontWeight="800" letterSpacing={0}>
          {plan.name}
        </Text>
        <Paragraph color="$color10">{plan.description}</Paragraph>
      </YStack>
      <YStack gap="$1">
        <XStack items="baseline" gap="$1">
          <Text fontSize="$10" fontWeight="900" letterSpacing={-1}>
            {money(price)}
          </Text>
          <Text color="$color9">/ month</Text>
        </XStack>
        {annual && (
          <Text fontSize="$2" color="$color9">
            {money(plan.annual * 12)} billed yearly · save {money(yearlySavings)}
          </Text>
        )}
      </YStack>
      <YStack gap="$3" flex={1}>
        {plan.features.map((feature) => (
          <XStack key={feature} gap="$2.5" items="center">
            <Check size={16} color="$green10" aria-hidden />
            <Text flex={1} color="$color11" letterSpacing={0}>
              {feature}
            </Text>
          </XStack>
        ))}
      </YStack>
      <Button
        bg={selected ? '$green9' : featured ? '$color12' : '$color3'}
        color={selected || featured ? '$color1' : '$color12'}
        aria-label={selected ? `${plan.name} plan selected` : `Choose ${plan.name} plan`}
        aria-pressed={selected}
        onPress={onSelect}
      >
        {selected ? 'Selected' : `Choose ${plan.name}`}
      </Button>
    </YStack>
  )
}

export const plans: PricingPlan[] = [
  {
    name: 'Starter',
    description: 'For individuals shipping their first ideas.',
    monthly: 12,
    annual: 9,
    features: ['3 active projects', '5 GB storage', 'Community support'],
  },
  {
    name: 'Studio',
    description: 'For growing teams that collaborate every day.',
    monthly: 29,
    annual: 23,
    features: [
      'Unlimited projects',
      '100 GB storage',
      'Priority support',
      'Team analytics',
    ],
  },
  {
    name: 'Scale',
    description: 'For organizations that need advanced control.',
    monthly: 79,
    annual: 63,
    features: [
      'Advanced permissions',
      'Unlimited storage',
      'SAML SSO',
      'Dedicated success manager',
    ],
  },
]
