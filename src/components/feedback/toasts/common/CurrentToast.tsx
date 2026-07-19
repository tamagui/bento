import { CheckCircle2, Info, X, XCircle } from '@tamagui/lucide-icons-2'
import { Toast, type ToastItemRenderProps } from '@tamagui/toast'
import { Button, Text, XStack, YStack, isWeb } from 'tamagui'

const icons: Record<string, any> = {
  success: <CheckCircle2 size={18} color="$green10" />,
  error: <XCircle size={18} color="$red10" />,
  info: <Info size={18} color="$blue10" />,
}

export type ToastCustomData = {
  variant?: 'success' | 'error' | 'info'
  /** renders an action button inside the toast (undo, retry, …) */
  actionLabel?: string
  onAction?: () => void
}

/**
 * v3 renderItem for `<Toast.List>` — the Provider mounts the list once inside its
 * `<Toast.Viewport>`. Callers trigger toasts via `toast(title, { description, data })`;
 * `data` (ToastCustomData) drives the icon, accent, and optional action slot.
 */
export const renderBentoToast = ({ toast: t, index }: ToastItemRenderProps) => {
  const {
    variant = 'info',
    actionLabel,
    onAction,
  } = (t.data as ToastCustomData | undefined) ?? {}

  const title = typeof t.title === 'function' ? t.title() : t.title
  const description = typeof t.description === 'function' ? t.description() : t.description

  return (
    <Toast.Item
      key={t.id}
      toast={t}
      index={index}
      rounded="$6"
      bg="$color1"
      borderWidth={1}
      borderColor="$color5"
      shadowColor="$shadowColor"
      shadowRadius={12}
      shadowOffset={{ width: 0, height: 4 }}
      px="$3.5"
      py="$3"
    >
      {/* explicit width: on native, flex children of a content-sized row collapse to 0 */}
      <XStack items="center" gap="$3" width={340} maxW="100%">
        {icons[variant]}
        <YStack flex={1} gap="$0.5">
          <Toast.Title>
            <Text fontWeight="600" fontSize="$3" color="$color12">
              {title}
            </Text>
          </Toast.Title>
          {!!description && (
            <Toast.Description>
              <Text fontSize="$2" color="$color10">
                {description}
              </Text>
            </Toast.Description>
          )}
        </YStack>
        {!!actionLabel && !!onAction && (
          <Toast.Action asChild altText={actionLabel}>
            {/* Toast.Close defaults aria-label="Close"; name it after the action */}
            <Button aria-label={actionLabel} size="$2.5" onPress={onAction}>
              {actionLabel}
            </Button>
          </Toast.Action>
        )}
        <Toast.Close asChild>
          <Button
            aria-label="Dismiss"
            size="$2"
            circular
            variant="quiet"
            hitSlop={isWeb ? undefined : 12}
          >
            <X size={14} color="$color10" />
          </Button>
        </Toast.Close>
      </XStack>
    </Toast.Item>
  )
}
