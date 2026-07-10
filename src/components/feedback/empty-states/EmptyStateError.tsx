import { RefreshCw, TriangleAlert } from '@tamagui/lucide-icons-2'
import { Button, H3, Paragraph, YStack } from 'tamagui'

export function EmptyStateError() {
  return (
    <YStack
      role="alert"
      width="100%"
      maxW={520}
      self="center"
      items="center"
      gap="$3"
      p="$7"
      rounded="$8"
      borderWidth={1}
      borderColor="$red7"
      bg="$red2"
    >
      <TriangleAlert size={36} color="$red10" />
      <H3 text="center">We couldn’t load this view</H3>
      <Paragraph text="center" color="$color10" maxW={360}>
        The connection was interrupted. Your work is safe—try loading the view again.
      </Paragraph>
      <Button mt="$2" theme="red" icon={RefreshCw} aria-label="Retry loading the view">
        Try again
      </Button>
    </YStack>
  )
}

EmptyStateError.fileName = 'EmptyStateError'
