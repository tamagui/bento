import { Check } from '@tamagui/lucide-icons-2'
import { Button, Paragraph, Text, XStack, YStack } from 'tamagui'

export type PricingPlan = {
  annual: number
  description: string
  features: string[]
  monthly: number
  name: string
}

export function PricingCard({
  annual,
  featured = false,
  plan,
}: {
  annual: boolean
  featured?: boolean
  plan: PricingPlan
}) {
  const price = annual ? plan.annual : plan.monthly
  return (
    <YStack
      flex={1}
      minW={250}
      gap="$5"
      p="$5"
      rounded="$8"
      borderWidth={featured ? 2 : 1}
      borderColor={featured ? '$accentColor' : '$borderColor'}
      bg="$background"
      position="relative"
    >
      {featured ? (
        <Text
          self="flex-start"
          px="$2.5"
          py="$1"
          rounded={999}
          bg="$accentColor"
          color="white"
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
      <XStack items="baseline" gap="$1">
        <Text fontSize="$10" fontWeight="900" letterSpacing={-1}>
          ${price}
        </Text>
        <Text color="$color9">/ month</Text>
      </XStack>
      <YStack gap="$3" flex={1}>
        {plan.features.map((feature) => (
          <XStack key={feature} gap="$2.5" items="center">
            <Check size={16} color="$green10" />
            <Text flex={1} color="$color11" letterSpacing={0}>
              {feature}
            </Text>
          </XStack>
        ))}
      </YStack>
      <Button
        bg={featured ? '$accentColor' : '$color3'}
        color={featured ? 'white' : '$color12'}
        aria-label={`Choose ${plan.name} plan`}
      >
        Choose {plan.name}
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
