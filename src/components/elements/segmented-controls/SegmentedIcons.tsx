import { Grid2x2, List, Rows3 } from '@tamagui/lucide-icons-2'
import { useState } from 'react'
import { View } from 'tamagui'
import { SegmentedFrame } from './common/SegmentedFrame'

export function SegmentedIcons() {
  const [value, setValue] = useState('grid')
  const options = [
    { value: 'grid', label: 'Grid', icon: <Grid2x2 size={16} /> },
    { value: 'list', label: 'List', icon: <List size={16} /> },
    { value: 'compact', label: 'Compact', icon: <Rows3 size={16} /> },
  ]
  return (
    <View width="100%" maxW={560} self="center">
      <SegmentedFrame
        label="Layout density"
        options={options}
        value={value}
        onValueChange={setValue}
      />
    </View>
  )
}

SegmentedIcons.fileName = 'SegmentedIcons'
