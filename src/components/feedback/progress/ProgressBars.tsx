import { useEffect, useState } from 'react'
import { Button, Text, View, XStack, YStack } from 'tamagui'

const clamp = (value: number) =>
  Math.max(0, Math.min(100, Number.isFinite(value) ? value : 0))

export function ProgressBar({
  value,
  label,
  color = '$color12',
}: {
  value: number
  label: string
  color?: string
}) {
  // one normalized value drives the visual, the text, and the ARIA values
  const percent = clamp(value)
  return (
    <YStack gap="$1.5" width="100%">
      <XStack justify="space-between">
        <Text fontSize="$3" color="$color11">
          {label}
        </Text>
        <Text fontSize="$3" color="$color10">
          {Math.round(percent)}%
        </Text>
      </XStack>
      <View
        role="progressbar"
        aria-label={label}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={Math.round(percent)}
        height={8}
        rounded={1000}
        bg="$color4"
        overflow="hidden"
      >
        <View width={`${percent}%`} height="100%" rounded={1000} bg={color as any} />
      </View>
    </YStack>
  )
}

/** ------ EXAMPLE ------ */
export function ProgressBars() {
  const [live, setLive] = useState(12)

  // upload runs to completion and stays there
  useEffect(() => {
    if (live >= 100) return
    const id = setTimeout(() => setLive((v) => clamp(v + 7)), 900)
    return () => clearTimeout(id)
  }, [live])

  return (
    <YStack gap="$5" width="100%" maxW={420}>
      <ProgressBar value={72} label="Storage used" />
      <ProgressBar value={38} label="Monthly budget" color="$yellow9" />
      <ProgressBar value={94} label="API quota" color="$red9" />
      <ProgressBar value={live} label="Uploading photo.jpg" color="$green9" />
      {live >= 100 && (
        <Button size="$2.5" self="flex-start" variant="outlined" onPress={() => setLive(0)}>
          Restart upload demo
        </Button>
      )}
    </YStack>
  )
}

ProgressBars.fileName = 'ProgressBars'
