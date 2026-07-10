import { Bell } from '@tamagui/lucide-icons-2'
import { Button, Popover, Separator, Text, View, XStack, YStack } from 'tamagui'
import { NotificationRow, todayNotifications } from './common/NotificationRow'

export function NotificationsPopover() {
  return (
    <XStack width="100%" maxW={520} self="center" justify="center" p="$7">
      <Popover placement="bottom-end" stayInFrame allowFlip>
        <Popover.Trigger asChild>
          <Button
            circular
            icon={Bell}
            aria-label="Open notifications"
            position="relative"
          >
            <View
              position="absolute"
              t={3}
              r={3}
              minW={17}
              height={17}
              px={4}
              rounded={999}
              bg="$red9"
              items="center"
              justify="center"
            >
              <Text color="white" fontSize={10} fontWeight="800">
                2
              </Text>
            </View>
          </Button>
        </Popover.Trigger>
        <Popover.Content
          width={380}
          maxW="92vw"
          p={0}
          rounded="$7"
          borderWidth={1}
          borderColor="$borderColor"
          bg="$background"
        >
          <YStack>
            <XStack p="$4" justify="space-between" items="center">
              <Text fontSize="$6" fontWeight="800" letterSpacing={0}>
                Notifications
              </Text>
              <Text fontSize="$2" color="$accentColor">
                2 new
              </Text>
            </XStack>
            <Separator />
            <YStack p="$2">
              {todayNotifications.map((notification) => (
                <NotificationRow key={notification.id} notification={notification} />
              ))}
            </YStack>
            <Separator />
            <Button chromeless rounded={0}>
              View all notifications
            </Button>
          </YStack>
        </Popover.Content>
      </Popover>
    </XStack>
  )
}

NotificationsPopover.fileName = 'NotificationsPopover'
