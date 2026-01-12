import { Globe2, Search, X } from '@tamagui/lucide-icons'
import type { SizeTokens } from 'tamagui'
import { Adapt, Popover, ScrollView, Sheet, Spinner, Text, View, isWeb } from 'tamagui'
import { Input } from './components/inputsParts'
import type React from 'react'
import { useState, useMemo, useEffect } from 'react'
import {
  getSupportedRegionCodes,
  parsePhoneNumber,
  getCountryCodeForRegionCode,
} from 'awesome-phonenumber'
import { RovingFocusGroup } from '@tamagui/roving-focus'

/**
 * in case you want to integrate it with zod validation, following snippet can be used
 *
 *   const isPhoneNumber = (ph: string) => parsePhoneNumber(ph)?.valid;
 *   const phoneNumberSchema = z.string().refine(isPhoneNumber, (val) => ({message: `${val} is not a valid phone number`}));
 *   const MySchema = z.object({ phone_number: phoneNumberSchema })
 *
 **/

interface PhoneCode {
  name: string
  flag: string
}

// Convert country code to flag emoji (e.g., "US" -> "🇺🇸")
function countryCodeToFlag(countryCode: string): string {
  const codePoints = countryCode
    .toUpperCase()
    .split('')
    .map((char) => 127397 + char.charCodeAt(0))
  return String.fromCodePoint(...codePoints)
}

const phoneCodes: PhoneCode[] = getSupportedRegionCodes().map((code) => {
  return {
    name: code,
    flag: countryCodeToFlag(code),
  }
})

type RegionFilterInputProps = {
  setRegionCode: (regionCode: string) => void
  setOpen: (open: boolean) => void
  open: boolean
}

function RegionFilterInput(props: RegionFilterInputProps) {
  const { setRegionCode, setOpen, open } = props
  const [filter, setFilter] = useState('')
  const [reset, setReset] = useState(0)

  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    let timeoutId
    if (open) {
      timeoutId = setTimeout(() => {
        setLoaded(true)
      }, 200)
    } else setLoaded(false)
    return () => {
      if (timeoutId) {
        clearTimeout(timeoutId)
      }
    }
  }, [open])

  const phoneCodesFiltered = useMemo(() => {
    return phoneCodes.filter((item) => {
      return item.name.toLowerCase().includes(filter.toLowerCase())
    })
  }, [filter])

  return (
    <RovingFocusGroup
      flexDirection="column"
      gap="$3"
      pt="$4"
      height="100%"
      width="100%"
      bg="$color1"
    >
      <Input mx="$3" size="$2">
        <Input.Box>
          <Input.Area
            // Note: when key changes, the input remounts and the value will be reset
            // we can achive better performance using this approach instead binding the value to state
            key={reset}
            width="100%"
            rounded={0}
            placeholder="Search"
            defaultValue={filter}
            onChangeText={setFilter}
          />
          <Input.Icon
            onPress={() => {
              setFilter('')
              setReset(reset === 0 ? 1 : 0)
            }}
            pointerEvents="auto"
            z={10}
            theme="alt1"
          >
            {filter ? <X /> : <Search />}
          </Input.Icon>
        </Input.Box>
      </Input>

      {open && (
        <ScrollView height="100%">
          {loaded ? (
            <>
              {phoneCodesFiltered.map((item) => {
                return (
                  <RovingFocusGroup.Item
                    key={item.name}
                    {...(isWeb && {
                      onKeyDown: (e: React.KeyboardEvent) => {
                        if (e.key === 'Enter') {
                          setRegionCode(item.name)
                          setOpen(false)
                        }
                      },
                    })}
                    focusStyle={{
                      outlineColor: '$outlineColor',
                      outlineOffset: -2,
                    }}
                  >
                    <View
                      group="item"
                      flexDirection="row"
                      items="center"
                      gap="$3"
                      px="$4"
                      py="$2"
                      borderWidth={0}
                      borderBottomWidth={1}
                      borderColor="$borderColor"
                      cursor="pointer"
                      hoverStyle={{
                        bg: '$color2',
                      }}
                      focusStyle={{
                        bg: '$color2',
                      }}
                      onPress={() => {
                        setRegionCode(item.name)
                        setOpen(false)
                      }}
                    >
                      <Text fontSize="$5">{item.flag}</Text>
                      <Text
                        color="$color10"
                        $group-item-hover={{
                          color: '$color12',
                        }}
                        mr="auto"
                      >
                        {item.name}
                      </Text>
                    </View>
                  </RovingFocusGroup.Item>
                )
              })}
            </>
          ) : (
            <Spinner size="large" />
          )}
        </ScrollView>
      )}
    </RovingFocusGroup>
  )
}

