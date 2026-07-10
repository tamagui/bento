import { Search, SearchX, X } from '@tamagui/lucide-icons-2'
import { useEffect, useId, useMemo, useRef, useState } from 'react'
import type { KeyboardEvent } from 'react'
import {
  Button,
  Input,
  ScrollView,
  Separator,
  Text,
  View,
  XStack,
  YStack,
  isWeb,
  styled,
} from 'tamagui'
import { filterCommandGroups, type CommandItem } from './commandData'

/** platform-correct modifier glyph for shortcut hints */
export const modKey =
  isWeb && typeof navigator !== 'undefined' && /Mac|iPhone|iPad/.test(navigator.platform)
    ? '⌘'
    : 'Ctrl'

const shortcutKey = (key: string) => (key === 'mod' ? modKey : key)

type CommandMenuProps = {
  autoFocus?: boolean
  /** tighter chrome for narrow containers: shorter placeholder, no ESC hint */
  compact?: boolean
  onDismiss?: () => void
  onSelect: (item: CommandItem) => void
}

export function CommandMenu({
  autoFocus,
  compact,
  onDismiss,
  onSelect,
}: CommandMenuProps) {
  const [query, setQuery] = useState('')
  const [activeIndex, setActiveIndex] = useState(0)
  // hover activates only on true pointer movement (coordinate delta) — the
  // panel opening under a stationary cursor, and Chrome's synthetic mousemove
  // after keyboard scrolling, must not steal the keyboard selection
  const lastPointer = useRef<{ x: number; y: number } | null>(null)
  const handleRowMouseMove = (index: number, event: React.MouseEvent) => {
    const { clientX, clientY } = event
    if (lastPointer.current?.x === clientX && lastPointer.current?.y === clientY) return
    lastPointer.current = { x: clientX, y: clientY }
    setActiveIndex(index)
  }
  const id = useId().replaceAll(':', '')
  const listboxId = `command-list-${id}`
  const groups = useMemo(() => filterCommandGroups(query), [query])
  const items = useMemo(() => groups.flatMap((group) => group.items), [groups])
  const activeItem = items[activeIndex]
  const activeItemId = activeItem ? `${listboxId}-${activeItem.id}` : undefined

  useEffect(() => setActiveIndex(0), [query])

  useEffect(() => {
    if (activeIndex >= items.length) setActiveIndex(Math.max(0, items.length - 1))
  }, [activeIndex, items.length])

  useEffect(() => {
    if (!isWeb || !activeItemId) return
    document.getElementById(activeItemId)?.scrollIntoView({ block: 'nearest' })
  }, [activeItemId])

  const moveActive = (direction: 1 | -1) => {
    if (!items.length) return
    setActiveIndex((current) => (current + direction + items.length) % items.length)
  }

  const selectItem = (item?: CommandItem) => {
    if (item) onSelect(item)
  }

  const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.nativeEvent.isComposing) return

    if (event.key === 'ArrowDown') {
      event.preventDefault()
      moveActive(1)
    } else if (event.key === 'ArrowUp') {
      event.preventDefault()
      moveActive(-1)
    } else if (event.key === 'Enter') {
      event.preventDefault()
      selectItem(activeItem)
    } else if (event.key === 'Escape') {
      event.preventDefault()
      onDismiss?.()
    }
  }

  let itemIndex = -1

  return (
    <YStack flex={1} minH={0}>
      <SearchField
        data-command-search
        focusWithinStyle={{
          outlineColor: '$color8',
          outlineOffset: 2,
          outlineStyle: 'solid',
          outlineWidth: 2,
        }}
      >
        <Search size={20} color="$color10" aria-hidden />
        <Input
          aria-activedescendant={activeItemId}
          aria-autocomplete="list"
          aria-controls={listboxId}
          aria-expanded
          aria-label="Search commands"
          autoCapitalize="none"
          autoCorrect={false}
          autoFocus={autoFocus}
          bg="transparent"
          borderWidth={0}
          flex={1}
          fontSize="$5"
          height={48}
          onChangeText={setQuery}
          onKeyDown={handleKeyDown}
          outlineWidth={0}
          placeholder={compact ? 'Search…' : 'Search pages and actions…'}
          placeholderTextColor="$color10"
          role="combobox"
          value={query}
        />
        {!!query && (
          <Button
            aria-label="Clear search"
            chromeless
            circular
            icon={X}
            onPress={() => setQuery('')}
            size="$2.5"
            hitSlop={isWeb ? undefined : 8}
          />
        )}
        {isWeb ? (
          !compact && <Kbd>ESC</Kbd>
        ) : (
          <Button aria-label="Close" chromeless onPress={onDismiss} size="$2">
            <Text color="$color10" fontSize="$3">
              Cancel
            </Text>
          </Button>
        )}
      </SearchField>

      <Separator />

      <ScrollView flex={1} keyboardShouldPersistTaps="handled">
        <YStack
          id={listboxId}
          aria-label="Command results"
          accessibilityRole={isWeb ? undefined : 'menu'}
          py="$2"
          render={isWeb ? <div role="listbox" tabIndex={-1} /> : undefined}
        >
          {groups.map((group) => (
            // biome-ignore lint/a11y/useSemanticElements: ARIA listboxes group rich options without a native fieldset.
            <YStack key={group.id} role="group" aria-label={group.label} px="$2" pb="$2">
              <Text
                color="$color10"
                fontSize="$1"
                fontWeight="700"
                letterSpacing={0.8}
                px="$2"
                py="$2"
                textTransform="uppercase"
              >
                {group.label}
              </Text>
              {group.items.map((item) => {
                itemIndex += 1
                const index = itemIndex
                const active = index === activeIndex
                const Icon = item.icon

                return (
                  <CommandRow
                    id={`${listboxId}-${item.id}`}
                    key={item.id}
                    active={active}
                    aria-selected={active}
                    // biome-ignore lint/a11y/useSemanticElements: Native options cannot contain this rich ARIA listbox row.
                    role={isWeb ? 'option' : 'menuitem'}
                    tabIndex={-1}
                    onFocus={() => setActiveIndex(index)}
                    onMouseMove={(event: React.MouseEvent) =>
                      handleRowMouseMove(index, event)
                    }
                    onPress={() => selectItem(item)}
                  >
                    <Icon
                      size={18}
                      color={active ? '$color12' : '$color10'}
                      aria-hidden
                    />
                    <YStack flex={1} minW={0}>
                      <Text
                        color="$color12"
                        fontSize="$4"
                        fontWeight="600"
                        numberOfLines={1}
                      >
                        {item.label}
                      </Text>
                      <Text color="$color11" fontSize="$2" numberOfLines={1}>
                        {item.description}
                      </Text>
                    </YStack>
                    {isWeb && !!item.shortcut?.length && (
                      <XStack gap="$1" aria-hidden>
                        {item.shortcut.map((key) => (
                          <Kbd key={key}>{shortcutKey(key)}</Kbd>
                        ))}
                      </XStack>
                    )}
                  </CommandRow>
                )
              })}
            </YStack>
          ))}

          {!items.length && (
            <YStack
              render="output"
              aria-label={`No results for ${query}`}
              items="center"
              gap="$2"
              px="$5"
              py="$8"
            >
              <SearchX size={32} color="$color9" aria-hidden />
              <Text color="$color12" fontSize="$5" fontWeight="600" text="center">
                No results for “{query}”
              </Text>
              <Text color="$color9" fontSize="$3" text="center">
                Try another phrase or clear your search.
              </Text>
              <Button mt="$2" onPress={() => setQuery('')} size="$3" variant="outlined">
                Clear search
              </Button>
            </YStack>
          )}
        </YStack>
      </ScrollView>

      {isWeb && (
        <>
          <Separator />
          <XStack
            aria-hidden
            gap="$4"
            items="center"
            justify="flex-end"
            minH={48}
            px="$4"
          >
            <Hint label="Navigate" keys={['↑', '↓']} />
            <Hint label="Select" keys={['↵']} />
          </XStack>
        </>
      )}
    </YStack>
  )
}

