import { Copy, RefreshCw, ThumbsDown, ThumbsUp } from '@tamagui/lucide-icons-2'
import { useEffect, useRef, useState } from 'react'
import { ScrollView } from 'react-native'
import { Button, Text, View, XStack, YStack } from 'tamagui'
import type { ChatMessage } from './common/chatParts'
import { MessageRow, TypingDots, useMockStream } from './common/chatParts'

const history: ChatMessage[] = [
  {
    id: '1',
    role: 'user',
    content: 'What makes Tamagui fast compared to other styling libraries?',
  },
  {
    id: '2',
    role: 'assistant',
    content:
      'Tamagui has an optimizing compiler that extracts your styles to atomic CSS at build time, so most components render as plain divs with classNames — no runtime style resolution at all.',
  },
  {
    id: '3',
    role: 'user',
    content: 'Nice — does that work on native too?',
  },
]

const streamedAnswer =
  'Yes! On React Native the compiler hoists StyleSheet objects and flattens component trees where possible. The same code compiles to atomic CSS on web and optimized StyleSheets on native, so you keep one codebase without giving up per-platform performance.'

function IconAction({
  label,
  children,
  onPress,
}: {
  label: string
  children: React.ReactNode
  onPress?: () => void
}) {
  return (
    <Button
      aria-label={label}
      size="$2"
      chromeless
      circular
      onPress={onPress}
      hoverStyle={{ bg: '$color4' }}
      pressStyle={{ bg: '$color5' }}
    >
      {children}
    </Button>
  )
}

/** ------ EXAMPLE ------ */
export function ChatConversation() {
  const [runId, setRunId] = useState(0)
  const { text, done, restart } = useMockStream(streamedAnswer, { cps: 60 })
  const scrollRef = useRef<ScrollView>(null)
  const [copied, setCopied] = useState(false)

  // auto-follow the stream
  useEffect(() => {
    scrollRef.current?.scrollToEnd({ animated: true })
  }, [text])

  return (
    <View
      width="100%"
      maxW={560}
      height={480}
      rounded="$6"
      borderWidth={1}
      borderColor="$color4"
      bg="$color1"
      overflow="hidden"
    >
      <XStack
        px="$4"
        py="$3"
        borderBottomWidth={1}
        borderColor="$color4"
        items="center"
        justify="space-between"
        bg="$color2"
      >
        <Text fontWeight="600" color="$color12">
          Assistant
        </Text>
        <XStack items="center" gap="$2">
          <View width={8} height={8} rounded={1000} bg="$green9" />
          <Text fontSize="$2" color="$color10">
            Online
          </Text>
        </XStack>
      </XStack>

      <ScrollView ref={scrollRef} style={{ flex: 1 }}>
        <YStack p="$4" gap="$4">
          {history.map((m) => (
            <MessageRow key={m.id} message={m} />
          ))}
          {text.length === 0 ? (
            <XStack gap="$2.5" items="center">
              <TypingDots />
            </XStack>
          ) : (
            <MessageRow
              message={{
                id: `stream-${runId}`,
                role: 'assistant',
                content: text,
                streaming: !done,
              }}
            >
              {done && (
                <XStack gap="$1" pt="$1">
                  <IconAction
                    label="Copy response"
                    onPress={() => {
                      setCopied(true)
                      setTimeout(() => setCopied(false), 1200)
                    }}
                  >
                    <Copy size={14} color={copied ? '$green10' : '$color10'} />
                  </IconAction>
                  <IconAction
                    label="Regenerate"
                    onPress={() => {
                      setRunId((r) => r + 1)
                      restart()
                    }}
                  >
                    <RefreshCw size={14} color="$color10" />
                  </IconAction>
                  <IconAction label="Good response">
                    <ThumbsUp size={14} color="$color10" />
                  </IconAction>
                  <IconAction label="Bad response">
                    <ThumbsDown size={14} color="$color10" />
                  </IconAction>
                </XStack>
              )}
            </MessageRow>
          )}
        </YStack>
      </ScrollView>
    </View>
  )
}

ChatConversation.fileName = 'ChatConversation'
