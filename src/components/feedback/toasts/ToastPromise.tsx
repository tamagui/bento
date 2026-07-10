import { UploadCloud } from '@tamagui/lucide-icons-2'
import { useToastController } from '@tamagui/toast'
import { useRef, useState } from 'react'
import { Button, Spinner, Text } from 'tamagui'
import type { ToastCustomData } from './common/CurrentToast'

/** ------ EXAMPLE ------ */
export function ToastPromise() {
  const toast = useToastController()
  const [busy, setBusy] = useState(false)
  const attempts = useRef(0)
  const cancelled = useRef(false)

  // every third upload fails so the retry path is demonstrable
  const upload = () =>
    new Promise<void>((resolve, reject) => {
      attempts.current += 1
      const fail = attempts.current % 3 === 0
      setTimeout(
        () => (fail ? reject(new Error('Network dropped')) : resolve()),
        1800
      )
    })

  const run = async () => {
    setBusy(true)
    cancelled.current = false
    toast.show('Uploading…', {
      message: 'photo-2107.jpg',
      duration: 30000,
      customData: { variant: 'info' } satisfies ToastCustomData,
    })
    try {
      await upload()
      if (cancelled.current) return
      toast.show('Upload complete', {
        message: 'photo-2107.jpg is now available.',
        customData: { variant: 'success' } satisfies ToastCustomData,
      })
    } catch (error) {
      if (cancelled.current) return
      toast.show('Upload failed', {
        message: `${(error as Error).message} — nothing was saved.`,
        // errors stay up long enough to act on
        duration: 8000,
        customData: {
          variant: 'error',
          actionLabel: 'Retry',
          onAction: () => {
            toast.hide()
            run()
          },
        } satisfies ToastCustomData,
      })
    } finally {
      if (!cancelled.current) setBusy(false)
    }
  }

  const cancel = () => {
    cancelled.current = true
    setBusy(false)
    toast.show('Upload cancelled', {
      message: 'photo-2107.jpg was not uploaded.',
      customData: { variant: 'info' } satisfies ToastCustomData,
    })
  }

  return (
    <Button
      onPress={busy ? cancel : run}
      icon={busy ? <Spinner size="small" /> : <UploadCloud size={16} />}
    >
      <Text>{busy ? 'Cancel upload' : 'Upload file'}</Text>
    </Button>
  )
}

ToastPromise.fileName = 'ToastPromise'
