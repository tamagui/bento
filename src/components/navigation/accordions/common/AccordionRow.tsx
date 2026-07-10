import { ChevronDown } from '@tamagui/lucide-icons-2'
import type { ReactNode } from 'react'
import { Accordion, Paragraph, Text, View, YStack } from 'tamagui'

export type AccordionEntry = {
  content: ReactNode
  title: string
  value: string
}

export function AccordionRow({
  bordered = false,
  entry,
  open,
}: {
  bordered?: boolean
  entry: AccordionEntry
  open: boolean
}) {
  return (
    <Accordion.Item
      value={entry.value}
      rounded={bordered ? '$6' : undefined}
      borderWidth={bordered ? 1 : 0}
      borderColor="$borderColor"
      bg={bordered ? '$background' : 'transparent'}
      overflow="hidden"
    >
      <Accordion.Header>
        <Accordion.Trigger
          flexDirection="row"
          width="100%"
          justify="space-between"
          items="center"
          gap="$3"
          px="$4"
          py="$3.5"
          bg="transparent"
          borderWidth={0}
          hoverStyle={{ bg: '$color2' }}
          focusVisibleStyle={{ outlineWidth: 2, outlineColor: '$color8' }}
        >
          <Text fontWeight="600" fontSize="$5" letterSpacing={0}>
            {entry.title}
          </Text>
          <View
            rotate={open ? '180deg' : '0deg'}
            style={{ transition: 'transform 250ms cubic-bezier(0.32, 0.72, 0, 1)' }}
          >
            <ChevronDown size={18} color="$color10" />
          </View>
        </Accordion.Trigger>
      </Accordion.Header>
      <Accordion.Content
        overflow="hidden"
        px="$4"
        pb="$4"
        style={{ transition: 'height 250ms cubic-bezier(0.32, 0.72, 0, 1)' }}
      >
        {typeof entry.content === 'string' ? (
          <Paragraph color="$color10" lineHeight="$5">
            {entry.content}
          </Paragraph>
        ) : (
          entry.content
        )}
      </Accordion.Content>
    </Accordion.Item>
  )
}

export const basicEntries: AccordionEntry[] = [
  {
    value: 'overview',
    title: 'What is included?',
    content:
      'Every workspace includes unlimited projects, comments, and version history.',
  },
  {
    value: 'sharing',
    title: 'Can I invite guests?',
    content: 'Yes. Guests only see the projects you explicitly share with them.',
  },
  {
    value: 'billing',
    title: 'How does billing work?',
    content: 'Plans are billed per active member and can be changed at any time.',
  },
]

export function AccordionFrame({ children }: { children: ReactNode }) {
  return (
    <YStack width="100%" maxW={680} self="center" gap="$2">
      {children}
    </YStack>
  )
}
