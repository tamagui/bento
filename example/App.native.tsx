import 'react-native-gesture-handler'

import { NavigationContainer } from '@react-navigation/native'
import { useFonts } from 'expo-font'
import { LogBox, useColorScheme } from 'react-native'
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import { enableScreens } from 'react-native-screens'
import { Provider } from './components'
import { Navigation } from './Navigation'

enableScreens()
LogBox.ignoreAllLogs()

export default function App() {
  const colorScheme = useColorScheme() ?? 'light'

  const [loaded] = useFonts({
    Inter: require('@tamagui/font-inter/otf/Inter-Medium.otf'),
    InterBold: require('@tamagui/font-inter/otf/Inter-Bold.otf'),
  })

  if (!loaded) {
    return null
  }

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaProvider>
        <Provider defaultTheme={colorScheme}>
          <NavigationContainer>
            <Navigation />
          </NavigationContainer>
        </Provider>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  )
}
