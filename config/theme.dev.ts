// Bento extends the v3 recipe tree with the extra color themes its examples use.
import { createThemes, getTheme, levels, tokens, tree } from '@tamagui/themes/builder'

const tint = (
  palette: 'blue' | 'gray' | 'orange' | 'pink' | 'purple' | 'teal',
  max: 2 | 4 = 2
) => ({
  palette,
  treatment: 'tint' as const,
  children: levels(max),
})

const themes = createThemes(
  tokens,
  {
    light: tree.light,
    dark: tree.dark,
    children: {
      ...tree.children,
      blue: tint('blue', 4),
      gray: tint('gray'),
      orange: tint('orange'),
      pink: tint('pink'),
      purple: tint('purple'),
      teal: tint('teal'),
    },
  },
  { getTheme }
)

export type TamaguiThemes = typeof themes

// production clients hydrate these values from server-rendered Tamagui CSS.
export const themeDev: TamaguiThemes =
  process.env.TAMAGUI_ENVIRONMENT === 'client' && process.env.NODE_ENV === 'production'
    ? ({} as TamaguiThemes)
    : themes
