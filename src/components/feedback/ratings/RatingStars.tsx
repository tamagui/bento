import { Star } from '@tamagui/lucide-icons-2'
import { useState } from 'react'
import { Paragraph, View, XStack, YStack, isWeb } from 'tamagui'
import { StarMeter } from './common/StarMeter'

const STAR = 26
const PAD = 4

/** ------ EXAMPLE ------ */
export function RatingStars() {
  const [rating, setRating] = useState(3.5)
  const update = (next: number) => setRating(Math.max(0.5, Math.min(5, next)))

  return (
    <YStack width="100%" maxW={520} self="center" gap="$6" p="$5">
      <YStack gap="$2">
        <Paragraph color="$color10">Read only · fractional support</Paragraph>
        <StarMeter rating={4.5} size={24} />
      </YStack>
      <YStack gap="$2">
        <Paragraph color="$color10" aria-hidden>
          Your rating: {rating}
        </Paragraph>
        {/* one slider widget: half-step values need slider semantics, not
            five radios pretending to hold ten states */}
        <XStack
          role="slider"
          tabIndex={0}
          aria-label="Choose a rating"
          aria-valuemin={0.5}
          aria-valuemax={5}
          aria-valuenow={rating}
          aria-valuetext={`${rating} of 5 stars`}
          gap="$1"
          self="flex-start"
          rounded="$4"
          focusVisibleStyle={{
            outlineColor: '$outlineColor',
            outlineOffset: 4,
            outlineStyle: 'solid',
            outlineWidth: 2,
          }}
          onKeyDown={(event: any) => {
            if (!isWeb) return
            if (event.key === 'ArrowRight' || event.key === 'ArrowUp') {
              event.preventDefault()
              update(rating + 0.5)
            } else if (event.key === 'ArrowLeft' || event.key === 'ArrowDown') {
              event.preventDefault()
              update(rating - 0.5)
            } else if (event.key === 'Home') {
              event.preventDefault()
              update(0.5)
            } else if (event.key === 'End') {
              event.preventDefault()
              update(5)
            }
          }}
        >
          {[1, 2, 3, 4, 5].map((star) => {
            const fraction = Math.max(0, Math.min(1, rating - (star - 1)))
            return (
              <View
                key={star}
                aria-hidden
                cursor="pointer"
                p={PAD}
                hitSlop={isWeb ? undefined : 8}
                pressStyle={{ scale: 0.92 }}
                onPress={(event: any) => {
                  // left half of the star sets a half rating
                  const x = event.nativeEvent?.locationX ?? event.nativeEvent?.offsetX
                  const half = typeof x === 'number' && x - PAD < STAR / 2
                  update(half ? star - 0.5 : star)
                }}
              >
                <View width={STAR} height={STAR} position="relative">
                  <Star size={STAR} color="$color6" />
                  {fraction > 0 && (
                    <View
                      position="absolute"
                      inset={0}
                      width={`${fraction * 100}%`}
                      overflow="hidden"
                    >
                      <Star size={STAR} color="$yellow10" fill="currentColor" />
                    </View>
                  )}
                </View>
              </View>
            )
          })}
        </XStack>
      </YStack>
    </YStack>
  )
}

RatingStars.fileName = 'RatingStars'
