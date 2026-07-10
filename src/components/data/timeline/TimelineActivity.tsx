import { GitCommit, MessageCircle, Upload } from '@tamagui/lucide-icons-2'
import { Avatar, Text, View, XStack, YStack } from 'tamagui'

const activities = [
  {
    icon: GitCommit,
    avatar: 14,
    person: 'Noah',
    action: 'pushed 3 commits',
    detail: 'feat: responsive billing overview',
    time: '12m',
  },
  {
    icon: MessageCircle,
    avatar: 32,
    person: 'Priya',
    action: 'commented on issue #184',
    detail: 'The empty state now reads clearly in dark mode.',
    time: '46m',
  },
  {
    icon: Upload,
    avatar: 47,
    person: 'Mateo',
    action: 'published a preview',
    detail: 'release/2.4 · Production candidate',
    time: '2h',
  },
]

export function TimelineActivity() {
  return (
    <YStack width="100%" maxW={680} self="center">
      {activities.map((activity, index) => {
        const Icon = activity.icon
        return (
          <XStack key={activity.detail} gap="$4" minH={112}>
            <YStack width={42} items="center">
              <Avatar circular size="$3.5">
                <Avatar.Image
                  src={`https://i.pravatar.cc/150?img=${activity.avatar}`}
                  aria-label={activity.person}
                />
                <Avatar.Fallback bg="$color4" />
              </Avatar>
              {index < activities.length - 1 && <View flex={1} width={2} bg="$color4" />}
            </YStack>
            <YStack flex={1} gap="$2" pb="$5">
              <XStack justify="space-between" gap="$3" flexWrap="wrap">
                <Text>
                  <Text fontWeight="700">{activity.person}</Text> {activity.action}
                </Text>
                <Text fontSize="$2" color="$color9">
                  {activity.time}
                </Text>
              </XStack>
              <XStack gap="$2" items="center" p="$3" rounded="$5" bg="$color2">
                <Icon size={17} color="$color9" />
                <Text flex={1} color="$color10" fontFamily="$mono" fontSize="$2">
                  {activity.detail}
                </Text>
              </XStack>
            </YStack>
          </XStack>
        )
      })}
    </YStack>
  )
}

TimelineActivity.fileName = 'TimelineActivity'
