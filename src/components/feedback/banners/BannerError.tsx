import { CircleX } from '@tamagui/lucide-icons-2'
import { toast } from 'tamagui'
import { Banner } from './common/Banner'

export function BannerError() {
  return (
    <Banner
      icon={CircleX}
      label="Error banner"
      theme="red"
      urgency="alert"
      action={{
        label: 'Retry sync',
        onPress: () =>
          toast('Sync started', {
            description: 'Retrying 3 records…',
            data: { variant: 'info' },
          }),
      }}
    >
      Three records could not be synchronized. No local changes were lost.
    </Banner>
  )
}

BannerError.fileName = 'BannerError'
