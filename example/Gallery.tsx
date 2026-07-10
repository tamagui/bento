// web component browser, url-driven so tests/screenshot sweeps can target any
// state directly:
//   /                          -> index of groups
//   /?group=chips              -> every item in the group, labeled
//   /?group=chips&item=Chips   -> just that item (screenshot mode)
import { ScrollView } from 'react-native'
import { Anchor, H1, H2, H3, Separator, Text, View, XStack, YStack } from 'tamagui'
import { componentMap, getGroupItems, groupIds } from './registry'

function GroupIndex() {
  return (
    <ScrollView style={{ width: '100%', height: '100%' }}>
      <YStack width="100%" maxW={900} self="center" p="$6" gap="$4">
        <H1 size="$9">Bento</H1>
        <Text color="$color11">
          {groupIds.length} groups ·{' '}
          {groupIds.reduce((acc, g) => acc + getGroupItems(g).length, 0)} components
        </Text>
        <YStack gap="$2" pt="$4">
          {groupIds.map((id) => (
            <XStack key={id} gap="$3" items="center">
              <Anchor href={`/?group=${id}`} fontSize="$6">
                {id}
              </Anchor>
              <Text color="$color10" fontSize="$3">
                {getGroupItems(id).length}
              </Text>
            </XStack>
          ))}
        </YStack>
      </YStack>
    </ScrollView>
  )
}

function ItemFrame({ name, children }: { name: string; children: any }) {
  return (
    <YStack gap="$3" width="100%">
      <XStack items="center" gap="$3">
        <H3 size="$5" color="$color11">
          {name}
        </H3>
        <Separator />
      </XStack>
      <View
        width="100%"
        items="center"
        justify="center"
        py="$4"
        data-testid={`item-${name}`}
      >
        {children}
      </View>
    </YStack>
  )
}

export function Gallery() {
  const params = new URLSearchParams(window.location.search)
  const group = params.get('group')
  const item = params.get('item')

  if (!group) return <GroupIndex />

  const items = getGroupItems(group)
  if (!items.length) {
    return (
      <YStack flex={1} items="center" justify="center" gap="$3">
        <H2>Unknown group: {group}</H2>
        <Anchor href="/">Back to index</Anchor>
      </YStack>
    )
  }

  const shown = item ? items.filter(([name]) => name === item) : items

  return (
    <ScrollView style={{ width: '100%', height: '100%' }}>
      <YStack width="100%" maxW={1000} self="center" p="$6" gap="$8">
        {!item && (
          <XStack items="center" gap="$4">
            <Anchor href="/" color="$color10">
              ← index
            </Anchor>
            <H1 size="$8">{group}</H1>
          </XStack>
        )}
        {shown.map(([name, Component]) => (
          <ItemFrame key={name} name={name}>
            <Component />
          </ItemFrame>
        ))}
      </YStack>
    </ScrollView>
  )
}
