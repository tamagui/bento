import { useState } from 'react'
import { Switch, XStack } from 'tamagui'
import { CellCopy, SettingsCellFrame } from './common/SettingsCellFrame'

export function CellSwitch({ grouped = false }: { grouped?: boolean }) {
  const [checked, setChecked] = useState(true)
  const row = (
    <XStack minH={72} px="$4" py="$3" items="center" gap="$4">
      <CellCopy
        label="Automatic updates"
        description="Install important updates overnight"
      />
      <Switch
        size="$3"
        checked={checked}
        onCheckedChange={setChecked}
        aria-label="Automatic updates"
      >
        <Switch.Thumb style={{ transition: 'transform 200ms ease' }} />
      </Switch>
    </XStack>
  )
  return grouped ? row : <SettingsCellFrame>{row}</SettingsCellFrame>
}

CellSwitch.fileName = 'CellSwitch'
