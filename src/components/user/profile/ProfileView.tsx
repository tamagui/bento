import { memo, useEffect, useState } from 'react'
import { type FlatListProps, SafeAreaView } from 'react-native'
import Animated, {
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  type SharedValue,
} from 'react-native-reanimated'
import {
  createStyledHOC,
  AnimatePresence,
  Button,
  getTokenValue,
  Image,
  Text,
  View,
  XStack,
  YStack,
  type TextProps,
  isWeb,
} from 'tamagui'
import { FlatList, Gesture, GestureDetector } from 'react-native-gesture-handler'
import { Share } from '@tamagui/lucide-icons-2'
import { useProfileScrollHandler } from './useProfileScrollHandler'

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

const NativeAnimatedFlatList = Animated.createAnimatedComponent(FlatList)
const AnimatedFlatList = (
  isWeb ? FlatList : NativeAnimatedFlatList
) as React.ComponentType<FlatListProps<Blog>>

const AnimatedViewFrame = createStyledHOC(
  View,
  (
    {
      forwardedRef,
      nativeID,
      ...props
    }: {
      forwardedRef?: any
      nativeID?: string
    },
    ref
  ) => (
    <View
      ref={forwardedRef || ref}
      {...props}
      {...(!isWeb && nativeID ? { nativeID } : {})}
    />
  )
)
const AnimatedView = Animated.createAnimatedComponent(AnimatedViewFrame)

type Blog = (typeof blogs)[number]

export const ProfileView = () => {
  const [followed, setFollowed] = useState(false)

  const scrollY = useSharedValue(0)

  const scrollHandler = useProfileScrollHandler(scrollY)

  const renderItem = ({ item }: { item: Blog }) => {
    return (
      <XStack gap="4" px="6" py="4">
        <Image rounded="8" width={78} height={78} src={item.image} />
        <YStack flex={1} gap="2">
          <Text fontSize="6" fontWeight="600" color="color11">
            {item.title}
          </Text>
          <Text fontFamily="mono" fontSize="4" fontWeight="400" color="color9">
            {item.minutesToRead} minutes
          </Text>
        </YStack>
      </XStack>
    )
  }

  return (
    <YStack width="100%" height="100%" maxW="gtMd:400px" bg="color6">
      <SafeAreaView />
      <YStack
        key="fake-stack"
        borderTopLeftRadius="10"
        borderTopRightRadius="10"
        width="100%"
        height={56}
        mb={-32}
        bg="color4"
      />

      <YStack
        overflow="hidden"
        rounded="10"
        width="100%"
        height="100%"
        bg="color2"
        flex={1}
      >
        <AnimatedFlatList
          onScroll={scrollHandler}
          ListHeaderComponent={() => (
            <YStack width="100%" p="6" gap="4">
              <AvatarView followed={followed} />

              <YStack pt="2">
                <Text fontWeight="900" fontFamily="mono" fontSize="10">
                  John Doe
                </Text>
                <Text color="color9" fontSize="5" fontFamily="silkscreen">
                  @john_doe
                </Text>
              </YStack>

              <HashText lineHeight="5" fontSize="5" color="color9">
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
}: {
  followed: boolean
  setFollowed: (followed: boolean) => void
}) => {
  return (
    <XStack pt="4" gap="4">
      <Button
        theme={followed ? 'accent' : 'red'}
        style={{ transition: 'background-color 200ms ease' }}
        flex={1}
        height="6"
        rounded="10"
        onPress={() => setFollowed(!followed)}
      >
        <AnimatePresence mode="wait">
          {followed ? (
            <Button.Text
              key={'Following'}
              y="enter:10px exit:10px"
              opacity="1 enter:0 exit:0"
              fontFamily="mono"
              fontWeight="bold"
              fontSize="5"
              style={{ transition: 'transform 150ms ease, opacity 150ms ease' }}
            >
              Following
            </Button.Text>
          ) : (
            <Button.Text
              key={'Follow'}
              fontFamily="mono"
              fontWeight="bold"
              fontSize="5"
              y="enter:-10px exit:-10px"
              opacity="1 enter:0 exit:0"
              style={{ transition: 'transform 150ms ease, opacity 150ms ease' }}
            >
              Follow
            </Button.Text>
          )}
        </AnimatePresence>
      </Button>

      <Button height="6" width="6" rounded="10">
        <Share />
      </Button>
    </XStack>
  )
}

const AvatarView = memo(
  ({ followed }: { followed: boolean }) => {
    const rotation = useSharedValue(0)

    const gesture = Gesture.Pan()
      .runOnJS(true)
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
    }, [rotation])

    useEffect(() => {
      rotation.value = withSpring(followed ? 2 : -2, {
        damping: 50,
        stiffness: 100,
        overshootClamping: true,
      })
    }, [followed])

    return (
      <GestureDetector gesture={gesture}>
        <View self="flex-start" boxShadow="0 -13px 18px color6">
          <AnimatedView
            key={'avatar'}
            width="12"
            height="12"
            rounded="8"
            overflow="hidden"
            bg="color1"
            borderWidth={3}
            borderColor="color1 dark:color"
            style={animatedStyle}
            position="relative"
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
    <XStack items="center" gap="2">
      {followerData.map((follower, index) => (
        <Image
          rounded="10"
          width="4"
          height="4"
          ml={index !== 0 ? -(getTokenValue('5') ?? 20) * 1.5 : undefined}
          key={follower.avatar}
          src={follower.avatar}
        />
      ))}
      <YStack gap="1">
        <Text
          style={{ transition: 'color 150ms ease' }}
          fontFamily="silkscreen"
          fontSize="8"
          fontWeight="bold"
          color="color11"
        >
          {follower}
        </Text>
        <Text fontFamily="mono" fontSize="4" fontWeight="500" color="color11">
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
  }, [scrollY])

  return (
    <AnimatedView
      position="absolute"
      bg="color1"
      t={0}
      l={0}
      r={0}
      style={header}
      p="4"
      items="center"
      justify="center"
      boxShadow="0 0 46px color5"
    >
      <XStack gap="2" items="center">
        <Image
          width={24}
          aspectRatio={1}
          rounded="2"
          src="https://tamagui.dev/bento/images/avatar_1.png"
        />
        <Text fontFamily="mono" fontSize="4" fontWeight="600" color="color11">
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
        <Text fontFamily="mono" fontWeight="600" key={hashtag}>
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
