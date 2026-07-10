import { Bot } from '@tamagui/lucide-icons-2'
import { useEffect, useRef, useState } from 'react'
import { Avatar, Text, View, XStack, YStack, styled } from 'tamagui'
import { useReducedMotion } from '../../../hooks'

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

/** caret shown while the assistant streams; steady when reduced motion is on */
export function StreamingCaret() {
  const reducedMotion = useReducedMotion()
  const [on, setOn] = useState(true)
  useEffect(() => {
    if (reducedMotion) return
    const id = setInterval(() => setOn((v) => !v), 500)
    return () => clearInterval(id)
  }, [reducedMotion])
  return (
    <Text color="$color9" opacity={on ? 1 : 0.15} fontSize="$4">
      ▍
    </Text>
  )
}

/**
 * fake token streamer for self-contained demos.
 * batched to a perceptible ~80ms cadence so streaming doesn't rerender
 * the owner at raw frame rate.
 */
export function useMockStream(full: string, opts?: { cps?: number; start?: boolean }) {
  const { cps = 40, start = true } = opts ?? {}
  const [text, setText] = useState(start ? '' : full)
  const [done, setDone] = useState(!start)
  const [run, setRun] = useState(0)
  const idx = useRef(0)

  useEffect(() => {
    if (!start) return
    idx.current = 0
    setDone(false)
    setText('')
    const tickMs = 80
    const perTick = Math.max(1, Math.round((cps * tickMs) / 1000))
    const id = setInterval(() => {
      // vary the chunk a little for a word-ish feel
      const step = perTick + (idx.current % 3) - 1
      idx.current = Math.min(full.length, idx.current + Math.max(1, step))
      setText(full.slice(0, idx.current))
      if (idx.current >= full.length) {
        clearInterval(id)
        setDone(true)
      }
    }, tickMs)
    return () => clearInterval(id)
  }, [full, cps, start, run])

  const restart = () => setRun((r) => r + 1)

  return { text, done, restart }
}

export function TypingDots() {
  const reducedMotion = useReducedMotion()
  const [tick, setTick] = useState(0)
  useEffect(() => {
    if (reducedMotion) return
    const id = setInterval(() => setTick((t) => (t + 1) % 3), 350)
    return () => clearInterval(id)
  }, [reducedMotion])
  return (
    <XStack gap="$1.5" px="$1" py="$1.5" items="center">
      {[0, 1, 2].map((i) => (
        <View
          key={i}
          width={6}
          height={6}
          rounded={1000}
          bg="$color9"
          opacity={reducedMotion ? 0.6 : tick === i ? 1 : 0.3}
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
      {/* single width cap here — BubbleFrame stretches within it */}
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
