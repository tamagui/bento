import type { ThemeName } from 'tamagui'

export const insets = {
  bottom: 24,
  top: 24,
  paddingTop: 32,
  paddingBottom: 32,
}

// 🍓🐙

export type Colors = {
  emoji: string
  theme: ThemeName
}

export const colors: Colors[] = [
  {
    emoji: '🦋',
    theme: 'blue',
  },
  {
    emoji: '🦄',
    theme: 'green',
  },
  {
    emoji: '🐝',
    theme: 'yellow',
  },
  {
    emoji: '🥑',
    theme: 'teal',
  },
  {
    emoji: '🌋',
    theme: 'red',
  },
]
