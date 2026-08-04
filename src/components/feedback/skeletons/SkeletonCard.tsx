import { XStack, YStack } from 'tamagui'
import { Skeleton, SkeletonScene } from './common/Skeleton'

export function SkeletonCard() {
  return (
    <SkeletonScene>
      <YStack
        render="output"
        aria-label="Loading card"
        width="100%"
        maxW={420}
        gap="4"
        p="4"
        rounded="8"
        borderWidth={1}
        borderColor="border-color"
      >
        <XStack gap="3" items="center">
          <Skeleton width={44} height={44} rounded={1000} />
          <YStack flex={1} gap="2">
            <Skeleton height={14} width="42%" rounded="3" />
            <Skeleton height={12} width="65%" rounded="3" />
          </YStack>
        </XStack>
        <Skeleton height={190} width="100%" rounded="6" />
        <Skeleton height={14} width="90%" rounded="3" />
        <Skeleton height={14} width="70%" rounded="3" />
      </YStack>
    </SkeletonScene>
  )
}

SkeletonCard.fileName = 'SkeletonCard'
