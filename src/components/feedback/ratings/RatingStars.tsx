import { Star } from '@tamagui/lucide-icons-2'
import { useState } from 'react'
import { Button, Paragraph, View, XStack, YStack } from 'tamagui'
import { StarMeter } from './common/StarMeter'

export function RatingStars() {
  const [rating, setRating] = useState(3.5)
  const update = (next: number) => setRating(Math.max(0.5, Math.min(5, next)))

  return (
    <YStack width="100%" maxW={520} self="center" gap="$6" p="$5">
      <YStack gap="$2">
        <Paragraph color="$color10">Read only · half-star support</Paragraph>
        <StarMeter rating={4.5} size={24} />
      </YStack>
      <YStack gap="$2">
        <Paragraph color="$color10">Your rating: {rating}</Paragraph>
        <XStack
          role="radiogroup"
          aria-label="Choose a rating"
          gap="$1"
          onKeyDown={(event) => {
            if (event.key === 'ArrowRight' || event.key === 'ArrowUp')
              update(rating + 0.5)
            if (event.key === 'ArrowLeft' || event.key === 'ArrowDown')
              update(rating - 0.5)
          }}
        >
          {[1, 2, 3, 4, 5].map((star) => {
            const selected = Math.ceil(rating) === star
            const filled = rating >= star
            const half = !filled && rating === star - 0.5
            return (
              <Button
                key={star}
                // biome-ignore lint/a11y/useSemanticElements: React Native has no cross-platform radio input primitive.
                role="radio"
                aria-checked={selected}
                aria-label={`${star} stars${selected ? `, current rating ${rating}` : ''}`}
                chromeless
                circular
                size="$4"
                p={0}
                onPress={() => setRating(selected && !half ? star - 0.5 : star)}
              >
                <View width={24} height={24} position="relative">
                  <Star size={24} color="$color6" />
                  {(filled || half) && (
                    <View
                      position="absolute"
                      inset={0}
                      width={half ? '50%' : '100%'}
                      overflow="hidden"
                    >
                      <Star size={24} color="$yellow10" fill="$yellow10" />
                    </View>
                  )}
                </View>
              </Button>
            )
          })}
        </XStack>
      </YStack>
    </YStack>
  )
}

RatingStars.fileName = 'RatingStars'
