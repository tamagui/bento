import { Command } from '@tamagui/lucide-icons-2'
import { useState } from 'react'
import { Text, View, XStack, YStack } from 'tamagui'
import { useGroupMedia } from '../../hooks/useGroupMedia'
import { CommandMenu } from './CommandMenu'
import type { CommandItem } from './commandData'

export function CommandPaletteInline() {
  const [lastAction, setLastAction] = useState('Choose a command from the list')
  const { sm } = useGroupMedia('window')

  const selectCommand = (item: CommandItem) => {
    setLastAction(`${item.label} selected`)
  }

  return (
    <YStack width="100%" maxW={680} gap="3">
      <YStack
        bg="background"
        borderColor="color6"
        borderWidth={1}
        height={sm ? 520 : 620}
        maxH="78vh"
        overflow="hidden"
        rounded="8"
        elevation="4"
      >
        <CommandMenu compact={sm} onSelect={selectCommand} />
      </YStack>
      <XStack render="output" aria-live="polite" gap="2" items="center" px="1">
        <View
          width={28}
          height={28}
          bg="color3"
          items="center"
          justify="center"
          rounded={1000}
        >
          <Command size={14} color="color9" />
        </View>
        <Text color="color9" fontSize="2">
          {lastAction}
        </Text>
      </XStack>
    </YStack>
  )
}

CommandPaletteInline.fileName = 'CommandPaletteInline'
