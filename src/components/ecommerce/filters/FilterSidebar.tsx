import { RotateCcw } from '@tamagui/lucide-icons-2'
import { Button, Separator, Text, XStack, YStack } from 'tamagui'
import { FacetControls } from './common/FacetControls'

export function FilterSidebar() {
  return (
    <YStack
      width="100%"
      maxW={340}
      self="center"
      gap="$5"
      p="$5"
      rounded="$8"
      borderWidth={1}
      borderColor="$borderColor"
      bg="$background"
    >
      <XStack justify="space-between" items="center">
        <YStack gap="$1">
          <Text fontSize="$7" fontWeight="900" letterSpacing={0}>
            Filters
          </Text>
          <Text fontSize="$2" color="$color9">
            124 results
          </Text>
        </YStack>
        <Button chromeless size="$3" icon={RotateCcw} aria-label="Clear all filters">
          Clear all
        </Button>
      </XStack>
      <Separator />
      <FacetControls />
      <Button bg="$accentColor" color="white">
        Show 124 results
      </Button>
    </YStack>
  )
}

FilterSidebar.fileName = 'FilterSidebar'
