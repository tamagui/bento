import { GitCommit, MessageCircle, Upload } from '@tamagui/lucide-icons-2'
import { Anchor, Avatar, Text, View, XStack, YStack, isWeb } from 'tamagui'

const activities = [
  {
    id: 'commit-billing',
    icon: GitCommit,
    avatar: 14,
    person: 'Noah',
    href: 'https://github.com/tamagui/tamagui',
    action: 'pushed 3 commits',
    detail: 'feat: responsive billing overview',
    code: true,
    time: '12m',
    timeAgo: '12 minutes ago',
    at: '2026-07-10T09:48:00',
    exact: 'Jul 10, 2026, 9:48 AM',
  },
  {
    id: 'comment-184',
    icon: MessageCircle,
    avatar: 32,
    person: 'Priya',
    href: 'https://github.com/tamagui/tamagui/issues',
    action: 'commented on issue #184',
    detail: 'The empty state now reads clearly in dark mode.',
    code: false,
    time: '46m',
    timeAgo: '46 minutes ago',
    at: '2026-07-10T09:14:00',
    exact: 'Jul 10, 2026, 9:14 AM',
  },
  {
    id: 'preview-24',
    icon: Upload,
    avatar: 47,
    person: 'Mateo',
    href: 'https://github.com/tamagui/tamagui/releases',
    action: 'published a preview',
    detail: 'release/2.4 · Production candidate',
    code: true,
    time: '2h',
    timeAgo: '2 hours ago',
    at: '2026-07-10T08:00:00',
    exact: 'Jul 10, 2026, 8:00 AM',
  },
]

export function TimelineActivity() {
  return (
    <YStack
      width="100%"
      maxW={680}
      self="center"
      m={0}
      p={0}
      render={isWeb ? <ol style={{ listStyleType: 'none' }} /> : undefined}
    >
      {activities.map((activity, index) => {
        const Icon = activity.icon
        return (
          <XStack
            key={activity.id}
            render={isWeb ? <li /> : undefined}
            gap="$4"
          >
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
                  <Anchor
                    href={activity.href}
                    target="_blank"
                    fontWeight="700"
                    color="$color12"
                    textDecorationLine="none"
                    hoverStyle={{ color: '$color11', textDecorationLine: 'underline' }}
                    focusVisibleStyle={{
                      outlineColor: '$outlineColor',
                      outlineOffset: 2,
                      outlineStyle: 'solid',
                      outlineWidth: 2,
                    }}
                  >
                    {activity.person}
                  </Anchor>{' '}
                  {activity.action}
                </Text>
                <Text
                  fontSize="$2"
                  color="$color9"
                  shrink={0}
                  aria-label={activity.timeAgo}
                  render={
                    isWeb ? <time dateTime={activity.at} title={activity.exact} /> : undefined
                  }
                >
                  {activity.time}
                </Text>
              </XStack>
              <XStack gap="$2" items="center" p="$3" rounded="$5" bg="$color2">
                <Icon size={17} color="$color9" aria-hidden />
                <Text
                  flex={1}
                  color="$color10"
                  // mono only for machine strings, not prose comments
                  fontFamily={activity.code ? '$mono' : '$body'}
                  fontSize="$2"
                >
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
