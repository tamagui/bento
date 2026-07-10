import 'react-native-gesture-handler'

import {
  DarkTheme,
  DefaultTheme,
  NavigationContainer,
} from '@react-navigation/native'
import { useFonts } from 'expo-font'
import React from 'react'
import { Appearance, LogBox, useColorScheme } from 'react-native'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import { enableScreens } from 'react-native-screens'
import { Theme } from 'tamagui'
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
        setTheme(next)
        // keep the OS-level appearance in sync so system surfaces follow
        Appearance?.setColorScheme?.(next)
      },
    }
  }, [theme])

  if (!loaded) {
    return null
  }

  const activeTheme = theme === 'dark' ? 'dark' : 'light'

  return (
    <SafeAreaProvider>
      <ThemeContext.Provider value={themeContext}>
        <Provider defaultTheme={activeTheme}>
          {/* Theme applies dynamically; TamaguiProvider defaultTheme is initial-only */}
          <Theme name={activeTheme}>
            <NavigationContainer theme={activeTheme === 'dark' ? DarkTheme : DefaultTheme}>
              <Navigation />
            </NavigationContainer>
          </Theme>
        </Provider>
      </ThemeContext.Provider>
    </SafeAreaProvider>
  )
}
