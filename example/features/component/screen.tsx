import { useRoute } from '@react-navigation/native'
import { ScrollView } from 'react-native'
import { YStack, H2, Separator, Text } from 'tamagui'
import { componentMap } from '../../registry'

type ComponentRouteProp = {
  key: string
  name: string
  params: {
    id: string
  }
}

export function ComponentScreen() {
  const route = useRoute<ComponentRouteProp>()
  const componentId = route.params?.id

  const componentGroup = componentMap[componentId]

  if (!componentGroup) {
    return (
      <YStack flex={1} justify="center" items="center" p="4" gap="4">
        <H2>Component not found: {componentId}</H2>
        <Text>Available components:</Text>
        <Text>{Object.keys(componentMap).join(', ')}</Text>
      </YStack>
    )
  }

  // Get all exported components from the group
  const componentKeys = Object.keys(componentGroup)

  // "ChatConversation" -> "Chat Conversation"
  const prettyName = (name: string) =>
    name.replace(/([a-z0-9])([A-Z])/g, '$1 $2').replace(/([A-Z]+)([A-Z][a-z])/g, '$1 $2')

  return (
    <ScrollView>
      <YStack bg="color2" p="4" flex={1} gap="4" group="window">
        {componentKeys.map((key, index) => {
          const Component = componentGroup[key]

          if (!Component || typeof Component !== 'function') {
            return null
          }

          return (
            <YStack key={key} gap="2">
              <H2 size="6" color="color11" textTransform="none">
                {prettyName(key)}
              </H2>
              <YStack bg="color1" p="4" rounded="4">
                <Component />
              </YStack>
              {index < componentKeys.length - 1 && <Separator my="2" />}
            </YStack>
          )
        })}
      </YStack>
    </ScrollView>
  )
}
