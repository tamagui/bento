import { config as configV3 } from '@tamagui/config/v3'
import { defaultConfig } from '@tamagui/config/v4'
import { createTamagui } from 'tamagui'
import { themes } from './theme'

const appConfig = createTamagui({
  ...defaultConfig,
  media: {
    ...defaultConfig.media,
    ...configV3.media,
  },
  themes: {
    ...defaultConfig.themes,
    ...themes,
  },
})

export type AppConfig = typeof appConfig

declare module 'tamagui' {
  // overrides TamaguiCustomConfig so your custom types
  // work everywhere you import `tamagui`
  interface TamaguiCustomConfig extends AppConfig {}

  interface TypeOverride {
    groupNames(): 'window' | 'listitem' | 'item'
  }
}

export default appConfig
