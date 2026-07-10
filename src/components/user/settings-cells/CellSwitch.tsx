import { useState } from 'react'
import { Switch, XStack, isWeb } from 'tamagui'
import { useReducedMotion } from '../../hooks'
import { CellCopy, SettingsCellFrame } from './common/SettingsCellFrame'

export function CellSwitch({ grouped = false }: { grouped?: boolean }) {
  const [checked, setChecked] = useState(true)
  const reducedMotion = useReducedMotion()
  const row = (
    // the entire row is the label, so the entire row toggles
    <XStack
      minH={72}
      px="$4"
      py="$3"
      items="center"
      gap="$4"
      cursor="pointer"
      onPress={() => setChecked((current) => !current)}
      hoverStyle={{ bg: '$color2' }}
      pressStyle={{ bg: '$color3' }}
    >
      <CellCopy
        label="Automatic updates"
        description="Install important updates overnight"
      />
      <Switch
        size="$3"
        checked={checked}
        onCheckedChange={setChecked}
        aria-label="Automatic updates"
        hitSlop={isWeb ? undefined : 10}
        // direct presses must not bubble into the row toggle
        onPress={(event: any) => event.stopPropagation?.()}
      >
        <Switch.Thumb
          style={
            isWeb && !reducedMotion ? { transition: 'transform 200ms ease' } : undefined
          }
        />
      </Switch>
    </XStack>
  )
  return grouped ? row : <SettingsCellFrame>{row}</SettingsCellFrame>
}

CellSwitch.fileName = 'CellSwitch'
