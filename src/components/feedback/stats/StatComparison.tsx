import { Paragraph, Text, View, XStack, YStack } from 'tamagui'

export function StatComparison() {
  return (
    <YStack
      width="100%"
      maxW={620}
      gap="5"
      p="5"
      rounded="8"
      borderWidth={1}
      borderColor="border-color"
      bg="background"
    >
      <YStack gap="1">
        <Paragraph color="color9">Revenue split</Paragraph>
        <Text fontSize="8" lineHeight="8" fontWeight="700">
          $128,400
        </Text>
      </YStack>
      <XStack
        height={12}
        rounded={1000}
        overflow="hidden"
        aria-label="Revenue split: subscriptions 68%, services 32%"
      >
        <View width="68%" bg="blue-500" />
        <View width="32%" bg="purple-500" />
      </XStack>
      <XStack justify="space-between" gap="4" flexWrap="wrap">
        <YStack gap="1">
          <XStack gap="2" items="center">
            <View width={9} height={9} rounded={1000} bg="blue-500" />
            <Paragraph color="color9">Subscriptions</Paragraph>
          </XStack>
          <Text fontSize="6" fontWeight="700">
            $87,312 · 68%
          </Text>
        </YStack>
        <YStack gap="1">
          <XStack gap="2" items="center">
            <View width={9} height={9} rounded={1000} bg="purple-500" />
            <Paragraph color="color9">Services</Paragraph>
          </XStack>
          <Text fontSize="6" fontWeight="700">
            $41,088 · 32%
          </Text>
        </YStack>
      </XStack>
    </YStack>
  )
}

StatComparison.fileName = 'StatComparison'
