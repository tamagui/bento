import { CircleCheck, RefreshCw, TriangleAlert } from '@tamagui/lucide-icons-2'
import { useState } from 'react'
import { Button, H3, Paragraph, Spinner, Text, YStack, isWeb } from 'tamagui'

export function EmptyStateError({
  onRetry,
}: {
  onRetry?: () => Promise<void> | void
}) {
  const [status, setStatus] = useState<'error' | 'retrying' | 'loaded'>('error')

  const retry = async () => {
    setStatus('retrying')
    await (onRetry?.() ?? new Promise((resolve) => setTimeout(resolve, 900)))
    setStatus('loaded')
  }

  if (status === 'loaded') {
    return (
      <YStack
        render={isWeb ? 'section' : undefined}
        aria-label="View loaded"
        width="100%"
        maxW={520}
        self="center"
        items="center"
        gap="3"
        p="7"
        rounded="8"
        borderWidth={1}
        borderColor="green-400"
        bg="green-50"
      >
        <CircleCheck size={36} color="green-600" aria-hidden />
        <H3 text="center">View loaded</H3>
        <Text aria-live="polite" color="color9">
          The connection recovered and everything is up to date.
        </Text>
        <Button mt="2" variant="outlined" size="3" onPress={() => setStatus('error')}>
          Show error state again
        </Button>
      </YStack>
    )
  }

  return (
    // labeled section, not a permanently mounted alert — alert semantics only
    // make sense when the error appears dynamically inside an app
    <YStack
      render={isWeb ? 'section' : undefined}
      aria-label="Loading error"
      width="100%"
      maxW={520}
      self="center"
      items="center"
      gap="3"
      p="7"
      rounded="8"
      borderWidth={1}
      borderColor="red-400"
      bg="red-50"
    >
      <TriangleAlert size={36} color="red-600" aria-hidden />
      <H3 text="center">We couldn’t load this view</H3>
      <Paragraph text="center" color="color9" maxW={360}>
        The connection was interrupted. Your work is safe—try loading the view again.
      </Paragraph>
      <Button
        mt="2"
        theme="red"
        icon={status === 'retrying' ? <Spinner size="small" /> : RefreshCw}
        aria-label="Retry loading the view"
        disabled={status === 'retrying'}
        onPress={retry}
      >
        {status === 'retrying' ? 'Retrying…' : 'Try again'}
      </Button>
    </YStack>
  )
}

EmptyStateError.fileName = 'EmptyStateError'
