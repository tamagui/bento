import { Trash2 } from '@tamagui/lucide-icons-2'
import { toast } from '@tamagui/toast'
import { useState } from 'react'
import { Button, Text, XStack } from 'tamagui'
import type { ToastCustomData } from './common/CurrentToast'

const TOTAL = 3

/** ------ EXAMPLE ------ */
export function ToastAction() {
  const [items, setItems] = useState(TOTAL)

  const deleteOne = () => {
    setItems((n) => Math.max(0, n - 1))
    toast('Message deleted', {
      description: 'Undo to restore it.',
      data: {
        variant: 'info',
        actionLabel: 'Undo',
        // undo lives inside the toast and expires with it; hiding after
        // restore keeps it idempotent
        onAction: () => {
          setItems((n) => Math.min(TOTAL, n + 1))
          toast.dismiss()
        },
      } satisfies ToastCustomData,
    })
  }

  return (
    <XStack gap="$3" items="center">
      <Text color="$color11">
        {items} item{items === 1 ? '' : 's'} in inbox
      </Text>
      <Button disabled={items === 0} icon={<Trash2 size={16} />} onPress={deleteOne}>
        <Text>Delete one</Text>
      </Button>
    </XStack>
  )
}

ToastAction.fileName = 'ToastAction'
