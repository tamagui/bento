import { useState } from 'react'
import { Slider, Text, View, XStack, YStack } from 'tamagui'

function ColorSlider({
  label,
  max,
  value,
  onChange,
}: { label: string; max: number; value: number; onChange: (value: number) => void }) {
  return (
    <YStack gap="$2">
      <XStack justify="space-between">
        <Text fontWeight="700" letterSpacing={0}>
          {label}
        </Text>
        <Text fontFamily="$mono" color="$color9">
          {value}
        </Text>
      </XStack>
      <Slider
        value={[value]}
        onValueChange={([next]) => onChange(next)}
        min={0}
        max={max}
        step={1}
        aria-label={label}
      >
        <Slider.Track height={7} rounded={999} bg="$color4">
          <Slider.TrackActive bg="$color11" />
        </Slider.Track>
        <Slider.Thumb
          index={0}
          rounded={999}
          size="$1.5"
          bg="$color12"
          borderWidth={2}
          borderColor="$background"
        />
      </Slider>
    </YStack>
  )
}

export function ColorSliderPicker() {
  const [hue, setHue] = useState(222)
  const [saturation, setSaturation] = useState(82)
  const [lightness, setLightness] = useState(58)
  const color = `hsl(${hue} ${saturation}% ${lightness}%)`
  return (
    <YStack
      width="100%"
      maxW={520}
      self="center"
      gap="$6"
      p="$5"
      rounded="$8"
      borderWidth={1}
      borderColor="$borderColor"
      bg="$background"
    >
      <View
        height={150}
        rounded="$7"
        borderWidth={1}
        borderColor="$borderColor"
        style={{ backgroundColor: color }}
      />
      <XStack justify="space-between" items="center">
        <Text fontSize="$6" fontWeight="800" letterSpacing={0}>
          HSL color
        </Text>
        <Text fontFamily="$mono" color="$color9">
          {color}
        </Text>
      </XStack>
      <YStack gap="$5">
        <ColorSlider label="Hue" value={hue} max={360} onChange={setHue} />
        <ColorSlider
          label="Saturation"
          value={saturation}
          max={100}
          onChange={setSaturation}
        />
        <ColorSlider
          label="Lightness"
          value={lightness}
          max={100}
          onChange={setLightness}
        />
      </YStack>
    </YStack>
  )
}

ColorSliderPicker.fileName = 'ColorSliderPicker'
