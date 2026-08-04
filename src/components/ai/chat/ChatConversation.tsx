import { Check, Copy, RefreshCw, ThumbsDown, ThumbsUp } from '@tamagui/lucide-icons-2'
import { useRef, useState } from 'react'
import { ScrollView } from 'react-native'
import { Button, Text, View, XStack, YStack, isWeb } from 'tamagui'
import { useClipboard } from '../../hooks'
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
  active,
  activeColor,
  children,
  onPress,
}: {
  label: string
  active?: boolean
  activeColor?: string
  children: React.ReactNode
  onPress?: () => void
}) {
  return (
    <Button
      aria-label={label}
      aria-pressed={active}
      size="8"
      variant="quiet"
      circular
      hitSlop={isWeb ? undefined : 8}
      onPress={onPress}
      bg={`${active ? 'color4' : 'transparent'} hover:color4 press:color5`}
    >
      {children}
    </Button>
  )
}

/**
 * owns all per-stream state so token updates rerender only this subtree,
 * never the transcript above it
 */
function StreamingAnswer() {
  const [runId, setRunId] = useState(0)
  const { text, done, restart } = useMockStream(streamedAnswer, { cps: 60 })
  const { onCopy, hasCopied } = useClipboard(streamedAnswer)
  const [feedback, setFeedback] = useState<'up' | 'down' | null>(null)

  if (text.length === 0) {
    return (
      <XStack gap="2-5" items="center">
        <TypingDots />
      </XStack>
    )
  }

  return (
    <MessageRow
      message={{
        id: `stream-${runId}`,
        role: 'assistant',
        content: text,
        streaming: !done,
      }}
    >
      {done && (
        <XStack gap="1" pt="1" items="center">
          <IconAction label="Copy response" onPress={onCopy}>
            {hasCopied ? (
              <Check size={16} color="green-600" />
            ) : (
              <Copy size={16} color="color9" />
            )}
          </IconAction>
          <IconAction
            label="Regenerate"
            onPress={() => {
              setRunId((r) => r + 1)
              setFeedback(null)
              restart()
            }}
          >
            <RefreshCw size={16} color="color9" />
          </IconAction>
          <IconAction
            label="Good response"
            active={feedback === 'up'}
            onPress={() => setFeedback((f) => (f === 'up' ? null : 'up'))}
          >
            <ThumbsUp size={16} color={`${feedback === 'up' ? 'green-600' : 'color9'}`} />
          </IconAction>
          <IconAction
            label="Bad response"
            active={feedback === 'down'}
            onPress={() => setFeedback((f) => (f === 'down' ? null : 'down'))}
          >
            <ThumbsDown
              size={16}
              color={`${feedback === 'down' ? 'red-600' : 'color9'}`}
            />
          </IconAction>
          <Text aria-live="polite" fontSize="1" color="green-600" pl="1">
            {hasCopied ? 'Copied' : ''}
          </Text>
        </XStack>
      )}
    </MessageRow>
  )
}

/** ------ EXAMPLE ------ */
export function ChatConversation() {
  const scrollRef = useRef<ScrollView>(null)

  return (
    <View
      width="100%"
      maxW={560}
      height={480}
      maxH="100%"
      rounded="6"
      borderWidth={1}
      borderColor="color4"
      bg="color1"
      overflow="hidden"
    >
      <XStack
        px="4"
        py="3"
        borderBottomWidth={1}
        borderColor="color4"
        items="center"
        justify="space-between"
        bg="color2"
      >
        <Text fontWeight="600" color="color11">
          Assistant
        </Text>
        <XStack items="center" gap="2">
          <View aria-hidden width={8} height={8} rounded={1000} bg="green-500" />
          <Text fontSize="2" color="color9">
            Online
          </Text>
        </XStack>
      </XStack>

      <ScrollView
        ref={scrollRef}
        style={{ flex: 1 }}
        // follow growth without restarting an animated scroll per token
        onContentSizeChange={() => scrollRef.current?.scrollToEnd({ animated: false })}
      >
        <YStack p="4" gap="4" role={isWeb ? 'log' : undefined} aria-label="Conversation">
          {history.map((m) => (
            <MessageRow key={m.id} message={m} />
          ))}
          <StreamingAnswer />
        </YStack>
      </ScrollView>
    </View>
  )
}

ChatConversation.fileName = 'ChatConversation'
