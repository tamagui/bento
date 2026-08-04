import { Check, ChevronDown, Search } from '@tamagui/lucide-icons-2'
import { useState } from 'react'
import { Input, Select, Text, XStack, YStack } from 'tamagui'

const categories = ['All content', 'Projects', 'People', 'Files'] as const

// counts derive from actual data, never a hard-coded number
const workspace = [
  { title: 'Design system', category: 'Projects' },
  { title: 'Design reviews', category: 'Projects' },
  { title: 'Landing redesign', category: 'Projects' },
  { title: 'Quarterly planning', category: 'Projects' },
  { title: 'Dana Designer', category: 'People' },
  { title: 'Devon Fields', category: 'People' },
  { title: 'Maya Chen', category: 'People' },
  { title: 'design-tokens.json', category: 'Files' },
  { title: 'redesign-brief.pdf', category: 'Files' },
  { title: 'roadmap.fig', category: 'Files' },
]

export function SearchWithFilters() {
  const [query, setQuery] = useState('design')
  const [category, setCategory] = useState<string>('All content')

  const results = workspace.filter(
    (item) =>
      (category === 'All content' || item.category === category) &&
      item.title.toLowerCase().includes(query.trim().toLowerCase())
  )

  return (
    <YStack width="100%" maxW={860} self="center" gap="3">
      <XStack gap="3" flexWrap="wrap">
        <XStack
          flex={1}
          minW={260}
          items="center"
          gap="2"
          px="3"
          rounded="6"
          borderWidth={1}
          borderColor="border-color"
          bg="background"
        >
          <Search size={19} color="color8" aria-hidden />
          <Input
            bg="transparent"
            borderWidth={0}
            flex={1}
            height={46}
            value={query}
            onChangeText={setQuery}
            placeholder="Search workspace"
            aria-label="Search workspace"
          />
        </XStack>
        <Select value={category} onValueChange={setCategory} disablePreventBodyScroll>
          <Select.Trigger width={180} aria-label="Filter search category">
            <Select.Value />
            <Select.Icon>
              <ChevronDown />
            </Select.Icon>
          </Select.Trigger>
          <Select.Content>
            <Select.Viewport minW={200} p="1" rounded="5" bg="background">
              {categories.map((option, index) => (
                <Select.Item key={option} value={option} rounded="3">
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
      <Text color="color8" fontSize="2" letterSpacing={0} aria-live="polite">
        {results.length} result{results.length === 1 ? '' : 's'} in{' '}
        {category.toLowerCase()}
        {query.trim() ? (
          <>
            {' '}
            for{' '}
            <Text fontWeight="800" color="color10">
              “{query.trim()}”
            </Text>
          </>
        ) : null}
      </Text>
      <YStack gap="1">
        {results.slice(0, 5).map((item) => (
          <XStack
            key={item.title}
            justify="space-between"
            items="center"
            px="3"
            py="2-5"
            rounded="4"
            bg="color2"
          >
            <Text color="color10">{item.title}</Text>
            <Text fontSize="1" color="color8" textTransform="uppercase">
              {item.category}
            </Text>
          </XStack>
        ))}
      </YStack>
    </YStack>
  )
}

SearchWithFilters.fileName = 'SearchWithFilters'
