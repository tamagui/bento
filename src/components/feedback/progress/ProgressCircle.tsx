import { Circle as SvgCircle, Svg } from 'react-native-svg'
import { Text, View, XStack, YStack, useTheme } from 'tamagui'

const clamp = (value: number) =>
  Math.max(0, Math.min(100, Number.isFinite(value) ? value : 0))

function Ring({
  value,
  size = 84,
  stroke = 8,
  color = '$green9',
  label,
}: {
  value: number
  size?: number
  stroke?: number
  /** theme token so rings adapt to any theme or subtheme */
  color?: string
  label: string
}) {
  const theme = useTheme()
  const percent = clamp(value)
  const strokeColor = theme[color.replace('$', '') as 'green9']?.val ?? color
  const trackColor = theme.color4?.val ?? 'rgba(128,128,128,0.25)'
  const r = (size - stroke) / 2
  const c = 2 * Math.PI * r
  return (
    <YStack items="center" gap="$2">
      <View
        role="progressbar"
        aria-label={label}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={percent}
        width={size}
        height={size}
        position="relative"
      >
        <Svg width={size} height={size} aria-hidden>
          <SvgCircle
            cx={size / 2}
            cy={size / 2}
            r={r}
            stroke={trackColor}
            strokeWidth={stroke}
            fill="none"
          />
          <SvgCircle
            cx={size / 2}
            cy={size / 2}
            r={r}
            stroke={strokeColor}
            strokeWidth={stroke}
            fill="none"
            strokeLinecap="round"
            strokeDasharray={`${c}`}
            strokeDashoffset={c * (1 - percent / 100)}
            transform={`rotate(-90 ${size / 2} ${size / 2})`}
          />
        </Svg>
        <View position="absolute" inset={0} items="center" justify="center">
          <Text fontWeight="700" fontSize="$4" color="$color12">
            {percent}%
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
      <Ring value={25} color="$red9" label="Errors triaged" />
      <Ring value={62} color="$yellow9" label="Sprint scope" />
      <Ring value={88} color="$green9" label="Test coverage" />
    </XStack>
  )
}

ProgressCircles.fileName = 'ProgressCircle'
