import { useState } from 'react'
import { Checkbox, Slider, Text, XStack, YStack } from 'tamagui'
import { Check } from '@tamagui/lucide-icons-2'

const facets = [
  { label: 'New arrivals', count: 42 },
  { label: 'Best sellers', count: 28 },
  { label: 'On sale', count: 16 },
  { label: 'Limited edition', count: 9 },
]

export function FacetControls({
  initialSelected = ['New arrivals', 'Best sellers'],
}: {
  initialSelected?: string[]
}) {
  const [selected, setSelected] = useState(initialSelected)
  const [minimum, setMinimum] = useState(20)
  const [maximum, setMaximum] = useState(180)
  return (
    <YStack gap="$6">
      <YStack gap="$3">
        <Text fontSize="$5" fontWeight="800" letterSpacing={0}>
          Collection
        </Text>
        {facets.map((facet) => {
          const checked = selected.includes(facet.label)
          return (
            <XStack key={facet.label} items="center" gap="$3">
              <Checkbox
                id={`facet-${facet.label}`}
                checked={checked}
                onCheckedChange={(next) =>
                  setSelected((current) =>
                    next
                      ? [...current, facet.label]
                      : current.filter((label) => label !== facet.label)
                  )
                }
                aria-label={facet.label}
              >
                <Checkbox.Indicator>
                  <Check size={14} />
                </Checkbox.Indicator>
              </Checkbox>
              <Text flex={1} color="$color11" letterSpacing={0}>
                {facet.label}
              </Text>
              <Text fontSize="$2" color="$color8">
                {facet.count}
              </Text>
            </XStack>
          )
        })}
      </YStack>
      <YStack gap="$4">
        <XStack justify="space-between" items="center">
          <Text fontSize="$5" fontWeight="800" letterSpacing={0}>
            Price range
          </Text>
          <Text fontSize="$3" color="$color9" letterSpacing={0}>
            ${minimum} – ${maximum}
          </Text>
        </XStack>
        <YStack gap="$3">
          <Text fontSize="$2" color="$color9">
            Minimum
          </Text>
          <Slider
            value={[minimum]}
            onValueChange={([value]) => setMinimum(Math.min(value, maximum - 10))}
            min={0}
            max={200}
            step={10}
            aria-label="Minimum price"
          >
            <Slider.Track height={5} bg="$color4">
              <Slider.TrackActive bg="$accentColor" />
            </Slider.Track>
            <Slider.Thumb index={0} rounded={999} size="$1.5" bg="$color12" />
          </Slider>
          <Text fontSize="$2" color="$color9">
            Maximum
          </Text>
          <Slider
            value={[maximum]}
            onValueChange={([value]) => setMaximum(Math.max(value, minimum + 10))}
            min={0}
            max={200}
            step={10}
            aria-label="Maximum price"
          >
            <Slider.Track height={5} bg="$color4">
              <Slider.TrackActive bg="$accentColor" />
            </Slider.Track>
            <Slider.Thumb index={0} rounded={999} size="$1.5" bg="$color12" />
          </Slider>
        </YStack>
      </YStack>
    </YStack>
  )
}
