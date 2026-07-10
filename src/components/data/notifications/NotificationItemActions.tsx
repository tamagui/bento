import { useRef, useState } from 'react'
import { Button, Spinner, Text, XStack, YStack, isWeb } from 'tamagui'
import { NotificationRow, type NotificationData } from './common/NotificationRow'

const invitations: NotificationData[] = [
  {
    id: 'design',
    actor: 'Avery Morgan',
    initials: 'AM',
    detail: 'invited you to Design Ops.',
    time: '12 min ago',
    at: '2026-07-10T10:48:00',
    exact: 'Jul 10, 2026, 10:48 AM',
    unread: true,
    accent: '$pink5',
  },
  {
    id: 'research',
    actor: 'Iris Kim',
    initials: 'IK',
    detail: 'invited you to Research Lab.',
    time: '2 hours ago',
    at: '2026-07-10T09:00:00',
    exact: 'Jul 10, 2026, 9:00 AM',
    unread: true,
    accent: '$green5',
  },
]

type Resolution = 'accepted' | 'declined'
type Status = Resolution | 'accepting' | 'declining'

export function NotificationItemActions() {
  const [status, setStatus] = useState<Record<string, Status>>({})
  const [announcement, setAnnouncement] = useState('')
  const timers = useRef<Record<string, ReturnType<typeof setTimeout>>>({})

  // mock async mutation: pending state guards double submits, undo reverts
  const resolve = (notification: NotificationData, resolution: Resolution) => {
    const pending = resolution === 'accepted' ? 'accepting' : 'declining'
    setStatus((current) => ({ ...current, [notification.id]: pending }))
    timers.current[notification.id] = setTimeout(() => {
      setStatus((current) => ({ ...current, [notification.id]: resolution }))
      setAnnouncement(`Invitation from ${notification.actor} ${resolution}`)
    }, 900)
  }

  const undo = (notification: NotificationData) => {
    clearTimeout(timers.current[notification.id])
    setStatus((current) => {
      const { [notification.id]: _, ...rest } = current
      return rest
    })
    setAnnouncement(`Invitation from ${notification.actor} restored`)
  }

  return (
    <YStack
      width="100%"
      maxW={620}
      self="center"
      gap="$3"
      p="$3"
      rounded="$8"
      borderWidth={1}
      borderColor="$borderColor"
      bg="$background"
    >
      <Text
        render="output"
        aria-live="polite"
        position="absolute"
        width={1}
        height={1}
        opacity={0}
        overflow="hidden"
      >
        {announcement}
      </Text>
      {invitations.map((notification) => {
        const state = status[notification.id]
        const busy = state === 'accepting' || state === 'declining'
        return (
          <NotificationRow
            key={notification.id}
            notification={notification}
            action={
              state === 'accepted' || state === 'declined' ? (
                <XStack mt="$2" gap="$3" items="center">
                  <Text
                    fontSize="$2"
                    color={state === 'accepted' ? '$green10' : '$color9'}
                    textTransform="capitalize"
                  >
                    {state}
                  </Text>
                  <Button size="$2.5" chromeless onPress={() => undo(notification)}>
                    Undo
                  </Button>
                </XStack>
              ) : (
                <XStack mt="$2" gap="$2">
                  <Button
                    size={isWeb ? '$3' : '$4'}
                    bg="$color12"
                    color="$color1"
                    disabled={busy}
                    icon={state === 'accepting' ? <Spinner size="small" /> : undefined}
                    onPress={() => resolve(notification, 'accepted')}
                  >
                    {state === 'accepting' ? 'Accepting…' : 'Accept'}
                  </Button>
                  <Button
                    size={isWeb ? '$3' : '$4'}
                    disabled={busy}
                    icon={state === 'declining' ? <Spinner size="small" /> : undefined}
                    onPress={() => resolve(notification, 'declined')}
                  >
                    {state === 'declining' ? 'Declining…' : 'Decline'}
                  </Button>
                </XStack>
              )
            }
          />
        )
      })}
    </YStack>
  )
}

NotificationItemActions.fileName = 'NotificationItemActions'
