import { Github, Linkedin, Twitter } from '@tamagui/lucide-icons-2'
import { Avatar, Button, Text, XStack, YStack } from 'tamagui'

const team = [
  { name: 'Maya Chen', initials: 'MC', role: 'Co-founder · Product', color: '$purple5' },
  { name: 'Noah Williams', initials: 'NW', role: 'Engineering lead', color: '$blue5' },
  { name: 'Priya Shah', initials: 'PS', role: 'Design director', color: '$orange5' },
  { name: 'Mateo Rivera', initials: 'MR', role: 'Customer success', color: '$green5' },
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
          <XStack gap="$1">
            <Button
              circular
              chromeless
              size="$3"
              icon={Twitter}
              aria-label={`${member.name} on X`}
            />
            <Button
              circular
              chromeless
              size="$3"
              icon={Linkedin}
              aria-label={`${member.name} on LinkedIn`}
            />
            <Button
              circular
              chromeless
              size="$3"
              icon={Github}
              aria-label={`${member.name} on GitHub`}
            />
          </XStack>
        </YStack>
      ))}
    </XStack>
  )
}

TeamGrid.fileName = 'TeamGrid'
