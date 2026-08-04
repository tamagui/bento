import { Bell } from '@tamagui/lucide-icons-2'
import { useState } from 'react'
import {
  Adapt,
  Button,
  Popover,
  ScrollView,
  Separator,
  Sheet,
  Text,
  View,
  XStack,
  YStack,
} from 'tamagui'
import {
  NotificationRow,
  earlierNotifications,
  todayNotifications,
  useNotifications,
} from './common/NotificationRow'

export function NotificationsPopover() {
  const { items, unreadCount, markRead } = useNotifications([
    ...todayNotifications,
    ...earlierNotifications,
  ])
  const [showAll, setShowAll] = useState(false)
  const visible = showAll ? items : items.slice(0, todayNotifications.length)

  return (
    <XStack width="100%" maxW={520} self="center" justify="center" p="7">
      <Popover placement="bottom-end" stayInFrame allowFlip>
        <Popover.Trigger asChild>
          <Button
            circular
            icon={Bell}
            aria-label={
              unreadCount
                ? `Open notifications, ${unreadCount} unread`
                : 'Open notifications'
            }
            position="relative"
          >
            {unreadCount > 0 && (
              <View
                aria-hidden
                position="absolute"
                t={3}
                r={3}
                minW={17}
                height={17}
                px={4}
                rounded={999}
                bg="red-500"
                items="center"
                justify="center"
              >
                <Text color="white" fontSize={10} fontWeight="800">
                  {unreadCount}
                </Text>
              </View>
            )}
          </Button>
        </Popover.Trigger>

        {/* phones get a bottom sheet instead of a desktop popover */}
        <Adapt when="maxMd" platform="touch">
          <Sheet modal dismissOnSnapToBottom snapPointsMode="fit">
            <Sheet.Container p="2">
              <Sheet.Background />
              <Adapt.Contents />
            </Sheet.Container>
            <Sheet.Overlay bg="shadow-6" opacity="enter:0 exit:0" transition="100ms" />
          </Sheet>
        </Adapt>

        <Popover.Content
          width={380}
          maxW="92vw"
          p={0}
          rounded="7"
          borderWidth={1}
          borderColor="border-color"
          bg="background"
        >
          <YStack width="100%">
            <XStack p="4" justify="space-between" items="center">
              <Text fontSize="6" fontWeight="800" letterSpacing={0}>
                Notifications
              </Text>
              <Text fontSize="2" color="accent-color" aria-live="polite">
                {unreadCount ? `${unreadCount} new` : 'All caught up'}
              </Text>
            </XStack>
            <Separator />
            <ScrollView maxH={380}>
              <YStack p="2">
                {visible.map((notification) => (
                  <NotificationRow
                    key={notification.id}
                    notification={notification}
                    onPress={() => markRead(notification.id)}
                  />
                ))}
              </YStack>
            </ScrollView>
            <Separator />
            <Button
              variant="quiet"
              rounded={0}
              aria-expanded={showAll}
              onPress={() => setShowAll((current) => !current)}
            >
              {showAll ? 'Show recent only' : 'View all notifications'}
            </Button>
          </YStack>
        </Popover.Content>
      </Popover>
    </XStack>
  )
}

NotificationsPopover.fileName = 'NotificationsPopover'
