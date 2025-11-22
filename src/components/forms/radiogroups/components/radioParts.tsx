import { View, styled } from 'tamagui'

export const Card = styled(View, {
  cursor: 'pointer',
  width: '100%',
  rounded: '$4',
  p: '$3',
  bg: '$background',
  borderColor: '$borderColor',
  borderWidth: 1,
  focusStyle: {
    bg: '$backgroundFocus',
    borderColor: '$borderColorFocus',
  },
  hoverStyle: {
    bg: '$backgroundHover',
    borderColor: '$borderColorHover',
  },

  ...(process.env.TAMAGUI_TARGET === 'web' && {
    pressStyle: {
      bg: '$backgroundPress',
      borderColor: '$borderColorPress',
    },
  }),

  variants: {
    active: {
      true: {
        bg: '$backgroundFocus',
        borderColor: '$borderColorFocus',
      },
    },
  } as const,
})
