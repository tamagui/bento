import { Check } from '@tamagui/lucide-icons-2'
import { Checkbox, Slider, Text, XStack, YStack, isWeb } from 'tamagui'

export type FilterState = {
  collections: string[]
  min: number
  max: number
}

export const PRICE_MIN = 0
export const PRICE_MAX = 200

export const defaultFilters: FilterState = {
  collections: ['New arrivals', 'Best sellers'],
  min: 20,
  max: 180,
}

export const emptyFilters: FilterState = {
  collections: [],
  min: PRICE_MIN,
  max: PRICE_MAX,
}

export const facetNames = [
  'New arrivals',
  'Best sellers',
  'On sale',
  'Limited edition',
]

// every count and result in the group derives from this catalog
export const products = [
  { name: 'Alta desk lamp', price: 89, tags: ['New arrivals', 'Best sellers'] },
  { name: 'Bergen throw', price: 45, tags: ['New arrivals', 'On sale'] },
  { name: 'Cedar bookshelf', price: 189, tags: ['Best sellers'] },
  { name: 'Drift lounge chair', price: 159, tags: ['Best sellers', 'Limited edition'] },
  { name: 'Ember candle set', price: 24, tags: ['On sale'] },
  { name: 'Fjord side table', price: 120, tags: ['New arrivals'] },
  { name: 'Grove planter', price: 32, tags: ['New arrivals', 'On sale'] },
  { name: 'Haze pendant light', price: 140, tags: ['Limited edition'] },
  { name: 'Isle area rug', price: 175, tags: ['Best sellers'] },
  { name: 'Juniper mirror', price: 95, tags: ['New arrivals', 'Best sellers'] },
  { name: 'Kelp wall art', price: 60, tags: ['On sale', 'Limited edition'] },
  { name: 'Loft floor lamp', price: 130, tags: ['Best sellers'] },
  { name: 'Mesa serving tray', price: 28, tags: ['New arrivals'] },
  { name: 'North duvet set', price: 110, tags: ['Best sellers', 'On sale'] },
  { name: 'Opal vase', price: 42, tags: ['New arrivals', 'Limited edition'] },
  { name: 'Pine coat rack', price: 76, tags: ['On sale'] },
]

export const matchingProducts = (filters: FilterState) =>
  products.filter(
    (product) =>
      (filters.collections.length === 0 ||
        filters.collections.some((c) => product.tags.includes(c))) &&
      product.price >= filters.min &&
      product.price <= filters.max
  )

export const activeFilterCount = (filters: FilterState) =>
  filters.collections.length +
  (filters.min !== PRICE_MIN || filters.max !== PRICE_MAX ? 1 : 0)

const formatPrice = (value: number) =>
  new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0,
  }).format(value)

export function FacetControls({
  value,
  onChange,
}: {
  value: FilterState
  onChange: (next: FilterState) => void
}) {
  const toggle = (facet: string) =>
    onChange({
      ...value,
      collections: value.collections.includes(facet)
        ? value.collections.filter((label) => label !== facet)
        : [...value.collections, facet],
    })

  return (
    <YStack gap="$6">
      <YStack gap="$1" role="group" aria-label="Collection">
        <Text fontSize="$5" fontWeight="800" letterSpacing={0} mb="$2">
          Collection
        </Text>
        {facetNames.map((facet) => {
          const checked = value.collections.includes(facet)
          // count within the current price window so numbers stay truthful
          const count = products.filter(
            (p) =>
              p.tags.includes(facet) && p.price >= value.min && p.price <= value.max
          ).length
          return (
            // the whole row is the press target
            <XStack
              key={facet}
              items="center"
              gap="$3"
              minH={44}
              cursor="pointer"
              rounded="$3"
              px="$1"
              onPress={() => toggle(facet)}
              hoverStyle={{ bg: '$color2' }}
              pressStyle={{ bg: '$color3' }}
            >
              <Checkbox
                checked={checked}
                onCheckedChange={() => toggle(facet)}
                aria-label={`${facet}, ${count} products`}
                onPress={(event: any) => event.stopPropagation?.()}
              >
                <Checkbox.Indicator>
                  <Check size={14} />
                </Checkbox.Indicator>
              </Checkbox>
              <Text flex={1} color="$color11" letterSpacing={0}>
                {facet}
              </Text>
              <Text fontSize="$2" color="$color8">
                {count}
              </Text>
            </XStack>
          )
        })}
      </YStack>
      <YStack gap="$4" role="group" aria-label="Price range">
        <XStack justify="space-between" items="center">
          <Text fontSize="$5" fontWeight="800" letterSpacing={0}>
            Price range
          </Text>
          <Text fontSize="$3" color="$color9" letterSpacing={0} aria-live="polite">
            {formatPrice(value.min)} – {formatPrice(value.max)}
          </Text>
        </XStack>
        {/* one range control: the fill spans only the selected interval */}
        <Slider
          value={[value.min, value.max]}
          onValueChange={([min, max]) =>
            onChange({ ...value, min: Math.min(min, max - 10), max: Math.max(max, min + 10) })
          }
          min={PRICE_MIN}
          max={PRICE_MAX}
          step={10}
          minStepsBetweenThumbs={1}
        >
          <Slider.Track height={6} bg="$color4">
            <Slider.TrackActive bg="$accentColor" />
          </Slider.Track>
          <Slider.Thumb
            aria-label="Minimum price"
            aria-valuetext={formatPrice(value.min)}
            index={0}
            rounded={999}
            size="$2"
            bg="$color12"
            hitSlop={isWeb ? undefined : 12}
          />
          <Slider.Thumb
            aria-label="Maximum price"
            aria-valuetext={formatPrice(value.max)}
            index={1}
            rounded={999}
            size="$2"
            bg="$color12"
            hitSlop={isWeb ? undefined : 12}
          />
        </Slider>
      </YStack>
    </YStack>
  )
}
