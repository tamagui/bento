import { useState } from 'react'
import { Card } from './components/radioParts'
import { Avatar, H3, Label, RadioGroup, Separator, Text, View } from 'tamagui'
import { useGroupMedia } from '../../hooks/useGroupMedia'

const data = {
  rs_americano: {
    checked: false,
    title: 'Americano',
    desc: 'Espresso with hot water',
    key: 'rs_americano',
    avatar: '/bento/images/coffee1.jpg',
  },
  rs_cappucino: {
    checked: false,
    title: 'Cappucino',
    desc: 'Espresso with steamed milk foam',
    key: 'rs_cappucino',
    avatar: '/bento/images/coffee2.jpg',
  },
  rs_espresso: {
    checked: false,
    title: 'Espresso',
    desc: 'A concentrated form of coffee served in shots',
    key: 'rs_espresso',
    avatar: '/bento/images/coffee3.jpg',
  },
  rs_flatWhite: {
    checked: false,
    title: 'Flat White',
    desc: 'Espresso with steamed milk',
    key: 'rs_flatWhite',
    avatar: '/bento/images/coffee4.jpg',
  },
  rs_latte: {
    title: 'Latte',
    checked: false,
    desc: 'Espresso with steamed milk',
    key: 'rs_latte',
    avatar: '/bento/images/coffee5.jpg',
  },
}

type Item = { checked: boolean; desc: string; title: string; key: string; avatar: string }

/** ------ EXAMPLE ------ */
export function RadioList() {
  const { sm } = useGroupMedia('window')

  const [selected, setSelected] = useState<string>()

  const items = Object.values(data)

  return (
    <View self="center" items="center" width="100%">
      <RadioGroup>
        <View py="$3" items="center">
          <H3>Drink</H3>
          <Text self="center" color="$color9">
            Select your favorite coffee
          </Text>
        </View>

        {sm && (
          <View width="100%" px="$2">
            <Separator width="100%" borderColor="$color5" />
          </View>
        )}

        <View width="100%" gap="$2" px="$2">
          {items.map((item, i) => (
            <Item
              setSelected={(next) => setSelected(next)}
              selected={selected === item.key}
              key={item.key + i}
              item={item}
            />
          ))}
        </View>
      </RadioGroup>
    </View>
  )
}

function Item({
  item,
  setSelected,
  selected,
}: {
  item: Item
  selected: boolean
  setSelected: (value: string) => void
}) {
  const { desc, title, key } = item
  return (
    <Card
      rounded='$4'
      p="$4"
      flexDirection="row"
      width="100%"
      gap="$3"
      active={selected}
      items="stretch"
      justify="space-between"
      onPress={() => {
        setSelected(key)
      }}
      borderWidth={1}
      borderColor="$color5"
      $group-window-sm={{
        borderWidth: 0,
        borderBottomWidth: 1,
        rounded: 0,
        py: '$4',
      }}
      animation="100ms"
    >
      <Avatar circular size="$4">
        <Avatar.Image accessibilityLabel="Cam" src={item.avatar} />
        <Avatar.Fallback backgroundColor="$background" />
      </Avatar>

      <View flex={10} self="stretch" gap="$0.5">
        <Label
          // visual offset of font to top
          mt={-2}
          mr="auto"
          size="$5"
          lineHeight="$4"
          htmlFor={key}
        >
          {title}
        </Label>
        <Text fontSize="$3" width="100%" color="$color10">
          {desc}
        </Text>
      </View>

      <View onPress={(e) => e.stopPropagation()}>
        <RadioGroup.Item id={key} value={key}>
          <RadioGroup.Indicator />
        </RadioGroup.Item>
      </View>
    </Card>
  )
}

RadioList.fileName = 'RadioList'
