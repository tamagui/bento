import Svg, { Path } from 'react-native-svg'
import { ArrowUpRight } from '@tamagui/lucide-icons-2'
import { Paragraph, Text, XStack, YStack, useTheme } from 'tamagui'

export function StatCardSparkline() {
  const theme = useTheme()
  const stroke = theme.green10?.val || theme.color10?.val

  return (
    <YStack
      width="100%"
      maxW={460}
      gap="$4"
      p="$5"
      rounded="$8"
      borderWidth={1}
      borderColor="$borderColor"
      bg="$background"
    >
      <XStack justify="space-between" items="flex-start" gap="$4">
        <YStack gap="$1">
          <Paragraph color="$color10">Active users</Paragraph>
          <Text fontSize="$9" lineHeight="$9" fontWeight="700">
            24,892
          </Text>
        </YStack>
        <XStack theme="green" bg="$color3" rounded={1000} px="$2.5" py="$1" gap="$1">
          <ArrowUpRight size={14} color="$color10" />
          <Text fontSize="$2" color="$color11" fontWeight="600">
            8.7%
          </Text>
        </XStack>
      </XStack>
      <Svg
        width="100%"
        height={72}
        viewBox="0 0 320 72"
        aria-label="Active users trend rising"
      >
        <Path
          d="M2 61 C35 58 42 42 74 45 S112 62 145 37 S184 28 213 34 S256 18 318 8"
          fill="none"
          stroke={stroke}
          strokeWidth={4}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </Svg>
    </YStack>
  )
}

StatCardSparkline.fileName = 'StatCardSparkline'
