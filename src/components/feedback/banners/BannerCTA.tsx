import { ArrowRight, Sparkles } from '@tamagui/lucide-icons-2'
import { Button, H3, Paragraph, View, XStack, YStack } from 'tamagui'

export function BannerCTA() {
  return (
    <XStack
      render="section"
      aria-label="Upgrade call to action"
      theme="purple"
      width="100%"
      maxW={900}
      self="center"
      gap="$5"
      items="center"
      justify="space-between"
      p="$5"
      rounded="$8"
      borderWidth={1}
      borderColor="$color7"
      bg="$color3"
      flexWrap="wrap"
    >
      <XStack gap="$4" items="center" flex={1} minW={250}>
        <View p="$3" rounded={1000} bg="$color5">
          <Sparkles size={24} color="$color11" />
        </View>
        <YStack flex={1} gap="$1">
          <H3 color="$color12">Unlock advanced team insights</H3>
          <Paragraph color="$color10">
            Compare trends, export reports, and automate weekly summaries.
          </Paragraph>
        </YStack>
      </XStack>
      <Button
        theme="purple"
        iconAfter={ArrowRight}
        aria-label="Explore analytics upgrade"
      >
        Explore analytics
      </Button>
    </XStack>
  )
}

BannerCTA.fileName = 'BannerCTA'
