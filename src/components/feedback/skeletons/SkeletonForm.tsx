import { XStack, YStack } from 'tamagui'
import { Skeleton, SkeletonScene } from './common/Skeleton'

export function SkeletonForm() {
  return (
    <SkeletonScene>
      <YStack
        render="output"
        aria-label="Loading form"
        width="100%"
        maxW={520}
        gap="$5"
        p="$5"
        rounded="$8"
        borderWidth={1}
        borderColor="$borderColor"
      >
        <Skeleton width="46%" height={24} rounded="$4" />
        {[0, 1, 2].map((field) => (
          <YStack key={field} gap="$2">
            <Skeleton width={field === 1 ? '34%' : '26%'} height={12} rounded="$3" />
            <Skeleton width="100%" height={42} rounded="$5" />
          </YStack>
        ))}
        <XStack justify="flex-end" gap="$3">
          <Skeleton width={86} height={40} rounded="$5" />
          <Skeleton width={104} height={40} rounded="$5" />
        </XStack>
      </YStack>
    </SkeletonScene>
  )
}

SkeletonForm.fileName = 'SkeletonForm'
