import { ArrowRight, Play } from '@tamagui/lucide-icons-2'
import { Button, H1, Text, View, XStack, YStack } from 'tamagui'

/** ------ EXAMPLE ------ */
export function HeroCentered() {
  return (
    <YStack items="center" gap="$5" py="$10" px="$4" width="100%" maxW={780}>
      <XStack
        items="center"
        gap="$2"
        bg="$color3"
        borderWidth={1}
        borderColor="$color5"
        rounded="$10"
        px="$3"
        py="$1.5"
      >
        <View width={7} height={7} rounded={1000} bg="$green9" />
        <Text fontSize="$2" color="$color11">
          v2 is here — one codebase, every platform
        </Text>
      </XStack>

      <H1
        size="$12"
        $group-window-sm={{ size: '$10' }}
        text="center"
        maxW={640}
        color="$color12"
      >
        Ship beautiful apps twice as fast
      </H1>

      <Text
        fontSize="$5"
        lineHeight="$6"
        color="$color10"
        text="center"
        maxW={520}
      >
        A universal component library with an optimizing compiler. Write once,
        render native everywhere, and keep every pixel on brand.
      </Text>

      <XStack gap="$3" pt="$2" flexWrap="wrap" justify="center">
        <Button
          size="$4"
          bg="$color12"
          hoverStyle={{ opacity: 0.9 }}
          pressStyle={{ scale: 0.98 }}
          iconAfter={<ArrowRight size={16} color="$color1" />}
        >
          <Text color="$color1" fontWeight="600">
            Start building
          </Text>
        </Button>
        <Button
          size="$4"
          chromeless
          borderWidth={1}
          borderColor="$color6"
          hoverStyle={{ bg: '$color3' }}
          icon={<Play size={14} />}
        >
          <Text color="$color11">Watch demo</Text>
        </Button>
      </XStack>

      <Text fontSize="$2" color="$color9" pt="$2">
        Free for open source · No credit card required
      </Text>
    </YStack>
  )
}

HeroCentered.fileName = 'HeroCentered'
