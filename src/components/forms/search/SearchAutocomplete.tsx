import { Clock3, Search, X } from '@tamagui/lucide-icons-2'
import { type KeyboardEvent, useEffect, useMemo, useState } from 'react'
import { Button, Input, Text, XStack, YStack } from 'tamagui'

const catalog = [
  'Project roadmap',
  'Product analytics',
  'Profile settings',
  'Pricing experiments',
  'Prototype feedback',
  'Quarterly planning',
]
const recent = ['Design system', 'Launch checklist', 'Customer interviews']

function Highlight({ label, query }: { label: string; query: string }) {
  if (!query) return <Text letterSpacing={0}>{label}</Text>
  const index = label.toLowerCase().indexOf(query.toLowerCase())
  if (index < 0) return <Text letterSpacing={0}>{label}</Text>
  return (
    <Text letterSpacing={0}>
      {label.slice(0, index)}
      <Text fontWeight="900" color="$accentColor" letterSpacing={0}>
        {label.slice(index, index + query.length)}
      </Text>
      {label.slice(index + query.length)}
    </Text>
  )
}

export function SearchAutocomplete() {
  const [query, setQuery] = useState('')
  const [debounced, setDebounced] = useState('')
  const [active, setActive] = useState(0)
  const [open, setOpen] = useState(true)
  useEffect(() => {
    const timeout = setTimeout(() => setDebounced(query.trim()), 180)
    return () => clearTimeout(timeout)
  }, [query])
  const suggestions = useMemo(
    () =>
      debounced
        ? catalog
            .filter((item) => item.toLowerCase().includes(debounced.toLowerCase()))
            .slice(0, 5)
        : recent,
    [debounced]
  )
  useEffect(() => setActive(0), [debounced])
  const choose = (value: string) => {
    setQuery(value)
    setOpen(false)
  }
  const handleKey = (key: string) => {
    if (key === 'ArrowDown')
      setActive((current) => Math.min(current + 1, suggestions.length - 1))
    if (key === 'ArrowUp') setActive((current) => Math.max(current - 1, 0))
    if (key === 'Enter' && suggestions[active]) choose(suggestions[active])
    if (key === 'Escape') setOpen(false)
  }
  return (
    <YStack width="100%" maxW={620} self="center" gap="$2" position="relative">
      <XStack
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
          height={48}
          value={query}
          onChangeText={(value) => {
            setQuery(value)
            setOpen(true)
          }}
          onFocus={() => setOpen(true)}
          placeholder="Search projects, people, or files"
          aria-label="Search"
          onKeyDown={(event: KeyboardEvent<HTMLInputElement>) => handleKey(event.key)}
          onKeyPress={(event) => handleKey(event.nativeEvent.key)}
        />
        {query ? (
          <Button
            circular
            chromeless
            size="$2.5"
            icon={X}
            aria-label="Clear search"
            onPress={() => {
              setQuery('')
              setOpen(true)
            }}
          />
        ) : null}
      </XStack>
      {open ? (
        <YStack
          overflow="hidden"
          rounded="$6"
          borderWidth={1}
          borderColor="$borderColor"
          bg="$background"
          shadowColor="$shadowColor"
          shadowOpacity={0.16}
          shadowRadius={16}
        >
          <Text
            px="$4"
            pt="$3"
            pb="$2"
            fontSize="$1"
            fontWeight="800"
            color="$color8"
            textTransform="uppercase"
            letterSpacing={1}
          >
            {debounced ? 'Suggestions' : 'Recent searches'}
          </Text>
          {suggestions.length ? (
            suggestions.map((suggestion, index) => (
              <Button
                unstyled
                key={suggestion}
                width="100%"
                flexDirection="row"
                justify="flex-start"
                items="center"
                gap="$3"
                px="$4"
                py="$3"
                rounded={0}
                bg={active === index ? '$color3' : 'transparent'}
                aria-label={`Search for ${suggestion}`}
                onPress={() => choose(suggestion)}
              >
                {debounced ? (
                  <Search size={16} color="$color9" />
                ) : (
                  <Clock3 size={16} color="$color9" />
                )}
                <Highlight label={suggestion} query={debounced} />
              </Button>
            ))
          ) : (
            <Text px="$4" py="$5" color="$color9" text="center">
              No matching results
            </Text>
          )}
        </YStack>
      ) : null}
    </YStack>
  )
}

SearchAutocomplete.fileName = 'SearchAutocomplete'
