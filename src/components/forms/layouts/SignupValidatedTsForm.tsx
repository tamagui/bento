import { zodResolver } from '@hookform/resolvers/zod'
import { Eye, EyeOff, Info } from '@tamagui/lucide-icons'
import { useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { SafeAreaView } from 'react-native-safe-area-context'
import { AnimatePresence, Button, Form, H1, H2, isWeb, RadioGroup, Spinner, View } from 'tamagui'
import { z } from 'zod'
import { Input, InputContext } from '../inputs/components/inputsParts'
import { FormCard } from './components/layoutParts'

type TextInputProps = {
  label: string
  labelId: string
  placeholder?: string
  value: string
  onChange: (text: string) => void
  onBlur: () => void
  error?: string
}

const TextInput = (props: TextInputProps) => {
  const { label, labelId, placeholder, value, onChange, onBlur, error } = props
  const { size } = InputContext.useStyledContext()
  return (
    <Input
      {...(error && {
        theme: 'red',
      })}
      onBlur={onBlur}
      size={size}
    >
      <Input.Label htmlFor={labelId}>{label}</Input.Label>
      <Input.Box>
        <Input.Area
          id={labelId}
          placeholder={placeholder}
          onChangeText={onChange}
          value={value}
        />
      </Input.Box>
      <AnimatePresence>
        {error && (
          <View
            b="$-5"
            l={0}
            position="absolute"
            gap="$2"
            flexDirection="row"
            animation="bouncy"
            scaleY={1}
            enterStyle={{
              opacity: 0,
              y: -10,
              scaleY: 0.5,
            }}
            exitStyle={{
              opacity: 0,
              y: -10,
              scaleY: 0.5,
            }}
          >
            <Input.Icon p={0}>
              <Info />
            </Input.Icon>
            <Input.Info>{error}</Input.Info>
          </View>
        )}
      </AnimatePresence>
    </Input>
  )
}

type PasswordInputProps = TextInputProps & {}
const PasswordInput = (props: PasswordInputProps) => {
  const { label, labelId, placeholder, value, onChange, onBlur, error } = props
  const [showPassword, setShowPassword] = useState(false)
  const { size } = InputContext.useStyledContext()
  return (
    <Input
      {...(error && {
        theme: 'red',
      })}
      onBlur={onBlur}
      size={size}
    >
      <Input.Label htmlFor={labelId}>{label}</Input.Label>
      <Input.Box>
        <Input.Area
          id={labelId}
          secureTextEntry={!showPassword}
          placeholder={placeholder}
          onChangeText={onChange}
          value={value}
        />
        <Input.Icon cursor="pointer" onPress={() => setShowPassword(!showPassword)}>
          {showPassword ? <Eye color='$color11' /> : <EyeOff color='$color11' />}
        </Input.Icon>
      </Input.Box>
      <AnimatePresence>
        {error && (
          <View
            b="$-5"
            l={0}
            position="absolute"
            gap="$2"
            flexDirection="row"
            animation="bouncy"
            scaleY={1}
            enterStyle={{
              opacity: 0,
              y: -10,
              scaleY: 0.5,
            }}
            exitStyle={{
              opacity: 0,
              y: -10,
              scaleY: 0.5,
            }}
          >
            <Input.Icon p={0}>
              <Info />
            </Input.Icon>
            <Input.Info>{error}</Input.Info>
          </View>
        )}
      </AnimatePresence>
    </Input>
  )
}

type MyRadioProps = {
  id: string
  title: string
  values: {
    value: string
    label: string
    labelId: string
  }[]
  value: string
  onChange: (value: string) => void
}
const MyRadio = (props: MyRadioProps) => {
  const { id, title, values, value, onChange } = props
  const { size } = InputContext.useStyledContext()
  return (
    <View gap="$2">
      <H2 size={size} fontFamily="$body">
        {title}
      </H2>
      <RadioGroup
        gap="$8"
        flexDirection="row"
        onValueChange={onChange}
        id={id}
        value={value}
      >
        {values.map(({ value, label, labelId }) => (
          <View key={label} flexDirection="row" items="center" gap="$3">
            <RadioGroup.Item id={labelId} value={value}>
              <RadioGroup.Indicator />
            </RadioGroup.Item>

            <Input.Label htmlFor={labelId}>{label}</Input.Label>
          </View>
        ))}
      </RadioGroup>
    </View>
  )
}

const twoInputSchema = z.object({
  firstInput: z.string().min(1, { message: 'This field is required' }),
  secondInput: z.string().min(1, { message: 'This field is required' }),
})

type TwoInputProps = {
  values: {
    firstInput: {
      label: string
      labelId: string
      placeholder: string
    }
    secondInput: {
      label: string
      labelId: string
      placeholder: string
    }
  }
  value?: { firstInput: string; secondInput: string }
  onChange: (value: { firstInput: string; secondInput: string }) => void
  onBlur: () => void
  error?: {
    firstInput?: { message?: string }
    secondInput?: { message?: string }
  }
}
const TwoInput = (props: TwoInputProps) => {
  const { values, value = { firstInput: '', secondInput: '' }, onChange, onBlur, error } = props

  const { size } = InputContext.useStyledContext()
  return (
    <View
      flexWrap="wrap"
      flexDirection="row"
      justify="space-between"
      columnGap="$4"
      rowGap="$5"
    >
      <Input
        {...(error?.firstInput && {
          theme: 'red',
        })}
        onBlur={onBlur}
        flex={1}
        minW="100%"
        $group-window-gtSm={{ flexBasis: 150, minW: 'inherit' }}
        animation="quickest"
        size={size}
      >
        <Input.Label htmlFor={values.firstInput.labelId}>
          {values.firstInput.label}
        </Input.Label>
        <Input.Box>
          <Input.Area
            id={values.firstInput.labelId}
            placeholder={values.firstInput.placeholder}
            onChangeText={(text) => {
              onChange({
                ...value,
                firstInput: text,
              })
            }}
            value={value?.firstInput}
          />
        </Input.Box>
        <AnimatePresence>
          {error?.firstInput && (
            <View
              b="$-5"
              l={0}
              position="absolute"
              gap="$2"
              flexDirection="row"
              animation="bouncy"
              scaleY={1}
              enterStyle={{
                opacity: 0,
                y: -10,
                scaleY: 0.5,
              }}
              exitStyle={{
                opacity: 0,
                y: -10,
                scaleY: 0.5,
              }}
            >
              <Input.Icon p={0}>
                <Info />
              </Input.Icon>
              <Input.Info>{error.firstInput.message}</Input.Info>
            </View>
          )}
        </AnimatePresence>
      </Input>
      <Input
        {...(error?.secondInput && {
          theme: 'red',
        })}
        onBlur={onBlur}
        flex={1}
        flexBasis={150}
        size={size}
      >
        <Input.Label htmlFor={values.secondInput.labelId}>
          {values.secondInput.label}
        </Input.Label>
        <Input.Box>
          <Input.Area
            id={values.secondInput.labelId}
            placeholder={values.secondInput.placeholder}
            onChangeText={(text) => {
              onChange({
                ...value,
                secondInput: text,
              })
            }}
            value={value?.secondInput}
          />
        </Input.Box>
        <AnimatePresence>
          {error?.secondInput && (
            <View
              b="$-5"
              l={0}
              position="absolute"
              gap="$2"
              flexDirection="row"
              animation="bouncy"
              scaleY={1}
              enterStyle={{
                opacity: 0,
                y: -10,
                scaleY: 0.5,
              }}
              exitStyle={{
                opacity: 0,
                y: -10,
                scaleY: 0.5,
              }}
            >
              <Input.Icon   p={0}>
                <Info />
              </Input.Icon>
              <Input.Info>{error.secondInput.message}</Input.Info>
            </View>
          )}
        </AnimatePresence>
      </Input>
    </View>
  )
}

const schema = z
  .object({
    fullName: twoInputSchema,
    email: z
      .string()
      .min(4, 'Email is required')
      .email({ message: 'Invalid email format' }),
    password: z.string().min(6, {
      message: 'must be at least 6 characters',
    }),
    confirmedPassword: z.string().min(6, {
      message: 'must be at least 6 characters',
    }),
    accountType: z.string(),
    postalCode: z.string().min(4, {
      message: 'Postal code is required',
    }),
  })
  .refine(
    (data) => {
      return data.password === data.confirmedPassword
    },
    {
      message: 'Passwords do not match',
      path: ['confirmedPassword'],
    }
  )

type FormValues = z.infer<typeof schema>

export function SignupValidatedTsForm() {
  const [loading, setLoading] = useState(false)

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      accountType: 'personal',
      confirmedPassword: '',
      password: '',
      email: '',
      fullName: { firstInput: '', secondInput: '' },
      postalCode: '',
    },
  })

  const onSubmit = (data: FormValues) => {
    console.info('data is ', data)
    setLoading(true)
    setTimeout(() => {
      setLoading(false)
    }, 2000)
  }

  return (
    <InputContext.Provider size="$4">
      <Form asChild onSubmit={handleSubmit(onSubmit)}>
        <FormCard
          flexDirection="column"
          gap="$5"
          tag="form"
          $group-window-sm={{
            px: '$4',
            py: '$6',
          }}
        >
          <H1
            self="center"
            size="$8"
            $group-window-xs={{
              size: '$7',
            }}
          >
            Create an account
          </H1>

          <Controller
            control={control}
            name="fullName"
            render={({ field, fieldState }) => (
              <TwoInput
                values={{
                  firstInput: {
                    label: 'First Name',
                    labelId: 'firstName-ts2',
                    placeholder: 'First name',
                  },
                  secondInput: {
                    label: 'Last Name',
                    labelId: 'lastName-ts2',
                    placeholder: 'Last name',
                  },
                }}
                value={field.value}
                onChange={field.onChange}
                onBlur={field.onBlur}
                error={fieldState.error as any}
              />
            )}
          />

          <Controller
            control={control}
            name="email"
            render={({ field, fieldState }) => (
              <TextInput
                label="Email"
                labelId="email-ts2"
                placeholder="Email"
                value={field.value}
                onChange={field.onChange}
                onBlur={field.onBlur}
                error={fieldState.error?.message}
              />
            )}
          />

          <Controller
            control={control}
            name="password"
            render={({ field, fieldState }) => (
              <PasswordInput
                label="Password"
                labelId="password-ts2"
                placeholder="Password"
                value={field.value}
                onChange={field.onChange}
                onBlur={field.onBlur}
                error={fieldState.error?.message}
              />
            )}
          />

          <Controller
            control={control}
            name="confirmedPassword"
            render={({ field, fieldState }) => (
              <PasswordInput
                label="Confirm Password"
                labelId="confirmPassword-ts2"
                placeholder="Confirm Password"
                value={field.value}
                onChange={field.onChange}
                onBlur={field.onBlur}
                error={fieldState.error?.message}
              />
            )}
          />

          <Controller
            control={control}
            name="postalCode"
            render={({ field, fieldState }) => (
              <TextInput
                label="Postal Code"
                labelId="postalCode-ts2"
                placeholder="Postal Code"
                value={field.value}
                onChange={field.onChange}
                onBlur={field.onBlur}
                error={fieldState.error?.message}
              />
            )}
          />

          <Controller
            control={control}
            name="accountType"
            render={({ field }) => (
              <MyRadio
                id="accountType-ts2"
                title="Account type"
                values={[
                  {
                    value: 'personal',
                    label: 'Personal',
                    labelId: 'personal-ts2',
                  },
                  {
                    value: 'business',
                    label: 'Business',
                    labelId: 'business-ts2',
                  },
                ]}
                value={field.value}
                onChange={field.onChange}
              />
            )}
          />

          <Button
            themeInverse
            disabled={loading}
            onPress={handleSubmit(onSubmit)}
            cursor={loading ? 'progress' : 'pointer'}
            self="flex-end"
            width={'100%'}
            my="$4"
            iconAfter={
              <AnimatePresence>
                {loading && (
                  <Spinner
                    size="small"
                    color="$color"
                    key="loading-spinner"
                    opacity={1}
                    position="absolute"
                    scale={0.5}
                    l={0}
                    x={100}
                    animation="quick"
                    enterStyle={{
                      opacity: 0,
                      scale: 0.5,
                    }}
                    exitStyle={{
                      opacity: 0,
                      scale: 0.5,
                    }}
                  />
                )}
              </AnimatePresence>
            }
          >
            <Button.Text animation="quick" x={loading ? -10 : 0}>
              Sign Up
            </Button.Text>
          </Button>
          {!isWeb && <SafeAreaView/>}
        </FormCard>
      </Form>
    </InputContext.Provider>
  )
}

SignupValidatedTsForm.fileName = 'SignupValidatedTsForm'
