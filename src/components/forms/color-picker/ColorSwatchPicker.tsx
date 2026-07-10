import { Check } from '@tamagui/lucide-icons-2'
import { useState } from 'react'
import { Button, Input, Text, View, XStack, YStack } from 'tamagui'

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
      gap="$5"
      p="$5"
      rounded="$8"
      borderWidth={1}
      borderColor="$borderColor"
      bg="$background"
    >
      <XStack items="center" gap="$4">
        <View
          width={72}
          height={72}
          rounded="$6"
          borderWidth={1}
          borderColor="$borderColor"
          style={{ backgroundColor: color }}
        />
        <YStack flex={1} gap="$1">
          <Text fontSize="$6" fontWeight="800" letterSpacing={0}>
            Brand accent
          </Text>
          <Text color="$color9" fontFamily="$mono">
            {color}
          </Text>
        </YStack>
      </XStack>
      <XStack flexWrap="wrap" gap="$3">
        {presets.map((preset) => {
          const selected = color === preset
          return (
            <Button
              key={preset}
              width={48}
              height={48}
              rounded="$5"
              borderWidth={selected ? 3 : 1}
              borderColor={selected ? '$color12' : '$borderColor'}
              p={0}
              icon={selected ? Check : undefined}
              color={preset === '#111827' ? 'white' : '#111827'}
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
      <YStack gap="$2">
        <Text fontWeight="700" letterSpacing={0}>
          Custom hex
        </Text>
        <Input
          value={hex}
          onChangeText={updateHex}
          maxLength={7}
          autoCapitalize="characters"
          aria-label="Custom hex color"
          borderColor={validHex ? '$borderColor' : '$red8'}
        />
        {!validHex ? (
          <Text fontSize="$2" color="$red10">
            Use a six-digit hex value, like #3A86FF.
          </Text>
        ) : null}
      </YStack>
    </YStack>
  )
}

ColorSwatchPicker.fileName = 'ColorSwatchPicker'
