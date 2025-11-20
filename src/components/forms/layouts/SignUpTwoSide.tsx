import { Check, ChevronDown, ChevronUp } from '@tamagui/lucide-icons'
import { LinearGradient } from '@tamagui/linear-gradient'
import { useId, useMemo, useState } from 'react'
import { Input } from '../inputs/components/inputsParts'
import {
  Adapt,
  Button,
  H1,
  Image,
  Label,
  RadioGroup,
  Select,
  Separator,
  Sheet,
  Text,
  Spacer,
  View,
  debounce,
} from 'tamagui'
import { Checkboxes } from '../checkboxes/common/checkboxParts'

const notifications = [
  {
    title: 'Books',
    desc: 'Get notified when new books are published',
  },
  {
    title: 'Courses',
    desc: 'Get notified when new courses are published',
  },
  {
    title: 'Events',
    desc: 'Get notified when new events are published',
  },
]

/** ------ EXAMPLE ------ */

export function SignUpTwoSideScreen() {
  const uniqueId = useId()
  const [marriageState, setMarriageState] = useState('single')

  const [values, setValues] = useState({
    Books: false,
    Courses: false,
    Events: false,
  })

  // Note: debounce is used to prevent multiple state updates that could toggle previous values
  const toggleValues = debounce((values: any) => {
    setValues((prev) => ({ ...prev, ...values }))
  }, 10)

  return (
    <View flexDirection="row" width="100%" minH="100%">
      <View
        flexDirection="column"
        shrink={1}
        grow={3}
        gap="$4"
        $group-window-gtXs={{
          px: '$8',
        }}
      >
        <H1 size="$9" fontWeight="bold">
          Basic Details
        </H1>
        <Separator mx="$-4" />
        <View
          flexDirection="row"
          justify="space-between"
          flexWrap="wrap"
          gap="$4"
          $group-window-gtXs={{
            gap: '$8',
          }}
        >
          <View
            flexDirection="column"
            gap="$4"
            flex={1}
            minW="100%"
            $group-window-gtSm={{ flexBasis: 200, minW: 'inherit' }}
          >
            <View flexDirection="column" gap="$1">
              <Input size="$4">
                <Input.Label htmlFor={uniqueId + '1-first-name'}>First Name</Input.Label>
                <Input.Box>
                  <Input.Area id={uniqueId + '1-first-name'} placeholder="First name" />
                </Input.Box>
              </Input>
            </View>
            <View flexDirection="column" gap="$1">
              <Input size="$4">
                <Input.Label htmlFor={uniqueId + '1-last-name'}>Last Name</Input.Label>
                <Input.Box>
                  <Input.Area id={uniqueId + '1-last-name'} placeholder="Last name" />
                </Input.Box>
              </Input>
            </View>
            <View flexDirection="column" gap="$1">
              <Input.Label htmlFor={uniqueId + '1-marital-status'}>
                Marital Status
              </Input.Label>
              <RadioGroup
                gap="$8"
                flexDirection="row"
                value={marriageState}
                onValueChange={setMarriageState}
                id={uniqueId + '1-marital-status'}
              >
                <View flexDirection="row" items="center" gap="$3">
                  <RadioGroup.Item id={uniqueId + 'single'} value="single">
                    <RadioGroup.Indicator />
                  </RadioGroup.Item>

                  <Input.Label htmlFor={uniqueId + 'single'}>Single</Input.Label>
                </View>
                <View flexDirection="row" items="center" gap="$3">
                  <RadioGroup.Item id={uniqueId + 'married'} value="married">
                    <RadioGroup.Indicator />
                  </RadioGroup.Item>

                  <Input.Label htmlFor={uniqueId + 'married'}>Married</Input.Label>
                </View>
              </RadioGroup>
            </View>
            <View flexDirection="column" gap="$1">
              <Input.Label htmlFor={uniqueId + 'country'}>Country</Input.Label>
              <CountrySelect data={countries} id={uniqueId + 'country'} />
            </View>
            <Input size="$4">
              <Input.Label htmlFor={uniqueId + '1-city'}>City</Input.Label>
              <Input.Box>
                <Input.Area id={uniqueId + '1-city'} placeholder="City" />
              </Input.Box>
            </Input>
          </View>
          <View flexDirection="column" gap="$4" flex={1} flexBasis={200}>
            <Input size="$4">
              <Input.Label htmlFor={uniqueId + '1-depart'}>Department</Input.Label>
              <Input.Box>
                <Input.Area id={uniqueId + '1-depart'} placeholder="Department" />
              </Input.Box>
            </Input>
            <View flexDirection="column" gap="$1">
              <Input size="$4">
                <Input.Label htmlFor={uniqueId + '1-email'}>Email</Input.Label>
                <Input.Box>
                  <Input.Area
                    textContentType="emailAddress"
                    keyboardType="email-address"
                    inputMode="email"
                    id={uniqueId + '1-email'}
                    placeholder="email@example.com"
                  />
                </Input.Box>
              </Input>
            </View>
            <Checkboxes
              values={values}
              onValuesChange={(values) => toggleValues(values)}
              flexDirection="column"
              mt="$3"
              gap="$2.5"
            >
              <Input.Label htmlFor={uniqueId + 'single'}>
                Receive notifications
              </Input.Label>
              <Checkboxes.FocusGroup>
                <Checkboxes.Group>
                  {notifications.map((item) => {
                    const { title, desc } = item
                    return (
                      <Checkboxes.FocusGroup.Item value={title} key={title}>
                        <Checkboxes.Group.Item>
                          <Checkboxes.Card
                            flexDirection="column"
                            key={title}
                            justify="space-between"
                            pb="$3"
                            pt="$-3"
                            mb={-1}
                            borderBottomWidth={1}
                            borderBottomColor="$color5"
                          >
                            <View
                              flexDirection="row"
                              items="center"
                              justify="space-between"
                            >
                              <Label htmlFor={title} lineHeight={'unset'}>
                                {title}
                              </Label>
                              <Checkboxes.Checkbox id={title}>
                                <Checkboxes.Checkbox.Indicator>
                                  <Check />
                                </Checkboxes.Checkbox.Indicator>
                              </Checkboxes.Checkbox>
                            </View>
                            <Text fontSize="$4" theme="accent">
                              {desc}
                            </Text>
                          </Checkboxes.Card>
                        </Checkboxes.Group.Item>
                      </Checkboxes.FocusGroup.Item>
                    )
                  })}
                </Checkboxes.Group>
              </Checkboxes.FocusGroup>
            </Checkboxes>
            <Button
              themeInverse
              self="flex-end"
              width="$12"
              mt="$2.5"
              mb="$2"
              $sm={{
                width: '100%',
                mt: '$4',
                mb: '$6',
              }}
            >
              <Button.Text>Save</Button.Text>
            </Button>
          </View>
        </View>
      </View>
    </View>
  )
}

