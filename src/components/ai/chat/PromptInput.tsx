import { ArrowUp, CircleStop, Paperclip, Sparkles, X } from '@tamagui/lucide-icons-2'
import { useState } from 'react'
import { Button, Text, TextArea, View, XStack, YStack } from 'tamagui'

const suggestions = [
  'Summarize this thread',
  'Explain like I am five',
  'Draft a release note',
]

/** ------ EXAMPLE ------ */
export function PromptInput() {
  const [value, setValue] = useState('')
  const [attachment, setAttachment] = useState<string | null>(null)
  const [busy, setBusy] = useState(false)

  const canSend = value.trim().length > 0 && !busy

  const send = () => {
    if (!canSend) return
    setBusy(true)
    setValue('')
    setTimeout(() => setBusy(false), 2200)
  }

  return (
    <YStack width="100%" maxW={560} gap="$3">
      <XStack gap="$2" flexWrap="wrap">
        {suggestions.map((s) => (
          <Button
            key={s}
            size="$2"
            rounded="$10"
            bg="$color3"
            borderWidth={1}
            borderColor="$color5"
            hoverStyle={{ bg: '$color4', borderColor: '$color6' }}
            pressStyle={{ bg: '$color5' }}
            onPress={() => setValue(s)}
          >
            <XStack items="center" gap="$1.5">
              <Sparkles size={12} color="$color10" />
              <Text fontSize="$2" color="$color11">
                {s}
              </Text>
            </XStack>
          </Button>
        ))}
      </XStack>

      <YStack
        rounded="$6"
        borderWidth={1}
        borderColor="$color5"
        bg="$color2"
        overflow="hidden"
        focusWithinStyle={{ borderColor: '$color8' }}
      >
        {attachment && (
          <XStack
            mx="$3"
            mt="$3"
            px="$2.5"
            py="$1.5"
            bg="$color4"
            rounded="$4"
            self="flex-start"
            items="center"
            gap="$2"
          >
            <Paperclip size={12} color="$color10" />
            <Text fontSize="$2" color="$color11">
              {attachment}
            </Text>
            <Button
              aria-label="Remove attachment"
              size="$1"
              circular
              chromeless
              onPress={() => setAttachment(null)}
            >
              <X size={10} color="$color10" />
            </Button>
          </XStack>
        )}

        <TextArea
          aria-label="Message the assistant"
          placeholder="Ask anything…"
          placeholderTextColor="$color9"
          value={value}
          onChangeText={setValue}
          borderWidth={0}
          bg="transparent"
          px="$3.5"
          py="$3"
          minH={64}
          fontSize="$4"
          focusStyle={{ outlineWidth: 0 }}
        />

        <XStack px="$2.5" pb="$2.5" items="center" justify="space-between">
          <Button
            aria-label="Attach a file"
            size="$2.5"
            circular
            chromeless
            hoverStyle={{ bg: '$color4' }}
            onPress={() => setAttachment('quarterly-report.pdf')}
          >
            <Paperclip size={16} color="$color10" />
          </Button>

          <Button
            aria-label={busy ? 'Stop generating' : 'Send message'}
            size="$2.5"
            circular
            disabled={!canSend && !busy}
            bg={busy ? '$color4' : canSend ? '$color12' : '$color4'}
            hoverStyle={{ opacity: 0.9 }}
            pressStyle={{ scale: 0.96 }}
            onPress={busy ? () => setBusy(false) : send}
          >
            {busy ? (
              <CircleStop size={16} color="$color11" />
            ) : (
              <ArrowUp size={16} color={canSend ? '$color1' : '$color9'} />
            )}
          </Button>
        </XStack>
      </YStack>

      <Text fontSize="$1" color="$color9" self="center">
        The assistant can make mistakes. Check important info.
      </Text>
    </YStack>
  )
}

PromptInput.fileName = 'PromptInput'
