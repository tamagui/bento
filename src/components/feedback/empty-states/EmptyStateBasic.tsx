import { Inbox } from '@tamagui/lucide-icons-2'
import { toast } from 'tamagui'
import { Button, H3, Paragraph, View, YStack, isWeb } from 'tamagui'

export function EmptyStateBasic({
  title = 'Nothing here yet',
  description = 'New projects will appear here as soon as your team creates them.',
  actionLabel = 'Create project',
  onAction,
}: {
  title?: string
  description?: string
  actionLabel?: string
  onAction?: () => void
}) {
  return (
    <YStack
      render={isWeb ? 'section' : undefined}
      aria-label="Empty inbox"
      width="100%"
      maxW={520}
      self="center"
      items="center"
      gap="3"
      p="8"
      rounded="8"
      borderWidth={1}
      borderColor="border-color"
      bg="background"
    >
      <View p="3" rounded={1000} bg="color3">
        <Inbox size={28} color="color9" aria-hidden />
      </View>
      <H3 text="center">{title}</H3>
      <Paragraph text="center" color="color9" maxW={360}>
        {description}
      </Paragraph>
      <Button
        mt="2"
        theme="accent"
        aria-label="Create your first project"
        onPress={
          onAction ??
          (() =>
            toast('New project', {
              description: 'Would open the project composer',
            }))
        }
      >
        {actionLabel}
      </Button>
    </YStack>
  )
}

EmptyStateBasic.fileName = 'EmptyStateBasic'
