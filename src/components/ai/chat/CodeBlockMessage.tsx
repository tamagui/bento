import { Check, Copy } from '@tamagui/lucide-icons-2'
import { useState } from 'react'
import { Button, Text, View, XStack, YStack } from 'tamagui'
import { AssistantAvatar, BubbleFrame, BubbleText } from './common/chatParts'

const codeSample = `import { View, Text } from 'tamagui'

export function Card() {
  return (
    <View bg="$background" p="$4" rounded="$4">
      <Text color="$color12">Hello</Text>
    </View>
  )
}`

function CodeBlock({ code, lang }: { code: string; lang: string }) {
  const [copied, setCopied] = useState(false)
  return (
    <YStack
      rounded="$5"
      overflow="hidden"
      borderWidth={1}
      borderColor="$color5"
      self="stretch"
      my="$1"
    >
      <XStack
        px="$3"
        py="$1.5"
        bg="$color3"
        items="center"
        justify="space-between"
        borderBottomWidth={1}
        borderColor="$color5"
      >
        <Text fontSize="$1" color="$color10" fontFamily="$mono">
          {lang}
        </Text>
        <Button
          aria-label="Copy code"
          size="$1"
          chromeless
          onPress={() => {
            setCopied(true)
            setTimeout(() => setCopied(false), 1500)
          }}
          icon={
            copied ? <Check size={12} color="$green10" /> : <Copy size={12} color="$color10" />
          }
        >
          <Text fontSize="$1" color={copied ? '$green10' : '$color10'}>
            {copied ? 'Copied' : 'Copy'}
          </Text>
        </Button>
      </XStack>
      <View bg="$color2" p="$3">
        <Text fontFamily="$mono" fontSize="$2" lineHeight="$3" color="$color12">
          {code}
        </Text>
      </View>
    </YStack>
  )
}

/** ------ EXAMPLE ------ */
export function CodeBlockMessage() {
  return (
    <XStack gap="$2.5" items="flex-end" width="100%" maxW={560}>
      <AssistantAvatar />
      <YStack gap="$1.5" flex={1}>
        <BubbleFrame role="assistant" maxW="100%" self="stretch">
          <YStack gap="$2">
            <BubbleText role="assistant">
              Here's a minimal Tamagui card component:
            </BubbleText>
            <CodeBlock code={codeSample} lang="tsx" />
            <BubbleText role="assistant">
              The tokens adapt to light and dark automatically.
            </BubbleText>
          </YStack>
        </BubbleFrame>
      </YStack>
    </XStack>
  )
}

CodeBlockMessage.fileName = 'CodeBlockMessage'
