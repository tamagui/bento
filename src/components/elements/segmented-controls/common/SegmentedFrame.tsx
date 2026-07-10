import type { ReactNode } from 'react'
import { Text, ToggleGroup, View } from 'tamagui'

export type SegmentOption = { icon?: ReactNode; label: string; value: string }

export function SegmentedFrame({
  options,
  size = 'md',
  value,
  onValueChange,
}: {
  onValueChange: (value: string) => void
  options: SegmentOption[]
  size?: 'sm' | 'md' | 'lg'
  value: string
}) {
  const index = Math.max(
    0,
    options.findIndex((option) => option.value === value)
  )
  const heights = { sm: 34, md: 42, lg: 50 }
  const textSizes = { sm: '$2', md: '$3', lg: '$4' } as const

  return (
    <ToggleGroup
      type="single"
      orientation="horizontal"
      flexDirection="row"
      disableDeactivation
      value={value}
      onValueChange={onValueChange}
      width="100%"
      height={heights[size]}
      p="$1"
      rounded="$6"
      bg="$color3"
      position="relative"
      overflow="hidden"
    >
      <View
        pointerEvents="none"
        position="absolute"
        t="$1"
        b="$1"
        width={`${100 / options.length}%`}
        l={`${(index * 100) / options.length}%`}
        rounded="$5"
        bg="$background"
        borderWidth={1}
        borderColor="$borderColor"
        style={{
          transition: 'left 250ms cubic-bezier(0.32, 0.72, 0, 1)',
        }}
      />
      {options.map((option) => (
        <ToggleGroup.Item
          unstyled
          key={option.value}
          value={option.value}
          flex={1}
          height="100%"
          z={1}
          flexDirection="row"
          gap="$2"
          items="center"
          justify="center"
          rounded="$5"
          focusVisibleStyle={{
            outlineWidth: 2,
            outlineColor: '$color8',
            outlineOffset: -2,
          }}
        >
          {option.icon}
          <Text
            fontSize={textSizes[size]}
            fontWeight="600"
            color={value === option.value ? '$color' : '$color10'}
          >
            {option.label}
          </Text>
        </ToggleGroup.Item>
      ))}
    </ToggleGroup>
  )
}
