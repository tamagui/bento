import { TriangleAlert } from '@tamagui/lucide-icons-2'
import { Banner } from './common/Banner'

export function BannerWarning() {
  return (
    <Banner
      icon={TriangleAlert}
      label="Warning banner"
      theme="yellow"
      action="Review usage"
    >
      Your workspace is approaching its monthly storage limit.
    </Banner>
  )
}

BannerWarning.fileName = 'BannerWarning'
