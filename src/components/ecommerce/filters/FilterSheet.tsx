import { SlidersHorizontal, X } from '@tamagui/lucide-icons-2'
import { useState } from 'react'
import { Button, Separator, Sheet, Text, XStack, YStack } from 'tamagui'
import {
  FacetControls,
  activeFilterCount,
  defaultFilters,
  emptyFilters,
  matchingProducts,
  type FilterState,
} from './common/FacetControls'

/** mobile pattern: edits stage in a draft; Apply commits, dismiss reverts */
export function FilterSheet() {
  const [open, setOpen] = useState(false)
  const [applied, setApplied] = useState(defaultFilters)
  const [draft, setDraft] = useState<FilterState>(defaultFilters)

  const results = matchingProducts(applied)
  const draftResults = matchingProducts(draft)

  const openSheet = () => {
    setDraft(applied)
    setOpen(true)
  }

  const apply = () => {
    setApplied(draft)
    setOpen(false)
  }

  return (
    <YStack width="100%" maxW={480} self="center" gap="$3">
      <Button
        icon={SlidersHorizontal}
        onPress={openSheet}
        aria-label={`Open filters, ${activeFilterCount(applied)} active`}
      >
        Filters · {activeFilterCount(applied)}
      </Button>

      <YStack gap="$1.5" aria-live="polite">
        <Text color="$color9" fontSize="$2">
          {results.length} result{results.length === 1 ? '' : 's'}
        </Text>
        {results.slice(0, 3).map((product) => (
          <XStack
            key={product.name}
            justify="space-between"
            items="center"
            px="$3"
            py="$2"
            rounded="$4"
            bg="$color2"
          >
            <Text color="$color11" fontSize="$3">
              {product.name}
            </Text>
            <Text color="$color9" fontSize="$2">
              ${product.price}
            </Text>
          </XStack>
        ))}
      </YStack>

      <Sheet
        modal
        open={open}
        onOpenChange={setOpen}
        dismissOnSnapToBottom
        snapPointsMode="fit"
      >
        <Sheet.Overlay
          bg="$shadow6"
          enterStyle={{ opacity: 0 }}
          exitStyle={{ opacity: 0 }}
          transition="100ms"
        />
        <Sheet.Handle />
        <Sheet.Frame p={0} rounded="$9">
          <XStack px="$5" py="$4" justify="space-between" items="center">
            <Text fontSize="$7" fontWeight="900" letterSpacing={0}>
              Filters
            </Text>
            <Button
              circular
              chromeless
              size="$3"
              icon={X}
              aria-label="Close filters without applying"
              onPress={() => setOpen(false)}
            />
          </XStack>
          <Separator />
          <Sheet.ScrollView p="$5" maxH={480}>
            <FacetControls value={draft} onChange={setDraft} />
          </Sheet.ScrollView>
          <Separator />
          <XStack p="$4" gap="$3">
            <Button flex={1} onPress={() => setDraft(emptyFilters)}>
              Clear all
            </Button>
            <Button flex={2} bg="$color12" color="$color1" onPress={apply}>
              Apply · {draftResults.length} result{draftResults.length === 1 ? '' : 's'}
            </Button>
          </XStack>
        </Sheet.Frame>
      </Sheet>
    </YStack>
  )
}

FilterSheet.fileName = 'FilterSheet'
