import { RotateCcw } from '@tamagui/lucide-icons-2'
import { useState } from 'react'
import { Button, Separator, Text, XStack, YStack } from 'tamagui'
import { FacetControls } from './common/FacetControls'

export function FilterSidebar() {
  const [resetKey, setResetKey] = useState(0)
  const [cleared, setCleared] = useState(false)
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
        <Button
          chromeless
          size="$3"
          icon={RotateCcw}
          aria-label="Clear all filters"
          onPress={() => {
            setCleared(true)
            setResetKey((current) => current + 1)
          }}
        >
          Clear all
        </Button>
      </XStack>
      <Separator />
      <FacetControls key={resetKey} initialSelected={cleared ? [] : undefined} />
      <Button bg="$color12" color="$color1">
        Show 124 results
      </Button>
    </YStack>
  )
}

FilterSidebar.fileName = 'FilterSidebar'
