import { Archive, Copy, PencilLine, Share2, Star, Trash2 } from '@tamagui/lucide-icons-2'
import { useRef, useState } from 'react'
import { Button, Popover, Separator, Text, View, XStack, YStack, isWeb } from 'tamagui'
import { useReducedMotion } from '../../hooks'

const modKey =
  isWeb && typeof navigator !== 'undefined' && /Mac|iPhone|iPad/.test(navigator.platform)
    ? '⌘'
    : 'Ctrl'

// key: registered while the row is focused or the menu is open
const actions = [
  { icon: PencilLine, label: 'Rename', key: 'r' },
  { icon: Copy, label: 'Duplicate', key: 'd' },
  { icon: Share2, label: 'Share…', key: '' },
  { icon: Star, label: 'Add to favorites', key: '' },
  { icon: Archive, label: 'Archive', key: '' },
]

function MenuItem({
  icon: Icon,
  label,
  shortcut,
  danger,
  itemRef,
  onSelect,
}: {
  icon: typeof PencilLine
  label: string
  shortcut?: string
  danger?: boolean
  itemRef?: (el: HTMLElement | null) => void
  onSelect: () => void
}) {
  return (
    <XStack
      ref={itemRef as any}
      render={isWeb ? <button type="button" /> : undefined}
      role="menuitem"
      tabIndex={-1}
      items="center"
      gap="2-5"
      px="2-5"
      py="2"
      rounded="3"
      cursor="pointer"
      bg={`hover:${danger ? 'red-200' : 'color4'} press:${danger ? 'red-300' : 'color5'} focus:${danger ? 'red-200' : 'color4'}`}
      onPress={onSelect}
    >
      <Icon size={14} color={danger ? 'red-600' : 'color9'} aria-hidden />
      <Text flex={1} fontSize="3" color={`${danger ? 'red-600' : 'color11'}`}>
        {label}
      </Text>
      {!!shortcut && (
        <Text fontSize="1" color="color8" fontFamily="mono" aria-hidden>
          {shortcut}
        </Text>
      )}
    </XStack>
  )
}

