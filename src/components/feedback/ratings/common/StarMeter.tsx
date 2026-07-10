import { Star } from '@tamagui/lucide-icons-2'
import { View, XStack } from 'tamagui'

export function StarMeter({ rating, size = 20 }: { rating: number; size?: number }) {
  return (
    <XStack gap="$1" aria-label={`${rating} out of 5 stars`}>
      {[1, 2, 3, 4, 5].map((star) => {
        const filled = rating >= star
        const half = !filled && rating >= star - 0.5
        return (
          <View key={star} width={size} height={size} position="relative">
            <Star size={size} color="$color6" />
            {(filled || half) && (
              <View
                position="absolute"
                inset={0}
                width={half ? '50%' : '100%'}
                overflow="hidden"
              >
                <Star size={size} color="$yellow10" fill="currentColor" />
              </View>
            )}
          </View>
        )
      })}
    </XStack>
  )
}
