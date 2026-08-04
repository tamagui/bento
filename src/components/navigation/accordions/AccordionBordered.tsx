import { useState } from 'react'
import { Accordion } from 'tamagui'
import { AccordionFrame, AccordionRow, basicEntries } from './common/AccordionRow'

export function AccordionBordered() {
  const [value, setValue] = useState('sharing')
  return (
    <AccordionFrame>
      <Accordion type="single" collapsible value={value} onValueChange={setValue} gap="3">
        {basicEntries.map((entry) => (
          <AccordionRow
            bordered
            key={entry.value}
            entry={entry}
            open={value === entry.value}
          />
        ))}
      </Accordion>
    </AccordionFrame>
  )
}

AccordionBordered.fileName = 'AccordionBordered'