SignUpTwoSideScreen.fileName = 'SignUpTwoSide'

const countries = [
  { name: 'Spain', flag: 'ES' },
  { name: 'Japan', flag: 'JP' },
  { name: 'China', flag: 'CN' },
  { name: 'Korea', flag: 'KR' },
  { name: 'United States', flag: 'US' },
  { name: 'Italy', flag: 'IT' },
  { name: 'Portugal', flag: 'PT' },
  { name: 'France', flag: 'FR' },
  { name: 'Saudi Arabia', flag: 'SA' },
  { name: 'Germany', flag: 'DE' },
  { name: 'Russia', flag: 'RU' },
].map((item) => ({
  ...item,
  flag: `https://flagsapi.com/${item.flag}/flat/64.png`,
  shortName: item.flag,
}))

function CountrySelect({ data, id }: { data: typeof countries; id: string }) {
  const [val, setVal] = useState('0')

  const selectedItem = data[Number(val)]

  return (
    <Select id={id} value={val} onValueChange={setVal} disablePreventBodyScroll>
      <Select.Trigger width="100%" iconAfter={ChevronDown}>
        <View flexDirection="row" gap="$3" justify="center" items="center">
          <Image source={{ uri: selectedItem.flag }} width={20} height={20} />
          <Text mr="auto">{`${selectedItem.name} ${
            selectedItem.shortName ? `(${selectedItem.shortName})` : ''
          }`}</Text>
        </View>
      </Select.Trigger>

      <Adapt when="maxMd" platform="touch">
        <Sheet
          modal
          dismissOnSnapToBottom
          animationConfig={{
            type: 'timing',
            duration: 350,
          }}
        >
          <Sheet.Frame>
            <Sheet.ScrollView>
              <Adapt.Contents />
            </Sheet.ScrollView>
          </Sheet.Frame>
          <Sheet.Overlay
            animation="lazy"
            enterStyle={{ opacity: 0 }}
            exitStyle={{ opacity: 0 }}
          />
        </Sheet>
      </Adapt>

      <Select.Content zIndex={200000}>
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
          // animation="quick"
          // animateOnly={['transform', 'opacity']}
          // enterStyle={{ opacity: 0, y: -10 }}
          // exitStyle={{ opacity: 0, y: 10 }}
          minW={200}
        >
          <Select.Group>
            {/* for longer lists memoizing these is useful */}
            {useMemo(
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
                      <Image source={{ uri: item.flag }} width={20} height={20} />
                      <Text mr="auto">{`${item.name} ${
                        item.shortName ? `(${item.shortName})` : ''
                      }`}</Text>
                      <Select.ItemIndicator marginLeft="auto">
                        <Check size={16} />
                      </Select.ItemIndicator>
                    </Select.Item>
                  )
                }),
              [data]
            )}
          </Select.Group>
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
