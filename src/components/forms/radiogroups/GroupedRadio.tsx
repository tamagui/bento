import { useState } from 'react'
import { Avatar, Label, RadioGroup, Text, YGroup, View, useEvent } from 'tamagui'
import { Card } from './components/radioParts'

const items = [
  {
    title: 'PayPal',
    description: 'You will be redirected to the PayPal website',
    id: 'gr-paypal',
    image: `https://i.pravatar.cc/150?img=20`,
  },
  {
    title: 'Mastercard',
    description: 'Mastercard secure code is a private code for you',
    id: 'gr-mastercard',
    image: `https://i.pravatar.cc/150?img=20`,
  },
  {
    title: 'Visa',
    description: 'This is a secure 128-bit SSL encrypted payment',
    id: 'gr-visa',
    image: `https://i.pravatar.cc/150?img=20`,
  },
]

type Item = (typeof items)[number]

/** ------ EXAMPLE ------ */
export function GroupedRadio() {
  const [value, setValue] = useState('gr-paypal')
  return (
    <View
      flexDirection="column"
      items="center"
      justify="center"
      minW={'100%'}
      $group-window-sm={{
        px: '$4',
        py: '$6',
      }}
    >
      <RadioGroup value={value} onValueChange={setValue} minWidth="100%">
        <YGroup rounded="$6" data-hover>
          {items.map((item) => (
            <Item
              item={item}
              key={item.id}
              selected={value === item.id}
              setValue={setValue}
            />
          ))}
        </YGroup>
      </RadioGroup>
    </View>
  )
}

GroupedRadio.fileName = 'GroupedRadio'

function Item({
  selected,
  setValue,
  item,
}: {
  selected: boolean
  setValue: (value: string) => void
  item: Item
}) {
  const { description, id, image, title } = item
  const onPress = useEvent(() => setValue(id))
  return (
    <YGroup.Item>
      <Card
        flexDirection="row"
        active={selected}
        p="$4"
        gap="$4"
        onPress={onPress}
        borderBottomWidth={1}
        mb={-1}
        $group-window-sm={{
          height: 110,
          items: 'flex-start',
        }}
      >
        <Avatar circular size="$5" $group-window-xs={{ size: '$4' }}>
          <Avatar.Image accessibilityLabel="Cam" src={image} />
          <Avatar.Fallback bg="$background" />
        </Avatar>
        <View flex={1} gap="$2">
          <View flexDirection="row" gap="$2">
            <View flexDirection="row" items="center" flex={1} gap="$2">
              <Label size="$6" fontWeight="500" lineHeight="$2" htmlFor={id}>
                {title}
              </Label>
              <View
                theme="blue"
                rounded={100_000}
                bg="$color6"
                items="center"
                px="$2"
                py="$1"
              >
                <Text color="$color10" fontSize="$3" fontWeight="$1">
                  Verified
                </Text>
              </View>
            </View>
            <View onPress={(e) => e.stopPropagation()}>
              <RadioGroup.Item marginLeft="auto" id={id} value={id}>
                <RadioGroup.Indicator />
              </RadioGroup.Item>
            </View>
          </View>
          <View maxW="80%">
            <Text
              wordWrap="break-word"
              fontSize="$3"
              lineHeight="$3"
              fontWeight="300"
              color="$color9"
            >
              {description}
            </Text>
          </View>
        </View>
      </Card>
    </YGroup.Item>
  )
}
