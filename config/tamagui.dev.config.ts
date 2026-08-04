import { defaultConfig } from '@tamagui/config/v6'
import type { CreateTamaguiProps } from '@tamagui/core'
import { setupDev } from '@tamagui/core'
import { animations } from './animations'
import { bodyFont, headingFont, monoFont, silkscreenFont } from './fonts'
import { media, mediaQueryDefaultActive } from './media'
import { themeDev } from './theme.dev'

setupDev({
  visualizer: true,
})

const fonts = {
  heading: headingFont,
  body: bodyFont,
  mono: monoFont,
  silkscreen: silkscreenFont,
}

// use the v6 config as the base and override it with Bento's customizations
export const config = {
  ...defaultConfig,
  fonts,
  animations,
  themes: themeDev,
  media,
  settings: {
    ...defaultConfig.settings,
    defaultFont: 'body',
    mediaQueryDefaultActive,
    selectionStyles: (theme) => ({
      backgroundColor: theme.color5,
      color: theme.color11,
    }),
    allowedStyleValues: 'somewhat-strict-web',
    onlyAllowShorthands: false,
  },
} satisfies CreateTamaguiProps

// for site responsive demo, but we want no types
Object.assign(config.media, {
  tiny: { maxWidth: 500 },
  gtTiny: { minWidth: 500 + 1 },
  small: { maxWidth: 620 },
  gtSmall: { minWidth: 620 + 1 },
  medium: { maxWidth: 780 },
  gtMedium: { minWidth: 780 + 1 },
  large: { maxWidth: 900 },
  gtLarge: { minWidth: 900 + 1 },
})
