import { useState } from 'react'
import { View } from 'tamagui'
import { SegmentedFrame } from './common/SegmentedFrame'

const options = [
  { value: 'day', label: 'Day' },
  { value: 'week', label: 'Week' },
  { value: 'month', label: 'Month' },
]

export function SegmentedBasic() {
  const [value, setValue] = useState('week')
  return (
    <View width="100%" maxW={480} self="center">
      <SegmentedFrame options={options} value={value} onValueChange={setValue} />
    </View>
  )
}

SegmentedBasic.fileName = 'SegmentedBasic'
