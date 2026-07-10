import '@tamagui/core/reset.css'

import { setUserScheme, useUserScheme } from '@vxrn/color-scheme'
import { View, YStack } from 'tamagui'
import { Provider } from '../src/components/provider/Provider'
import { Gallery } from './Gallery'

if (typeof require !== 'undefined') {
  globalThis['React'] = require('react') // webpack
}

const App = () => {
  const params = new URLSearchParams(window.location.search)
  const userScheme = useUserScheme()

  const centered = params.has('centered')
  // ?theme=dark|light for screenshot sweeps
  const forcedTheme = params.get('theme')
  if (forcedTheme === 'dark' || forcedTheme === 'light') {
    setUserScheme(forcedTheme)
  }

  return (
    <Provider defaultTheme={(forcedTheme ?? userScheme.value) as any}>
      <link href="/fonts/inter.css" rel="stylesheet" />

      <style
        type="text/css"
        dangerouslySetInnerHTML={{
          __html: `
            html, body, #root { height: 100vh; width: 100vw; display: flex; align-items: center; justify-content: center;}
          `,
        }}
      />

      <YStack fullscreen width="100%" items="center" bg="$background">
        <YStack
          {...(centered && {
            items: 'center',
            justify: 'center',
          })}
          flex={1}
          width="100%"
          height="100%"
        >
          <Gallery />
        </YStack>
      </YStack>
    </Provider>
  )
}

export default App
