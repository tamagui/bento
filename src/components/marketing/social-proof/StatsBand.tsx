import { ArrowUpRight } from '@tamagui/lucide-icons-2'
import { Text, XStack, YStack, isWeb } from 'tamagui'

// sample figures for layout preview — replace with audited product metrics
// and cite the source before publishing
const stats = [
  { value: '12k+', label: 'teams building weekly', delta: '18%' },
  { value: '42%', label: 'faster project cycles', delta: '9%' },
  { value: '99.98%', label: 'platform uptime', delta: '0.2%' },
] as const

export function StatsBand() {
  return (
    <YStack width="100%" maxW={980} self="center" gap="$2">
      <XStack
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
            render={isWeb ? 'dl' : undefined}
            flex={1}
            minW={220}
            gap="$2"
            m={0}
            p="$6"
            borderLeftWidth={index ? 1 : 0}
            borderColor="$borderColor"
          >
            <XStack render={isWeb ? 'dd' : undefined} items="center" gap="$2" m={0}>
              <Text fontSize="$10" fontWeight="900" letterSpacing={-1}>
                {stat.value}
              </Text>
              <XStack
                px="$2"
                py="$1"
                rounded={999}
                bg="$green3"
                items="center"
                gap="$1"
                aria-label={`Up ${stat.delta} versus last quarter`}
              >
                <ArrowUpRight size={13} color="$green10" aria-hidden />
                <Text fontSize="$1" color="$green10" fontWeight="800">
                  +{stat.delta}
                </Text>
              </XStack>
            </XStack>
            <Text render={isWeb ? 'dt' : undefined} color="$color9" letterSpacing={0} m={0}>
              {stat.label} · vs last quarter
            </Text>
          </YStack>
        ))}
      </XStack>
      <Text fontSize="$1" color="$color8" self="center">
        Sample metrics for preview — cite your own audited data before publishing.
      </Text>
    </YStack>
  )
}

StatsBand.fileName = 'StatsBand'
