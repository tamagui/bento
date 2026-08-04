import type { ReactNode } from 'react'
import { useRef } from 'react'
import { Text, View, XStack, isWeb } from 'tamagui'
import { useReducedMotion } from '../../../hooks'

export type SegmentOption = { icon?: ReactNode; label: string; value: string }

/**
 * radiogroup-pattern segmented control: single tab stop, arrows move
 * selection, equal-width items keep the sliding pill honest
 */
export function SegmentedFrame({
  label,
  options,
  size = 'md',
  value,
  onValueChange,
}: {
  /** accessible group name — required, items alone read as one merged word */
  label: string
  onValueChange: (value: string) => void
  options: SegmentOption[]
  size?: 'sm' | 'md' | 'lg'
  value: string
}) {
  const index = options.findIndex((option) => option.value === value)
  // compact density is a mouse affordance; touch keeps 44pt minimum
  const heights = isWeb ? { sm: 34, md: 42, lg: 50 } : { sm: 44, md: 46, lg: 52 }
  const textSizes = { sm: '2', md: '3', lg: '4' } as const
  const itemRefs = useRef<(HTMLElement | null)[]>([])
  const reducedMotion = useReducedMotion()

  const select = (nextIndex: number) => {
    const clamped = (nextIndex + options.length) % options.length
    onValueChange(options[clamped].value)
    if (isWeb) itemRefs.current[clamped]?.focus()
  }

  const handleKeyDown = (event: any) => {
    if (!isWeb) return
    if (event.key === 'ArrowRight' || event.key === 'ArrowDown') {
      event.preventDefault()
      select(index + 1)
    } else if (event.key === 'ArrowLeft' || event.key === 'ArrowUp') {
      event.preventDefault()
      select(index - 1)
    } else if (event.key === 'Home') {
      event.preventDefault()
      select(0)
    } else if (event.key === 'End') {
      event.preventDefault()
      select(options.length - 1)
    }
  }

  return (
    <XStack
      role="radiogroup"
      aria-label={label}
      width="100%"
      height={heights[size]}
      p="1"
      rounded="6"
      bg="color3"
      position="relative"
      overflow="hidden"
      onKeyDown={handleKeyDown}
    >
      {/* inset track so pill percentages align with the padded item area */}
      <View pointerEvents="none" position="absolute" t="1" b="1" l="1" r="1">
        <View
          position="absolute"
          t={0}
          b={0}
          l={0}
          width={`${100 / options.length}%`}
          rounded="5"
          bg="background"
          borderWidth={1}
          borderColor="border-color"
          opacity={index < 0 ? 0 : 1}
          style={{
            transform: `translateX(${Math.max(0, index) * 100}%)`,
            ...(isWeb && !reducedMotion
              ? { transition: 'transform 250ms cubic-bezier(0.32, 0.72, 0, 1)' }
              : null),
          }}
        />
      </View>
      {options.map((option, optionIndex) => {
        const selected = value === option.value
        return (
          <XStack
            key={option.value}
            ref={
              ((el: HTMLElement | null) => {
                itemRefs.current[optionIndex] = el
              }) as any
            }
            render={isWeb ? <button type="button" /> : undefined}
            role="radio"
            aria-checked={selected}
            aria-label={option.label}
            tabIndex={isWeb ? (selected ? 0 : -1) : undefined}
            cursor="pointer"
            flex={1}
            flexBasis={0}
            minW={0}
            height="100%"
            z={1}
            gap="2"
            items="center"
            justify="center"
            rounded="5"
            outlineWidth="focus-visible:2px"
            outlineColor="focus-visible:outline-color"
            outlineOffset="focus-visible:-2px"
            outlineStyle="focus-visible:solid"
            onPress={() => select(optionIndex)}
          >
            {option.icon}
            <Text
              fontSize={textSizes[size]}
              fontWeight="600"
              color={`${selected ? 'color' : 'color9'}`}
              numberOfLines={1}
            >
              {option.label}
            </Text>
          </XStack>
        )
      })}
    </XStack>
  )
}
