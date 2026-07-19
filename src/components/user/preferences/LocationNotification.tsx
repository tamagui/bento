import { getFontSized } from '@tamagui/get-font-sized'
import { LinearGradient } from '@tamagui/linear-gradient'
import { Check, ChevronDown, ChevronUp, Info, Mail } from '@tamagui/lucide-icons-2'
import { useMemo, useState } from 'react'
import type { FontSizeTokens, SelectProps } from 'tamagui'
import {
  Adapt,
  Button,
  Image,
  Label,
  Select,
  Separator,
  Sheet,
  Theme,
  View,
  getTokenValue,
  styled,
  Text,
} from 'tamagui'
import { RadioGroup } from '../../forms/radiogroups/components/radioParts'

const languages = [
  { name: 'English', shortcut: 'EN', flag: 'US' },
  { name: 'Spanish', shortcut: 'ES', flag: 'ES' },
  { name: 'Italian', shortcut: 'IT', flag: 'IT' },
  { name: 'Portuguese', shortcut: 'PT', flag: 'PT' },
  { name: 'French', shortcut: 'FR', flag: 'FR' },
  { name: 'Arabic', shortcut: 'AR', flag: 'SA' },
  { name: 'German', shortcut: 'DE', flag: 'DE' },
  { name: 'Russian', shortcut: 'RU', flag: 'RU' },
  { name: 'Japanese', shortcut: 'JA', flag: 'JP' },
  { name: 'Chinese', shortcut: 'ZH', flag: 'CN' },
  { name: 'Korean', shortcut: 'KO', flag: 'KR' },
]

const countries = [
  { name: 'Japan', flag: 'JP' },
  { name: 'China', flag: 'CN' },
  { name: 'Korea', flag: 'KR' },
  { name: 'Spain', flag: 'ES' },
  { name: 'United States', flag: 'US' },
  { name: 'Italy', flag: 'IT' },
  { name: 'Portugal', flag: 'PT' },
  { name: 'France', flag: 'FR' },
  { name: 'Saudi Arabia', flag: 'SA' },
  { name: 'Germany', flag: 'DE' },
  { name: 'Russia', flag: 'RU' },
]

const languagesArray = Array.from({ length: 10 }, (_, i) => ({
  name: languages[i].name,
  shortcut: languages[i].shortcut,
  flag: `https://flagsapi.com/${languages[i].flag}/flat/64.png`,
}))

const locationsArray = Array.from({ length: 10 }, (_, i) => ({
  name: countries[i].name,
  flag: `https://flagsapi.com/${countries[i].flag}/flat/64.png`,
}))

type DataItem = {
  name: string
  shortcut?: string
  flag: string
}

function GeneralSelect({ data, ...rest }: SelectProps & { data: DataItem[] }) {
  const [val, setVal] = useState('0')

  const selectedItem = data[Number(val)]

  const selectList = useMemo(
    () =>
      data.map((item, i) => {
        return (
          <Select.Item
            index={i}
            key={item.name}
            gap="$3"
            value={`${i}`}
            justify="center"
            items="center"
          >
            <Image src={item.flag} width={20} height={20} />
            <SizableText mr="auto">{`${item.name} ${
              item.shortcut ? `(${item.shortcut})` : ''
            }`}</SizableText>
            <Select.ItemIndicator marginLeft="auto">
              <Check size={16} />
            </Select.ItemIndicator>
          </Select.Item>
        )
      }),
    [data]
  )

  return (
    <Select
      id="food"
      value={val}
      onValueChange={setVal}
      disablePreventBodyScroll
      zIndex={200000}
      {...rest}
    >
      <Select.Trigger width="100%" iconAfter={ChevronDown} rounded="$4">
        <View flexDirection="row" gap="$3" justify="center" items="center">
          <Image src={selectedItem.flag} width={20} height={20} />
          <SizableText mr="auto">{`${selectedItem.name} ${
            selectedItem.shortcut ? `(${selectedItem.shortcut})` : ''
          }`}</SizableText>
        </View>
      </Select.Trigger>

      <Adapt when="maxMd" platform="touch">
        <Sheet dismissOnSnapToBottom>
          <Sheet.Frame>
            <Sheet.ScrollView>
              <Adapt.Contents />
            </Sheet.ScrollView>
          </Sheet.Frame>
          <Sheet.Overlay
            transition="lazy"
            enterStyle={{ opacity: 0 }}
            exitStyle={{ opacity: 0 }}
          />
        </Sheet>
      </Adapt>

      <Select.Content>
        <Select.ScrollUpButton
          items="center"
          justify="center"
          position="relative"
          width="100%"
          height="$3"
        >
          <View flexDirection="column" z={10}>
            <ChevronUp size={20} />
          </View>
          <LinearGradient
            start={[0, 0]}
            end={[0, 1]}
            fullscreen
            colors={['$background', 'transparent']}
            rounded="$4"
          />
        </Select.ScrollUpButton>

        <Select.Viewport
          // to do animations:
          // transition="quick"
          // animateOnly={['transform', 'opacity']}
          // enterStyle={{ opacity: 0, y: -10 }}
          // exitStyle={{ opacity: 0, y: 10 }}
          minW={200}
          borderWidth={1}
          borderColor="$borderColor"
          rounded="$4"
        >
          <Select.Group>{selectList}</Select.Group>
        </Select.Viewport>

        <Select.ScrollDownButton
          items="center"
          justify="center"
          position="relative"
          width="100%"
          height="$3"
        >
          <View flexDirection="column" z={10}>
            <ChevronDown size={20} />
          </View>
          <LinearGradient
            start={[0, 0]}
            end={[0, 1]}
            fullscreen
            colors={['transparent', '$background']}
            rounded="$4"
          />
        </Select.ScrollDownButton>
      </Select.Content>
    </Select>
  )
}

