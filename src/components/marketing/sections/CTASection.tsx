import { ArrowRight } from '@tamagui/lucide-icons-2'
import { Button, H2, Text, XStack, YStack, isWeb } from 'tamagui'
import { openUrl } from './common/openUrl'

/** ------ EXAMPLE ------ */
export function CTASection() {
  return (
    <YStack
      render={isWeb ? 'section' : undefined}
      aria-label="Call to action"
      width="100%"
      maxW={880}
      rounded="8"
      overflow="hidden"
      bg="color11"
      p="8 @sm/window:5"
      gap="4"
      items="center"
    >
      <H2 size="9" color="color1" text="center">
        Ready to build faster?
      </H2>
      <Text fontSize="4" color="color5" text="center" maxW={460}>
        Ship universal apps from a single codebase, on every platform.
      </Text>
      <XStack gap="3" pt="2" flexWrap="wrap" justify="center">
        <Button
          size="4"
          bg="color1"
          opacity="hover:0.9"
          scale="press:0.98"
          iconAfter={<ArrowRight size={16} color="color11" />}
          onPress={() => openUrl('https://tamagui.dev/bento')}
        >
          <Text color="color11" fontWeight="600">
            Get started free
          </Text>
        </Button>
        <Button
          size="4"
          variant="quiet"
          borderWidth={1}
          borderColor="color9"
          onPress={() => openUrl('mailto:support@tamagui.dev')}
        >
          <Text color="color3">Talk to sales</Text>
        </Button>
      </XStack>
    </YStack>
  )
}

CTASection.fileName = 'CTASection'
