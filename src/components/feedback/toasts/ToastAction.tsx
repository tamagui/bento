import { Trash2 } from '@tamagui/lucide-icons-2'
import { useToastController } from '@tamagui/toast'
import { useState } from 'react'
import { Button, Text, XStack } from 'tamagui'

/** ------ EXAMPLE ------ */
export function ToastAction() {
  const toast = useToastController()
  const [items, setItems] = useState(3)

  return (
    <XStack gap="$3" items="center">
      <Text color="$color11">{items} item{items === 1 ? '' : 's'} in inbox</Text>
      <Button
        disabled={items === 0}
        icon={<Trash2 size={16} />}
        onPress={() => {
          setItems((n) => Math.max(0, n - 1))
          toast.show('Message deleted', {
            message: 'Press undo to restore it.',
            customData: { variant: 'info' },
          })
        }}
      >
        <Text>Delete one</Text>
      </Button>
      <Button
        chromeless
        onPress={() => {
          setItems((n) => n + 1)
          toast.hide()
        }}
      >
        <Text color="$color10">Undo</Text>
      </Button>
    </XStack>
  )
}

ToastAction.fileName = 'ToastAction'
