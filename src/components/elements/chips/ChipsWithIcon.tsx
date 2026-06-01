import { Cake } from '@tamagui/lucide-icons-2'
import type { SizeTokens, ThemeName } from 'tamagui'
import { View } from 'tamagui'
import { Chip } from './components/chipsParts'

const colors = ['red', 'green', 'blue', 'purple', 'pink', 'orange']

function ChipsItem({ color, size = '$4' }: { color: string; size: SizeTokens }) {
  return (
    <Chip bg="$color4" circular theme={color as ThemeName} size={size}>
      <Chip.Icon y={-1} scaleIcon={1.1} color="$color9">
        <Cake />
      </Chip.Icon>
      <Chip.Text color="$color9">Cake</Chip.Text>
    </Chip>
  )
}

/** ------ EXAMPLE ------ */
export function ChipsWithIcon({ size = '$4' }: { size?: SizeTokens }) {
  return (
    <View flexDirection="row" shrink={1} flexWrap="wrap" gap="$2" p="$4">
      {colors.map((color) => (
        <ChipsItem size={size ?? '$4'} key={color} color={color} />
      ))}
    </View>
  )
}

ChipsWithIcon.fileName = 'ChipsWithIcon'
