import { CheckCircle2, Info, XCircle } from '@tamagui/lucide-icons-2'
import { toast } from '@tamagui/toast'
import { Button, Text, XStack } from 'tamagui'

/** ------ EXAMPLE ------ */
export function ToastVariants() {
  return (
    <XStack gap="$3" flexWrap="wrap" justify="center">
      <Button
        icon={<CheckCircle2 size={16} color="$green10" />}
        onPress={() =>
          toast('Changes saved', {
            description: 'Your profile has been updated.',
            data: { variant: 'success' },
          })
        }
      >
        <Text>Success</Text>
      </Button>
      <Button
        icon={<XCircle size={16} color="$red10" />}
        onPress={() =>
          toast('Upload failed', {
            description: 'The file exceeds the 10MB limit.',
            data: { variant: 'error' },
          })
        }
      >
        <Text>Error</Text>
      </Button>
      <Button
        icon={<Info size={16} color="$blue10" />}
        onPress={() =>
          toast('Heads up', {
            description: 'A new version is available.',
            data: { variant: 'info' },
          })
        }
      >
        <Text>Info</Text>
      </Button>
    </XStack>
  )
}

ToastVariants.fileName = 'ToastVariants'
