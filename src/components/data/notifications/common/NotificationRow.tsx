import type { ReactNode } from 'react'
import { useState } from 'react'
import type { ColorTokens } from 'tamagui'
import { Avatar, Text, View, XStack, YStack, isWeb } from 'tamagui'

export type NotificationData = {
  accent: ColorTokens
  actor: string
  detail: string
  id: string
  initials: string
  time: string
  /** machine-readable timestamp + exact human label for tooltips */
  at: string
  exact: string
  unread: boolean
}

/**
 * one source of truth for read state — trigger badge, header counts, and row
 * visuals all derive from it
 */
export function useNotifications(initial: NotificationData[]) {
  const [readIds, setReadIds] = useState<ReadonlySet<string>>(new Set())
  const items = initial.map((notification) =>
    readIds.has(notification.id) ? { ...notification, unread: false } : notification
  )
  const unreadCount = items.filter((notification) => notification.unread).length
  const markRead = (id: string) => setReadIds((prev) => new Set(prev).add(id))
  const markAllRead = () => setReadIds(new Set(initial.map((n) => n.id)))
  return { items, unreadCount, markRead, markAllRead }
}

export function NotificationRow({
  action,
  notification,
  onPress,
}: {
  action?: ReactNode
  notification: NotificationData
  onPress?: () => void
}) {
  return (
    <XStack
      width="100%"
      gap="$3"
      p="$3"
      rounded="$5"
      bg={notification.unread ? '$color2' : 'transparent'}
      items="flex-start"
      aria-label={`${notification.unread ? 'Unread notification' : 'Notification'}: ${notification.actor} ${notification.detail}`}
      {...(onPress && {
        onPress,
        cursor: 'pointer',
        role: 'button',
        tabIndex: 0,
        hoverStyle: { bg: notification.unread ? '$color3' : '$color2' },
        pressStyle: { bg: '$color3' },
        focusVisibleStyle: {
          outlineColor: '$outlineColor',
          outlineOffset: -2,
          outlineStyle: 'solid',
          outlineWidth: 2,
        },
        onKeyDown: (event: any) => {
          if (isWeb && (event.key === 'Enter' || event.key === ' ')) {
            event.preventDefault()
            onPress()
          }
        },
      })}
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
            aria-hidden
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
        <Text
          fontSize="$2"
          color="$color8"
          render={
            isWeb ? (
              <time dateTime={notification.at} title={notification.exact} />
            ) : undefined
          }
        >
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
    at: '2026-07-10T10:52:00',
    exact: 'Jul 10, 2026, 10:52 AM',
    unread: true,
    accent: '$purple5',
  },
  {
    id: 'mention',
    actor: 'Noah Williams',
    initials: 'NW',
    detail: 'mentioned you in Design systems.',
    time: '42 min ago',
    at: '2026-07-10T10:18:00',
    exact: 'Jul 10, 2026, 10:18 AM',
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
    at: '2026-07-09T16:30:00',
    exact: 'Jul 9, 2026, 4:30 PM',
    unread: false,
    accent: '$orange5',
  },
  {
    id: 'invite',
    actor: 'Mateo Rivera',
    initials: 'MR',
    detail: 'invited you to join Atlas workspace.',
    time: 'Monday',
    at: '2026-07-06T09:00:00',
    exact: 'Jul 6, 2026, 9:00 AM',
    unread: false,
    accent: '$green5',
  },
]
