import { CheckCircle2, Info, X, XCircle } from '@tamagui/lucide-icons-2'
import { Text, Toast, XStack, YStack, isWeb, type ToastItemRenderProps } from 'tamagui'

const icons: Record<string, any> = {
  success: <CheckCircle2 size={18} color="green-600" />,
  error: <XCircle size={18} color="red-600" />,
  info: <Info size={18} color="blue-600" />,
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
  const description =
    typeof t.description === 'function' ? t.description() : t.description

  return (
    <Toast.Item
      key={t.id}
      toast={t}
      index={index}
      rounded="6"
      bg="color1"
      borderWidth={1}
      borderColor="color5"
      boxShadow="0 4px 12px shadow-color"
      px="4"
      py="3"
    >
      {/* explicit width: on native, flex children of a content-sized row collapse to 0 */}
      <XStack items="center" gap="3" width={340} maxW="100%">
        {icons[variant]}
        <YStack flex={1} gap="px">
          <Toast.Title>
            <Text fontWeight="600" fontSize="3" color="color11">
              {title}
            </Text>
          </Toast.Title>
          {!!description && (
            <Toast.Description>
              <Text fontSize="2" color="color9">
                {description}
              </Text>
            </Toast.Description>
          )}
        </YStack>
        {!!actionLabel && !!onAction && (
          <Toast.Action aria-label={actionLabel} height={32} onPress={onAction}>
            <Text fontSize="2" fontWeight="600">
              {actionLabel}
            </Text>
          </Toast.Action>
        )}
        <Toast.Close
          aria-label="Dismiss"
          width={28}
          height={28}
          items="center"
          justify="center"
          hitSlop={isWeb ? undefined : 12}
        >
          <X size={14} color="color9" />
        </Toast.Close>
      </XStack>
    </Toast.Item>
  )
}
