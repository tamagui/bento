import { Avatar } from '../../BentoSkins'
import { Paragraph, Text, XStack, YStack } from 'tamagui'
import { StarMeter } from './common/StarMeter'

export function ReviewCard() {
  return (
    <YStack
      width="100%"
      maxW={560}
      self="center"
      gap="4"
      p="5"
      rounded="8"
      borderWidth={1}
      borderColor="border-color"
      bg="background"
    >
      <XStack gap="3" items="center">
        <Avatar circular size="4">
          <Avatar.Image src="https://i.pravatar.cc/150?img=12" aria-label="Maya Chen" />
          <Avatar.Fallback bg="color4" />
        </Avatar>
        <YStack flex={1} gap="1">
          <Text fontWeight="700">Maya Chen</Text>
          <Text fontSize="2" color="color8">
            June 28, 2026
          </Text>
        </YStack>
        <StarMeter rating={5} size={17} />
      </XStack>
      <Paragraph color="color10" lineHeight="5">
        The details feel thoughtful without getting in the way. Our whole team was
        productive within an afternoon, and the mobile experience is just as polished.
      </Paragraph>
    </YStack>
  )
}

ReviewCard.fileName = 'ReviewCard'
