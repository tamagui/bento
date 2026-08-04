import { ChevronRight } from '@tamagui/lucide-icons-2'
import { toast } from 'tamagui'
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
      variant="quiet"
      width="100%"
      flexDirection="row"
      minH={64}
      px="4"
      py="3"
      items="center"
      justify="space-between"
      gap="3"
      cursor="pointer"
      bg="hover:color2 press:color3"
      outlineColor="focus-visible:outline-color"
      outlineOffset="focus-visible:-2px"
      outlineStyle="focus-visible:solid"
      outlineWidth="focus-visible:2px"
      aria-label="Open notification settings"
      onPress={
        onPress ??
        (() =>
          toast('Notifications', {
            description: 'Would open notification settings',
          }))
      }
    >
      <CellCopy label="Notifications" />
      <ChevronRight size={18} color="color8" aria-hidden />
    </Button>
  )
  return grouped ? row : <SettingsCellFrame>{row}</SettingsCellFrame>
}

CellDisclosure.fileName = 'CellDisclosure'
