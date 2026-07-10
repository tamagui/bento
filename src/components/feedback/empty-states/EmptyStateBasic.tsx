import { Inbox } from '@tamagui/lucide-icons-2'
import { Button, H3, Paragraph, View, YStack } from 'tamagui'

export function EmptyStateBasic() {
  return (
    <YStack
      render="output"
      aria-label="Empty inbox"
      width="100%"
      maxW={520}
      self="center"
      items="center"
      gap="$3"
      p="$8"
      rounded="$8"
      borderWidth={1}
      borderColor="$borderColor"
      bg="$background"
    >
      <View p="$3" rounded={1000} bg="$color3">
        <Inbox size={28} color="$color10" />
      </View>
      <H3 text="center">Nothing here yet</H3>
      <Paragraph text="center" color="$color10" maxW={360}>
        New projects will appear here as soon as your team creates them.
      </Paragraph>
      <Button mt="$2" theme="accent" aria-label="Create your first project">
        Create project
      </Button>
    </YStack>
  )
}

EmptyStateBasic.fileName = 'EmptyStateBasic'
