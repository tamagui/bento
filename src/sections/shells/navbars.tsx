import { YStack } from 'tamagui'

import { Showcase } from '../../components/general/_Showcase'
import * as Navbars from '../../components/shells/navbars'
import {
  type BentoShowcaseContext,
  BentoShowcaseProvider,
} from '../../components/general/BentoProvider'

type Props = ReturnType<typeof navbarsGetComponentCodes> & BentoShowcaseContext

export function navbars({ isProUser, showAppropriateModal }: Props) {
  return (
    <BentoShowcaseProvider
      isProUser={isProUser}
      showAppropriateModal={showAppropriateModal}
    >
      <YStack pb="$10" gap="$12" padding="$2" $gtLg={{ padding: '$0' }}>
        <Showcase
          fileName={Navbars.TopNavBarWithLogo.fileName}
          title="Top Navbar with Swippable Drawer on Smaller Screens"
        >
          <Navbars.TopNavBarWithLogo />
        </Showcase>
        <Showcase
          fileName={Navbars.TopNavBarWithUnderLineTabs.fileName}
          title="Top Navbar with Underline Tabs"
        >
          <Navbars.TopNavBarWithUnderLineTabs />
        </Showcase>

        <Showcase fileName={Navbars.FullSideBar.fileName} title="Responsive Sidebar">
          <Navbars.FullSideBar />
        </Showcase>
      </YStack>
    </BentoShowcaseProvider>
  )
}

export function navbarsGetComponentCodes() {
  return {
    codes: {
      TopNavBarWithLogo: '',
      TopNavBarWithUnderLineTabs: '',
      FullSideBar: '',
    } as Omit<Record<keyof typeof Navbars, string>, 'getCode'>,
  }
}
