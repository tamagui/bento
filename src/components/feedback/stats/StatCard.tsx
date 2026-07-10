import { Paragraph, Text, XStack, YStack, isWeb } from 'tamagui'
import { TrendChip, formatStat, type StatMetric } from './common/statParts'

const metrics: StatMetric[] = [
  {
    label: 'Monthly revenue',
    value: 84240,
    kind: 'currency',
    deltaPct: 12.4,
    sentiment: 'positive',
    period: 'vs last month',
  },
  {
    label: 'Refund rate',
    value: 0.018,
    kind: 'percent',
    // rate went DOWN and that is GOOD — direction and sentiment are separate
    deltaPct: -0.3,
    sentiment: 'positive',
    period: 'vs last month',
  },
]

export function StatCard() {
  return (
    <XStack width="100%" maxW={720} gap="$4" flexWrap="wrap">
      {metrics.map((metric) => (
        <YStack
          key={metric.label}
          render={isWeb ? 'dl' : undefined}
          flex={1}
          flexBasis={260}
          gap="$3"
          m={0}
          p="$5"
          rounded="$8"
          borderWidth={1}
          borderColor="$borderColor"
          bg="$background"
        >
          <Paragraph render={isWeb ? 'dt' : undefined} color="$color10" m={0}>
            {metric.label}
          </Paragraph>
          <XStack
            render={isWeb ? 'dd' : undefined}
            items="flex-end"
            justify="space-between"
            gap="$3"
            m={0}
          >
            <Text fontSize="$9" lineHeight="$9" fontWeight="700">
              {formatStat(metric.value, metric.kind)}
            </Text>
            <TrendChip metric={metric} />
          </XStack>
          <Paragraph color="$color9" fontSize="$2" m={0}>
            {metric.period}
          </Paragraph>
        </YStack>
      ))}
    </XStack>
  )
}

StatCard.fileName = 'StatCard'