type RegionSelectBoxProps = {
  regionCode: string
  setRegionCode: (regionCode: string) => void
  containerWidth?: number
}

function RegionSelectBox(props: RegionSelectBoxProps) {
  const { regionCode, setRegionCode, containerWidth } = props

  const [open, setOpen] = useState(false)

  const selectedItem = useMemo(
    () => phoneCodes.find((item) => item.name === regionCode)!,
    [regionCode]
  )

  return (
    <Popover
      offset={{
        mainAxis: 5,
      }}
      open={open}
      onOpenChange={setOpen}
      allowFlip
      placement="bottom-start"
      keepChildrenMounted
      {...props}
    >
      <Popover.Trigger>
        <Input.XGroup.Item>
          <Input.Button px="$2" onPress={() => setOpen(true)}>
            {regionCode ? (
              <Text fontSize="$5">{selectedItem.flag}</Text>
            ) : (
              <>
                <Globe2 color="$color10" width={20} height={20} />
              </>
            )}
          </Input.Button>
        </Input.XGroup.Item>
      </Popover.Trigger>

      <Adapt when="maxMd" platform="touch">
        <Sheet modal dismissOnSnapToBottom>
          <Sheet.Frame p="$4">
            <Adapt.Contents />
          </Sheet.Frame>
          <Sheet.Overlay
            transition="quick"
            opacity={0.8}
            enterStyle={{ opacity: 0 }}
            exitStyle={{ opacity: 0 }}
          />
        </Sheet>
      </Adapt>

      <Popover.Content
        width={containerWidth}
        borderWidth={1}
        height={300}
        borderColor="$borderColor"
        enterStyle={{ y: -10, opacity: 0 }}
        exitStyle={{ y: -10, opacity: 0 }}
        elevate
        transition={[
          'quick',
          {
            opacity: {
              overshootClamping: true,
            },
          },
        ]}
        p={0}
      >
        <RegionFilterInput open={open} setOpen={setOpen} setRegionCode={setRegionCode} />
      </Popover.Content>
    </Popover>
  )
}

/** ------ EXAMPLE ------ **/
export function PhoneInputExample({ size = '$4' }: { size?: SizeTokens }) {
  const [regionCode, setRegionCode] = useState('US')
  const [phoneNumber, setPhoneNumber] = useState('+1')
  const [isValid, setIsValid] = useState(false)
  const [containerWidth, setContainerWidth] = useState<number>()

  useEffect(() => {
    if (regionCode) {
      setPhoneNumber('+' + getCountryCodeForRegionCode(regionCode) + ' ')
    }
  }, [regionCode])

  const handlePhoneNumberChange = (text: string) => {
    text = !phoneNumber && text !== '+' ? `+${text}` : text
    const parsed = parsePhoneNumber(text)
    // Note: parsed object has a lot of info about the number
    if (parsed.regionCode) {
      setRegionCode(parsed.regionCode)
    } else {
      setRegionCode('')
    }
    setPhoneNumber(parsed.number?.international || text)
    setIsValid(parsed.valid)
  }
  return (
    <View flexDirection="column" height={100}>
      <Input size={size} gapScale={0.5}>
        <Input.Box
          onLayout={(e) => {
            setContainerWidth(e.nativeEvent.layout.width)
          }}
          self="center"
          theme={isValid ? 'green' : undefined}
        >
          <Input.Section>
            <RegionSelectBox
              containerWidth={containerWidth}
              regionCode={regionCode}
              setRegionCode={setRegionCode}
            />
          </Input.Section>
          <Input.Section>
            <Input.Area
              keyboardType="numeric"
              value={phoneNumber}
              onChangeText={handlePhoneNumberChange}
              placeholder="Copy this text"
            />
          </Input.Section>
        </Input.Box>
      </Input>
    </View>
  )
}

PhoneInputExample.fileName = 'PhoneInput'
