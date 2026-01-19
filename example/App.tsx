import '@tamagui/core/reset.css'

import { useUserScheme } from '@vxrn/color-scheme'
import { View, YStack } from 'tamagui'
import { Provider } from '../src/components/provider/Provider'

if (typeof require !== 'undefined') {
  globalThis['React'] = require('react') // webpack
}

const App = () => {
  const params = new URLSearchParams(window.location.search)
  const userScheme = useUserScheme()
  const theme = userScheme.value

  const centered = params.has('centered')

  return (
    <Provider defaultTheme={theme as any}>
      <link href="/fonts/inter.css" rel="stylesheet" />

      <style
        type="text/css"
        dangerouslySetInnerHTML={{
          __html: `
            html, body, #root { height: 100vh; width: 100vw; display: flex; align-items: center; justify-content: center;}
          `,
        }}
      />

      <YStack fullscreen width="100%" items="center">
        <View py="$12" width="100%" height="100%" maxW={1280}>
          <YStack
            {...(centered && {
              items: 'center',
              justify: 'center',
            })}
            flex={1}
            height="100%"
          ></YStack>
        </View>
      </YStack>
    </Provider>
  )
}

export default App
