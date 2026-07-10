import { XStack, YStack } from 'tamagui'
import { Skeleton, SkeletonScene } from './common/Skeleton'

export function SkeletonList() {
  return (
    <SkeletonScene>
      <YStack render="output" aria-label="Loading list" width="100%" maxW={560} gap="$4">
        {[0, 1, 2, 3].map((row) => (
          <XStack key={row} gap="$3" items="center">
            <Skeleton width={40} height={40} rounded="$4" />
            <YStack flex={1} gap="$2">
              <Skeleton height={14} width={row % 2 ? '58%' : '44%'} rounded="$3" />
              <Skeleton height={12} width={row % 2 ? '82%' : '70%'} rounded="$3" />
            </YStack>
            <Skeleton width={54} height={24} rounded={1000} />
          </XStack>
        ))}
      </YStack>
    </SkeletonScene>
  )
}

SkeletonList.fileName = 'SkeletonList'
