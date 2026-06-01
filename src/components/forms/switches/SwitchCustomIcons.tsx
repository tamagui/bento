import type { SizeTokens } from '@tamagui/core'
import { View } from '@tamagui/core'
import { Check, X } from '@tamagui/lucide-icons-2'
import { useState } from 'react'
import { Switch } from './common/switchParts'

/** ------ EXAMPLE ------ */

export function SwitchCustomIcons({ size }: { size?: SizeTokens }) {
  const [checked, setChecked] = useState(true)

  return (
    <View flexDirection="column" justify="center" items="center" p="$8">
      <Switch
        size={size}
        checked={checked}
        onCheckedChange={setChecked}
        backgroundColor="$red10"
        // @ts-expect-error
        activeStyle={{ backgroundColor: '$green10' }}
      >
        <Switch.Icon placement="left">
          <Check color="#fff" />
        </Switch.Icon>
        <Switch.Icon placement="right">
          <X color="#fff" />
        </Switch.Icon>
        <Switch.Thumb transition="200ms" />
      </Switch>
    </View>
  )
}

SwitchCustomIcons.fileName = 'SwitchCustomIcons'
