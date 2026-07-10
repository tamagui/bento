import { Star } from '@tamagui/lucide-icons-2'
import { View, XStack } from 'tamagui'

/** read-only display: clamps input and fills stars to the exact fraction */
export function StarMeter({ rating, size = 20 }: { rating: number; size?: number }) {
  const value = Math.max(0, Math.min(5, Number.isFinite(rating) ? rating : 0))
  return (
    <XStack gap="$1" role="img" aria-label={`${value} out of 5 stars`}>
      {[1, 2, 3, 4, 5].map((star) => {
        const fraction = Math.max(0, Math.min(1, value - (star - 1)))
        return (
          <View key={star} width={size} height={size} position="relative">
            <Star size={size} color="$color6" />
            {fraction > 0 && (
              <View
                position="absolute"
                inset={0}
                width={`${fraction * 100}%`}
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
