import { getSize } from '@tamagui/get-token'
import type { RovingFocusGroupProps, RovingFocusItemProps } from '@tamagui/roving-focus'
import { RovingFocusGroup } from '@tamagui/roving-focus'
import type { KeyboardEvent, PropsWithChildren } from 'react'
import { forwardRef } from 'react'
import type { CheckedState, YStackProps } from 'tamagui'
import {
  CheckboxStyledContext,
  createStyledHOC,
  getVariableValue,
  Group,
  H2,
  Checkbox as TCheckbox,
  styled,
  useGetThemedIcon,
  useTheme,
  withStaticProperties,
  isWeb,
  createStyledContext,
  Label,
  View,
} from 'tamagui'

const CheckboxesContext = createStyledContext<{
  values: Record<string, boolean>
  onValuesChange: (values: Record<string, boolean>) => void
}>({
  values: {},
  onValuesChange: () => {},
})

const FocusGroup = forwardRef<React.ElementRef<typeof View>, RovingFocusGroupProps>(
  (props, ref) => {
    return (
      <RovingFocusGroup
        focusable
        outlineOffset={1}
        focusStyle={{
          z: 1000,
        }}
        {...props}
        ref={ref}
      />
    )
  }
)

const FocusItemContext = createStyledContext({
  value: '',
})

const FocusGroupItem = forwardRef<any, RovingFocusItemProps & { value: string }>(
  (props, ref) => {
    const { value, ...rest } = props
    const { values, onValuesChange } = CheckboxesContext.useStyledContext()

    const attrs = {
      focusable: true,
      outlineOffset: 1,
      flexShrink: 1,
      focusStyle: {
        z: 1,
      },
      ...(isWeb && {
        onKeyDown: (e: KeyboardEvent) => {
          if (e.key === 'Enter' || e.code === 'Space') {
            e.preventDefault()
            onValuesChange({ ...values, [value]: !values[value] })
          }
        },
      }),
      onPress: () => {
        onValuesChange({ ...values, [value]: !values[value] })
      },
      ...rest,
    }

    return (
      <FocusItemContext.Provider value={value}>
        <RovingFocusGroup.Item ref={ref} {...attrs} />
      </FocusItemContext.Provider>
    )
  }
)

const RadiusGroup = styled(Group, {
  orientation: 'vertical',
})

const Title = styled(H2, {
  size: '$8',
})

type CheckboxesProps<K extends string> = {
  values: Record<K, boolean>
  onValuesChange: (values: Record<K, boolean>) => void
} & YStackProps

const CheckboxesImp = <K extends string>(
  props: PropsWithChildren<CheckboxesProps<K>>
) => {
  const { values, onValuesChange, ...rest } = props

  return (
    <CheckboxesContext.Provider values={values} onValuesChange={onValuesChange}>
      <View {...rest} />
    </CheckboxesContext.Provider>
  )
}

// v3 ships Checkbox unstyled, so bento carries the skin. Reproduces the v2
// createCheckbox frame: a square at 45% of the size token, radius at an eighth
// of it, themed background, 1px border and the hover/press/focus states.
//
// Deliberately a plain wrapper, not styled(TCheckbox, ...). See
// forms/switches/common/switchParts.tsx for why styled() over a tamagui
// primitive that owns a styled context silently breaks it.
type CheckboxSkinProps = React.ComponentProps<typeof TCheckbox>

const checkboxSizeToken = (size: CheckboxSkinProps['size']) =>
  getVariableValue(getSize(size ?? true)) as number

const checkboxBox = (size: CheckboxSkinProps['size']) =>
  Math.round(checkboxSizeToken(size) * 0.45)

function CheckboxSkinFrame(props: CheckboxSkinProps) {
  const box = checkboxBox(props.size)
  return (
    <TCheckbox
      width={box}
      height={box}
      borderRadius={checkboxSizeToken(props.size) / 8}
      backgroundColor="$background"
      items="center"
      justify="center"
      borderWidth={1}
      borderColor="$borderColor"
      hoverStyle={{ borderColor: '$borderColorHover' }}
      pressStyle={{ backgroundColor: '$backgroundPress', borderColor: '$borderColorPress' }}
      focusStyle={{ borderColor: '$borderColorFocus' }}
      focusVisibleStyle={{
        outlineStyle: 'solid',
        outlineWidth: 2,
        outlineColor: '$outlineColor',
      }}
      // the checked fill the v2 Checkbox applied by default
      activeStyle={{ bg: '$backgroundActive' }}
      {...props}
    />
  )
}

// v2's createCheckbox sized and themed the indicator's icon off the checkbox
// size; v3's unstyled Indicator does not, so a bare <Check /> renders at
// lucide's 24px default and overflows the box.
const BaseCheckboxIndicator = TCheckbox.Indicator

function CheckboxIndicator({
  children,
  ...props
}: React.ComponentProps<typeof BaseCheckboxIndicator>) {
  const { size } = CheckboxStyledContext.useStyledContext()
  const theme = useTheme()
  const getThemedIcon = useGetThemedIcon({
    size: Math.round(checkboxBox(size) * 0.75),
    color: theme.color,
  })
  return (
    <BaseCheckboxIndicator {...props}>
      {getThemedIcon(children)}
    </BaseCheckboxIndicator>
  )
}

export const CheckboxSkin = withStaticProperties(CheckboxSkinFrame, {
  Indicator: CheckboxIndicator,
})

const Checkbox = createStyledHOC(TCheckbox)((props, ref) => {
  const { checked: userChecked, onCheckedChange, ...rest } = props
  const { values, onValuesChange } = CheckboxesContext.useStyledContext()
  const { value: focusItemValue } = FocusItemContext.useStyledContext()

  const attrs = {
    checked: values[focusItemValue],
    onCheckedChange: (checked: CheckedState) => {
      onValuesChange({
        ...values,
        [focusItemValue]:
          typeof checked === 'boolean' ? checked : !values[focusItemValue],
      })
    },
    ...rest,
  }

  return <CheckboxSkin ref={ref} value={focusItemValue} {...rest} {...attrs} />
})

type CardProps = {
  unstyled?: boolean
}

const CardFrame = styled(View, {
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
        backgroundColor: '$backgroundFocus',
        borderColor: '$borderColorFocus',
      },
    },
  } as const,
})

const Card = createStyledHOC(CardFrame)<CardProps>((props, ref) => {
  const { ...rest } = props
  const { values } = CheckboxesContext.useStyledContext()
  const { value } = FocusItemContext.useStyledContext()

  const selected = values[value]

  return <CardFrame ref={ref} active={selected} {...rest} />
})

export const Checkboxes = withStaticProperties(CheckboxesImp, {
  Group: withStaticProperties(RadiusGroup, {
    Item: Group.Item,
  }),
  /** FocusGroup is necessary for keyboard arrow navigation */
  FocusGroup: withStaticProperties(FocusGroup, {
    Item: FocusGroupItem,
  }),
  Title,
  Checkbox: withStaticProperties(Checkbox, {
    Indicator: CheckboxIndicator,
    Label,
  }),
  Card,
})
