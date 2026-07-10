import { Check, ChevronDown, X } from '@tamagui/lucide-icons-2'
import { useState } from 'react'
import { Button, Select, Text, XStack } from 'tamagui'

const sortOptions = ['Featured', 'Newest', 'Price: low to high', 'Price: high to low']

export function FilterChipsBar() {
  const [chips, setChips] = useState(['New arrivals', 'Under $200', 'In stock'])
  const [sort, setSort] = useState('Featured')
  return (
    <XStack width="100%" maxW={920} self="center" flexWrap="wrap" gap="$2" items="center">
      {chips.map((chip) => (
        <Button
          key={chip}
          size="$3"
          rounded={999}
          bg="$color3"
          iconAfter={X}
          aria-label={`Remove ${chip} filter`}
          onPress={() => setChips((current) => current.filter((item) => item !== chip))}
        >
          {chip}
        </Button>
      ))}
      {chips.length ? (
        <Button chromeless size="$3" onPress={() => setChips([])}>
          Clear
        </Button>
      ) : (
        <Text color="$color9">No active filters</Text>
      )}
      <XStack ml="auto" items="center" gap="$2">
        <Text color="$color9" fontSize="$2">
          Sort
        </Text>
        <Select value={sort} onValueChange={setSort} disablePreventBodyScroll>
          <Select.Trigger
            width={190}
            size="$3"
            iconAfter={ChevronDown}
            aria-label="Sort products"
          >
            <Select.Value />
          </Select.Trigger>
          <Select.Content>
            <Select.Viewport minW={220} p="$1" rounded="$5" bg="$background">
              {sortOptions.map((option, index) => (
                <Select.Item key={option} value={option} index={index} rounded="$3">
                  <Select.ItemText>{option}</Select.ItemText>
                  <Select.ItemIndicator ml="auto">
                    <Check size={15} />
                  </Select.ItemIndicator>
                </Select.Item>
              ))}
            </Select.Viewport>
          </Select.Content>
        </Select>
      </XStack>
    </XStack>
  )
}

FilterChipsBar.fileName = 'FilterChipsBar'
