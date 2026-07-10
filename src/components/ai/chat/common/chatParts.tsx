import { Bot } from '@tamagui/lucide-icons-2'
import { useEffect, useRef, useState } from 'react'
import { Avatar, Text, View, XStack, YStack, styled } from 'tamagui'

/** shared primitives for the AI chat kit */

export type ChatRole = 'user' | 'assistant'

export type ChatMessage = {
  id: string
  role: ChatRole
  content: string
  streaming?: boolean
}

export const BubbleFrame = styled(View, {
  rounded: '$6',
  px: '$3.5',
  py: '$2.5',
  maxW: '85%',

  variants: {
    role: {
      user: {
        self: 'flex-end',
        bg: '$color12',
        borderBottomRightRadius: '$2',
      },
      assistant: {
        self: 'flex-start',
        bg: '$color3',
        borderBottomLeftRadius: '$2',
      },
    },
  } as const,
})

export function BubbleText({
  role,
  children,
}: {
  role: ChatRole
  children: React.ReactNode
}) {
  return (
    <Text
      fontSize="$4"
      lineHeight="$5"
      color={role === 'user' ? '$color1' : '$color12'}
    >
      {children}
    </Text>
  )
}

export function AssistantAvatar() {
  return (
    <View
      width={28}
      height={28}
      rounded={1000}
      bg="$color4"
      items="center"
      justify="center"
      shrink={0}
    >
      <Bot size={16} color="$color11" />
    </View>
  )
}

export function UserAvatar({ src }: { src?: string }) {
  return (
    <Avatar circular size={28}>
      <Avatar.Image
        aria-label="You"
        src={src ?? 'https://i.pravatar.cc/64?img=68'}
      />
      <Avatar.Fallback bg="$color6" />
    </Avatar>
  )
}

/** blinking caret shown while the assistant streams */
export function StreamingCaret() {
  const [on, setOn] = useState(true)
  useEffect(() => {
    const id = setInterval(() => setOn((v) => !v), 500)
    return () => clearInterval(id)
  }, [])
  return (
    <Text color="$color9" opacity={on ? 1 : 0.15} fontSize="$4">
      ▍
    </Text>
  )
}

/** fake token streamer for self-contained demos */
export function useMockStream(full: string, opts?: { cps?: number; start?: boolean }) {
  const { cps = 40, start = true } = opts ?? {}
  const [text, setText] = useState(start ? '' : full)
  const [done, setDone] = useState(!start)
  const idx = useRef(0)

  useEffect(() => {
    if (!start) return
    idx.current = 0
    setDone(false)
    setText('')
    const id = setInterval(() => {
      // stream in word-ish chunks for a realistic feel
      const step = 1 + Math.floor((idx.current % 7) / 3)
      idx.current = Math.min(full.length, idx.current + step)
      setText(full.slice(0, idx.current))
      if (idx.current >= full.length) {
        clearInterval(id)
        setDone(true)
      }
    }, 1000 / (cps / 2))
    return () => clearInterval(id)
  }, [full, cps, start])

  const restart = () => {
    idx.current = 0
    setText('')
    setDone(false)
  }

  return { text, done, restart }
}

export function TypingDots() {
  const [tick, setTick] = useState(0)
  useEffect(() => {
    const id = setInterval(() => setTick((t) => (t + 1) % 3), 350)
    return () => clearInterval(id)
  }, [])
  return (
    <XStack gap="$1.5" px="$1" py="$1.5" items="center">
      {[0, 1, 2].map((i) => (
        <View
          key={i}
          width={6}
          height={6}
          rounded={1000}
          bg="$color9"
          opacity={tick === i ? 1 : 0.3}
        />
      ))}
    </XStack>
  )
}

export function MessageRow({
  message,
  children,
}: {
  message: ChatMessage
  children?: React.ReactNode
}) {
  const isUser = message.role === 'user'
  return (
    <XStack
      gap="$2.5"
      self="stretch"
      justify={isUser ? 'flex-end' : 'flex-start'}
      items="flex-end"
    >
      {!isUser && <AssistantAvatar />}
      <YStack gap="$1.5" maxW="85%" items={isUser ? 'flex-end' : 'flex-start'}>
        <BubbleFrame role={message.role}>
          <BubbleText role={message.role}>
            {message.content}
            {message.streaming && <StreamingCaret />}
          </BubbleText>
        </BubbleFrame>
        {children}
      </YStack>
      {isUser && <UserAvatar />}
    </XStack>
  )
}
