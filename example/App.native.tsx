import 'react-native-gesture-handler'

import { NavigationContainer } from '@react-navigation/native'
import { SchemeProvider, type SchemeSetting, setSchemeSetting } from '@vxrn/color-scheme'
import { useFonts } from 'expo-font'
import React from 'react'
import { Appearance, LogBox, useColorScheme } from 'react-native'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import { enableScreens } from 'react-native-screens'
import { isWeb } from 'tamagui'
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
        if (!isWeb) {
          setTimeout(() => {
            Appearance?.setColorScheme?.(next)
          }, 350)
        } else {
          setSchemeSetting(next as SchemeSetting)
        }
      },
    }
  }, [theme])

  if (!loaded) {
    return null
  }

  return (
    <SchemeProvider>
      <SafeAreaProvider>
        <ThemeContext.Provider value={themeContext}>
          <Provider defaultTheme={theme as any}>
            <NavigationContainer>
              <Navigation />
            </NavigationContainer>
          </Provider>
        </ThemeContext.Provider>
      </SafeAreaProvider>
    </SchemeProvider>
  )
}
