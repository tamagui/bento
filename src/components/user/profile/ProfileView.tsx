import { memo, useEffect, useState } from 'react'
import { type FlatListProps, SafeAreaView } from 'react-native'
import Animated, {
  interpolate,
  useAnimatedScrollHandler,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  type SharedValue,
} from 'react-native-reanimated'
import {
  AnimatePresence,
  Button,
  getTokenValue,
  Image,
  Text,
  View,
  XStack,
  YStack,
  type TextProps,
} from 'tamagui'
import { FlatList, Gesture, GestureDetector } from 'react-native-gesture-handler'
import { Share } from '@tamagui/lucide-icons'

const blogs = [
  {
    id: 1,
    title: 'The most insightful stories about JavaScript',
    image: 'https://tamagui.dev/bento/images/avatar_1.png',
    minutesToRead: 5,
  },
  {
    id: 2,
    title: 'Catch all the highlights',
    image: 'https://tamagui.dev/bento/images/avatar_1.png',
    minutesToRead: 10,
  },
]

// @ts-ignore react 19 has issue with type here
const AnimatedFlatList = Animated.createAnimatedComponent<FlatListProps<Blog>>(FlatList)

const AnimatedView = Animated.createAnimatedComponent(View)

type Blog = (typeof blogs)[number]

export const ProfileView = () => {
  const [followed, setFollowed] = useState(false)

  const scrollY = useSharedValue(0)

  const scrollHandler = useAnimatedScrollHandler((event) => {
    scrollY.value = event.contentOffset.y
  })

  const renderItem = ({ item }: { item: Blog }) => {
    return (
      <XStack gap="$4" px="$6" py="$4">
        <Image rounded="$8" width={78} height={78} src={item.image} />
        <YStack flex={1} gap="$2">
          <Text fontSize="$6" fontWeight="600" color="$color12">
            {item.title}
          </Text>
          <Text fontFamily="$mono" fontSize="$4" fontWeight="400" color="$color10">
            {item.minutesToRead} minutes
          </Text>
        </YStack>
      </XStack>
    )
  }

  return (
    <YStack width="100%" height="100%" $gtMd={{ maxW: 400 }} bg="$color6">
      <SafeAreaView />
      <YStack
        key="fake-stack"
        borderTopLeftRadius="$10"
        borderTopRightRadius="$10"
        width="100%"
        height={56}
        mb={-32}
        bg="$color4"
      />

      <YStack
        overflow="hidden"
        rounded="$10"
        width="100%"
        height="100%"
        bg="$color2"
        flex={1}
      >
        <AnimatedFlatList
          onScroll={scrollHandler}
          ListHeaderComponent={() => (
            <YStack width="100%" p="$6" gap="$4">
              <AvatarView followed={followed} />

              <YStack pt="$2">
                <Text fontWeight="900" fontFamily="$mono" fontSize="$10">
                  John Doe
                </Text>
                <Text color="$color10" fontSize="$5" fontFamily="$silkscreen">
                  @john_doe
                </Text>
              </YStack>

              <HashText lineHeight="$5" fontSize="$5" color="$color10">
                🚀 Built my first full-stack app from scratch, learned TypeScript, and
                dove deep into React Native #CodeLife #DevJourney
              </HashText>

              <Follower followed={followed} />

              <ButtonGroup followed={followed} setFollowed={setFollowed} />
            </YStack>
          )}
          data={blogs}
          renderItem={renderItem}
          keyExtractor={(item: Blog) => item.title}
          scrollEventThrottle={16}
        />

        <Header scrollY={scrollY} />
      </YStack>
    </YStack>
  )
}

const ButtonGroup = ({
  followed,
  setFollowed,
}: { followed: boolean; setFollowed: (followed: boolean) => void }) => {
  return (
    <XStack pt="$4" gap="$4">
      <Button
        theme={followed ? 'accent' : 'red'}
        transition="200ms"
        flex={1}
        height="$6"
        rounded="$10"
        onPress={() => setFollowed(!followed)}
      >
        <AnimatePresence exitBeforeEnter>
          {followed ? (
            <Button.Text
              key={'Following'}
              enterStyle={{
                opacity: 0,
                y: 10,
              }}
              exitStyle={{
                opacity: 0,
                y: 10,
              }}
              opacity={1}
              transition="bouncy"
              fontFamily="$mono"
              fontWeight="bold"
              fontSize="$5"
            >
              Following
            </Button.Text>
          ) : (
            <Button.Text
              key={'Follow'}
              fontFamily="$mono"
              fontWeight="bold"
              fontSize="$5"
              enterStyle={{
                opacity: 0,
                y: -10,
              }}
              exitStyle={{
                opacity: 0,
                y: -10,
              }}
              opacity={1}
              transition="bouncy"
            >
              Follow
            </Button.Text>
          )}
        </AnimatePresence>
      </Button>

      <Button height="$6" width="$6" rounded="$10">
        <Share />
      </Button>
    </XStack>
  )
}

