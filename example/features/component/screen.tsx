import { useRoute } from '@react-navigation/native'
import { ScrollView } from 'react-native'
import { YStack, H2, Separator, Text } from 'tamagui'
import * as Components from '../../../src/components'

type RouteProp = {
  params: {
    id: string
  }
}

export function ComponentScreen() {
  const route = useRoute<RouteProp>()
  const componentId = route.params?.id

  const componentMap: Record<string, any> = {
    inputs: Components.Inputs,
    checkboxes: Components.Checkboxes,
    radiogroups: Components.Radiogroups,
    switches: Components.Switches,
    textareas: Components.Textareas,
    layouts: Components.Layouts,
    avatars: Components.Avatars,
    buttons: Components.Buttons,
    chips: Components.Chips,
    datepickers: Components.Datepickers,
    dialogs: Components.Dialogs,
    list: Components.List,
    pickers: Components.Pickers,
    tables: Components.Tables,
    navbars: Components.Navbars,
    tabbars: Components.Tabbars,
    'animation-buttons': Components.AnimationButtons,
    'animation-avatars': Components.AnimationAvatars,
    microinteractions: Components.Microinteractions,
    slide: Components.Slide,
    payment: Components.Payment,
    productpage: Components.Productpage,
    preferences: Components.Preferences,
  }

  const componentGroup = componentMap[componentId]

  if (!componentGroup) {
    return (
      <YStack f={1} jc="center" ai="center" p="$4" gap="$4">
        <H2>Component not found: {componentId}</H2>
        <Text>Available components:</Text>
        <Text>{Object.keys(componentMap).join(', ')}</Text>
      </YStack>
    )
  }

  // Get all exported components from the group
  const componentKeys = Object.keys(componentGroup)

  return (
    <ScrollView>
      <YStack bg="$color2" p="$4" f={1} space="$4">
        {componentKeys.map((key, index) => {
          const Component = componentGroup[key]

          if (!Component || typeof Component !== 'function') {
            return null
          }

          return (
            <YStack key={key} gap="$2">
              <H2 size="$6" color="$color12">
                {key}
              </H2>
              <YStack bg="$color1" p="$4" br="$4">
                <Component />
              </YStack>
              {index < componentKeys.length - 1 && <Separator my="$2" />}
            </YStack>
          )
        })}
      </YStack>
    </ScrollView>
  )
}
