import { GestureHandlerRootView } from 'react-native-gesture-handler'
import type { TamaguiProviderProps } from 'tamagui'

import { Provider as BentoProvider } from '../../src/components/provider/Provider'

// native app shell: gesture root + the same provider stack the web gallery
// uses (tamagui + scheme + toasts), so both platforms share one code path
export function Provider(props: Omit<TamaguiProviderProps, 'config'>) {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <BentoProvider {...props} />
    </GestureHandlerRootView>
  )
}
