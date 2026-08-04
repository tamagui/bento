import type { IconProps } from '@tamagui/helpers-icon'
import { X } from '@tamagui/lucide-icons-2'
import { useState, type ComponentType, type ReactNode } from 'react'
import { Anchor, Button, Paragraph, View, XStack, isWeb } from 'tamagui'

type BannerProps = {
  /** action renders only when it can actually do something */
  action?: { label: string; href?: string; onPress?: () => void }
  children: ReactNode
  icon: ComponentType<IconProps>
  label: string
  /** controlled visibility; omit for self-managed dismissal */
  open?: boolean
  onDismiss?: () => void
  theme: 'blue' | 'green' | 'yellow' | 'red' | 'purple'
  /** semantic urgency is explicit, not inferred from the color */
  urgency?: 'status' | 'alert'
}

export function Banner({
  action,
  children,
  icon: Icon,
  label,
  open,
  onDismiss,
  theme,
  urgency = 'status',
}: BannerProps) {
  const [selfVisible, setSelfVisible] = useState(true)
  const visible = open ?? selfVisible
  if (!visible) return null

  const dismiss = () => {
    onDismiss?.()
    if (open === undefined) setSelfVisible(false)
  }

  return (
    <XStack
      role={urgency}
      aria-label={label}
      theme={theme}
      width="100%"
      maxW={820}
      self="center"
      gap="3"
      items="center"
      p="4"
      rounded="6"
      borderWidth={1}
      borderColor="color6"
      bg="color3"
      flexWrap="wrap"
    >
      <View self="flex-start" pt="1">
        <Icon size={20} color="color9" aria-hidden />
      </View>
      <Paragraph flex={1} minW={220} color="color10">
        {children}
      </Paragraph>
      {!!action &&
        (action.href ? (
          <Anchor
            href={action.href}
            target="_blank"
            color="color10 hover:color11"
            fontWeight="600"
            fontSize="3"
            px="2"
            py="2"
            textDecorationLine="underline"
            outlineColor="focus-visible:outline-color"
            outlineOffset="focus-visible:2px"
            outlineStyle="focus-visible:solid"
            outlineWidth="focus-visible:2px"
          >
            {action.label}
          </Anchor>
        ) : (
          <Button
            size="3"
            variant="quiet"
            color="color10"
            hitSlop={isWeb ? undefined : 8}
            onPress={action.onPress}
          >
            {action.label}
          </Button>
        ))}
      <Button
        size="3"
        circular
        variant="quiet"
        icon={X}
        hitSlop={isWeb ? undefined : 8}
        aria-label={`Dismiss ${label}`}
        onPress={dismiss}
      />
    </XStack>
  )
}