/** ------ EXAMPLE ------ */
export function ContextMenuRow() {
  const [open, setOpen] = useState(false)
  const [last, setLast] = useState<string | null>(null)
  const [anchor, setAnchor] = useState({ x: 16, y: 44 })
  const triggerRef = useRef<HTMLElement | null>(null)
  const itemRefs = useRef<(HTMLElement | null)[]>([])
  const reducedMotion = useReducedMotion()

  const openMenu = (at?: { x: number; y: number }) => {
    if (at) setAnchor(at)
    setOpen(true)
    if (isWeb) {
      requestAnimationFrame(() => itemRefs.current[0]?.focus())
    }
  }

  const closeMenu = () => {
    setOpen(false)
    // wait out the popover teardown before handing focus back
    if (isWeb) setTimeout(() => triggerRef.current?.focus(), 150)
  }

  const run = (label: string) => {
    setLast(label)
    closeMenu()
  }

  const handleTriggerKeyDown = (event: any) => {
    if (!isWeb) return
    // context-menu conventions plus real registered shortcuts
    if (event.key === 'ContextMenu' || (event.shiftKey && event.key === 'F10')) {
      event.preventDefault()
      openMenu()
      return
    }
    if (event.metaKey || event.ctrlKey) {
      const action = actions.find((a) => a.key && a.key === event.key.toLowerCase())
      if (action) {
        event.preventDefault()
        setLast(action.label)
      }
    }
  }

  const handleMenuKeyDown = (event: any) => {
    if (!isWeb) return
    const items = itemRefs.current.filter(Boolean) as HTMLElement[]
    const active = items.indexOf(document.activeElement as HTMLElement)
    if (event.key === 'ArrowDown' || event.key === 'ArrowUp') {
      event.preventDefault()
      const direction = event.key === 'ArrowDown' ? 1 : -1
      items[(active + direction + items.length) % items.length]?.focus()
    } else if (event.key === 'Home') {
      event.preventDefault()
      items[0]?.focus()
    } else if (event.key === 'End') {
      event.preventDefault()
      items[items.length - 1]?.focus()
    } else if (event.key === 'Escape') {
      event.preventDefault()
      closeMenu()
    }
  }

  let refIndex = -1
  const nextItemRef = () => {
    const index = ++refIndex
    return (el: HTMLElement | null) => {
      itemRefs.current[index] = el
    }
  }

  return (
    <YStack gap="3" items="center">
      <Popover open={open} onOpenChange={setOpen} placement="bottom-start" offset={4}>
        <YStack position="relative" width={340} maxW="100%">
          {/* invisible anchor tracks the pointer so the menu opens at the cursor */}
          <Popover.Anchor
            position="absolute"
            l={anchor.x}
            t={anchor.y}
            width={1}
            height={1}
            pointerEvents="none"
          />
          <XStack
            ref={triggerRef as any}
            render={isWeb ? <button type="button" /> : undefined}
            aria-haspopup="menu"
            aria-expanded={open}
            aria-label="Q3 Launch plan.pdf, press for actions"
            width="100%"
            p="4"
            rounded="5"
            bg="color1"
            borderWidth={1}
            borderColor="color4 hover:color6"
            items="center"
            gap="3"
            cursor="context-menu"
            outlineColor="focus-visible:outline-color"
            outlineOffset="focus-visible:2px"
            outlineStyle="focus-visible:solid"
            outlineWidth="focus-visible:2px"
            onPress={() => (isWeb ? openMenu() : setLast('Opened'))}
            onLongPress={() => openMenu()}
            onKeyDown={handleTriggerKeyDown}
            onContextMenu={(e: any) => {
              e.preventDefault()
              const rect = e.currentTarget.getBoundingClientRect?.()
              openMenu(
                rect ? { x: e.clientX - rect.left, y: e.clientY - rect.top } : undefined
              )
            }}
          >
            <View
              width={38}
              height={38}
              rounded="3"
              bg="blue-300"
              items="center"
              justify="center"
            >
              <Text fontWeight="700" color="blue-700">
                Q3
              </Text>
            </View>
            <YStack flex={1} items="flex-start">
              <Text fontWeight="600" color="color11">
                Q3 Launch plan.pdf
              </Text>
              <Text fontSize="2" color="color9">
                {isWeb ? 'Right-click for actions' : 'Long-press for actions'}
              </Text>
            </YStack>
          </XStack>
        </YStack>
        <Popover.Content
          role="menu"
          aria-label="File actions"
          rounded="5"
          borderWidth={1}
          borderColor="color5"
          bg="color1"
          p="1"
          minW={220}
          boxShadow="0 8px 18px shadow-color"
          transition={reducedMotion ? undefined : '100ms'}
          opacity={`${reducedMotion ? '' : 'enter:0'} exit:0`}
          scale={`${reducedMotion ? '' : 'enter:0.97'} exit:0.98`}
          onKeyDown={handleMenuKeyDown}
        >
          <YStack gap="px" width="100%">
            {actions.map((a) => (
              <MenuItem
                key={a.label}
                icon={a.icon}
                label={a.label}
                shortcut={isWeb && a.key ? `${modKey}${a.key.toUpperCase()}` : ''}
                itemRef={nextItemRef()}
                onSelect={() => run(a.label)}
              />
            ))}
            <Separator my="1" />
            <MenuItem
              icon={Trash2}
              label="Delete"
              danger
              itemRef={nextItemRef()}
              onSelect={() => run('Delete')}
            />
          </YStack>
        </Popover.Content>
      </Popover>
      <XStack gap="2" items="center" minH={28}>
        <Text fontSize="2" color="color8" aria-live="polite">
          {last === 'Delete'
            ? 'Deleted Q3 Launch plan.pdf'
            : last
              ? `Last action: ${last}`
              : 'No action yet'}
        </Text>
        {last === 'Delete' && (
          <Button size="2" variant="quiet" onPress={() => setLast(null)}>
            Undo
          </Button>
        )}
      </XStack>
    </YStack>
  )
}

ContextMenuRow.fileName = 'ContextMenuRow'
