import { CheckCircle2, Info, X, XCircle } from '@tamagui/lucide-icons-2'
import { Toast, useToastState } from '@tamagui/toast'
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
 * global toast renderer — mount ONCE next to your ToastViewport.
 * demos trigger toasts via useToastController; `customData` drives the
 * icon, accent, and optional action slot.
 */
export function CurrentToast() {
  const toast = useToastState()

  if (!toast || toast.isHandledNatively) return null

  const { variant = 'info', actionLabel, onAction } =
    (toast.customData as ToastCustomData | undefined) ?? {}

  return (
    <Toast
      key={toast.id}
      duration={toast.duration}
      viewportName={toast.viewportName}
      rounded="$6"
      transition="200ms"
      enterStyle={{ opacity: 0, scale: 0.96, y: -12 }}
      exitStyle={{ opacity: 0, scale: 0.98, y: -6 }}
      y={0}
      opacity={1}
      scale={1}
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
              {toast.title}
            </Text>
          </Toast.Title>
          {!!toast.message && (
            <Toast.Description>
              <Text fontSize="$2" color="$color10">
                {toast.message}
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
            chromeless
            hitSlop={isWeb ? undefined : 12}
          >
            <X size={14} color="$color10" />
          </Button>
        </Toast.Close>
      </XStack>
    </Toast>
  )
}
