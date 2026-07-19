import { getSize } from '@tamagui/get-token'
import {
  getVariableValue,
  RadioGroup as TRadioGroup,
  styled,
  View,
  withStaticProperties,
} from 'tamagui'

// v3 ships RadioGroup unstyled, so bento carries the skin. Reproduces the v2
// RadioGroupItemFrame: a circle sized at half the size token, themed
// background, 1px border and the hover/press/focus states.
//
// withStaticProperties does an in-place Object.assign, so these have to be
// captured before the export below - otherwise wrapping the imported
// RadioGroup overwrites tamagui's own RadioGroup.Item for every consumer and
// the wrapper recurses into itself.
const BaseRadioGroupItem = TRadioGroup.Item
const BaseRadioGroupIndicator = TRadioGroup.Indicator

type RadioItemProps = React.ComponentProps<typeof BaseRadioGroupItem> & {
  scaleSize?: number
}

function RadioGroupItem({ scaleSize = 0.5, ...props }: RadioItemProps) {
  const size = Math.floor(getVariableValue(getSize(props.size ?? true)) * scaleSize)
  return (
    <BaseRadioGroupItem
      width={size}
      height={size}
      borderRadius={1000}
      backgroundColor="$background"
      items="center"
      justify="center"
      borderWidth={1}
      borderColor="$borderColor"
      p={0}
      hoverStyle={{ borderColor: '$borderColorHover', backgroundColor: '$backgroundHover' }}
      focusStyle={{ borderColor: '$borderColorHover', backgroundColor: '$backgroundHover' }}
      focusVisibleStyle={{
        outlineStyle: 'solid',
        outlineWidth: 2,
        outlineColor: '$outlineColor',
      }}
      pressStyle={{ borderColor: '$borderColorFocus', backgroundColor: '$backgroundFocus' }}
      {...props}
    />
  )
}

function RadioGroupFrame(props: React.ComponentProps<typeof TRadioGroup>) {
  return <TRadioGroup {...props} />
}

export const RadioGroup = withStaticProperties(RadioGroupFrame, {
  Item: RadioGroupItem,
  Indicator: BaseRadioGroupIndicator,
})

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
