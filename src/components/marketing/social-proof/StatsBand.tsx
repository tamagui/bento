import { ArrowUpRight } from '@tamagui/lucide-icons-2'
import { Text, XStack, YStack } from 'tamagui'

const stats = [
  { value: '12k+', label: 'teams building weekly', delta: '18%' },
  { value: '42%', label: 'faster project cycles', delta: '9%' },
  { value: '99.98%', label: 'platform uptime', delta: '0.2%' },
] as const

export function StatsBand() {
  return (
    <XStack
      width="100%"
      maxW={980}
      self="center"
      flexWrap="wrap"
      rounded="$9"
      overflow="hidden"
      borderWidth={1}
      borderColor="$borderColor"
      bg="$background"
    >
      {stats.map((stat, index) => (
        <YStack
          key={stat.label}
          flex={1}
          minW={220}
          gap="$2"
          p="$6"
          borderLeftWidth={index ? 1 : 0}
          borderColor="$borderColor"
        >
          <XStack items="center" gap="$2">
            <Text fontSize="$10" fontWeight="900" letterSpacing={-1}>
              {stat.value}
            </Text>
            <XStack px="$2" py="$1" rounded={999} bg="$green3" items="center" gap="$1">
              <ArrowUpRight size={13} color="$green10" />
              <Text fontSize="$1" color="$green10" fontWeight="800">
                {stat.delta}
              </Text>
            </XStack>
          </XStack>
          <Text color="$color9" letterSpacing={0}>
            {stat.label}
          </Text>
        </YStack>
      ))}
    </XStack>
  )
}

StatsBand.fileName = 'StatsBand'
