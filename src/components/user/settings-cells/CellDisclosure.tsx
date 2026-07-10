import { ChevronRight } from '@tamagui/lucide-icons-2'
import { XStack } from 'tamagui'
import { CellCopy, SettingsCellFrame } from './common/SettingsCellFrame'

export function CellDisclosure({ grouped = false }: { grouped?: boolean }) {
  const row = (
    <XStack
      minH={64}
      px="$4"
      py="$3"
      items="center"
      gap="$3"
      cursor="pointer"
      accessibilityRole="button"
      aria-label="Open notification settings"
      pressStyle={{ bg: '$color3' }}
      hoverStyle={{ bg: '$color2' }}
      focusable
    >
      <CellCopy label="Notifications" />
      <ChevronRight size={18} color="$color9" />
    </XStack>
  )
  return grouped ? row : <SettingsCellFrame>{row}</SettingsCellFrame>
}

CellDisclosure.fileName = 'CellDisclosure'
