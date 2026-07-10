import { useNavigation } from '@react-navigation/native'
import { ChevronRight } from '@tamagui/lucide-icons-2'
import { ScrollView } from 'react-native'
import { H1, ListItem, Separator, Text, YGroup, YStack } from 'tamagui'
import { sections as componentGroups } from '../../registry'

export function HomeScreen() {
  const navigation = useNavigation()

  return (
    <ScrollView>
      <YStack bg="$color2" p="$3" pt="$6" pb="$8" flex={1} gap="$4">
        <H1 fontFamily="$heading" size="$9">
          Bento
        </H1>
        <Text color="$color11">Premium Tamagui components</Text>

        <YStack gap="$4" maxW={600} mt="$4">
          {componentGroups.map((group, i) => {
            return (
              <YStack key={i} gap="$2">
                {group.label && (
                  <Text color="$color11" fontWeight="600" px="$3">
                    {group.label}
                  </Text>
                )}
                <YGroup size="$4">
                  {group.items.map((item) => {
                    return (
                      <YGroup.Item key={item.id}>
                        <ListItem
                          bg="$color1"
                          size="$4"
                          onPress={() =>
                            // @ts-expect-error
                            navigation.navigate('component', { id: item.id })
                          }
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
