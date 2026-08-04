import { CreditCard, MapPin, ShieldCheck, Truck } from '@tamagui/lucide-icons-2'
import { useRef, useState } from 'react'
import { Button, Input, Spinner, Text, View, XStack, YStack, isWeb } from 'tamagui'
import { StepperHorizontal } from '../../panels/steppers/StepperHorizontal'

const titles = ['Delivery address', 'Shipping method', 'Payment details']

const shippingMethods = [
  { id: 'standard', label: 'Standard', priceCents: 0, eta: '3–5 days' },
  { id: 'express', label: 'Express', priceCents: 1400, eta: '1–2 days' },
]

const money = (cents: number) =>
  new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(
    cents / 100
  )

type Form = {
  address: string
  city: string
  zip: string
  shipping: string
}

export function CheckoutSteps() {
  const [step, setStep] = useState(0)
  // one persistent form model — no field loses its value between steps
  const [form, setForm] = useState<Form>({
    address: '',
    city: '',
    zip: '',
    shipping: 'standard',
  })
  const [errors, setErrors] = useState<Partial<Record<keyof Form, string>>>({})
  const [placing, setPlacing] = useState(false)
  const [orderId, setOrderId] = useState('')
  const fieldRefs = useRef<Record<string, any>>({})

  const setField = (key: keyof Form, value: string) =>
    setForm((current) => ({ ...current, [key]: value }))

  const validateAddress = () => {
    const next: typeof errors = {}
    if (form.address.trim().length < 6) next.address = 'Enter a street address.'
    if (form.city.trim().length < 2) next.city = 'Enter a city.'
    if (!/^\d{5}$/.test(form.zip.trim())) next.zip = 'Enter a 5-digit ZIP.'
    setErrors(next)
    const first = (['address', 'city', 'zip'] as const).find((key) => next[key])
    if (first) fieldRefs.current[first]?.focus?.()
    return !first
  }

  const next = () => {
    if (step === 0 && !validateAddress()) return
    setErrors({})
    setStep((current) => Math.min(current + 1, 2))
  }

  const placeOrder = () => {
    setPlacing(true)
    setTimeout(() => {
      setPlacing(false)
      setOrderId('BN-20481')
    }, 1200)
  }

  if (orderId) {
    return (
      <YStack
        width="100%"
        maxW={720}
        self="center"
        items="center"
        gap="3"
        p="7"
        rounded="8"
        borderWidth={1}
        borderColor="green-400"
        bg="green-50"
      >
        <ShieldCheck size={40} color="green-600" aria-hidden />
        <Text fontSize="7" fontWeight="900" letterSpacing={0} aria-live="polite">
          Order {orderId} placed
        </Text>
        <Text color="color9" text="center">
          {shippingMethods.find((m) => m.id === form.shipping)?.label} shipping to{' '}
          {form.address.trim()}, {form.city.trim()} {form.zip.trim()}
        </Text>
        <Button
          mt="2"
          variant="outlined"
          onPress={() => {
            setOrderId('')
            setStep(0)
            setForm({ address: '', city: '', zip: '', shipping: 'standard' })
          }}
        >
          Start a new order
        </Button>
      </YStack>
    )
  }

  const fieldProps = (key: 'address' | 'city' | 'zip') => ({
    'aria-invalid': !!errors[key],
    'aria-describedby': errors[key] ? `checkout-${key}-error` : undefined,
    borderColor: errors[key] ? ('red-500' as const) : undefined,
    ref: (el: any) => {
      fieldRefs.current[key] = el
    },
  })

  return (
    <YStack
      width="100%"
      maxW={720}
      self="center"
      gap="6"
      p="5"
      rounded="8"
      borderWidth={1}
      borderColor="border-color"
      bg="background"
    >
      <StepperHorizontal currentStep={step} labels={['Address', 'Shipping', 'Payment']} />
      <YStack gap="4">
        <XStack items="center" gap="2">
          {step === 0 ? (
            <MapPin size={22} color="accent-color" aria-hidden />
          ) : step === 1 ? (
            <Truck size={22} color="accent-color" aria-hidden />
          ) : (
            <CreditCard size={22} color="accent-color" aria-hidden />
          )}
          <Text fontSize="7" fontWeight="900" letterSpacing={0}>
            {titles[step]}
          </Text>
        </XStack>
        {step === 0 ? (
          <YStack gap="3">
            <YStack gap="1">
              <Input
                value={form.address}
                onChangeText={(value) => setField('address', value)}
                placeholder="Street address"
                aria-label="Street address"
                {...fieldProps('address')}
              />
              {errors.address && (
                <Text id="checkout-address-error" fontSize="2" color="red-600">
                  {errors.address}
                </Text>
              )}
            </YStack>
            <XStack gap="3">
              <YStack flex={1} gap="1">
                <Input
                  value={form.city}
                  onChangeText={(value) => setField('city', value)}
                  placeholder="City"
                  aria-label="City"
                  {...fieldProps('city')}
                />
                {errors.city && (
                  <Text id="checkout-city-error" fontSize="2" color="red-600">
                    {errors.city}
                  </Text>
                )}
              </YStack>
              <YStack width={150} gap="1">
                <Input
                  value={form.zip}
                  onChangeText={(value) => setField('zip', value)}
                  placeholder="ZIP"
                  aria-label="ZIP code"
                  keyboardType="number-pad"
                  {...fieldProps('zip')}
                />
                {errors.zip && (
                  <Text id="checkout-zip-error" fontSize="2" color="red-600">
                    {errors.zip}
                  </Text>
                )}
              </YStack>
            </XStack>
          </YStack>
        ) : step === 1 ? (
          <YStack gap="2" role="radiogroup" aria-label="Shipping method">
            {shippingMethods.map((method) => {
              const selected = form.shipping === method.id
              return (
                <Button
                  key={method.id}
                  role="radio"
                  aria-checked={selected}
                  justify="space-between"
                  minH={52}
                  bg={`${selected ? 'color3' : 'background'}`}
                  borderWidth={1}
                  borderColor={`${selected ? 'accent-color' : 'border-color'}`}
                  onPress={() => setField('shipping', method.id)}
                >
                  <Text fontWeight="600">
                    {method.label} ·{' '}
                    {method.priceCents === 0 ? 'Free' : money(method.priceCents)}
                  </Text>
                  <Text color="color8" fontSize="2">
                    {method.eta}
                  </Text>
                </Button>
              )
            })}
          </YStack>
        ) : (
          <YStack gap="3">
            {/* card data never touches these components: a provider-hosted
                secure element supplies a token. this block stands in for
                that SDK element with a test card. */}
            <YStack
              p="4"
              gap="2"
              rounded="6"
              borderWidth={1}
              borderColor="color6"
              bg="color2"
            >
              <XStack items="center" gap="2">
                <ShieldCheck size={16} color="green-600" aria-hidden />
                <Text fontSize="2" color="color9">
                  Secure payment element (provider SDK)
                </Text>
              </XStack>
              <Text fontFamily="mono" fontSize="4" color="color11">
                Visa test card · •••• 4242 · 04/28
              </Text>
            </YStack>
            <Text fontSize="2" color="color8">
              Cards are tokenized by the payment provider — this demo never handles raw
              card numbers.
            </Text>
          </YStack>
        )}
      </YStack>
      <XStack justify="space-between">
        {step === 0 ? (
          <View />
        ) : (
          <Button disabled={placing} onPress={() => setStep(step - 1)}>
            Back
          </Button>
        )}
        <Button
          bg="color11"
          color="color1"
          disabled={placing}
          icon={placing ? <Spinner size="small" /> : undefined}
          onPress={step === 2 ? placeOrder : next}
        >
          {step === 2 ? (placing ? 'Placing order…' : 'Place order') : 'Continue'}
        </Button>
      </XStack>
    </YStack>
  )
}

CheckoutSteps.fileName = 'CheckoutSteps'
