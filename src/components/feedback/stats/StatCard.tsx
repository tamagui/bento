import { ArrowDownRight, ArrowUpRight } from '@tamagui/lucide-icons-2'
import { Paragraph, Text, XStack, YStack } from 'tamagui'

const metrics = [
  { label: 'Monthly revenue', value: '$84,240', delta: '12.4%', up: true },
  { label: 'Refund rate', value: '1.8%', delta: '0.3%', up: false },
]

export function StatCard() {
  return (
    <XStack width="100%" maxW={720} gap="$4" flexWrap="wrap">
      {metrics.map((metric) => {
        const TrendIcon = metric.up ? ArrowUpRight : ArrowDownRight
        return (
          <YStack
            key={metric.label}
            flex={1}
            flexBasis={260}
            gap="$3"
            p="$5"
            rounded="$8"
            borderWidth={1}
            borderColor="$borderColor"
            bg="$background"
          >
            <Paragraph color="$color10">{metric.label}</Paragraph>
            <XStack items="flex-end" justify="space-between" gap="$3">
              <Text fontSize="$9" lineHeight="$9" fontWeight="700">
                {metric.value}
              </Text>
              <XStack
                theme={metric.up ? 'green' : 'red'}
                bg="$color3"
                rounded={1000}
                px="$2.5"
                py="$1"
                gap="$1"
                items="center"
              >
                <TrendIcon size={14} color="$color10" />
                <Text fontSize="$2" color="$color11" fontWeight="600">
                  {metric.delta}
                </Text>
              </XStack>
            </XStack>
          </YStack>
        )
      })}
    </XStack>
  )
}

StatCard.fileName = 'StatCard'
