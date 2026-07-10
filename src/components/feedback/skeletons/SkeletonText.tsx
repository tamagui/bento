import { YStack } from 'tamagui'
import { Skeleton, SkeletonScene } from './common/Skeleton'

export function SkeletonText() {
  return (
    <SkeletonScene>
      <YStack render="output" aria-label="Loading text" width="100%" maxW={620} gap="$3">
        <Skeleton height={22} width="48%" rounded="$4" />
        <Skeleton height={14} width="100%" rounded="$3" />
        <Skeleton height={14} width="92%" rounded="$3" />
        <Skeleton height={14} width="78%" rounded="$3" />
      </YStack>
    </SkeletonScene>
  )
}

SkeletonText.fileName = 'SkeletonText'
