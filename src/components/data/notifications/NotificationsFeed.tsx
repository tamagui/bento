import { CheckCheck } from '@tamagui/lucide-icons-2'
import { useState } from 'react'
import { Button, Text, XStack, YStack } from 'tamagui'
import {
  earlierNotifications,
  NotificationRow,
  todayNotifications,
} from './common/NotificationRow'

export function NotificationsFeed() {
  const [readAll, setReadAll] = useState(false)
  const markRead = (notification: (typeof todayNotifications)[number]) => ({
    ...notification,
    unread: readAll ? false : notification.unread,
  })
  return (
    <YStack width="100%" maxW={680} self="center" gap="$5">
      <XStack justify="space-between" items="center">
        <YStack gap="$1">
          <Text fontSize="$8" fontWeight="900" letterSpacing={0}>
            Notifications
          </Text>
          <Text color="$color9">Keep up with your team.</Text>
        </YStack>
        <Button size="$3" chromeless icon={CheckCheck} onPress={() => setReadAll(true)}>
          Mark all read
        </Button>
      </XStack>
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
          {todayNotifications.map((notification) => (
            <NotificationRow
              key={notification.id}
              notification={markRead(notification)}
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
          {earlierNotifications.map((notification) => (
            <NotificationRow key={notification.id} notification={notification} />
          ))}
        </YStack>
      </YStack>
    </YStack>
  )
}

NotificationsFeed.fileName = 'NotificationsFeed'
