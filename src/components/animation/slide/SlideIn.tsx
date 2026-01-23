import { useState } from 'react'
import { Image, Text, View, XStack } from 'tamagui'
import { DirectionSlide } from './DirectionSlide'

const axises = {
  left: {
    axis: 'x',
    value: -100,
  },
  right: {
    axis: 'x',
    value: 100,
  },
  top: {
    axis: 'y',
    value: -100,
  },
  bottom: { axis: 'y', value: 100 },
}

function SlideIn({
  direction,
}: {
  direction: 'left' | 'right' | 'top' | 'bottom'
}) {
  const axis = axises[direction]

  return (
    <View
      gap="$2"
      render="article"
      role="banner"
      shadowColor="$shadowColor"
      shadowOffset={{
        width: 0,
        height: -6,
      }}
      shadowRadius={'$5'}
      shadowOpacity={0.1}
      transition={{
        opacity: {
          type: 'bouncy',
          overshootClamping: true,
        },
      }}
      rounded="$8"
      overflow="hidden"
      enterStyle={{ opacity: 0, [axis.axis]: axis.value }}
      borderWidth={2}
      borderColor="$color4"
    >
      <View width={312} gap="$6">
        <View p="$3.5" position="relative">
          <XStack items="center" justify="space-between">
            <Text fontWeight="500" fontSize="$3" fontFamily="$mono" color="$color10">
              Tamagui Debit
            </Text>

            <Image src="/avatar_pro.png" width={32} height={32} />
          </XStack>

          <Text pt="$4" fontWeight="600" fontSize="$8" fontFamily="$mono" color="$color">
            ···· ···· ···· 0225
          </Text>
        </View>

        <XStack theme="accent" bg="$background" p="$3.5">
          <Text
            flex={1}
            fontWeight="500"
            fontSize="$2"
            fontFamily="$mono"
            color="$color11"
          >
            Nate Wienert
          </Text>
          <Text
            self="flex-end"
            fontWeight="500"
            fontSize="$2"
            fontFamily="$mono"
            color="$color12"
          >
            03/26
          </Text>
        </XStack>
      </View>
    </View>
  )
}

/** ------ EXAMPLE ------ */
export function SlideInDemo() {
  const [direction, setDirection] = useState<'left' | 'right' | 'top' | 'bottom'>('left')
  return (
    <View maxW="100%" gap="$6">
      <SlideIn key={direction} direction={direction} />
      <DirectionSlide direction={direction} setDirection={setDirection} />
    </View>
  )
}

SlideInDemo.fileName = 'SlideIn'
