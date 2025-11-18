import 'react-native-gesture-handler'

import { NavigationContainer } from '@react-navigation/native'
import { useFonts } from 'expo-font'
import React from 'react'
import { Appearance, LogBox, useColorScheme } from 'react-native'
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import { enableScreens } from 'react-native-screens'
import { Provider } from './components'
import { Navigation } from './Navigation'
import { ThemeContext } from './useThemeControl'

enableScreens()
LogBox.ignoreAllLogs()

export default function App() {
  const [theme, setTheme] = React.useState(Appearance.getColorScheme())
  const colorScheme = useColorScheme()

  const [loaded] = useFonts({
    Inter: require('@tamagui/font-inter/otf/Inter-Medium.otf'),
    InterBold: require('@tamagui/font-inter/otf/Inter-Bold.otf'),
  })

  React.useLayoutEffect(() => {
    setTheme(colorScheme)
  }, [colorScheme])

  const themeContext = React.useMemo(() => {
    return {
      value: theme,
      set: (next) => {
        Appearance.setColorScheme(next)
        setTheme(next)
      },
    }
  }, [theme])

  if (!loaded) {
    return null
  }

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaProvider>
        <ThemeContext.Provider value={themeContext}>
          <Provider defaultTheme={theme as any}>
            <NavigationContainer>
              <Navigation />
            </NavigationContainer>
          </Provider>
        </ThemeContext.Provider>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  )
}
