import { Info } from '@tamagui/lucide-icons-2'
import { Banner } from './common/Banner'

export function BannerInfo() {
  return (
    <Banner
      icon={Info}
      label="Information banner"
      theme="blue"
      action={{ label: 'Read policy', href: 'https://tamagui.dev/docs/intro/introduction' }}
    >
      A new workspace policy is available for your team.
    </Banner>
  )
}

BannerInfo.fileName = 'BannerInfo'
