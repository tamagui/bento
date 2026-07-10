import { useState } from 'react'
import { Accordion, H2, Paragraph, YStack } from 'tamagui'
import { AccordionRow, basicEntries } from './common/AccordionRow'

export function AccordionFAQ() {
  const [value, setValue] = useState('overview')
  return (
    <YStack width="100%" maxW={760} self="center" gap="$6" p="$5">
      <YStack items="center" gap="$2">
        <H2 text="center">Frequently asked questions</H2>
        <Paragraph text="center" color="$color10">
          Everything you need to know before inviting your team.
        </Paragraph>
      </YStack>
      <Accordion type="single" collapsible value={value} onValueChange={setValue}>
        {basicEntries.map((entry) => (
          <AccordionRow key={entry.value} entry={entry} open={value === entry.value} />
        ))}
      </Accordion>
    </YStack>
  )
}

AccordionFAQ.fileName = 'AccordionFAQ'
