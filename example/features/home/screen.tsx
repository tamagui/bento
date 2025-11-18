import { useNavigation } from '@react-navigation/native'
import { ChevronRight } from '@tamagui/lucide-icons'
import { ScrollView } from 'react-native'
import type { ListItemProps } from 'tamagui'
import { H1, ListItem, Separator, Text, YGroup, YStack } from 'tamagui'

export function HomeScreen() {
  const navigation = useNavigation()

  return (
    <ScrollView>
      <YStack bg="$color2" p="$3" pt="$6" pb="$8" f={1} space>
        <H1 fontFamily="$heading" size="$9">
          Bento
        </H1>
        <Text color="$color11" size="$5">
          Premium Tamagui components
        </Text>

        <YStack gap="$4" maw={600} mt="$4">
          {componentGroups.map((group, i) => {
            return (
              <YStack key={i} gap="$2">
                {group.label && (
                  <Text color="$color11" size="$3" fontWeight="600" px="$3">
                    {group.label}
                  </Text>
                )}
                <YGroup size="$4" separator={<Separator />}>
                  {group.items.map((item) => {
                    return (
                      <YGroup.Item key={item.id}>
                        <ListItem
                          bg="$color1"
                          pressTheme
                          size="$4"
                          onPress={() => navigation.navigate('component', { id: item.id })}
                          iconAfter={<ChevronRight color="$color10" />}
                        >
                          {item.title}
                        </ListItem>
                      </YGroup.Item>
                    )
                  })}
                </YGroup>
              </YStack>
            )
          })}
        </YStack>
      </YStack>
    </ScrollView>
  )
}

const componentGroups = [
  {
    label: 'Forms',
    items: [
      { title: 'Inputs', id: 'inputs' },
      { title: 'Checkboxes', id: 'checkboxes' },
      { title: 'Radio Groups', id: 'radiogroups' },
      { title: 'Switches', id: 'switches' },
      { title: 'Textareas', id: 'textareas' },
      { title: 'Form Layouts', id: 'layouts' },
    ],
  },
  {
    label: 'Elements',
    items: [
      { title: 'Avatars', id: 'avatars' },
      { title: 'Buttons', id: 'buttons' },
      { title: 'Chips', id: 'chips' },
      { title: 'Datepickers', id: 'datepickers' },
      { title: 'Dialogs', id: 'dialogs' },
      { title: 'Lists', id: 'list' },
      { title: 'Pickers', id: 'pickers' },
      { title: 'Tables', id: 'tables' },
    ],
  },
  {
    label: 'Shells',
    items: [
      { title: 'Navigation Bars', id: 'navbars' },
      { title: 'Tab Bars', id: 'tabbars' },
    ],
  },
  {
    label: 'Animations',
    items: [
      { title: 'Buttons', id: 'animation-buttons' },
      { title: 'Avatars', id: 'animation-avatars' },
      { title: 'Microinteractions', id: 'microinteractions' },
      { title: 'Slides', id: 'slide' },
    ],
  },
  {
    label: 'E-commerce',
    items: [
      { title: 'Payment', id: 'payment' },
      { title: 'Product Page', id: 'productpage' },
    ],
  },
  {
    label: 'User',
    items: [
      { title: 'Preferences', id: 'preferences' },
    ],
  },
]
