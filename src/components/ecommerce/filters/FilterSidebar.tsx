import { RotateCcw } from '@tamagui/lucide-icons-2'
import { useState } from 'react'
import { Button, Separator, Text, XStack, YStack } from 'tamagui'
import {
  FacetControls,
  defaultFilters,
  emptyFilters,
  matchingProducts,
} from './common/FacetControls'

/** desktop sidebar applies immediately: the result list is always live */
export function FilterSidebar() {
  const [filters, setFilters] = useState(defaultFilters)
  const results = matchingProducts(filters)

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
          <Text fontSize="$2" color="$color9" aria-live="polite">
            {results.length} result{results.length === 1 ? '' : 's'}
          </Text>
        </YStack>
        <Button
          chromeless
          size="$3"
          icon={RotateCcw}
          aria-label="Clear all filters"
          onPress={() => setFilters(emptyFilters)}
        >
          Clear all
        </Button>
      </XStack>
      <Separator />
      <FacetControls value={filters} onChange={setFilters} />
      <Separator />
      <YStack gap="$1.5" aria-label="Matching products">
        {results.slice(0, 4).map((product) => (
          <XStack key={product.name} justify="space-between" items="center" minH={28}>
            <Text color="$color11" fontSize="$3" numberOfLines={1}>
              {product.name}
            </Text>
            <Text color="$color9" fontSize="$2">
              ${product.price}
            </Text>
          </XStack>
        ))}
        {results.length > 4 && (
          <Text color="$color9" fontSize="$2">
            +{results.length - 4} more
          </Text>
        )}
        {results.length === 0 && (
          <Text color="$color9" fontSize="$3">
            No products match these filters.
          </Text>
        )}
      </YStack>
    </YStack>
  )
}

FilterSidebar.fileName = 'FilterSidebar'
