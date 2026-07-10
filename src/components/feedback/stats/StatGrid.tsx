import { Paragraph, Text, XStack, YStack, isWeb } from 'tamagui'
import { TrendChip, formatStat, type StatMetric } from './common/statParts'

const stats: StatMetric[] = [
  {
    label: 'Revenue',
    value: 84200,
    kind: 'currency',
    deltaPct: 12.4,
    sentiment: 'positive',
    period: 'vs last month',
  },
  {
    label: 'Orders',
    value: 1429,
    kind: 'number',
    deltaPct: 8.1,
    sentiment: 'positive',
    period: 'vs last month',
  },
  {
    label: 'Conversion',
    value: 0.0324,
    kind: 'percent',
    deltaPct: -0.6,
    sentiment: 'negative',
    period: 'vs last month',
  },
  {
    label: 'Avg. order',
    value: 58.94,
    kind: 'currency',
    deltaPct: 4.2,
    sentiment: 'positive',
    period: 'vs last month',
  },
]

export function StatGrid() {
  return (
    <XStack width="100%" maxW={820} flexWrap="wrap" gap="$4">
      {stats.map((stat) => (
        <YStack
          key={stat.label}
          render={isWeb ? 'dl' : undefined}
          width="100%"
          flexBasis={340}
          grow={1}
          gap="$2"
          m={0}
          p="$4"
          rounded="$7"
          borderWidth={1}
          borderColor="$borderColor"
          bg="$background"
          $group-window-xs={{ flexBasis: '100%' }}
        >
          <Paragraph render={isWeb ? 'dt' : undefined} color="$color10" m={0}>
            {stat.label}
          </Paragraph>
          <XStack
            render={isWeb ? 'dd' : undefined}
            justify="space-between"
            items="center"
            gap="$3"
            m={0}
          >
            <Text fontSize="$8" lineHeight="$8" fontWeight="700">
              {formatStat(stat.value, stat.kind)}
            </Text>
            <TrendChip metric={stat} />
          </XStack>
        </YStack>
      ))}
    </XStack>
  )
}

StatGrid.fileName = 'StatGrid'
