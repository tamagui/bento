import { TriangleAlert } from '@tamagui/lucide-icons-2'
import { toast } from '@tamagui/toast'
import { Banner } from './common/Banner'

export function BannerWarning() {
  return (
    <Banner
      icon={TriangleAlert}
      label="Warning banner"
      theme="yellow"
      action={{
        label: 'Review usage',
        onPress: () =>
          toast('Usage', { description: 'Would open the storage usage report' }),
      }}
    >
      Your workspace is approaching its monthly storage limit.
    </Banner>
  )
}

BannerWarning.fileName = 'BannerWarning'
