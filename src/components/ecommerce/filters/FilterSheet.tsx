import { SlidersHorizontal, X } from '@tamagui/lucide-icons-2'
import { useState } from 'react'
import { Button, Separator, Text, XStack, YStack } from 'tamagui'
import { FacetControls } from './common/FacetControls'

export function FilterSheet() {
  const [open, setOpen] = useState(false)
  const [resetKey, setResetKey] = useState(0)
  const [cleared, setCleared] = useState(false)
  return (
    <YStack width="100%" maxW={480} self="center" gap="$3">
      <Button
        icon={SlidersHorizontal}
        onPress={() => setOpen(true)}
        aria-label="Open filters"
      >
        Filters · 3
      </Button>
      {open ? (
        <YStack
          overflow="hidden"
          rounded="$9"
          borderWidth={1}
          borderColor="$borderColor"
          bg="$background"
          shadowColor="$shadowColor"
          shadowOpacity={0.18}
          shadowRadius={18}
        >
          <XStack px="$5" py="$4" justify="space-between" items="center">
            <Text fontSize="$7" fontWeight="900" letterSpacing={0}>
              Filters
            </Text>
            <Button
              circular
              chromeless
              size="$3"
              icon={X}
              aria-label="Close filters"
              onPress={() => setOpen(false)}
            />
          </XStack>
          <Separator />
          <YStack p="$5" maxH={520} overflow="scroll">
            <FacetControls key={resetKey} initialSelected={cleared ? [] : undefined} />
          </YStack>
          <Separator />
          <XStack p="$4" gap="$3">
            <Button
              flex={1}
              onPress={() => {
                setCleared(true)
                setResetKey((current) => current + 1)
              }}
            >
              Clear all
            </Button>
            <Button flex={2} bg="$color12" color="$color1" onPress={() => setOpen(false)}>
              Apply · 124 results
            </Button>
          </XStack>
        </YStack>
      ) : null}
    </YStack>
  )
}

FilterSheet.fileName = 'FilterSheet'
