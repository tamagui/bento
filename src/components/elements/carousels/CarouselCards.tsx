import { useRef, useState } from 'react'
import { ScrollView } from 'react-native'
import { Avatar, Text, View, XStack, YStack } from 'tamagui'

const testimonials = [
  {
    id: 1,
    quote: 'We shipped our redesign in half the time. The primitives are exactly right.',
    name: 'Sofia Reyes',
    role: 'Design Engineer, Loop',
    img: 'https://i.pravatar.cc/80?img=47',
  },
  {
    id: 2,
    quote: 'One codebase, native feel everywhere. Our mobile reviews went way up.',
    name: 'James Park',
    role: 'CTO, Fieldnotes',
    img: 'https://i.pravatar.cc/80?img=12',
  },
  {
    id: 3,
    quote: 'The theming system made our white-label product actually maintainable.',
    name: 'Anaïs Dubois',
    role: 'Staff Engineer, Relay',
    img: 'https://i.pravatar.cc/80?img=32',
  },
  {
    id: 4,
    quote: 'Performance was the surprise — lists feel native because they are.',
    name: 'Tomás Silva',
    role: 'Founder, Brio',
    img: 'https://i.pravatar.cc/80?img=59',
  },
]

const CARD_W = 320
const GAP = 14

/** ------ EXAMPLE ------ */
export function CarouselCards() {
  const scrollRef = useRef<ScrollView>(null)
  const [index, setIndex] = useState(0)

  return (
    <YStack gap="$3" width="100%" maxW={720}>
      <ScrollView
        ref={scrollRef}
        horizontal
        showsHorizontalScrollIndicator={false}
        snapToInterval={CARD_W + GAP}
        decelerationRate="fast"
        onScroll={(e) =>
          setIndex(Math.round(e.nativeEvent.contentOffset.x / (CARD_W + GAP)))
        }
        scrollEventThrottle={32}
      >
        <XStack gap={GAP} px="$1" py="$2">
          {testimonials.map((t) => (
            <YStack
              key={t.id}
              width={CARD_W}
              p="$4"
              gap="$3"
              rounded="$6"
              bg="$color1"
              borderWidth={1}
              borderColor="$color4"
              hoverStyle={{ borderColor: '$color6' }}
            >
              <Text fontSize="$4" lineHeight="$5" color="$color12">
                “{t.quote}”
              </Text>
              <XStack items="center" gap="$2.5" pt="$1">
                <Avatar circular size="$3">
                  <Avatar.Image aria-label={t.name} src={t.img} />
                  <Avatar.Fallback bg="$color6" />
                </Avatar>
                <YStack>
                  <Text fontSize="$3" fontWeight="600" color="$color12">
                    {t.name}
                  </Text>
                  <Text fontSize="$2" color="$color10">
                    {t.role}
                  </Text>
                </YStack>
              </XStack>
            </YStack>
          ))}
        </XStack>
      </ScrollView>
      <XStack gap="$1.5" self="center">
        {testimonials.map((t, i) => (
          <View
            key={t.id}
            width={i === index ? 18 : 7}
            height={7}
            rounded={1000}
            bg={i === index ? '$color12' : '$color6'}
            transition="200ms"
          />
        ))}
      </XStack>
    </YStack>
  )
}

CarouselCards.fileName = 'CarouselCards'
