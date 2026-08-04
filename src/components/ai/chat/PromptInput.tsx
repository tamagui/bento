import { ArrowUp, CircleStop, Paperclip, Sparkles, X } from '@tamagui/lucide-icons-2'
import { useRef, useState } from 'react'
import type { KeyboardEvent } from 'react'
import { Button, ScrollView, Text, TextArea, XStack, YStack, isWeb } from 'tamagui'

const suggestions = [
  'Summarize this thread',
  'Explain like I am five',
  'Draft a release note',
]

/** ------ EXAMPLE ------ */
export function PromptInput() {
  const [value, setValue] = useState('')
  const [attachments, setAttachments] = useState<string[]>([])
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent'>('idle')
  const fileRef = useRef<HTMLInputElement>(null)
  const sendTimer = useRef<ReturnType<typeof setTimeout>>(undefined)

  const busy = status === 'sending'
  const canSend = value.trim().length > 0 && !busy

  // the draft stays until the send completes; stop restores it untouched
  const send = () => {
    if (!canSend) return
    setStatus('sending')
    sendTimer.current = setTimeout(() => {
      setValue('')
      setAttachments([])
      setStatus('sent')
      sendTimer.current = setTimeout(() => setStatus('idle'), 1800)
    }, 1200)
  }

  const stop = () => {
    clearTimeout(sendTimer.current)
    setStatus('idle')
  }

  const addAttachment = () => {
    if (isWeb) {
      fileRef.current?.click()
      return
    }
    // demos stay dependency-free; wire expo-document-picker in your app
    setAttachments((prev) => [...prev, `photo-${prev.length + 1}.jpg`])
  }

  const handleKeyDown = (event: KeyboardEvent<any>) => {
    if (event.key === 'Enter' && !event.shiftKey && !event.nativeEvent.isComposing) {
      event.preventDefault()
      send()
    }
  }

  return (
    <YStack width="100%" maxW={560} gap="3">
      {isWeb && (
        <input
          ref={fileRef}
          type="file"
          multiple
          style={{ display: 'none' }}
          onChange={(event) => {
            const names = Array.from(event.target.files ?? []).map((f) => f.name)
            if (names.length) setAttachments((prev) => [...prev, ...names])
            event.target.value = ''
          }}
        />
      )}

      <ScrollView horizontal showsHorizontalScrollIndicator={false} mx="-1" px="1">
        <XStack gap="2">
          {suggestions.map((s) => (
            <Button
              key={s}
              size="8"
              rounded="10"
              bg="color3 hover:color4 press:color5"
              borderWidth={1}
              borderColor="color5 hover:color6"
              onPress={() => setValue(s)}
            >
              <XStack items="center" gap="1">
                <Sparkles size={12} color="color9" />
                <Text fontSize="2" color="color10">
                  {s}
                </Text>
              </XStack>
            </Button>
          ))}
        </XStack>
      </ScrollView>

      <YStack
        rounded="6"
        borderWidth={1}
        borderColor="color5 focus-within:color7"
        bg="color2"
        overflow="hidden"
      >
        {attachments.length > 0 && (
          <XStack mx="3" mt="3" gap="2" flexWrap="wrap">
            {attachments.map((name, i) => (
              <XStack
                key={`${name}-${i}`}
                px="2-5"
                py="1"
                bg="color4"
                rounded="4"
                items="center"
                gap="2"
              >
                <Paperclip size={12} color="color9" />
                <Text fontSize="2" color="color10" maxW={180} numberOfLines={1}>
                  {name}
                </Text>
                <Button
                  aria-label={`Remove ${name}`}
                  size="1"
                  circular
                  variant="quiet"
                  hitSlop={isWeb ? undefined : 12}
                  onPress={() =>
                    setAttachments((prev) => prev.filter((_, idx) => idx !== i))
                  }
                >
                  <X size={10} color="color9" />
                </Button>
              </XStack>
            ))}
          </XStack>
        )}

        <TextArea
          aria-label="Message the assistant"
          placeholder="Ask anything…"
          placeholderTextColor="color8"
          value={value}
          onChangeText={setValue}
          onKeyDown={isWeb ? handleKeyDown : undefined}
          borderWidth={0}
          bg="transparent"
          px="4"
          py="3"
          minH={64}
          fontSize="4"
          outlineWidth="focus:0px"
        />

        <XStack px="2-5" pb="2-5" items="center" gap="2">
          <Button
            aria-label="Attach files"
            size="3"
            circular
            variant="quiet"
            hitSlop={isWeb ? undefined : 6}
            bg="hover:color4"
            onPress={addAttachment}
          >
            <Paperclip size={16} color="color9" />
          </Button>

          <Text aria-live="polite" fontSize="1" color="color8" flex={1}>
            {status === 'sending'
              ? 'Sending…'
              : status === 'sent'
                ? 'Sent'
                : isWeb
                  ? '↵ send · ⇧↵ new line'
                  : ''}
          </Text>

          <Button
            aria-label={busy ? 'Stop sending' : 'Send message'}
            size="3"
            circular
            disabled={!canSend && !busy}
            bg={`${busy ? 'color4' : canSend ? 'color11' : 'color4'}`}
            opacity="hover:0.9"
            scale="press:0.96"
            hitSlop={isWeb ? undefined : 6}
            onPress={busy ? stop : send}
          >
            {busy ? (
              <CircleStop size={16} color="color10" />
            ) : (
              <ArrowUp size={16} color={`${canSend ? 'color1' : 'color8'}`} />
            )}
          </Button>
        </XStack>
      </YStack>

      <Text fontSize="1" color="color8" self="center">
        The assistant can make mistakes. Check important info.
      </Text>
    </YStack>
  )
}

PromptInput.fileName = 'PromptInput'
