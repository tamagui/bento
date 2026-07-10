import { ArrowDownRight, ArrowUpRight } from '@tamagui/lucide-icons-2'
import { Paragraph, Text, XStack, YStack } from 'tamagui'

const stats = [
  { label: 'Revenue', value: '$84.2k', delta: '12.4%', up: true },
  { label: 'Orders', value: '1,429', delta: '8.1%', up: true },
  { label: 'Conversion', value: '3.24%', delta: '0.6%', up: false },
  { label: 'Avg. order', value: '$58.94', delta: '4.2%', up: true },
]

export function StatGrid() {
  return (
    <XStack width="100%" maxW={820} flexWrap="wrap" gap="$4">
      {stats.map((stat) => {
        const TrendIcon = stat.up ? ArrowUpRight : ArrowDownRight
        return (
          <YStack
            key={stat.label}
            width="100%"
            flexBasis={340}
            grow={1}
            gap="$2"
            p="$4"
            rounded="$7"
            borderWidth={1}
            borderColor="$borderColor"
            bg="$background"
            $group-window-xs={{ flexBasis: '100%' }}
          >
            <Paragraph color="$color10">{stat.label}</Paragraph>
            <XStack justify="space-between" items="center" gap="$3">
              <Text fontSize="$8" lineHeight="$8" fontWeight="700">
                {stat.value}
              </Text>
              <XStack theme={stat.up ? 'green' : 'red'} gap="$1" items="center">
                <TrendIcon size={15} color="$color10" />
                <Text color="$color10" fontWeight="600">
                  {stat.delta}
                </Text>
              </XStack>
            </XStack>
          </YStack>
        )
      })}
    </XStack>
  )
}

StatGrid.fileName = 'StatGrid'
