import { Text, View, XStack, YStack, isWeb } from 'tamagui'

const events = [
  {
    id: 'created',
    time: '09:30',
    at: '2026-07-10T09:30:00',
    title: 'Project created',
    detail: 'Workspace initialized with the design template.',
  },
  {
    id: 'milestone',
    time: '11:15',
    at: '2026-07-10T11:15:00',
    title: 'First milestone',
    detail: 'Research and requirements were approved.',
  },
  {
    id: 'prototype',
    time: '14:40',
    at: '2026-07-10T14:40:00',
    title: 'Prototype shared',
    detail: 'The interactive preview is ready for feedback.',
  },
]

export function TimelineBasic() {
  return (
    <YStack
      width="100%"
      maxW={620}
      self="center"
      m={0}
      p={0}
      render={isWeb ? <ol style={{ listStyleType: 'none' }} /> : undefined}
    >
      {events.map((event, index) => (
        <XStack key={event.id} render={isWeb ? <li /> : undefined} gap="$4">
          <YStack width={20} items="center">
            <View
              width={12}
              height={12}
              rounded={1000}
              bg="$accentColor"
              mt="$1.5"
              z={1}
            />
            {index < events.length - 1 && <View flex={1} width={2} bg="$color5" />}
          </YStack>
          <YStack flex={1} gap="$1" pb="$5">
            <Text
              fontSize="$2"
              color="$color9"
              fontFamily="$mono"
              render={isWeb ? <time dateTime={event.at} /> : undefined}
            >
              {event.time}
            </Text>
            <Text fontSize="$5" fontWeight="700">
              {event.title}
            </Text>
            <Text color="$color10">{event.detail}</Text>
          </YStack>
        </XStack>
      ))}
    </YStack>
  )
}

TimelineBasic.fileName = 'TimelineBasic'
