import { ChevronLeft, ChevronRight } from '@tamagui/lucide-icons-2'
import { useRef, useState } from 'react'
import { ScrollView } from 'react-native'
import { Button, Image, Text, View, XStack, YStack } from 'tamagui'

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
  const scrollRef = useRef<ScrollView>(null)
  const [index, setIndex] = useState(0)

  const goTo = (i: number) => {
    const next = Math.max(0, Math.min(slides.length - 1, i))
    setIndex(next)
    scrollRef.current?.scrollTo({ x: next * (SLIDE_W + GAP), animated: true })
  }

  return (
    <YStack gap="$3" width="100%" maxW={SLIDE_W + 80} items="center">
      <View width="100%" position="relative">
        <ScrollView
          ref={scrollRef}
          horizontal
          showsHorizontalScrollIndicator={false}
          snapToInterval={SLIDE_W + GAP}
          decelerationRate="fast"
          onScroll={(e) => {
            const x = e.nativeEvent.contentOffset.x
            setIndex(Math.round(x / (SLIDE_W + GAP)))
          }}
          scrollEventThrottle={32}
        >
          <XStack gap={GAP} px="$2">
            {slides.map((s) => (
              <View
                key={s.id}
                width={SLIDE_W}
                maxW="80vw"
                rounded="$6"
                overflow="hidden"
                position="relative"
                borderWidth={1}
                borderColor="$color4"
              >
                <Image
                  src={s.img}
                  width="100%"
                  height={230}
                  objectFit="cover"
                  aria-label={s.title}
                />
                <View
                  position="absolute"
                  b={0}
                  l={0}
                  r={0}
                  p="$3"
                  bg="rgba(0,0,0,0.45)"
                >
                  <Text color="white" fontWeight="600">
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
          size="$2.5"
          position="absolute"
          l="$2"
          t="50%"
          y={-16}
          bg="$color1"
          borderWidth={1}
          borderColor="$color5"
          opacity={index === 0 ? 0.4 : 1}
          disabled={index === 0}
          onPress={() => goTo(index - 1)}
          icon={<ChevronLeft size={16} />}
        />
        <Button
          aria-label="Next slide"
          circular
          size="$2.5"
          position="absolute"
          r="$2"
          t="50%"
          y={-16}
          bg="$color1"
          borderWidth={1}
          borderColor="$color5"
          opacity={index === slides.length - 1 ? 0.4 : 1}
          disabled={index === slides.length - 1}
          onPress={() => goTo(index + 1)}
          icon={<ChevronRight size={16} />}
        />
      </View>

      <XStack gap="$2" role="tablist" aria-label="Slides">
        {slides.map((s, i) => (
          <Button
            key={s.id}
            role="tab"
            aria-label={`Go to slide ${i + 1}`}
            aria-selected={i === index}
            unstyled
            cursor="pointer"
            onPress={() => goTo(i)}
            p="$1"
          >
            <View
              width={i === index ? 20 : 8}
              height={8}
              rounded={1000}
              bg={i === index ? '$color12' : '$color6'}
              transition="200ms"
            />
          </Button>
        ))}
      </XStack>
    </YStack>
  )
}

CarouselBasic.fileName = 'CarouselBasic'
