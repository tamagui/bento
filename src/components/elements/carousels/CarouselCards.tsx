import { ChevronLeft, ChevronRight } from '@tamagui/lucide-icons-2'
import { ScrollView } from 'react-native'
import { Avatar, Button, Text, View, XStack, YStack, isWeb } from 'tamagui'
import { useReducedMotion } from '../../hooks'
import { useCarousel } from './common/useCarousel'

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
  const reducedMotion = useReducedMotion()
  const {
    goTo,
    index,
    interval,
    onItemLayout,
    onMomentumScrollEnd,
    onScroll,
    scrollRef,
  } = useCarousel(testimonials.length, CARD_W, GAP)

  return (
    <YStack
      gap="$3"
      width="100%"
      maxW={720}
      role={isWeb ? 'group' : undefined}
      aria-roledescription={isWeb ? 'carousel' : undefined}
      aria-label="Customer testimonials"
    >
      <ScrollView
        ref={scrollRef}
        horizontal
        showsHorizontalScrollIndicator={false}
        snapToInterval={interval}
        decelerationRate="fast"
        onScroll={onScroll}
        onMomentumScrollEnd={onMomentumScrollEnd}
        scrollEventThrottle={32}
      >
        <XStack gap={GAP} px="$1" py="$2">
          {testimonials.map((t, i) => (
            <YStack
              key={t.id}
              role={isWeb ? 'group' : undefined}
              aria-roledescription={isWeb ? 'slide' : undefined}
              aria-label={`Testimonial from ${t.name}, ${i + 1} of ${testimonials.length}`}
              width={CARD_W}
              maxW="80vw"
              p="$4"
              gap="$3"
              rounded="$6"
              bg="$color1"
              borderWidth={1}
              borderColor="$color4"
              hoverStyle={{ borderColor: '$color6' }}
              onLayout={i === 0 ? onItemLayout : undefined}
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
      <XStack items="center" justify="space-between">
        <Button
          aria-label="Previous testimonial"
          circular
          size="$3"
          hitSlop={isWeb ? undefined : 8}
          variant="outlined"
          opacity={index === 0 ? 0.4 : 1}
          disabled={index === 0}
          onPress={() => goTo(index - 1, !reducedMotion)}
          icon={<ChevronLeft size={16} />}
        />
        <XStack gap="$1">
          {testimonials.map((t, i) => (
            <Button
              key={t.id}
              aria-label={`Go to testimonial ${i + 1} from ${t.name}`}
              aria-current={i === index ? 'true' : undefined}
              unstyled
              cursor="pointer"
              hitSlop={isWeb ? undefined : 10}
              onPress={() => goTo(i, !reducedMotion)}
              p="$1.5"
            >
              <View
                width={i === index ? 18 : 7}
                height={7}
                rounded={1000}
                bg={i === index ? '$color12' : '$color6'}
                transition={reducedMotion ? undefined : '200ms'}
              />
            </Button>
          ))}
        </XStack>
        <Button
          aria-label="Next testimonial"
          circular
          size="$3"
          hitSlop={isWeb ? undefined : 8}
          variant="outlined"
          opacity={index === testimonials.length - 1 ? 0.4 : 1}
          disabled={index === testimonials.length - 1}
          onPress={() => goTo(index + 1, !reducedMotion)}
          icon={<ChevronRight size={16} />}
        />
      </XStack>
    </YStack>
  )
}

CarouselCards.fileName = 'CarouselCards'
