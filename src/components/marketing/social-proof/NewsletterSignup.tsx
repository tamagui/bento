import { Check, Mail } from '@tamagui/lucide-icons-2'
import { useEffect, useState } from 'react'
import { Anchor, Button, Input, Paragraph, Spinner, Text, View, XStack, YStack, isWeb } from 'tamagui'

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/

export function NewsletterSignup({
  onSubscribe,
}: {
  /** wire to your API; the default simulates a request */
  onSubscribe?: (email: string) => Promise<void>
}) {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent'>('idle')
  const [error, setError] = useState('')

  // keep focus in the flow when the form unmounts into the success panel
  useEffect(() => {
    if (status === 'sent' && isWeb) {
      requestAnimationFrame(() =>
        document.getElementById('newsletter-success')?.focus()
      )
    }
  }, [status])

  const subscribe = async () => {
    const normalized = email.trim()
    if (!EMAIL_RE.test(normalized)) {
      setError('Enter a full email address, like you@example.com.')
      return
    }
    setError('')
    setStatus('sending')
    await (onSubscribe?.(normalized) ?? new Promise((resolve) => setTimeout(resolve, 900)))
    setStatus('sent')
  }

  if (status === 'sent') {
    return (
      <YStack
        id="newsletter-success"
        tabIndex={-1}
        aria-live="polite"
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
          <Check size={24} color="$green11" aria-hidden />
        </View>
        <Text fontSize="$7" fontWeight="900" letterSpacing={0}>
          You’re on the list
        </Text>
        <Paragraph text="center" color="$color10">
          Watch {email.trim()} for the next product dispatch.
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
          onChangeText={(value) => {
            setEmail(value)
            setError('')
          }}
          placeholder="you@example.com"
          aria-label="Email address"
          aria-invalid={!!error}
          aria-describedby={error ? 'newsletter-error' : undefined}
          autoCapitalize="none"
          keyboardType="email-address"
          borderColor={error ? '$red8' : undefined}
        />
        <Button
          icon={status === 'sending' ? <Spinner size="small" /> : Mail}
          bg="$color12"
          color="$color1"
          disabled={status === 'sending'}
          onPress={subscribe}
        >
          {status === 'sending' ? 'Subscribing…' : 'Subscribe'}
        </Button>
      </XStack>
      {!!error && (
        <Text id="newsletter-error" aria-live="polite" fontSize="$2" color="$red10">
          {error}
        </Text>
      )}
      <Text fontSize="$1" color="$color8">
        By subscribing you agree to our{' '}
        <Anchor
          href="https://tamagui.dev/privacy"
          target="_blank"
          fontSize="$1"
          color="$color9"
          textDecorationLine="underline"
        >
          privacy policy
        </Anchor>
        . No spam — unsubscribe whenever you like.
      </Text>
    </YStack>
  )
}

NewsletterSignup.fileName = 'NewsletterSignup'
