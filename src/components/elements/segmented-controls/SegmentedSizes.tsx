import { useState } from 'react'
import { Text, YStack } from 'tamagui'
import { SegmentedFrame } from './common/SegmentedFrame'

const options = [
  { value: 'monthly', label: 'Monthly' },
  { value: 'annual', label: 'Annual' },
]

function SizeExample({ size }: { size: 'sm' | 'md' | 'lg' }) {
  const [value, setValue] = useState('monthly')
  return (
    <YStack gap="2">
      <Text fontSize="2" color="color8" textTransform="uppercase" letterSpacing={1}>
        {size}
      </Text>
      <SegmentedFrame
        label={`Billing period (${size})`}
        size={size}
        options={options}
        value={value}
        onValueChange={setValue}
      />
    </YStack>
  )
}

export function SegmentedSizes() {
  return (
    <YStack width="100%" maxW={480} self="center" gap="5">
      <SizeExample size="sm" />
      <SizeExample size="md" />
      <SizeExample size="lg" />
    </YStack>
  )
}

SegmentedSizes.fileName = 'SegmentedSizes'
