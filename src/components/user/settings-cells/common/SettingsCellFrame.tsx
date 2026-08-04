import type { ReactNode } from 'react'
import { Text, YStack } from 'tamagui'

export function SettingsCellFrame({ children }: { children: ReactNode }) {
  return (
    <YStack
      width="100%"
      maxW={560}
      self="center"
      overflow="hidden"
      rounded="7"
      borderWidth={1}
      borderColor="border-color"
      bg="background"
    >
      {children}
    </YStack>
  )
}

export function SettingsSectionLabel({ children }: { children: ReactNode }) {
  return (
    <Text
      px="4"
      fontSize="2"
      lineHeight="2"
      fontWeight="700"
      color="color9"
      letterSpacing={1}
      textTransform="uppercase"
    >
      {children}
    </Text>
  )
}

export function CellCopy({
  description,
  label,
}: {
  description?: string
  label: string
}) {
  return (
    <YStack flex={1} gap="1">
      <Text fontSize="5" fontWeight="600" letterSpacing={0}>
        {label}
      </Text>
      {description ? (
        <Text fontSize="2" color="color8" letterSpacing={0}>
          {description}
        </Text>
      ) : null}
    </YStack>
  )
}
