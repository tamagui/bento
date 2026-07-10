import type { IconProps } from '@tamagui/helpers-icon'
import { X } from '@tamagui/lucide-icons-2'
import { useState, type ComponentType, type ReactNode } from 'react'
import { Button, Paragraph, View, XStack } from 'tamagui'

type BannerProps = {
  action?: string
  children: ReactNode
  icon: ComponentType<IconProps>
  label: string
  theme: 'blue' | 'green' | 'yellow' | 'red'
}

export function Banner({
  action = 'Learn more',
  children,
  icon: Icon,
  label,
  theme,
}: BannerProps) {
  const [visible, setVisible] = useState(true)
  if (!visible) return null

  return (
    <XStack
      role={theme === 'red' ? 'alert' : 'status'}
      aria-label={label}
      theme={theme}
      width="100%"
      maxW={820}
      self="center"
      gap="$3"
      items="center"
      p="$3.5"
      rounded="$6"
      borderWidth={1}
      borderColor="$color7"
      bg="$color3"
      flexWrap="wrap"
    >
      <View self="flex-start" pt="$1">
        <Icon size={20} color="$color10" />
      </View>
      <Paragraph flex={1} minW={220} color="$color11">
        {children}
      </Paragraph>
      <Button size="$3" chromeless color="$color11">
        {action}
      </Button>
      <Button
        size="$3"
        circular
        chromeless
        icon={X}
        aria-label={`Dismiss ${label}`}
        onPress={() => setVisible(false)}
      />
    </XStack>
  )
}
