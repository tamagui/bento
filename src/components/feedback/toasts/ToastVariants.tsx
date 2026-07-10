import { CheckCircle2, Info, XCircle } from '@tamagui/lucide-icons-2'
import { useToastController } from '@tamagui/toast'
import { Button, Text, XStack } from 'tamagui'

/** ------ EXAMPLE ------ */
export function ToastVariants() {
  const toast = useToastController()

  return (
    <XStack gap="$3" flexWrap="wrap" justify="center">
      <Button
        icon={<CheckCircle2 size={16} color="$green10" />}
        onPress={() =>
          toast.show('Changes saved', {
            message: 'Your profile has been updated.',
            customData: { variant: 'success' },
          })
        }
      >
        <Text>Success</Text>
      </Button>
      <Button
        icon={<XCircle size={16} color="$red10" />}
        onPress={() =>
          toast.show('Upload failed', {
            message: 'The file exceeds the 10MB limit.',
            customData: { variant: 'error' },
          })
        }
      >
        <Text>Error</Text>
      </Button>
      <Button
        icon={<Info size={16} color="$blue10" />}
        onPress={() =>
          toast.show('Heads up', {
            message: 'A new version is available.',
            customData: { variant: 'info' },
          })
        }
      >
        <Text>Info</Text>
      </Button>
    </XStack>
  )
}

ToastVariants.fileName = 'ToastVariants'
