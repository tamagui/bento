import Animated from 'react-native-reanimated'
import { Text, View, isWeb } from 'tamagui'

type AnimationProps = {
  forwardedRef?: any
  nativeID?: string
}

const ViewFrame = View.styleable<AnimationProps>(
  ({ forwardedRef, nativeID, ...props }, ref) => (
    <View
      ref={forwardedRef || ref}
      {...props}
      {...(!isWeb && nativeID ? { nativeID } : {})}
    />
  )
)

const TextFrame = Text.styleable<AnimationProps>(
  ({ forwardedRef, nativeID, ...props }, ref) => (
    <Text
      ref={forwardedRef || ref}
      {...props}
      {...(!isWeb && nativeID ? { nativeID } : {})}
    />
  )
)

export const AnimatedView = Animated.createAnimatedComponent(ViewFrame)
export const AnimatedText = Animated.createAnimatedComponent(TextFrame)
