import { ArrowDownRight, ArrowUpRight } from '@tamagui/lucide-icons-2'
import { Text, XStack } from 'tamagui'

export type StatMetric = {
  label: string
  value: number
  kind: 'currency' | 'percent' | 'number'
  /** signed percentage change; sign gives direction */
  deltaPct: number
  /** whether the change is good — independent of its direction */
  sentiment: 'positive' | 'negative'
  period: string
}

export const formatStat = (value: number, kind: StatMetric['kind']) =>
  kind === 'currency'
    ? new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        maximumFractionDigits: value >= 1000 ? 0 : 2,
      }).format(value)
    : kind === 'percent'
      ? new Intl.NumberFormat('en-US', {
          style: 'percent',
          maximumFractionDigits: 2,
        }).format(value)
      : new Intl.NumberFormat('en-US').format(value)

/** color = sentiment, arrow = direction — a falling refund rate reads green */
export function TrendChip({ metric }: { metric: StatMetric }) {
  const up = metric.deltaPct >= 0
  const TrendIcon = up ? ArrowUpRight : ArrowDownRight
  return (
    <XStack
      theme={metric.sentiment === 'positive' ? 'green' : 'red'}
      aria-label={`${up ? 'Up' : 'Down'} ${Math.abs(metric.deltaPct)}% ${metric.period}, ${
        metric.sentiment === 'positive' ? 'improving' : 'worsening'
      }`}
      bg="$color3"
      rounded={1000}
      px="$2.5"
      py="$1"
      gap="$1"
      items="center"
      self="center"
    >
      <TrendIcon size={14} color="$color10" aria-hidden />
      <Text fontSize="$2" color="$color11" fontWeight="600">
        {up ? '+' : '−'}{Math.abs(metric.deltaPct)}%
      </Text>
    </XStack>
  )
}
