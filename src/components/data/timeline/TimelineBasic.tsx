import { Text, View, XStack, YStack } from 'tamagui'

const events = [
  {
    time: '09:30',
    title: 'Project created',
    detail: 'Workspace initialized with the design template.',
  },
  {
    time: '11:15',
    title: 'First milestone',
    detail: 'Research and requirements were approved.',
  },
  {
    time: '14:40',
    title: 'Prototype shared',
    detail: 'The interactive preview is ready for feedback.',
  },
]

export function TimelineBasic() {
  return (
    <YStack width="100%" maxW={620} self="center">
      {events.map((event, index) => (
        <XStack key={event.title} gap="$4" minH={100}>
          <YStack width={20} items="center">
            <View width={12} height={12} rounded={1000} bg="$blue9" mt="$1.5" z={1} />
            {index < events.length - 1 && <View flex={1} width={2} bg="$color5" />}
          </YStack>
          <YStack flex={1} gap="$1" pb="$5">
            <Text fontSize="$2" color="$color9" fontFamily="$mono">
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
