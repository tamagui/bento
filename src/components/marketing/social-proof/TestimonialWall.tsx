import { Avatar } from '../../BentoSkins'
import { Quote } from '@tamagui/lucide-icons-2'
import { Paragraph, Text, XStack, YStack, isWeb } from 'tamagui'

// fictional testimonials for layout preview — publish only real, approved
// customer quotes with names used by permission
const quotes = [
  {
    quote:
      'The details are unusually thoughtful. Our team moved from scattered notes to one clear workflow in a day.',
    name: 'Lena Ortiz',
    role: 'COO, Northstar',
    initials: 'LO',
    color: 'pink-300',
  },
  {
    quote: 'Fast, calm, and genuinely pleasant to use.',
    name: 'Sam Okafor',
    role: 'Founder, Relay',
    initials: 'SO',
    color: 'blue-300',
  },
  {
    quote:
      'We cut our weekly planning meeting in half without losing any context. That alone paid for the switch.',
    name: 'Iris Kim',
    role: 'VP Product, Frame',
    initials: 'IK',
    color: 'orange-300',
  },
  {
    quote: 'It feels like the product anticipates what we need next.',
    name: 'Ben Foster',
    role: 'Design lead, Arc',
    initials: 'BF',
    color: 'green-300',
  },
] as const

export function TestimonialWall() {
  return (
    <XStack
      width="100%"
      maxW={960}
      self="center"
      flexWrap="wrap"
      gap="4"
      items="flex-start"
    >
      {quotes.map((item, index) => (
        <YStack
          key={item.name}
          render={isWeb ? 'blockquote' : undefined}
          width="48%"
          minW={280}
          flex={1}
          minH={index % 2 ? 210 : 250}
          gap="4"
          m={0}
          p="5"
          rounded="8"
          borderWidth={1}
          borderColor="border-color"
          bg="background"
        >
          <Quote size={24} color="accent-color" aria-hidden />
          <Paragraph flex={1} fontSize="5" lineHeight="6" color="color10">
            “{item.quote}”
          </Paragraph>
          <XStack items="center" gap="3">
            <Avatar circular size="10">
              <Avatar.Fallback bg={item.color} items="center" justify="center">
                <Text fontSize="2" fontWeight="800">
                  {item.initials}
                </Text>
              </Avatar.Fallback>
            </Avatar>
            <YStack
              render={isWeb ? 'cite' : undefined}
              style={isWeb ? { fontStyle: 'normal' } : undefined}
            >
              <Text fontWeight="800" letterSpacing={0}>
                {item.name}
              </Text>
              <Text fontSize="2" color="color8">
                {item.role}
              </Text>
            </YStack>
          </XStack>
        </YStack>
      ))}
    </XStack>
  )
}

TestimonialWall.fileName = 'TestimonialWall'
