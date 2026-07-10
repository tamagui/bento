import { Text, View, XStack, YStack } from 'tamagui'

const segments = [
  { to: 60, color: '$green9', zone: 'normal' },
  { to: 85, color: '$yellow9', zone: 'elevated' },
  { to: 100, color: '$red9', zone: 'critical' },
]

const clamp = (value: number) =>
  Math.max(0, Math.min(100, Number.isFinite(value) ? value : 0))

function Meter({ value, label }: { value: number; label: string }) {
  const percent = clamp(value)
  const segment = segments.find((s) => percent <= s.to) ?? segments[segments.length - 1]
  return (
    <YStack gap="$1.5" width="100%">
      <XStack justify="space-between">
        <Text fontSize="$3" color="$color11">
          {label}
        </Text>
        <Text fontSize="$3" fontWeight="600" color={segment.color as any}>
          {percent}%
        </Text>
      </XStack>
      {/* the meter role lives on the full track so its bounds are honest */}
      <View
        role="meter"
        aria-label={label}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={percent}
        aria-valuetext={`${percent}%, ${segment.zone}`}
        position="relative"
        height={10}
        rounded={1000}
        overflow="hidden"
        bg="$color4"
      >
        <View
          width={`${percent}%`}
          height="100%"
          bg={segment.color as any}
          rounded={1000}
        />
        {/* threshold ticks */}
        {segments.slice(0, -1).map((s) => (
          <View
            key={s.to}
            aria-hidden
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
