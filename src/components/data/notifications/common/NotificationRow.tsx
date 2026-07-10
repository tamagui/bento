import type { ReactNode } from 'react'
import type { ColorTokens } from 'tamagui'
import { Avatar, Text, View, XStack, YStack } from 'tamagui'

export type NotificationData = {
  accent: ColorTokens
  actor: string
  detail: string
  id: string
  initials: string
  time: string
  unread: boolean
}

export function NotificationRow({
  action,
  notification,
}: {
  action?: ReactNode
  notification: NotificationData
}) {
  return (
    <XStack
      width="100%"
      gap="$3"
      p="$3"
      rounded="$5"
      bg={notification.unread ? '$color2' : 'transparent'}
      items="flex-start"
    >
      <View position="relative">
        <Avatar circular size="$4">
          <Avatar.Fallback bg={notification.accent} items="center" justify="center">
            <Text fontSize="$2" fontWeight="800" color="$color12">
              {notification.initials}
            </Text>
          </Avatar.Fallback>
        </Avatar>
        {notification.unread ? (
          <View
            position="absolute"
            t={-1}
            r={-1}
            width={9}
            height={9}
            rounded={999}
            bg="$accentColor"
            borderWidth={2}
            borderColor="$background"
          />
        ) : null}
      </View>
      <YStack flex={1} gap="$1">
        <Text color="$color11" lineHeight="$5" letterSpacing={0}>
          <Text fontWeight="800" letterSpacing={0}>
            {notification.actor}
          </Text>{' '}
          {notification.detail}
        </Text>
        <Text fontSize="$2" color="$color8">
          {notification.time}
        </Text>
        {action}
      </YStack>
    </XStack>
  )
}

export const todayNotifications: NotificationData[] = [
  {
    id: 'comment',
    actor: 'Maya Chen',
    initials: 'MC',
    detail: 'commented on “Launch checklist”.',
    time: '8 min ago',
    unread: true,
    accent: '$purple5',
  },
  {
    id: 'mention',
    actor: 'Noah Williams',
    initials: 'NW',
    detail: 'mentioned you in Design systems.',
    time: '42 min ago',
    unread: true,
    accent: '$blue5',
  },
]

export const earlierNotifications: NotificationData[] = [
  {
    id: 'upload',
    actor: 'Priya Shah',
    initials: 'PS',
    detail: 'uploaded 6 files to Brand refresh.',
    time: 'Yesterday',
    unread: false,
    accent: '$orange5',
  },
  {
    id: 'invite',
    actor: 'Mateo Rivera',
    initials: 'MR',
    detail: 'invited you to join Atlas workspace.',
    time: 'Monday',
    unread: false,
    accent: '$green5',
  },
]
