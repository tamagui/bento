import { useEffect, useState } from 'react'
import { Text, View, XStack, YStack } from 'tamagui'

export function ProgressBar({
  value,
  label,
  color = '$color12',
}: {
  value: number
  label: string
  color?: string
}) {
  return (
    <YStack gap="$1.5" width="100%">
      <XStack justify="space-between">
        <Text fontSize="$3" color="$color11">
          {label}
        </Text>
        <Text fontSize="$3" color="$color10">
          {Math.round(value)}%
        </Text>
      </XStack>
      <View
        role="progressbar"
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={Math.round(value)}
        height={8}
        rounded={1000}
        bg="$color4"
        overflow="hidden"
      >
        <View width={`${value}%`} height="100%" rounded={1000} bg={color as any} />
      </View>
    </YStack>
  )
}

/** ------ EXAMPLE ------ */
export function ProgressBars() {
  const [live, setLive] = useState(12)

  useEffect(() => {
    const id = setInterval(() => {
      setLive((v) => (v >= 100 ? 0 : v + 7))
    }, 900)
    return () => clearInterval(id)
  }, [])

  return (
    <YStack gap="$5" width="100%" maxW={420}>
      <ProgressBar value={72} label="Storage used" />
      <ProgressBar value={38} label="Monthly budget" color="$yellow9" />
      <ProgressBar value={94} label="API quota" color="$red9" />
      <ProgressBar value={live} label="Uploading photo.jpg" color="$green9" />
    </YStack>
  )
}

ProgressBars.fileName = 'ProgressBars'