function Hint({ keys, label }: { keys: string[]; label: string }) {
  return (
    <XStack gap="$1.5" items="center">
      {keys.map((key) => (
        <Kbd key={key}>{key}</Kbd>
      ))}
      <Text color="$color10" fontSize="$1">
        {label}
      </Text>
    </XStack>
  )
}

const SearchField = styled(XStack, {
  items: 'center',
  gap: '$2',
  minH: 64,
  px: '$4',
  outlineWidth: 0,
})

const CommandRow = styled(XStack, {
  items: 'center',
  gap: '$3',
  minH: 58,
  px: '$3',
  py: '$2',
  rounded: '$4',
  cursor: 'pointer',
  outlineWidth: 0,
  hoverStyle: {
    bg: '$color3',
  },
  focusVisibleStyle: {
    outlineColor: '$color8',
    outlineOffset: -2,
    outlineStyle: 'solid',
    outlineWidth: 2,
  },
  pressStyle: {
    scale: 0.98,
  },
  variants: {
    active: {
      true: {
        bg: '$color4',
      },
    },
  } as const,
})

export const Kbd = styled(Text, {
  render: 'kbd',
  items: 'center',
  justify: 'center',
  shrink: 0,
  whiteSpace: 'nowrap',
  minW: 24,
  height: 24,
  px: '$1.5',
  rounded: '$2',
  borderWidth: 1,
  borderColor: '$color6',
  bg: '$color3',
  color: '$color10',
  fontSize: '$1',
  fontWeight: '700',
  lineHeight: 22,
  text: 'center',
})
