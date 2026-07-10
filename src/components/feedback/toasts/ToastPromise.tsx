import { UploadCloud } from '@tamagui/lucide-icons-2'
import { useToastController } from '@tamagui/toast'
import { useState } from 'react'
import { Button, Spinner, Text } from 'tamagui'

/** ------ EXAMPLE ------ */
export function ToastPromise() {
  const toast = useToastController()
  const [busy, setBusy] = useState(false)

  const run = () => {
    setBusy(true)
    toast.show('Uploading…', {
      message: 'photo-2107.jpg',
      duration: 1800,
      customData: { variant: 'info' },
    })
    setTimeout(() => {
      setBusy(false)
      toast.show('Upload complete', {
        message: 'photo-2107.jpg is now available.',
        customData: { variant: 'success' },
      })
    }, 1900)
  }

  return (
    <Button disabled={busy} onPress={run} icon={busy ? <Spinner size="small" /> : <UploadCloud size={16} />}>
      <Text>{busy ? 'Uploading…' : 'Upload file'}</Text>
    </Button>
  )
}

ToastPromise.fileName = 'ToastPromise'
