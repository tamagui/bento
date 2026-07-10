import { CircleX } from '@tamagui/lucide-icons-2'
import { Banner } from './common/Banner'

export function BannerError() {
  return (
    <Banner icon={CircleX} label="Error banner" theme="red" action="Retry sync">
      Three records could not be synchronized. No local changes were lost.
    </Banner>
  )
}

BannerError.fileName = 'BannerError'
