import { Check, ChevronDown } from '@tamagui/lucide-icons-2'
import { useState } from 'react'
import { Select, Text, XStack } from 'tamagui'
import { CellCopy, SettingsCellFrame } from './common/SettingsCellFrame'

const options = ['Automatic', 'Light', 'Dark']

export function CellSelect({ grouped = false }: { grouped?: boolean }) {
  const [value, setValue] = useState('Automatic')
  const row = (
    <XStack minH={64} px="$4" py="$3" items="center" gap="$3">
      <CellCopy label="Appearance" />
      <Select value={value} onValueChange={setValue} disablePreventBodyScroll>
        <Select.Trigger
          width={148}
          size="$3"
          borderWidth={0}
          bg="$color3"
          iconAfter={ChevronDown}
          aria-label="Choose appearance"
        >
          <Select.Value placeholder="Appearance" />
        </Select.Trigger>
        <Select.Content>
          <Select.Viewport minW={180} p="$1" rounded="$5" bg="$background">
            <Select.Group>
              {options.map((option, index) => (
                <Select.Item key={option} index={index} value={option} rounded="$3">
                  <Select.ItemText>{option}</Select.ItemText>
                  <Select.ItemIndicator ml="auto">
                    <Check size={15} />
                  </Select.ItemIndicator>
                </Select.Item>
              ))}
            </Select.Group>
          </Select.Viewport>
        </Select.Content>
      </Select>
    </XStack>
  )
  return grouped ? row : <SettingsCellFrame>{row}</SettingsCellFrame>
}

CellSelect.fileName = 'CellSelect'
