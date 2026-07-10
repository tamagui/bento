import { CircleX } from '@tamagui/lucide-icons-2'
import { useToastController } from '@tamagui/toast'
import { Banner } from './common/Banner'

export function BannerError() {
  const toast = useToastController()
  return (
    <Banner
      icon={CircleX}
      label="Error banner"
      theme="red"
      urgency="alert"
      action={{
        label: 'Retry sync',
        onPress: () =>
          toast.show('Sync started', {
            message: 'Retrying 3 records…',
            customData: { variant: 'info' },
          }),
      }}
    >
      Three records could not be synchronized. No local changes were lost.
    </Banner>
  )
}

BannerError.fileName = 'BannerError'
