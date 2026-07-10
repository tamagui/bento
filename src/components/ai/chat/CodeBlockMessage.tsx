import { Check, Copy } from '@tamagui/lucide-icons-2'
import { Button, ScrollView, Text, XStack, YStack, isWeb } from 'tamagui'
import { useClipboard } from '../../hooks'
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
  const { onCopy, hasCopied } = useClipboard(code)
  return (
    <YStack
      rounded="$5"
      overflow="hidden"
      borderWidth={1}
      borderColor="$color6"
      self="stretch"
      my="$1"
    >
      <XStack
        px="$3"
        py="$1.5"
        bg="$color2"
        items="center"
        justify="space-between"
        borderBottomWidth={1}
        borderColor="$color6"
      >
        <Text fontSize="$1" color="$color10" fontFamily="$mono">
          {lang}
        </Text>
        <Button
          aria-label="Copy code"
          size="$2"
          chromeless
          hitSlop={isWeb ? undefined : 10}
          onPress={onCopy}
          icon={
            hasCopied ? (
              <Check size={12} color="$green10" />
            ) : (
              <Copy size={12} color="$color10" />
            )
          }
        >
          <Text
            aria-live="polite"
            fontSize="$1"
            color={hasCopied ? '$green10' : '$color10'}
          >
            {hasCopied ? 'Copied' : 'Copy'}
          </Text>
        </Button>
      </XStack>
      {/* horizontal scroll keeps indentation intact at narrow widths */}
      <ScrollView horizontal bg="$color1" showsHorizontalScrollIndicator={false}>
        <Text
          fontFamily="$mono"
          fontSize="$2"
          lineHeight="$3"
          color="$color12"
          p="$3"
          // web text is selectable by default; native needs the opt-in
          selectable={isWeb ? undefined : true}
          whiteSpace="pre"
        >
          {code}
        </Text>
      </ScrollView>
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
