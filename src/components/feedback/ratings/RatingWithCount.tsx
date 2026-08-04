import { Paragraph, XStack } from 'tamagui'
import { StarMeter } from './common/StarMeter'

export function RatingWithCount() {
  return (
    <XStack
      width="100%"
      maxW={420}
      self="center"
      items="center"
      justify="center"
      gap="3"
      p="4"
      rounded="6"
      borderWidth={1}
      borderColor="border-color"
    >
      <StarMeter rating={4.6} />
      <Paragraph color="color9">4.6 · 1,284 reviews</Paragraph>
    </XStack>
  )
}

RatingWithCount.fileName = 'RatingWithCount'
