import { useState } from 'react'
import { Accordion } from 'tamagui'
import { AccordionFrame, AccordionRow, basicEntries } from './common/AccordionRow'

export function AccordionMultiple() {
  const [value, setValue] = useState<string[]>(['overview', 'sharing'])
  return (
    <AccordionFrame>
      <Accordion type="multiple" value={value} onValueChange={setValue}>
        {basicEntries.map((entry) => (
          <AccordionRow
            key={entry.value}
            entry={entry}
            open={value.includes(entry.value)}
          />
        ))}
      </Accordion>
    </AccordionFrame>
  )
}

AccordionMultiple.fileName = 'AccordionMultiple'
