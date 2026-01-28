import React from 'react'
import type { ThemeName } from 'tamagui'
import type { TransitionProp } from '@tamagui/web'
import { Button, Theme, View, styled } from 'tamagui'

type variants = {
  theme: ThemeName[]
  variant: 'bouncy' | 'lazy' | 'pulse' | 'accent' | 'bump'
  transition: TransitionProp
}
const themes: ThemeName[] = ['blue', 'purple', 'pink', 'red', 'orange', 'yellow', 'green']

const variants: variants[] = [
  {
    theme: themes,
    variant: 'pulse',
    transition: '100ms',
  },
  {
    theme: themes,
    variant: 'accent',
    transition: '100ms',
  },
  {
    theme: themes,
    variant: 'bouncy',
    transition: 'bouncy',
  },
  {
    theme: themes,
    variant: 'lazy',
    transition: 'medium',
  },
  {
    theme: themes,
    variant: 'bump',
    transition: 'bouncy',
  },
]

/** ------ EXAMPLE ------ */
export function ButtonPulse() {
  return (
    <View
      flexDirection="row"
      gap="$4"
      flexWrap="wrap"
      items="center"
      justify="center"
      maxW={850}
      $group-window-sm={{ p: '$6' }}
    >
      {variants.map((v) => (
        <React.Fragment key={v.variant}>
          {[...v.theme]
            .sort(() => Math.random() - 0.5)
            .map((theme) => (
              <Theme key={theme} name={theme}>
                <Theme name={v.variant === 'accent' ? 'accent' : undefined}>
                  <CustomButton animVariant={v.variant} transition={v.transition}>
                    <Button.Text>Press me</Button.Text>
                  </CustomButton>
                </Theme>
              </Theme>
            ))}
        </React.Fragment>
      ))}
    </View>
  )
}

const CustomButton = styled(Button, {
  variants: {
    animVariant: {
      pulse: {
        elevation: 15,
        pressStyle: {
          elevation: 2,
          scale: 0.95,
        },
      },
      accent: {
        elevation: 15,
        pressStyle: {
          elevation: 2,
          scale: 0.95,
        },
      },
      bouncy: {
        theme: 'alt1',
        elevation: 15,
        pressStyle: {
          elevation: 7,
          scale: 0.9,
        },
      },
      lazy: {
        elevation: 15,
        pressStyle: {
          elevation: 7,
          scale: 0.9,
        },
      },
      bump: {
        theme: 'surface1',
        elevation: 15,
        pressStyle: {
          elevation: 7,
          scale: 1.2,
        },
      },
    },
  } as const,
})

ButtonPulse.fileName = 'ButtonPulse'
