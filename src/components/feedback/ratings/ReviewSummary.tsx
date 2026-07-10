import { Paragraph, Text, View, XStack, YStack } from 'tamagui'
import { StarMeter } from './common/StarMeter'

const distribution = [
  { stars: 5, percent: 72 },
  { stars: 4, percent: 18 },
  { stars: 3, percent: 6 },
  { stars: 2, percent: 3 },
  { stars: 1, percent: 1 },
]

export function ReviewSummary() {
  return (
    <XStack
      width="100%"
      maxW={680}
      self="center"
      gap="$6"
      p="$5"
      rounded="$8"
      borderWidth={1}
      borderColor="$borderColor"
      flexWrap="wrap"
    >
      <YStack minW={140} items="center" justify="center" gap="$2">
        <Text fontSize="$10" lineHeight="$10" fontWeight="700">
          4.6
        </Text>
        <StarMeter rating={4.5} />
        <Paragraph color="$color10">1,284 reviews</Paragraph>
      </YStack>
      <YStack flex={1} minW={240} gap="$2.5">
        {distribution.map((row) => (
          <XStack key={row.stars} items="center" gap="$3">
            <Text width={14} text="right" color="$color10">
              {row.stars}
            </Text>
            <View flex={1} height={8} rounded={1000} bg="$color3" overflow="hidden">
              <View width={`${row.percent}%`} height="100%" bg="$yellow9" />
            </View>
            <Text width={38} color="$color10">
              {row.percent}%
            </Text>
          </XStack>
        ))}
      </YStack>
    </XStack>
  )
}

ReviewSummary.fileName = 'ReviewSummary'
