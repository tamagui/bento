import { CheckCircle2 } from '@tamagui/lucide-icons-2'
import { useState } from 'react'
import { Button, Input, Paragraph, Text, XStack, YStack } from 'tamagui'
import { StepperHorizontal } from './StepperHorizontal'

export function StepperForm() {
  const [step, setStep] = useState(0)
  const [email, setEmail] = useState('')
  const [name, setName] = useState('')
  const [error, setError] = useState('')

  const next = () => {
    const valid = step === 0 ? email.includes('@') : name.trim().length > 1
    if (!valid) {
      setError(step === 0 ? 'Enter a valid email address.' : 'Enter your display name.')
      return
    }
    setError('')
    setStep((current) => current + 1)
  }

  if (step === 3) {
    return (
      <YStack width="100%" maxW={560} self="center" items="center" gap="$3" p="$7">
        <CheckCircle2 size={46} color="$green10" />
        <Text fontSize="$7" fontWeight="800" letterSpacing={0}>
          You’re all set
        </Text>
        <Paragraph text="center" color="$color10">
          Your workspace profile is ready to use.
        </Paragraph>
        <Button mt="$2" onPress={() => setStep(0)}>
          Start over
        </Button>
      </YStack>
    )
  }

  return (
    <YStack
      width="100%"
      maxW={680}
      self="center"
      gap="$6"
      p="$5"
      rounded="$8"
      borderWidth={1}
      borderColor="$borderColor"
      bg="$background"
    >
      <StepperHorizontal currentStep={step} />
      <YStack gap="$3">
        <Text fontSize="$7" fontWeight="800" letterSpacing={0}>
          {step === 0
            ? 'Create your account'
            : step === 1
              ? 'Complete your profile'
              : 'Confirm details'}
        </Text>
        {step === 0 ? (
          <Input
            value={email}
            onChangeText={setEmail}
            placeholder="you@example.com"
            aria-label="Email address"
            autoCapitalize="none"
          />
        ) : step === 1 ? (
          <Input
            value={name}
            onChangeText={setName}
            placeholder="Display name"
            aria-label="Display name"
          />
        ) : (
          <YStack gap="$2" p="$4" rounded="$5" bg="$color2">
            <Text color="$color9">Email</Text>
            <Text fontWeight="600">{email}</Text>
            <Text mt="$2" color="$color9">
              Display name
            </Text>
            <Text fontWeight="600">{name}</Text>
          </YStack>
        )}
        {error ? <Text color="$red10">{error}</Text> : null}
      </YStack>
      <XStack justify="space-between">
        <Button
          disabled={step === 0}
          opacity={step === 0 ? 0 : 1}
          onPress={() => setStep(step - 1)}
        >
          Back
        </Button>
        <Button
          bg="$accentColor"
          color="white"
          hoverStyle={{ opacity: 0.9 }}
          onPress={step === 2 ? () => setStep(3) : next}
        >
          {step === 2 ? 'Finish' : 'Next'}
        </Button>
      </XStack>
    </YStack>
  )
}

StepperForm.fileName = 'StepperForm'
