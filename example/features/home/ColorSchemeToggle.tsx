import { Moon, Sun } from '@tamagui/lucide-icons-2'
import { Button, Switch, XStack } from 'tamagui'
import { useThemeControl } from '../../useThemeControl'

export const ColorSchemeToggle = () => {
  const theme = useThemeControl()
  const checked = theme.value === 'light'

  return (
    <XStack items="center" gap="$2">
      <Button chromeless disabled width={20} icon={Moon} />
      <Switch
        checked={checked}
        onCheckedChange={() => {
          theme.set(theme.value === 'dark' ? 'light' : 'dark')
        }}
      >
        <Switch.Thumb
          transition={[
            'quick',
            {
              transform: {
                overshootClamping: true,
              },
            },
          ]}
        />
      </Switch>
      <Button chromeless disabled width={20} icon={Sun} />
    </XStack>
  )
}
