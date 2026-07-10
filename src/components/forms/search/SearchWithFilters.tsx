import { Check, ChevronDown, Search } from '@tamagui/lucide-icons-2'
import { useState } from 'react'
import { Input, Select, Text, XStack, YStack } from 'tamagui'

const categories = ['All content', 'Projects', 'People', 'Files']

export function SearchWithFilters() {
  const [query, setQuery] = useState('design')
  const [category, setCategory] = useState('All content')
  const count = query ? 24 : 186
  return (
    <YStack width="100%" maxW={860} self="center" gap="$3">
      <XStack gap="$3" flexWrap="wrap">
        <XStack
          flex={1}
          minW={260}
          items="center"
          gap="$2"
          px="$3"
          rounded="$6"
          borderWidth={1}
          borderColor="$borderColor"
          bg="$background"
        >
          <Search size={19} color="$color9" />
          <Input
            unstyled
            flex={1}
            height={46}
            value={query}
            onChangeText={setQuery}
            placeholder="Search workspace"
            aria-label="Search workspace"
          />
        </XStack>
        <Select value={category} onValueChange={setCategory} disablePreventBodyScroll>
          <Select.Trigger
            width={180}
            iconAfter={ChevronDown}
            aria-label="Filter search category"
          >
            <Select.Value />
          </Select.Trigger>
          <Select.Content>
            <Select.Viewport minW={200} p="$1" rounded="$5" bg="$background">
              {categories.map((option, index) => (
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
      <Text color="$color9" fontSize="$2" letterSpacing={0}>
        {count} results in {category.toLowerCase()}
        {query ? (
          <>
            {' '}
            for{' '}
            <Text fontWeight="800" color="$color11">
              “{query}”
            </Text>
          </>
        ) : null}
      </Text>
    </YStack>
  )
}

SearchWithFilters.fileName = 'SearchWithFilters'
