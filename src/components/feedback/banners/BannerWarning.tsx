import { TriangleAlert } from '@tamagui/lucide-icons-2'
import { useToastController } from '@tamagui/toast'
import { Banner } from './common/Banner'

export function BannerWarning() {
  const toast = useToastController()
  return (
    <Banner
      icon={TriangleAlert}
      label="Warning banner"
      theme="yellow"
      action={{
        label: 'Review usage',
        onPress: () =>
          toast.show('Usage', { message: 'Would open the storage usage report' }),
      }}
    >
      Your workspace is approaching its monthly storage limit.
    </Banner>
  )
}

BannerWarning.fileName = 'BannerWarning'
