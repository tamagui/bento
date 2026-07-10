import { useState } from 'react'
import { Accordion } from 'tamagui'
import { AccordionFrame, AccordionRow, basicEntries } from './common/AccordionRow'

export function AccordionBasic() {
  const [value, setValue] = useState('overview')
  return (
    <AccordionFrame>
      <Accordion type="single" collapsible value={value} onValueChange={setValue}>
        {basicEntries.map((entry) => (
          <AccordionRow key={entry.value} entry={entry} open={value === entry.value} />
        ))}
      </Accordion>
    </AccordionFrame>
  )
}

AccordionBasic.fileName = 'AccordionBasic'
