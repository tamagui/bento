import { Command as CommandIcon, Search } from '@tamagui/lucide-icons-2'
import { useContext, useEffect, useRef, useState } from 'react'
import { SafeAreaInsetsContext } from 'react-native-safe-area-context'
import {
  Button,
  Dialog,
  Paragraph,
  Text,
  Theme,
  View,
  XStack,
  YStack,
  isWeb,
  useThemeName,
} from 'tamagui'
import { useGroupMedia } from '../../hooks/useGroupMedia'
import { CommandMenu, Kbd, modKey } from './CommandMenu'
import type { CommandItem } from './commandData'

export function CommandPalette() {
  const [open, setOpen] = useState(false)
  const [lastAction, setLastAction] = useState('No command selected yet')
  const { sm } = useGroupMedia('window')
  const themeName = useThemeName()
  const triggerRef = useRef<any>(null)
  // context (not the hook) so web galleries without a SafeAreaProvider still work
  const insets = useContext(SafeAreaInsetsContext)

  const handleOpenChange = (next: boolean) => {
    setOpen(next)
    if (!next && isWeb) {
      // hand focus back to the launcher once the exit animation lands
      setTimeout(() => triggerRef.current?.focus?.(), 150)
    }
  }

  useEffect(() => {
    if (!isWeb) return

    const handleShortcut = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key.toLocaleLowerCase() === 'k') {
        event.preventDefault()
        handleOpenChange(!open)
      }
    }

    window.addEventListener('keydown', handleShortcut)
    return () => window.removeEventListener('keydown', handleShortcut)
  })

  const selectCommand = (item: CommandItem) => {
    setLastAction(`${item.label} selected`)
    handleOpenChange(false)
  }

  return (
    <YStack width="100%" maxW={720} items="center" gap="$4" py="$7">
      <YStack items="center" gap="$2">
        <View
          bg="$color3"
          borderColor="$color6"
          borderWidth={1}
          items="center"
          justify="center"
          width={52}
          height={52}
          rounded={1000}
        >
          <CommandIcon size={24} color="$color11" />
        </View>
        <Text fontSize="$7" fontWeight="700" text="center">
          Find anything, instantly
        </Text>
        <Paragraph color="$color10" maxW={480} text="center">
          Jump between pages, create work, and revisit recent files without leaving the
          keyboard.
        </Paragraph>
      </YStack>

      <Dialog modal open={open} onOpenChange={handleOpenChange}>
        <Button
          ref={triggerRef}
          aria-haspopup="dialog"
          aria-expanded={open}
          icon={Search}
          onPress={() => setOpen(true)}
          size="$5"
          theme="accent"
          focusVisibleStyle={{
            outlineColor: '$color8',
            outlineOffset: 2,
            outlineStyle: 'solid',
            outlineWidth: 2,
          }}
        >
          Open command palette
          {isWeb && (
            <XStack ml="$2" gap="$1" aria-hidden>
              <Kbd>{modKey}</Kbd>
              <Kbd>K</Kbd>
            </XStack>
          )}
        </Button>

        <Theme name={themeName}>
          <Dialog.Portal>
            <Dialog.Overlay
              data-command-overlay
              key="command-overlay"
              bg="$shadow6"
              enterStyle={{ opacity: 0 }}
              exitStyle={{ opacity: 0 }}
              opacity={1}
              style={{
                backdropFilter: 'blur(7px)',
                WebkitBackdropFilter: 'blur(7px)',
              }}
              transition="100ms"
            />

            <Dialog.Content
              data-command-panel
              key="command-panel"
              bg="$background"
              borderColor="$color6"
              borderWidth={1}
              elevate
              enterStyle={{ opacity: 0, scale: 0.98, y: sm ? 16 : -8 }}
              exitStyle={{ opacity: 0, scale: 0.98, y: sm ? 12 : -4 }}
              height={sm ? '100%' : 620}
              maxH={sm ? '100%' : '78vh'}
              maxW={sm ? '100%' : 680}
              overflow="hidden"
              p={0}
              // full-screen on native must clear the status bar / dynamic island
              pt={!isWeb && sm ? (insets?.top ?? 54) + 8 : 0}
              rounded={sm ? 0 : '$8'}
              style={
                sm
                  ? { inset: 0 }
                  : { left: 0, right: 0, top: '10vh', marginHorizontal: 'auto' }
              }
              transition="100ms"
              width="100%"
            >
              <Dialog.Title
                position="absolute"
                width={1}
                height={1}
                opacity={0}
                overflow="hidden"
              >
                Command palette
              </Dialog.Title>
              <Dialog.Description
                position="absolute"
                width={1}
                height={1}
                opacity={0}
                overflow="hidden"
              >
                Search pages and actions, then use arrow keys and Enter to select.
              </Dialog.Description>
              <CommandMenu
                autoFocus
                compact={sm}
                onDismiss={() => handleOpenChange(false)}
                onSelect={selectCommand}
              />
            </Dialog.Content>
          </Dialog.Portal>
        </Theme>
      </Dialog>

      <XStack
        render="output"
        aria-live="polite"
        bg="$color2"
        borderColor="$color5"
        borderWidth={1}
        gap="$2"
        items="center"
        minH={42}
        px="$3"
        rounded="$4"
      >
        <View width={7} height={7} rounded={1000} bg="$color8" />
        <Text color="$color10" fontSize="$2" data-command-result>
          {lastAction}
        </Text>
      </XStack>
    </YStack>
  )
}

CommandPalette.fileName = 'CommandPalette'
