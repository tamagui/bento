import { Check, Sparkles } from '@tamagui/lucide-icons-2'
import { useState } from 'react'
import { Button, Text, View, XStack, YStack } from 'tamagui'

const steps = [
  {
    title: 'Start with your inbox',
    body: 'Everything that needs attention appears here first.',
    targetTop: 42,
    cardTop: 108,
  },
  {
    title: 'Organize with projects',
    body: 'Group work into focused spaces your whole team can follow.',
    targetTop: 178,
    cardTop: 244,
  },
  {
    title: 'Invite your team',
    body: 'Bring collaborators in when your workspace is ready.',
    targetTop: 316,
    cardTop: 210,
  },
] as const

export function FeatureTour() {
  const [step, setStep] = useState(0)
  const [finished, setFinished] = useState(false)
  const current = steps[step]
  return (
    <View
      width="100%"
      maxW={760}
      height={480}
      self="center"
      position="relative"
      overflow="hidden"
      rounded="$9"
      borderWidth={1}
      borderColor="$borderColor"
      bg="$color2"
    >
      <XStack height="100%">
        <YStack width={150} p="$3" gap="$2" bg="$background">
          <View width={88} height={18} rounded="$3" bg="$color5" mb="$3" />
          {[0, 1, 2, 3, 4].map((item) => (
            <View
              key={item}
              width={item === step ? 116 : 92}
              height={34}
              rounded="$4"
              bg={item === step ? '$color4' : 'transparent'}
            />
          ))}
        </YStack>
        <YStack flex={1} p="$5" gap="$4">
          <View width="48%" height={24} rounded="$3" bg="$color5" />
          <XStack gap="$3">
            <View flex={1} height={104} rounded="$6" bg="$background" />
            <View flex={1} height={104} rounded="$6" bg="$background" />
          </XStack>
          <View height={180} rounded="$6" bg="$background" />
        </YStack>
      </XStack>
      {!finished ? (
        <>
          <View
            position="absolute"
            l={18}
            t={current.targetTop}
            width={114}
            height={38}
            rounded="$5"
            borderWidth={3}
            borderColor="$accentColor"
            shadowColor="$accentColor"
            shadowOpacity={0.45}
            shadowRadius={14}
          />
          <YStack
            position="absolute"
            r={18}
            t={current.cardTop}
            width={310}
            maxW="86%"
            gap="$4"
            p="$5"
            rounded="$8"
            bg="$color12"
            shadowColor="$shadowColor"
            shadowOpacity={0.3}
            shadowRadius={24}
          >
            <XStack justify="space-between" items="center">
              <XStack items="center" gap="$2">
                <Sparkles size={18} color="$color1" />
                <Text color="$color1" fontWeight="800">
                  Quick tour
                </Text>
              </XStack>
              <Button
                chromeless
                size="$2.5"
                color="$color1"
                onPress={() => setFinished(true)}
              >
                Skip
              </Button>
            </XStack>
            <YStack gap="$2">
              <Text color="$color1" fontSize="$7" fontWeight="900" letterSpacing={0}>
                {current.title}
              </Text>
              <Text color="$color5" lineHeight="$5" letterSpacing={0}>
                {current.body}
              </Text>
            </YStack>
            <XStack justify="space-between" items="center">
              <XStack gap="$1.5">
                {steps.map((item, index) => (
                  <View
                    key={item.title}
                    width={index === step ? 18 : 7}
                    height={7}
                    rounded={999}
                    bg={index === step ? '$color1' : '$color7'}
                  />
                ))}
              </XStack>
              <Button
                bg="$color1"
                color="$color12"
                onPress={() =>
                  step === steps.length - 1 ? setFinished(true) : setStep(step + 1)
                }
              >
                {step === steps.length - 1 ? 'Finish' : 'Next'}
              </Button>
            </XStack>
          </YStack>
        </>
      ) : (
        <YStack
          position="absolute"
          inset={0}
          items="center"
          justify="center"
          gap="$3"
          bg="$background"
        >
          <View
            width={56}
            height={56}
            rounded={999}
            bg="$green4"
            items="center"
            justify="center"
          >
            <Check size={28} color="$green11" />
          </View>
          <Text fontSize="$8" fontWeight="900" letterSpacing={0}>
            Tour complete
          </Text>
          <Button
            onPress={() => {
              setStep(0)
              setFinished(false)
            }}
          >
            Restart tour
          </Button>
        </YStack>
      )}
    </View>
  )
}

FeatureTour.fileName = 'FeatureTour'
