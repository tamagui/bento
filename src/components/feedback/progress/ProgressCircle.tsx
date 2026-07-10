import { Circle as SvgCircle, Svg } from 'react-native-svg'
import { Text, View, XStack, YStack } from 'tamagui'

function Ring({
  value,
  size = 84,
  stroke = 8,
  color = '#22c55e',
  label,
}: {
  value: number
  size?: number
  stroke?: number
  color?: string
  label: string
}) {
  const r = (size - stroke) / 2
  const c = 2 * Math.PI * r
  return (
    <YStack items="center" gap="$2">
      <View width={size} height={size} position="relative">
        <Svg width={size} height={size}>
          <SvgCircle
            cx={size / 2}
            cy={size / 2}
            r={r}
            stroke="rgba(128,128,128,0.25)"
            strokeWidth={stroke}
            fill="none"
          />
          <SvgCircle
            cx={size / 2}
            cy={size / 2}
            r={r}
            stroke={color}
            strokeWidth={stroke}
            fill="none"
            strokeLinecap="round"
            strokeDasharray={`${c}`}
            strokeDashoffset={c * (1 - value / 100)}
            transform={`rotate(-90 ${size / 2} ${size / 2})`}
          />
        </Svg>
        <View position="absolute" inset={0} items="center" justify="center">
          <Text fontWeight="700" fontSize="$4" color="$color12">
            {value}%
          </Text>
        </View>
      </View>
      <Text fontSize="$2" color="$color10">
        {label}
      </Text>
    </YStack>
  )
}

/** ------ EXAMPLE ------ */
export function ProgressCircles() {
  return (
    <XStack gap="$6" flexWrap="wrap" justify="center">
      <Ring value={25} color="#ef4444" label="Errors triaged" />
      <Ring value={62} color="#eab308" label="Sprint scope" />
      <Ring value={88} color="#22c55e" label="Test coverage" />
    </XStack>
  )
}

ProgressCircles.fileName = 'ProgressCircle'
