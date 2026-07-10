import { Minus, Plus } from '@tamagui/lucide-icons-2'
import { Button, Input, Text, XStack, isWeb } from 'tamagui'

/**
 * accessible number field: named spinbutton with direct entry, keyboard
 * arrows, and press-and-hold via the shared hook
 */
export function SpinControl({
  label,
  value,
  min,
  max,
  size = 44,
  onStart,
  onStop,
  onSet,
  decreaseLabel,
}: {
  label: string
  value: number
  min: number
  max: number
  size?: number
  onStart: (delta: number) => void
  onStop: () => void
  onSet: (next: number) => void
  decreaseLabel?: string
}) {
  const commitText = (text: string) => {
    const parsed = Number.parseInt(text, 10)
    if (!Number.isNaN(parsed)) onSet(parsed)
  }

  return (
    <XStack items="center" overflow="hidden" rounded="$5" borderWidth={1} borderColor="$borderColor">
      <Button
        width={size}
        height={size}
        rounded={0}
        chromeless
        icon={Minus}
        color="$color11"
        disabled={value <= min}
        aria-label={decreaseLabel ?? 'Decrease quantity'}
        onPressIn={() => onStart(-1)}
        onPressOut={onStop}
      />
      <Input
        unstyled
        role="spinbutton"
        aria-label={label}
        aria-valuemin={min}
        aria-valuemax={max}
        aria-valuenow={value}
        width={size + 8}
        height={size}
        text="center"
        fontWeight="800"
        fontSize="$4"
        color="$color12"
        bg="transparent"
        keyboardType="number-pad"
        inputMode="numeric"
        value={String(value)}
        selectTextOnFocus
        onChangeText={(text) => {
          if (text === '') return
          commitText(text)
        }}
        onKeyDown={
          isWeb
            ? (event: any) => {
                if (event.key === 'ArrowUp') {
                  event.preventDefault()
                  onSet(value + 1)
                } else if (event.key === 'ArrowDown') {
                  event.preventDefault()
                  onSet(value - 1)
                }
              }
            : undefined
        }
      />
      <Button
        width={size}
        height={size}
        rounded={0}
        chromeless
        icon={Plus}
        color="$color11"
        disabled={value >= max}
        aria-label="Increase quantity"
        onPressIn={() => onStart(1)}
        onPressOut={onStop}
      />
    </XStack>
  )
}

export const formatMoney = (value: number) =>
  new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0,
  }).format(value)
