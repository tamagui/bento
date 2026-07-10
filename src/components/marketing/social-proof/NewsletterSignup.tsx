import { Check, Mail } from '@tamagui/lucide-icons-2'
import { useState } from 'react'
import { Button, Input, Paragraph, Text, View, XStack, YStack } from 'tamagui'

export function NewsletterSignup() {
  const [email, setEmail] = useState('')
  const [sent, setSent] = useState(false)
  if (sent) {
    return (
      <YStack
        width="100%"
        maxW={720}
        self="center"
        items="center"
        gap="$3"
        p="$7"
        rounded="$9"
        bg="$color2"
        borderWidth={1}
        borderColor="$borderColor"
      >
        <View
          width={48}
          height={48}
          rounded={999}
          bg="$green4"
          items="center"
          justify="center"
        >
          <Check size={24} color="$green11" />
        </View>
        <Text fontSize="$7" fontWeight="900" letterSpacing={0}>
          You’re on the list
        </Text>
        <Paragraph text="center" color="$color10">
          Watch {email} for the next product dispatch.
        </Paragraph>
      </YStack>
    )
  }
  return (
    <YStack
      width="100%"
      maxW={760}
      self="center"
      gap="$4"
      p="$7"
      rounded="$9"
      bg="$color2"
      borderWidth={1}
      borderColor="$borderColor"
    >
      <YStack gap="$2">
        <Text fontSize="$8" fontWeight="900" letterSpacing={-0.5}>
          Ideas worth shipping
        </Text>
        <Paragraph color="$color10">
          A concise monthly note on product craft, systems, and teams.
        </Paragraph>
      </YStack>
      <XStack gap="$2" flexWrap="wrap">
        <Input
          flex={1}
          minW={240}
          value={email}
          onChangeText={setEmail}
          placeholder="you@example.com"
          aria-label="Email address"
          autoCapitalize="none"
          keyboardType="email-address"
        />
        <Button
          icon={Mail}
          bg="$color12"
          color="$color1"
          disabled={!email.includes('@')}
          onPress={() => setSent(true)}
        >
          Subscribe
        </Button>
      </XStack>
      <Text fontSize="$1" color="$color8">
        No spam. Unsubscribe whenever you like.
      </Text>
    </YStack>
  )
}

NewsletterSignup.fileName = 'NewsletterSignup'
