import { Volume1, Volume2 } from '@tamagui/lucide-icons-2'
import { useState } from 'react'
import { Slider, Text, XStack, YStack, isWeb } from 'tamagui'
import { CellCopy, SettingsCellFrame } from './common/SettingsCellFrame'

export function CellSlider({ grouped = false }: { grouped?: boolean }) {
  const [volume, setVolume] = useState([62])
  const row = (
    <YStack minH={92} px="$4" py="$3" gap="$3">
      <CellCopy label="Media volume" description="Sound effects and previews" />
      <XStack items="center" gap="$3">
        <Volume1 size={17} color="$color9" aria-hidden />
        <Slider flex={1} value={volume} onValueChange={setVolume} max={100} step={1}>
          <Slider.Track height={5} bg="$color4">
            <Slider.TrackActive bg="$accentColor" />
          </Slider.Track>
          {/* the thumb is the role=slider node — the name must live here */}
          <Slider.Thumb
            aria-label="Media volume"
            index={0}
            circular
            size="$2"
            bg="$color12"
            hitSlop={isWeb ? undefined : 12}
          />
        </Slider>
        <Volume2 size={18} color="$color9" aria-hidden />
        <Text width={44} text="right" color="$color10" fontSize="$3" fontVariant={['tabular-nums']}>
          {volume[0]}%
        </Text>
      </XStack>
    </YStack>
  )
  return grouped ? row : <SettingsCellFrame>{row}</SettingsCellFrame>
}

CellSlider.fileName = 'CellSlider'
