import type { SharedValue } from 'react-native-reanimated'
import { useEvent } from 'tamagui'

export function useProfileScrollHandler(scrollY: SharedValue<number>) {
  return useEvent((event: { nativeEvent: { contentOffset: { y: number } } }) => {
    scrollY.value = event.nativeEvent.contentOffset.y
  })
}
