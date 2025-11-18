import { Moon, Sun } from '@tamagui/lucide-icons'
import { Button, Switch, XStack } from 'tamagui'
import { useThemeControl } from '../../useThemeControl'

export const ColorSchemeToggle = () => {
  const theme = useThemeControl()
  const checked = theme.value === 'light'

  return (
    <XStack ai="center" gap="$2">
      <Button chromeless disabled w={20} icon={Moon} />
      <Switch
        native
        checked={checked}
        onCheckedChange={() => {
          theme.set(theme.value === 'dark' ? 'light' : 'dark')
        }}
      >
        <Switch.Thumb
          animation={[
            'quick',
            {
              transform: {
                overshootClamping: true,
              },
            },
          ]}
        />
      </Switch>
      <Button chromeless disabled w={20} icon={Sun} />
    </XStack>
  )
}
