import { CheckCircle2 } from '@tamagui/lucide-icons-2'
import { useRef, useState } from 'react'
import { Button, Input, Paragraph, Text, View, XStack, YStack, isWeb } from 'tamagui'
import { StepperHorizontal } from './StepperHorizontal'

export function StepperForm() {
  const [step, setStep] = useState(0)
  const [email, setEmail] = useState('')
  const [name, setName] = useState('')
  const [error, setError] = useState('')
  const inputRef = useRef<any>(null)

  const next = () => {
    const valid = step === 0 ? email.includes('@') : name.trim().length > 1
    if (!valid) {
      setError(step === 0 ? 'Enter a valid email address.' : 'Enter your display name.')
      // put the user back where the fix happens
      inputRef.current?.focus?.()
      return
    }
    setError('')
    setStep((current) => current + 1)
  }

  const restart = () => {
    setStep(0)
    setEmail('')
    setName('')
    setError('')
  }

  const submitOnEnter = isWeb
    ? {
        onKeyDown: (event: any) => {
          if (event.key === 'Enter') {
            event.preventDefault()
            next()
          }
        },
      }
    : { onSubmitEditing: next }

  if (step === 3) {
    return (
      <YStack width="100%" maxW={560} self="center" items="center" gap="3" p="7">
        <CheckCircle2 size={46} color="green-600" />
        <Text fontSize="7" fontWeight="800" letterSpacing={0}>
          You’re all set
        </Text>
        <Paragraph text="center" color="color9">
          Your workspace profile is ready to use.
        </Paragraph>
        <Button mt="2" onPress={restart}>
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
      gap="6"
      p="5"
      rounded="8"
      borderWidth={1}
      borderColor="border-color"
      bg="background"
      render={isWeb ? 'form' : undefined}
    >
      <StepperHorizontal currentStep={step} />
      <YStack gap="3">
        <Text fontSize="7" fontWeight="800" letterSpacing={0}>
          {step === 0
            ? 'Create your account'
            : step === 1
              ? 'Complete your profile'
              : 'Confirm details'}
        </Text>
        {step === 0 ? (
          <Input
            ref={inputRef}
            value={email}
            onChangeText={setEmail}
            placeholder="you@example.com"
            aria-label="Email address"
            aria-invalid={!!error}
            aria-describedby={error ? 'stepper-form-error' : undefined}
            autoCapitalize="none"
            {...submitOnEnter}
          />
        ) : step === 1 ? (
          <Input
            ref={inputRef}
            value={name}
            onChangeText={setName}
            placeholder="Display name"
            aria-label="Display name"
            aria-invalid={!!error}
            aria-describedby={error ? 'stepper-form-error' : undefined}
            {...submitOnEnter}
          />
        ) : (
          <YStack gap="2" p="4" rounded="5" bg="color2">
            <Text color="color8">Email</Text>
            <Text fontWeight="600">{email}</Text>
            <Text mt="2" color="color8">
              Display name
            </Text>
            <Text fontWeight="600">{name}</Text>
          </YStack>
        )}
        <Text id="stepper-form-error" aria-live="polite" color="red-600" minH={20}>
          {error}
        </Text>
      </YStack>
      <XStack justify="space-between">
        {/* spacer keeps layout when Back is genuinely absent at step 0 */}
        {step === 0 ? <View /> : <Button onPress={() => setStep(step - 1)}>Back</Button>}
        <Button theme="accent" onPress={step === 2 ? () => setStep(3) : next}>
          {step === 2 ? 'Finish' : 'Next'}
        </Button>
      </XStack>
    </YStack>
  )
}

StepperForm.fileName = 'StepperForm'
