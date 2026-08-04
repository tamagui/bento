import { ArrowRight, Play } from '@tamagui/lucide-icons-2'
import { Button, H1, Text, View, XStack, YStack, isWeb } from 'tamagui'
import { openUrl } from './common/openUrl'
import { useGroupMedia } from '../../hooks/useGroupMedia'

/** ------ EXAMPLE ------ */
export function HeroCentered() {
  const { sm } = useGroupMedia('window')
  return (
    <YStack
      render={isWeb ? 'section' : undefined}
      aria-label="Hero"
      items="center"
      gap="5"
      py="10"
      px="4"
      width="100%"
      maxW={780}
    >
      <XStack
        items="center"
        gap="2"
        bg="color3"
        borderWidth={1}
        borderColor="color5"
        rounded="10"
        px="3"
        py="1"
      >
        <View width={7} height={7} rounded={1000} bg="green-500" />
        <Text fontSize="2" color="color10">
          v2 is here — one codebase, every platform
        </Text>
      </XStack>

      <H1 size={sm ? '10' : '12'} text="center" maxW={640} color="color11">
        Ship beautiful apps twice as fast
      </H1>

      <Text fontSize="5" lineHeight="6" color="color9" text="center" maxW={520}>
        A universal component library with an optimizing compiler. Write once, render
        native everywhere, and keep every pixel on brand.
      </Text>

      <XStack gap="3" pt="2" flexWrap="wrap" justify="center">
        <Button
          size="4"
          bg="color11"
          opacity="hover:0.9"
          scale="press:0.98"
          iconAfter={<ArrowRight size={16} color="color1" />}
          onPress={() => openUrl('https://tamagui.dev/docs/intro/introduction')}
        >
          <Text color="color1" fontWeight="600">
            Start building
          </Text>
        </Button>
        <Button
          size="4"
          variant="quiet"
          borderWidth={1}
          borderColor="color6"
          bg="hover:color3"
          icon={<Play size={14} />}
          onPress={() => openUrl('https://www.youtube.com/@tamagui_dev')}
        >
          <Text color="color10">Watch demo</Text>
        </Button>
      </XStack>

      <Text fontSize="2" color="color8" pt="2">
        Free for open source · No credit card required
      </Text>
    </YStack>
  )
}

HeroCentered.fileName = 'HeroCentered'
