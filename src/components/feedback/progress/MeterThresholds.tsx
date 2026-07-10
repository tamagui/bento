import { Text, View, XStack, YStack } from 'tamagui'

const segments = [
  { to: 60, color: '$green9' },
  { to: 85, color: '$yellow9' },
  { to: 100, color: '$red9' },
]

function Meter({ value, label }: { value: number; label: string }) {
  const color =
    value <= 60 ? '$green9' : value <= 85 ? '$yellow9' : '$red9'
  return (
    <YStack gap="$1.5" width="100%">
      <XStack justify="space-between">
        <Text fontSize="$3" color="$color11">
          {label}
        </Text>
        <Text fontSize="$3" fontWeight="600" color={color as any}>
          {value}%
        </Text>
      </XStack>
      <View position="relative" height={10} rounded={1000} overflow="hidden" bg="$color4">
        <View
          role="meter"
          aria-valuemin={0}
          aria-valuemax={100}
          aria-valuenow={value}
          width={`${value}%`}
          height="100%"
          bg={color as any}
          rounded={1000}
        />
        {/* threshold ticks */}
        {segments.slice(0, -1).map((s) => (
          <View
            key={s.to}
            position="absolute"
            l={`${s.to}%`}
            t={0}
            b={0}
            width={2}
            bg="$color1"
          />
        ))}
      </View>
    </YStack>
  )
}

/** ------ EXAMPLE ------ */
export function MeterThresholds() {
  return (
    <YStack gap="$5" width="100%" maxW={420}>
      <Meter value={42} label="CPU" />
      <Meter value={71} label="Memory" />
      <Meter value={93} label="Disk" />
    </YStack>
  )
}

MeterThresholds.fileName = 'MeterThresholds'