/** ------ EXAMPLE ------ */
export function LocationNotification() {
  return (
    <View
      flexDirection="column"
      gap="$4"
      p="$4"
      rounded={10}
      bg="$background"
      width={520}
      maxW="100%"
      borderWidth={1.5}
      borderColor="$borderColor"
      shadowColor="$shadowColor"
      shadowRadius="$4"
      $group-window-xs={{
        borderWidth: 0,
        shadowColor: 'transparent',
      }}
    >
      <View
        flexDirection="row"
        gap="$4"
        width="100%"
        $group-window-xs={{
          gap: '$3',
        }}
      >
        <Button icon={Mail} circular variant="outlined" />
        <View flexDirection="column" shrink={1}>
          <SizableText size="$5">Update your Email Preferences</SizableText>
          <Theme name="alt1">
            <SizableText size="$3">
              Set your language and delivery preferences below.
            </SizableText>
          </Theme>
        </View>
      </View>
      {/* minus margin will cancel padding */}
      <Separator mx="$-4" />
      <View flexDirection="column" gap="$4">
        <View flexDirection="column" gap="$1">
          <Label size="$4" lineHeight="$1" htmlFor="select-language" fontWeight="600">
            Language:
          </Label>
          <GeneralSelect id="select-language" data={languagesArray} />
        </View>
        <View flexDirection="column" gap="$1">
          <Label size="$4" lineHeight="$1" htmlFor="select-location" fontWeight="600">
            Location:
          </Label>
          <GeneralSelect id="select-location" data={locationsArray} />
          <Theme name="alt1">
            <SizableText size="$3">
              Please choose a location for relevant information.
            </SizableText>
          </Theme>
        </View>
      </View>
      <Separator mx="$-4" />
      <View flexDirection="column" gap="$4">
        <RadioList />
        <Theme name="green">
          <Banner>Change your email preferences at any time</Banner>
        </Theme>
      </View>
      <Separator mx="$-4" />
      <View flexDirection="row" gap="$3">
        <Button flex={1}>
          <Button.Text>Cancel</Button.Text>
        </Button>

        <Button theme="accent" flex={1}>
          <Button.Text>Save</Button.Text>
        </Button>
      </View>
    </View>
  )
}

LocationNotification.fileName = 'LocationNotification'

const Banner = ({
  size = '$3',
  children,
}: { size?: FontSizeTokens; children?: React.ReactNode }) => {
  return (
    <View
      flexDirection="row"
      items="center"
      bg="$color7"
      p={size}
      gap={size}
      rounded="$4"
    >
      <Info size={getTokenValue(size as any, 'size') * 0.5} />
      <SizableText size={size}>{children}</SizableText>
    </View>
  )
}

export const SizableText = styled(Text, {
  name: 'SizableText',
  fontFamily: '$body',

  variants: {
    size: {
      '...fontSize': getFontSized as any, // TODO: revisit after v2 migration
    },
  } as const,

  defaultVariants: {
    size: '$true',
  },
})
const radioData = [
  {
    title: 'Promotions',
    desc: 'Get notified of occasional deals and coupons.',
  },
  {
    title: 'The Weekly Update',
    desc: 'Development updates only in short form.',
  },
  {
    title: 'Big Announcements',
    desc: 'Updates about only major releases.',
  },
]

function RadioList() {
  const [value, setValue] = useState(radioData[0].title)
  return (
    <RadioGroup value={value} onValueChange={setValue}>
      <View flexDirection="column" gap="$3">
        {radioData.map(({ title, desc }) => (
          <View
            flexDirection="column"
            key={title}
            onPress={() => setValue(title)}
            borderWidth="$0.5"
            borderColor={title === value ? '$color7' : '$color4'}
            cursor="pointer"
            rounded="$7"
            p="$4"
          >
            <View flexDirection="column">
              <View flexDirection="row" justify="space-between">
                <SizableText size="$5">{title}</SizableText>
                <RadioGroup.Item id={title} value={title}>
                  <RadioGroup.Indicator
                    unstyled
                    width="33%"
                    height="33%"
                    rounded={1000}
                    bg="$color"
                  />
                </RadioGroup.Item>
              </View>
            </View>
            <SizableText fontWeight="300" color="$color9" size="$4">
              {desc}
            </SizableText>
          </View>
        ))}
      </View>
    </RadioGroup>
  )
}
