import {
  Archive,
  Copy,
  PencilLine,
  Share2,
  Star,
  Trash2,
} from '@tamagui/lucide-icons-2'
import { useState } from 'react'
import { Popover, Separator, Text, View, XStack, YStack } from 'tamagui'

const actions = [
  { icon: PencilLine, label: 'Rename', shortcut: '⌘R' },
  { icon: Copy, label: 'Duplicate', shortcut: '⌘D' },
  { icon: Share2, label: 'Share…', shortcut: '' },
  { icon: Star, label: 'Add to favorites', shortcut: '' },
  { icon: Archive, label: 'Archive', shortcut: '' },
]

function MenuItem({
  icon: Icon,
  label,
  shortcut,
  danger,
  onSelect,
}: {
  icon: any
  label: string
  shortcut?: string
  danger?: boolean
  onSelect: () => void
}) {
  return (
    <XStack
      role="menuitem"
      tabIndex={0}
      items="center"
      gap="$2.5"
      px="$2.5"
      py="$2"
      rounded="$3"
      cursor="pointer"
      hoverStyle={{ bg: danger ? '$red4' : '$color4' }}
      pressStyle={{ bg: danger ? '$red5' : '$color5' }}
      onPress={onSelect}
    >
      <Icon size={14} color={danger ? '$red10' : '$color10'} />
      <Text flex={1} fontSize="$3" color={danger ? '$red10' : '$color12'}>
        {label}
      </Text>
      {!!shortcut && (
        <Text fontSize="$1" color="$color9" fontFamily="$mono">
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

  return (
    <YStack gap="$3" items="center">
      <Popover open={open} onOpenChange={setOpen} placement="bottom-start" offset={4}>
        <Popover.Trigger asChild>
          <XStack
            width={340}
            maxW="100%"
            p="$3.5"
            rounded="$5"
            bg="$color1"
            borderWidth={1}
            borderColor="$color4"
            items="center"
            gap="$3"
            cursor="context-menu"
            hoverStyle={{ borderColor: '$color6' }}
            onPress={() => setOpen(true)}
            onContextMenu={(e: any) => {
              e.preventDefault()
              setOpen(true)
            }}
          >
            <View width={38} height={38} rounded="$3" bg="$blue5" items="center" justify="center">
              <Text fontWeight="700" color="$blue11">Q3</Text>
            </View>
            <YStack flex={1}>
              <Text fontWeight="600" color="$color12">
                Q3 Launch plan.pdf
              </Text>
              <Text fontSize="$2" color="$color10">
                Right-click (or tap) for actions
              </Text>
            </YStack>
          </XStack>
        </Popover.Trigger>
        <Popover.Content
          role="menu"
          rounded="$5"
          borderWidth={1}
          borderColor="$color5"
          bg="$color1"
          p="$1.5"
          minW={220}
          shadowColor="$shadowColor"
          shadowRadius={18}
          shadowOffset={{ width: 0, height: 8 }}
          transition="100ms"
          enterStyle={{ opacity: 0, scale: 0.97 }}
          exitStyle={{ opacity: 0, scale: 0.98 }}
        >
          <YStack gap="$0.5" width="100%">
            {actions.map((a) => (
              <MenuItem
                key={a.label}
                {...a}
                onSelect={() => {
                  setLast(a.label)
                  setOpen(false)
                }}
              />
            ))}
            <Separator my="$1" />
            <MenuItem
              icon={Trash2}
              label="Delete"
              danger
              onSelect={() => {
                setLast('Delete')
                setOpen(false)
              }}
            />
          </YStack>
        </Popover.Content>
      </Popover>
      <Text fontSize="$2" color="$color9">
        {last ? `Last action: ${last}` : 'No action yet'}
      </Text>
    </YStack>
  )
}

ContextMenuRow.fileName = 'ContextMenuRow'
