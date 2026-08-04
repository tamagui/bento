import { Separator, YStack } from 'tamagui'
import { CellDisclosure } from './CellDisclosure'
import { CellSelect } from './CellSelect'
import { CellSlider } from './CellSlider'
import { CellSwitch } from './CellSwitch'
import { SettingsCellFrame, SettingsSectionLabel } from './common/SettingsCellFrame'

export function SettingsGroup() {
  return (
    <YStack width="100%" maxW={600} self="center" gap="6" p="3">
      <YStack gap="2-5">
        <SettingsSectionLabel>General</SettingsSectionLabel>
        <SettingsCellFrame>
          <CellSelect grouped />
          <Separator ml="4" />
          <CellDisclosure grouped />
        </SettingsCellFrame>
      </YStack>
      <YStack gap="2-5">
        <SettingsSectionLabel>Playback</SettingsSectionLabel>
        <SettingsCellFrame>
          <CellSwitch grouped />
          <Separator ml="4" />
          <CellSlider grouped />
        </SettingsCellFrame>
      </YStack>
    </YStack>
  )
}

SettingsGroup.fileName = 'SettingsGroup'
