import { CreditCard, MapPin, Truck } from '@tamagui/lucide-icons-2'
import { useState } from 'react'
import { Button, Input, Text, XStack, YStack } from 'tamagui'
import { StepperHorizontal } from '../../panels/steppers/StepperHorizontal'

const titles = ['Delivery address', 'Shipping method', 'Payment details']

export function CheckoutSteps() {
  const [step, setStep] = useState(0)
  const [address, setAddress] = useState('')
  const [error, setError] = useState('')
  const next = () => {
    if (step === 0 && address.trim().length < 6) {
      setError('Enter a complete delivery address.')
      return
    }
    setError('')
    setStep((current) => Math.min(current + 1, 2))
  }
  return (
    <YStack
      width="100%"
      maxW={720}
      self="center"
      gap="$6"
      p="$5"
      rounded="$8"
      borderWidth={1}
      borderColor="$borderColor"
      bg="$background"
    >
      <StepperHorizontal currentStep={step} labels={['Address', 'Shipping', 'Payment']} />
      <YStack gap="$4">
        <XStack items="center" gap="$2">
          {step === 0 ? (
            <MapPin size={22} color="$accentColor" />
          ) : step === 1 ? (
            <Truck size={22} color="$accentColor" />
          ) : (
            <CreditCard size={22} color="$accentColor" />
          )}
          <Text fontSize="$7" fontWeight="900" letterSpacing={0}>
            {titles[step]}
          </Text>
        </XStack>
        {step === 0 ? (
          <YStack gap="$3">
            <Input
              value={address}
              onChangeText={setAddress}
              placeholder="Street address"
              aria-label="Street address"
            />
            <XStack gap="$3">
              <Input flex={1} placeholder="City" aria-label="City" />
              <Input width={150} placeholder="ZIP" aria-label="ZIP code" />
            </XStack>
          </YStack>
        ) : step === 1 ? (
          <YStack gap="$2">
            {['Standard · Free · 3–5 days', 'Express · $14 · 1–2 days'].map(
              (method, index) => (
                <Button
                  key={method}
                  justify="flex-start"
                  bg={index === 0 ? '$color3' : '$background'}
                  borderWidth={1}
                  borderColor={index === 0 ? '$accentColor' : '$borderColor'}
                >
                  {method}
                </Button>
              )
            )}
          </YStack>
        ) : (
          <YStack gap="$3">
            <Input
              placeholder="Card number"
              keyboardType="number-pad"
              aria-label="Card number"
            />
            <XStack gap="$3">
              <Input flex={1} placeholder="MM / YY" aria-label="Expiration date" />
              <Input width={140} placeholder="CVC" aria-label="Security code" />
            </XStack>
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
        <Button bg="$color12" color="$color1" onPress={step === 2 ? undefined : next}>
          {step === 2 ? 'Place order' : 'Continue'}
        </Button>
      </XStack>
    </YStack>
  )
}

CheckoutSteps.fileName = 'CheckoutSteps'
