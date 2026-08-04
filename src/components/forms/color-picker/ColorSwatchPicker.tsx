import { Check } from '@tamagui/lucide-icons-2'
import { useState } from 'react'
import { Button, Input, Text, View, XStack, YStack } from 'tamagui'

// pick a readable check color from the swatch's own luminance
const inkFor = (hexColor: string) => {
  const n = Number.parseInt(hexColor.slice(1), 16)
  const luminance =
    0.299 * ((n >> 16) & 255) + 0.587 * ((n >> 8) & 255) + 0.114 * (n & 255)
  return luminance > 150 ? '#111827' : '#ffffff'
}

const presets = [
  '#FF5757',
  '#FF9F43',
  '#FFD93D',
  '#58CC75',
  '#2EC4B6',
  '#3A86FF',
  '#6C5CE7',
  '#A855F7',
  '#EC4899',
  '#8B5E3C',
  '#6B7280',
  '#111827',
]

export function ColorSwatchPicker() {
  const [color, setColor] = useState('#3A86FF')
  const [hex, setHex] = useState('#3A86FF')
  const validHex = /^#[0-9A-F]{6}$/i.test(hex)
  const updateHex = (value: string) => {
    const next = value.startsWith('#') ? value : `#${value}`
    setHex(next.toUpperCase().slice(0, 7))
    if (/^#[0-9A-F]{6}$/i.test(next)) setColor(next.toUpperCase())
  }
  return (
    <YStack
      width="100%"
      maxW={460}
      self="center"
      gap="5"
      p="5"
      rounded="8"
      borderWidth={1}
      borderColor="border-color"
      bg="background"
    >
      <XStack items="center" gap="4">
        <View
          width={72}
          height={72}
          rounded="6"
          borderWidth={1}
          borderColor="border-color"
          style={{ backgroundColor: color }}
        />
        <YStack flex={1} gap="1">
          <Text fontSize="6" fontWeight="800" letterSpacing={0}>
            Brand accent
          </Text>
          <Text color="color8" fontFamily="mono">
            {color}
          </Text>
        </YStack>
      </XStack>
      <XStack flexWrap="wrap" gap="3">
        {presets.map((preset) => {
          const selected = color === preset
          return (
            <Button
              key={preset}
              width={48}
              height={48}
              rounded="5"
              borderWidth={selected ? 3 : 1}
              borderColor={`${selected ? 'color11' : 'border-color'}`}
              p={0}
              color={inkFor(preset)}
              icon={selected ? Check : undefined}
              aria-label={`Select color ${preset}`}
              aria-pressed={selected}
              style={{ backgroundColor: preset }}
              onPress={() => {
                setColor(preset)
                setHex(preset)
              }}
            />
          )
        })}
      </XStack>
      <YStack gap="2">
        <Text fontWeight="700" letterSpacing={0}>
          Custom hex
        </Text>
        <Input
          value={hex}
          onChangeText={updateHex}
          maxLength={7}
          autoCapitalize="characters"
          aria-label="Custom hex color"
          aria-invalid={!validHex}
          aria-describedby={validHex ? undefined : 'color-hex-error'}
          borderColor={`${validHex ? 'border-color' : 'red-500'}`}
        />
        {!validHex ? (
          <Text id="color-hex-error" aria-live="polite" fontSize="2" color="red-600">
            Use a six-digit hex value, like #3A86FF.
          </Text>
        ) : null}
      </YStack>
    </YStack>
  )
}

ColorSwatchPicker.fileName = 'ColorSwatchPicker'
