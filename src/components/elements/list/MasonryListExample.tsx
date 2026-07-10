import type { FC, ReactElement } from 'react'
import { useMemo } from 'react'
import { Button, Image, Text, View, type ThemeName } from 'tamagui'

import { Hash, MapPin, ShoppingBag } from '@tamagui/lucide-icons-2'
import { useContainerDim } from '../../hooks/useContainerDim'
import { Chip } from '../chips/components/chipsParts'
import { MasonryList } from './components/MasonryList'
import type { Product } from './data/products'
import { useData } from './data/products'

const colors = ['red', 'green', 'blue', 'purple', 'pink', 'orange']

const ProductItem: FC<{ item: Product }> = ({ item }) => {
  const heightFactor = useMemo(() => Math.random() < 0.5, [])

  return (
    <View flexDirection="column" key={item.id} mb="$6" flex={1} gap="$2.5">
      <View
        flexDirection="column"
        position="relative"
        rounded="$8"
        shadowColor="$shadowColor"
        shadowRadius={5}
        overflow="hidden"
        style={{ transition: 'transform 150ms ease' }}
        cursor="pointer"
      >
        <Image
          src={item.image}
          height={heightFactor ? 200 : 350}
          objectFit="cover"
          bg="$backgroundPress"
        />
        <View
          flex={1}
          height="100%"
          items="center"
          justify="center"
          position="absolute"
          rounded="$8"
          hoverStyle={{
            backdropFilter: 'blur(15px)',
            bg: '$background04',
          }}
          pressStyle={{
            backdropFilter: 'blur(15px)',
            bg: '$background04',
          }}
          style={{
            transition: 'background-color 250ms ease, backdrop-filter 250ms ease',
          }}
        >
          <Text
            flex={1}
            color="$color12"
            opacity={0}
            hoverStyle={{ opacity: 1 }}
            pressStyle={{ opacity: 1 }}
            style={{ transition: 'opacity 250ms ease' }}
            p={'$4'}
          >
            {item.desc}
          </Text>
        </View>
      </View>

      <View flexDirection="column" gap="$2">
        <Text
          color="$color12"
          fontSize="$4"
          fontWeight="600"
          $gtMd={{
            fontSize: '$8',
            lineHeight: '$6',
          }}
        >
          {item.name}
        </Text>

        <View flexDirection="row" items="center" justify="space-between" gap="$2">
          <View flex={1} flexDirection="row" items="center" gap="$2" theme="alt1">
            <MapPin size="$1" color="$color10" />
            <Text numberOfLines={2} color="$color10" fontSize="$3">
              {item.city}
            </Text>
          </View>
          <Text
            color="$color11"
            theme="green"
            $gtMd={{
              fontSize: '$6',
              fontWeight: '600',
            }}
          >
            ${Math.floor(Number(item.price) / 10)}
          </Text>
        </View>

        <View
          flexDirection="row"
          flexWrap="wrap"
          items="center"
          justify="space-between"
          gap="$2"
        >
          <Chip
            circular
            width="auto"
            maxW="50%"
            size="$2"
            bg="$color4"
            theme={`${colors[Math.floor(Math.random() * colors.length)]}` as ThemeName}
          >
            <Chip.Icon color="$color9">
              <Hash />
            </Chip.Icon>
            <Chip.Text numberOfLines={1} color="$color9">
              {item.category}
            </Chip.Text>
          </Chip>

          <Button theme="accent" size="$2.5" icon={ShoppingBag}>
            Add
          </Button>
        </View>
      </View>
    </View>
  )
}

export const MasonryListExample = () => {
  const { data } = useData()
  const { width: deviceWidth } = useContainerDim('window')
  const numberOfColumns = Math.max(Math.round(deviceWidth / 300), 2)

  const renderItem = ({
    item,
  }: {
    item: (typeof data)[0]
    i: number
  }): ReactElement => {
    return <ProductItem item={item} />
  }

  return (
    <View flex={1} $gtMd={{ maxH: 800 }}>
      <MasonryList
        flex={1}
        keyExtractor={(item): string => item.id}
        ListHeaderComponent={<View />}
        $gtMd={{ p: '$4' }}
        gap="$4"
        key={numberOfColumns}
        numColumns={numberOfColumns}
        data={data}
        //@ts-ignore
        renderItem={renderItem}
      />
    </View>
  )
}

MasonryListExample.fileName = 'MasonryListExample'
