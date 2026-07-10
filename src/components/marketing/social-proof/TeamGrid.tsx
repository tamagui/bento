import { Mail } from '@tamagui/lucide-icons-2'
import { Anchor, Avatar, Text, XStack, YStack } from 'tamagui'

// fictional placeholder team — dead social buttons are worse than none, so
// each card carries one real action (email) until you wire actual profiles
const team = [
  { name: 'Maya Chen', initials: 'MC', role: 'Co-founder · Product', color: '$purple5', email: 'maya@bento.example' },
  { name: 'Noah Williams', initials: 'NW', role: 'Engineering lead', color: '$blue5', email: 'noah@bento.example' },
  { name: 'Priya Shah', initials: 'PS', role: 'Design director', color: '$orange5', email: 'priya@bento.example' },
  { name: 'Mateo Rivera', initials: 'MR', role: 'Customer success', color: '$green5', email: 'mateo@bento.example' },
] as const

export function TeamGrid() {
  return (
    <XStack width="100%" maxW={980} self="center" flexWrap="wrap" gap="$4">
      {team.map((member) => (
        <YStack
          key={member.name}
          width="48%"
          minW={260}
          flex={1}
          items="center"
          gap="$3"
          p="$5"
          rounded="$8"
          borderWidth={1}
          borderColor="$borderColor"
          bg="$background"
        >
          <Avatar circular size="$7">
            <Avatar.Fallback bg={member.color} items="center" justify="center">
              <Text fontSize="$6" fontWeight="900">
                {member.initials}
              </Text>
            </Avatar.Fallback>
          </Avatar>
          <YStack items="center" gap="$1">
            <Text fontSize="$6" fontWeight="800" letterSpacing={0}>
              {member.name}
            </Text>
            <Text color="$color9" letterSpacing={0}>
              {member.role}
            </Text>
          </YStack>
          <Anchor
            href={`mailto:${member.email}`}
            aria-label={`Email ${member.name}`}
            color="$color10"
            p="$3"
            rounded="$4"
            hoverStyle={{ color: '$color12', bg: '$color2' }}
          >
            <XStack items="center" gap="$2">
              <Mail size={16} />
              <Text color="$color10" fontSize="$3">
                Email
              </Text>
            </XStack>
          </Anchor>
        </YStack>
      ))}
    </XStack>
  )
}

TeamGrid.fileName = 'TeamGrid'
