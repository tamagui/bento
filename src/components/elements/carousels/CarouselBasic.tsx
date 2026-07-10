import { ChevronLeft, ChevronRight } from '@tamagui/lucide-icons-2'
import { ScrollView } from 'react-native'
import { Button, Image, Text, View, XStack, YStack, isWeb } from 'tamagui'
import { useReducedMotion } from '../../hooks'
import { useCarousel } from './common/useCarousel'

const slides = [
  { id: 1, title: 'Alpine Lake', img: 'https://picsum.photos/id/1018/800/450' },
  { id: 2, title: 'Foggy Forest', img: 'https://picsum.photos/id/1019/800/450' },
  { id: 3, title: 'Desert Dunes', img: 'https://picsum.photos/id/1015/800/450' },
  { id: 4, title: 'City Nights', img: 'https://picsum.photos/id/1016/800/450' },
]

const SLIDE_W = 420
const GAP = 16

/** ------ EXAMPLE ------ */
export function CarouselBasic() {
  const reducedMotion = useReducedMotion()
  const {
    goTo,
    index,
    interval,
    onItemLayout,
    onMomentumScrollEnd,
    onScroll,
    scrollRef,
  } = useCarousel(slides.length, SLIDE_W, GAP)

  const step = (direction: number) => goTo(index + direction, !reducedMotion)

  return (
    <YStack
      gap="$3"
      width="100%"
      maxW={SLIDE_W + 80}
      items="center"
      role={isWeb ? 'group' : undefined}
      aria-roledescription={isWeb ? 'carousel' : undefined}
      aria-label="Featured places"
      tabIndex={isWeb ? 0 : undefined}
      focusVisibleStyle={{
        outlineColor: '$outlineColor',
        outlineOffset: 2,
        outlineStyle: 'solid',
        outlineWidth: 2,
      }}
      onKeyDown={(event: any) => {
        if (!isWeb) return
        if (event.key === 'ArrowLeft') {
          event.preventDefault()
          step(-1)
        } else if (event.key === 'ArrowRight') {
          event.preventDefault()
          step(1)
        }
      }}
    >
      <View width="100%" position="relative">
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
          <XStack gap={GAP} px="$2">
            {slides.map((s, i) => (
              <View
                key={s.id}
                role={isWeb ? 'group' : undefined}
                aria-roledescription={isWeb ? 'slide' : undefined}
                aria-label={`${s.title}, ${i + 1} of ${slides.length}`}
                width={SLIDE_W}
                maxW="80vw"
                rounded="$6"
                overflow="hidden"
                position="relative"
                borderWidth={1}
                borderColor="$color4"
                onLayout={i === 0 ? onItemLayout : undefined}
              >
                <Image
                  src={s.img}
                  width="100%"
                  height={230}
                  objectFit="cover"
                  loading="lazy"
                  aria-label={s.title}
                />
                {/* scrim over the photo is deliberately theme-independent */}
                <View position="absolute" b={0} l={0} r={0} p="$3" bg="rgba(0,0,0,0.45)">
                  <Text color="$white1" fontWeight="600">
                    {s.title}
                  </Text>
                </View>
              </View>
            ))}
          </XStack>
        </ScrollView>

        <Button
          aria-label="Previous slide"
          circular
          size="$3"
          hitSlop={isWeb ? undefined : 8}
          position="absolute"
          l="$2"
          t="50%"
          y={-18}
          bg="$color1"
          borderWidth={1}
          borderColor="$color5"
          opacity={index === 0 ? 0.4 : 1}
          disabled={index === 0}
          onPress={() => step(-1)}
          icon={<ChevronLeft size={16} />}
        />
        <Button
          aria-label="Next slide"
          circular
          size="$3"
          hitSlop={isWeb ? undefined : 8}
          position="absolute"
          r="$2"
          t="50%"
          y={-18}
          bg="$color1"
          borderWidth={1}
          borderColor="$color5"
          opacity={index === slides.length - 1 ? 0.4 : 1}
          disabled={index === slides.length - 1}
          onPress={() => step(1)}
          icon={<ChevronRight size={16} />}
        />
      </View>

      <XStack gap="$2" aria-label="Choose slide">
        {slides.map((s, i) => (
          <Button
            key={s.id}
            aria-label={`Go to slide ${i + 1}, ${s.title}`}
            aria-current={i === index ? 'true' : undefined}
            unstyled
            cursor="pointer"
            hitSlop={isWeb ? undefined : 10}
            onPress={() => goTo(i, !reducedMotion)}
            p="$1.5"
          >
            <View
              width={i === index ? 20 : 8}
              height={8}
              rounded={1000}
              bg={i === index ? '$color12' : '$color6'}
              transition={reducedMotion ? undefined : '200ms'}
            />
          </Button>
        ))}
      </XStack>
      <Text
        render="output"
        aria-live="polite"
        position="absolute"
        width={1}
        height={1}
        opacity={0}
        overflow="hidden"
      >
        {`Slide ${index + 1} of ${slides.length}: ${slides[index].title}`}
      </Text>
    </YStack>
  )
}

CarouselBasic.fileName = 'CarouselBasic'
