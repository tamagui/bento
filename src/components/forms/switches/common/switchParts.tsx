import type { ColorTokens, FontSizeTokens, SizeTokens } from '@tamagui/core'
import { getSize } from '@tamagui/get-token'
import {
  createSwitch,
  View,
  getVariableValue,
  styled,
  getFontSize,
  useTheme,
  getVariable,
  useGetThemedIcon,
  withStaticProperties,
  SwitchStyledContext,
  type SwitchProps,
} from 'tamagui'

export const SwitchThumb = styled(View, {
  name: 'SwitchThumb',
  theme: 'accent',
  transition: 'quick',

  variants: {
    unstyled: {
      false: {
        size: '$true',
        backgroundColor: '#fff',
        borderRadius: 1000,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.15,
        shadowRadius: 2,
        elevation: 2,
        justify: 'center',
        items: 'center',
      },
    },

    checked: {
      true: {},
    },

    size: {
      '...size': (val) => {
        const size = getSwitchHeight(val)
        return {
          height: size,
          width: size,
        }
      },
    },
  } as const,

  defaultVariants: {
    unstyled: process.env.TAMAGUI_HEADLESS === '1' ? true : false,
  },
})

const getSwitchHeight = (val: SizeTokens) =>
  Math.round(getVariableValue(getSize(val)) * 0.65)

const getSwitchWidth = (val: SizeTokens) => getSwitchHeight(val) * 2

export const SwitchFrame = styled(View, {
  name: 'Switch',
  render: 'button',

  variants: {
    unstyled: {
      false: {
        position: 'relative',
        borderRadius: 1000,
        backgroundColor: '$background',
        borderWidth: 2,
        borderColor: '$background',

        focusStyle: {
          outlineColor: '$outlineColor',
          outlineStyle: 'solid',
          outlineWidth: 2,
        },
      },
    },

    checked: {
      true: {
        backgroundColor: '$green10',
      },
      false: {
        backgroundColor: '$red10',
      },
    },

    size: {
      '...size': (val) => {
        const height = getSwitchHeight(val) + 4
        const width = getSwitchWidth(val) + 4
        return {
          height,
          minHeight: height,
          width,
        }
      },
    },
  } as const,

  defaultVariants: {
    unstyled: process.env.TAMAGUI_HEADLESS === '1' ? true : false,
  },
})

const SwitchIconFrame = styled(View, {
  position: 'absolute',
  context: SwitchStyledContext,
  height: '100%',
  justify: 'center',
  items: 'center',
  variants: {
    placement: {
      right: (_, { props, tokens }) => {
        const amount = tokens.space[(props as any).size as any].val * 0.35
        return {
          right: amount,
        }
      },
      left: (_, { props, tokens }) => {
        const amount = tokens.space[(props as any).size as any].val * 0.35
        return {
          left: amount,
        }
      },
    },
    size: {
      '...size': {} as any,
    },
  } as const,
  defaultVariants: {
    placement: 'right',
  },
})

const getIconSize = (size: FontSizeTokens, scale: number) => {
  return (
    (typeof size === 'number' ? size * 0.5 : getFontSize(size as FontSizeTokens)) * scale
  )
}
export const SwitchIcon = SwitchIconFrame.styleable<{
  scaleIcon?: number
  color?: ColorTokens | string
}>((props, ref) => {
  const { children, color: colorProp, scaleIcon = 1.2, ...rest } = props
  const { size } = SwitchStyledContext.useStyledContext()

  const theme = useTheme()
  const color = getVariable(
    colorProp || theme[colorProp as any]?.get('web') || theme.color10?.get('web')
  )
  const iconSize = getIconSize(size as FontSizeTokens, scaleIcon)

  const getThemedIcon = useGetThemedIcon({
    size: iconSize,
    color: color as any,
  })
  return (
    <SwitchIconFrame ref={ref} {...rest}>
      {getThemedIcon(children)}
    </SwitchIconFrame>
  )
})

const SwitchComp = createSwitch({
  Frame: SwitchFrame,
  Thumb: SwitchThumb,
})

export const Switch = withStaticProperties(SwitchComp, {
  Icon: SwitchIcon,
})

export type { SwitchProps }