const AvatarView = memo(
  ({ followed }: { followed: boolean }) => {
    const rotation = useSharedValue(0)

    const gesture = Gesture.Pan()
      .onUpdate((event) => {
        rotation.value = event.translationX / 100
      })
      .onEnd(() => {
        rotation.value = withSpring(0)
      })

    const animatedStyle = useAnimatedStyle(() => {
      return {
        transform: [
          { perspective: 1000 },
          { rotateY: `${rotation.value * 180}deg` },
          {
            rotate: '3deg',
          },
        ],
      }
    })

    useEffect(() => {
      rotation.value = withSpring(followed ? 2 : -2, {
        damping: 50,
        stiffness: 100,
        overshootClamping: true,
      })
    }, [followed])

    return (
      <GestureDetector gesture={gesture}>
        <View
          self="flex-start"
          shadowColor="$color6"
          shadowOffset={{ width: 0, height: '$-3' }}
          shadowOpacity={1}
          shadowRadius="$4"
        >
          <AnimatedView
            key={'avatar'}
            width="$12"
            height="$12"
            rounded="$8"
            overflow="hidden"
            bg="$color1"
            borderWidth={3}
            borderColor="$color1"
            $theme-dark={{
              borderColor: '$color',
            }}
            style={animatedStyle}
          >
            <Image
              key="avatar"
              position="absolute"
              backfaceVisibility="hidden"
              height="100%"
              width="100%"
              src="https://tamagui.dev/bento/images/avatar_1.png"
            />
          </AnimatedView>
        </View>
      </GestureDetector>
    )
  },
  (prevProps, nextProps) => prevProps.followed === nextProps.followed
)

const followerData = [
  {
    avatar: 'https://tamagui.dev/bento/images/avatar_2.png',
  },
  {
    avatar: 'https://tamagui.dev/bento/images/avatar_3.png',
  },
]

const Follower = ({ followed }: { followed: boolean }) => {
  const [follower, setFollower] = useState(99)

  useEffect(() => {
    setFollower((prev) => (followed ? prev + 1 : prev))
  }, [followed])

  return (
    <XStack items="center" gap="$2">
      {followerData.map((follower, index) => (
        <Image
          rounded="$10"
          key={follower.avatar}
          width="$4"
          height="$4"
          ml={index !== 0 ? -(getTokenValue('$5') ?? 20) * 1.5 : undefined}
          src={follower.avatar}
        />
      ))}
      <YStack gap="$1">
        <Text
          transition="quick"
          fontFamily="$silkscreen"
          fontSize="$8"
          fontWeight="bold"
          color="$color12"
        >
          {follower}
        </Text>
        <Text fontFamily="$mono" fontSize="$4" fontWeight="500" color="$color12">
          Followers
        </Text>
      </YStack>
    </XStack>
  )
}

const Header = ({ scrollY }: { scrollY: SharedValue<number> }) => {
  const header = useAnimatedStyle(() => {
    return {
      opacity: interpolate(scrollY.value, [100, 164], [0, 1]),
    }
  })

  return (
    <AnimatedView
      position="absolute"
      bg="$color1"
      t={0}
      l={0}
      r={0}
      style={header}
      p="$4"
      items="center"
      justify="center"
      shadowColor="$color5"
      shadowOffset={{ width: 0, height: 0 }}
      shadowOpacity={1}
      shadowRadius="$8"
    >
      <XStack gap="$2" items="center">
        <Image
          width={24}
          aspectRatio={1}
          rounded="$2"
          src="https://tamagui.dev/bento/images/avatar_1.png"
        />
        <Text fontFamily="$mono" fontSize="$4" fontWeight="600" color="$color12">
          John Doe
        </Text>
      </XStack>
    </AnimatedView>
  )
}

const HashText = ({ children, ...props }: { children: string } & TextProps) => {
  const { mainText, hashtags } = splitTextAndHashtags(children)

  return (
    <Text {...props}>
      {mainText}
      {hashtags.map((hashtag) => (
        <Text fontFamily="$mono" fontWeight="600" key={hashtag}>
          {' '}
          {hashtag}
        </Text>
      ))}
    </Text>
  )
}
const splitTextAndHashtags = (text: string) => {
  // Split text into words
  const words = text.split(' ')

  // Separate hashtags and regular text
  const hashtags: string[] = []
  const regularWords: string[] = []

  words.forEach((word) => {
    if (word.startsWith('#')) {
      hashtags.push(word)
    } else {
      regularWords.push(word)
    }
  })

  return {
    mainText: regularWords.join(' '),
    hashtags: hashtags,
  }
}
