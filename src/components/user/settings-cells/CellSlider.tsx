import { Volume1, Volume2 } from '@tamagui/lucide-icons-2'
import { Slider, XStack, YStack } from 'tamagui'
import { CellCopy, SettingsCellFrame } from './common/SettingsCellFrame'

export function CellSlider({ grouped = false }: { grouped?: boolean }) {
  const row = (
    <YStack minH={92} px="$4" py="$3" gap="$3">
      <CellCopy label="Media volume" description="Sound effects and previews" />
      <XStack items="center" gap="$3">
        <Volume1 size={17} color="$color9" />
        <Slider flex={1} defaultValue={[62]} max={100} step={1} aria-label="Media volume">
          <Slider.Track height={5} bg="$color4">
            <Slider.TrackActive bg="$accentColor" />
          </Slider.Track>
          <Slider.Thumb index={0} circular size="$1.5" bg="$color12" />
        </Slider>
        <Volume2 size={18} color="$color9" />
      </XStack>
    </YStack>
  )
  return grouped ? row : <SettingsCellFrame>{row}</SettingsCellFrame>
}

CellSlider.fileName = 'CellSlider'
