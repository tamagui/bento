import { useState } from 'react'
import { Button, Text, XStack, YStack } from 'tamagui'
import { NotificationRow, type NotificationData } from './common/NotificationRow'

const invitations: NotificationData[] = [
  {
    id: 'design',
    actor: 'Avery Morgan',
    initials: 'AM',
    detail: 'invited you to Design Ops.',
    time: '12 min ago',
    unread: true,
    accent: '$pink5',
  },
  {
    id: 'research',
    actor: 'Iris Kim',
    initials: 'IK',
    detail: 'invited you to Research Lab.',
    time: '2 hours ago',
    unread: true,
    accent: '$green5',
  },
]

export function NotificationItemActions() {
  const [resolved, setResolved] = useState<Record<string, 'accepted' | 'declined'>>({})
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
      {invitations.map((notification) => (
        <NotificationRow
          key={notification.id}
          notification={notification}
          action={
            resolved[notification.id] ? (
              <Text
                mt="$2"
                fontSize="$2"
                color={resolved[notification.id] === 'accepted' ? '$green10' : '$color9'}
                textTransform="capitalize"
              >
                {resolved[notification.id]}
              </Text>
            ) : (
              <XStack mt="$2" gap="$2">
                <Button
                  size="$3"
                  bg="$color12"
                  color="$color1"
                  onPress={() =>
                    setResolved((current) => ({
                      ...current,
                      [notification.id]: 'accepted',
                    }))
                  }
                >
                  Accept
                </Button>
                <Button
                  size="$3"
                  onPress={() =>
                    setResolved((current) => ({
                      ...current,
                      [notification.id]: 'declined',
                    }))
                  }
                >
                  Decline
                </Button>
              </XStack>
            )
          }
        />
      ))}
    </YStack>
  )
}

NotificationItemActions.fileName = 'NotificationItemActions'
