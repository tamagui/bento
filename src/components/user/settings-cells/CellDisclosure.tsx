import { ChevronRight } from '@tamagui/lucide-icons-2'
import { toast } from '@tamagui/toast'
import { Button } from 'tamagui'
import { CellCopy, SettingsCellFrame } from './common/SettingsCellFrame'

export function CellDisclosure({
  grouped = false,
  onPress,
}: {
  grouped?: boolean
  /** navigate to the detail screen; the demo default just proves the press */
  onPress?: () => void
}) {
  const row = (
    <Button
      unstyled
      width="100%"
      flexDirection="row"
      minH={64}
      px="$4"
      py="$3"
      items="center"
      justify="space-between"
      gap="$3"
      cursor="pointer"
      aria-label="Open notification settings"
      onPress={
        onPress ??
        (() =>
          toast('Notifications', { description: 'Would open notification settings' }))
      }
      pressStyle={{ bg: '$color3' }}
      hoverStyle={{ bg: '$color2' }}
      focusVisibleStyle={{
        outlineColor: '$outlineColor',
        outlineOffset: -2,
        outlineStyle: 'solid',
        outlineWidth: 2,
      }}
    >
      <CellCopy label="Notifications" />
      <ChevronRight size={18} color="$color9" aria-hidden />
    </Button>
  )
  return grouped ? row : <SettingsCellFrame>{row}</SettingsCellFrame>
}

CellDisclosure.fileName = 'CellDisclosure'
