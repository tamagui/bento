import { useState } from 'react'
import { Slider, Text, View, XStack, YStack, isWeb } from 'tamagui'

function ColorSlider({
  label,
  max,
  unit = '',
  gradient,
  value,
  onChange,
}: {
  label: string
  max: number
  unit?: string
  /** channel-specific rail so the slider previews what it changes (web) */
  gradient?: string
  value: number
  onChange: (value: number) => void
}) {
  return (
    <YStack gap="$2">
      <XStack justify="space-between">
        <Text fontWeight="700" letterSpacing={0}>
          {label}
        </Text>
        <Text fontFamily="$mono" color="$color9">
          {value}
          {unit}
        </Text>
      </XStack>
      <Slider
        value={[value]}
        onValueChange={([next]) => onChange(next)}
        min={0}
        max={max}
        step={1}
      >
        <Slider.Track
          height={12}
          rounded={999}
          bg="$color4"
          style={isWeb && gradient ? { backgroundImage: gradient } : undefined}
        >
          {/* the gradient rail replaces the active-track fill on web */}
          {!(isWeb && gradient) && <Slider.TrackActive bg="$color11" />}
        </Slider.Track>
        {/* the thumb is the role=slider node — name and value text live here */}
        <Slider.Thumb
          aria-label={label}
          aria-valuetext={`${value}${unit}`}
          index={0}
          rounded={999}
          size="$2"
          bg="$color12"
          borderWidth={2}
          borderColor="$background"
          hitSlop={isWeb ? undefined : 12}
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

  const hueRail = `linear-gradient(to right, ${Array.from({ length: 13 }, (_, i) => `hsl(${i * 30} ${saturation}% ${lightness}%)`).join(', ')})`
  const saturationRail = `linear-gradient(to right, hsl(${hue} 0% ${lightness}%), hsl(${hue} 100% ${lightness}%))`
  const lightnessRail = `linear-gradient(to right, hsl(${hue} ${saturation}% 0%), hsl(${hue} ${saturation}% 50%), hsl(${hue} ${saturation}% 100%))`

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
        aria-label={`Color preview: ${color}`}
        role={'img' as any}
        style={{ backgroundColor: color }}
      />
      <XStack justify="space-between" items="center">
        <Text fontSize="$6" fontWeight="800" letterSpacing={0}>
          HSL color
        </Text>
        <Text fontFamily="$mono" color="$color9" aria-live="polite">
          {color}
        </Text>
      </XStack>
      <YStack gap="$5">
        <ColorSlider
          label="Hue"
          value={hue}
          max={360}
          unit="°"
          gradient={hueRail}
          onChange={setHue}
        />
        <ColorSlider
          label="Saturation"
          value={saturation}
          max={100}
          unit="%"
          gradient={saturationRail}
          onChange={setSaturation}
        />
        <ColorSlider
          label="Lightness"
          value={lightness}
          max={100}
          unit="%"
          gradient={lightnessRail}
          onChange={setLightness}
        />
      </YStack>
    </YStack>
  )
}

ColorSliderPicker.fileName = 'ColorSliderPicker'
