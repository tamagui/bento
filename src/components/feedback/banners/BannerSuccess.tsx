import { CircleCheck } from '@tamagui/lucide-icons-2'
import { Banner } from './common/Banner'

export function BannerSuccess() {
  return (
    <Banner
      icon={CircleCheck}
      label="Success banner"
      theme="green"
      action={{
        label: 'View release',
        href: 'https://github.com/tamagui/tamagui/releases',
      }}
    >
      Version 2.4 was deployed successfully to production.
    </Banner>
  )
}

BannerSuccess.fileName = 'BannerSuccess'
