import { type SharedValue, useAnimatedScrollHandler } from 'react-native-reanimated'

export function useProfileScrollHandler(scrollY: SharedValue<number>) {
  return useAnimatedScrollHandler((event) => {
    scrollY.value = event.contentOffset.y
  })
}
