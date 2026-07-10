import { Clock3, Search, X } from '@tamagui/lucide-icons-2'
import { type KeyboardEvent, useEffect, useId, useMemo, useRef, useState } from 'react'
import { Button, Input, Text, XStack, YStack, isWeb } from 'tamagui'

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
  const inputRef = useRef<any>(null)
  const id = useId().replaceAll(':', '')
  const listboxId = `search-listbox-${id}`

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

  const activeId = open && suggestions[active] ? `${listboxId}-${active}` : undefined

  const choose = (value: string) => {
    setQuery(value)
    setOpen(false)
    // the option the user pressed unmounts — keep focus on the input
    inputRef.current?.focus?.()
  }

  const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.nativeEvent?.isComposing) return
    const { key } = event
    if (key === 'ArrowDown' || key === 'ArrowUp') {
      event.preventDefault?.()
      setOpen(true)
      setActive((current) =>
        key === 'ArrowDown'
          ? Math.min(current + 1, suggestions.length - 1)
          : Math.max(current - 1, 0)
      )
    } else if (key === 'Home' && open) {
      event.preventDefault?.()
      setActive(0)
    } else if (key === 'End' && open) {
      event.preventDefault?.()
      setActive(suggestions.length - 1)
    } else if (key === 'Enter' && open && suggestions[active]) {
      event.preventDefault?.()
      choose(suggestions[active])
    } else if (key === 'Escape') {
      setOpen(false)
    }
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
        <Search size={19} color="$color9" aria-hidden />
        <Input
          ref={inputRef}
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
          role="combobox"
          aria-expanded={open}
          aria-controls={listboxId}
          aria-autocomplete="list"
          aria-activedescendant={activeId}
          onKeyDown={isWeb ? handleKeyDown : undefined}
        />
        {query ? (
          <Button
            circular
            chromeless
            size="$2.5"
            icon={X}
            hitSlop={isWeb ? undefined : 10}
            aria-label="Clear search"
            onPress={() => {
              setQuery('')
              setOpen(true)
              inputRef.current?.focus?.()
            }}
          />
        ) : null}
      </XStack>
      <Text
        render="output"
        aria-live="polite"
        position="absolute"
        width={1}
        height={1}
        opacity={0}
        overflow="hidden"
      >
        {open
          ? suggestions.length
            ? `${suggestions.length} ${debounced ? 'suggestions' : 'recent searches'} available`
            : 'No matching results'
          : ''}
      </Text>
      {open ? (
        <YStack
          id={listboxId}
          role={isWeb ? ('listbox' as any) : undefined}
          aria-label="Search suggestions"
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
            aria-hidden
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
                id={`${listboxId}-${index}`}
                role={isWeb ? ('option' as any) : undefined}
                aria-selected={active === index}
                tabIndex={-1}
                width="100%"
                flexDirection="row"
                justify="flex-start"
                items="center"
                gap="$3"
                px="$4"
                py="$3"
                rounded={0}
                cursor="pointer"
                bg={active === index ? '$color3' : 'transparent'}
                hoverStyle={{ bg: '$color3' }}
                aria-label={`Search for ${suggestion}`}
                onMouseEnter={() => setActive(index)}
                onPress={() => choose(suggestion)}
              >
                {debounced ? (
                  <Search size={16} color="$color9" aria-hidden />
                ) : (
                  <Clock3 size={16} color="$color9" aria-hidden />
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
