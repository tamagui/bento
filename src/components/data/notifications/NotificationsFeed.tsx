import { CheckCheck } from '@tamagui/lucide-icons-2'
import { Button, Text, XStack, YStack } from 'tamagui'
import { useGroupMedia } from '../../hooks/useGroupMedia'
import {
  earlierNotifications,
  NotificationRow,
  todayNotifications,
  useNotifications,
} from './common/NotificationRow'

export function NotificationsFeed() {
  const { items, unreadCount, markRead, markAllRead } = useNotifications([
    ...todayNotifications,
    ...earlierNotifications,
  ])
  const { sm } = useGroupMedia('window')
  const today = items.slice(0, todayNotifications.length)
  const earlier = items.slice(todayNotifications.length)

  return (
    <YStack width="100%" maxW={680} self="center" gap="$5">
      <XStack
        justify="space-between"
        items={sm ? 'flex-start' : 'center'}
        flexDirection={sm ? 'column' : 'row'}
        gap="$2"
      >
        <YStack gap="$1">
          <Text fontSize="$8" fontWeight="900" letterSpacing={0}>
            Notifications
          </Text>
          <Text color="$color9">Keep up with your team.</Text>
        </YStack>
        <Button
          size="$3"
          chromeless
          icon={CheckCheck}
          disabled={unreadCount === 0}
          opacity={unreadCount === 0 ? 0.5 : 1}
          onPress={markAllRead}
        >
          Mark all read
        </Button>
      </XStack>
      <Text
        render="output"
        aria-live="polite"
        position="absolute"
        width={1}
        height={1}
        opacity={0}
        overflow="hidden"
      >
        {unreadCount === 0 ? 'All notifications read' : `${unreadCount} unread`}
      </Text>
      <YStack gap="$5">
        <YStack gap="$2">
          <Text
            px="$3"
            fontSize="$2"
            color="$color9"
            fontWeight="800"
            textTransform="uppercase"
            letterSpacing={1}
          >
            Today
          </Text>
          {today.map((notification) => (
            <NotificationRow
              key={notification.id}
              notification={notification}
              onPress={() => markRead(notification.id)}
            />
          ))}
        </YStack>
        <YStack gap="$2">
          <Text
            px="$3"
            fontSize="$2"
            color="$color9"
            fontWeight="800"
            textTransform="uppercase"
            letterSpacing={1}
          >
            Earlier
          </Text>
          {earlier.map((notification) => (
            <NotificationRow
              key={notification.id}
              notification={notification}
              onPress={() => markRead(notification.id)}
            />
          ))}
        </YStack>
      </YStack>
    </YStack>
  )
}

NotificationsFeed.fileName = 'NotificationsFeed'
