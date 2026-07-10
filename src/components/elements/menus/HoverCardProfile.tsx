import { Calendar, MapPin } from '@tamagui/lucide-icons-2'
import { useState } from 'react'
import { Avatar, Button, Popover, Text, XStack, YStack } from 'tamagui'

/** ------ EXAMPLE ------ */
export function HoverCardProfile() {
  const [open, setOpen] = useState(false)

  return (
    <Popover open={open} onOpenChange={setOpen} placement="bottom-start" offset={8}>
      <Popover.Trigger asChild>
        {/* view-based trigger: text-based triggers don't press/measure on native */}
        <XStack
          self="flex-start"
          cursor="pointer"
          onMouseEnter={() => setOpen(true)}
          onMouseLeave={() => setOpen(false)}
          onPress={() => setOpen(true)}
        >
          <Text
            role="link"
            tabIndex={0}
            fontSize="$4"
            fontWeight="600"
            color="$blue10"
            hoverStyle={{ color: '$blue11' }}
          >
            @sofia
          </Text>
        </XStack>
      </Popover.Trigger>
      <Popover.Content
        rounded="$6"
        borderWidth={1}
        borderColor="$color5"
        bg="$color1"
        p="$4"
        maxW={300}
        shadowColor="$shadowColor"
        shadowRadius={16}
        shadowOffset={{ width: 0, height: 6 }}
        transition="100ms"
        enterStyle={{ opacity: 0, y: 4, scale: 0.98 }}
        exitStyle={{ opacity: 0, y: 4, scale: 0.98 }}
        onMouseEnter={() => setOpen(true)}
        onMouseLeave={() => setOpen(false)}
      >
        <YStack gap="$3">
          <XStack justify="space-between" items="flex-start" gap="$4">
            <Avatar circular size="$5">
              <Avatar.Image aria-label="Sofia Reyes" src="https://i.pravatar.cc/96?img=47" />
              <Avatar.Fallback bg="$color6" />
            </Avatar>
            <Button size="$2" rounded="$10" bg="$color12">
              <Text color="$color1" fontWeight="600" fontSize="$2">
                Follow
              </Text>
            </Button>
          </XStack>
          <YStack gap="$0.5">
            <Text fontWeight="700" color="$color12">
              Sofia Reyes
            </Text>
            <Text fontSize="$2" color="$color10">
              Design Engineer building universal UI systems.
            </Text>
          </YStack>
          <XStack gap="$4">
            <XStack items="center" gap="$1.5">
              <MapPin size={12} color="$color9" />
              <Text fontSize="$2" color="$color10">
                Lisbon
              </Text>
            </XStack>
            <XStack items="center" gap="$1.5">
              <Calendar size={12} color="$color9" />
              <Text fontSize="$2" color="$color10">
                Joined 2023
              </Text>
            </XStack>
          </XStack>
          <XStack gap="$4">
            <Text fontSize="$2" color="$color11">
              <Text fontWeight="700" color="$color12">128</Text> following
            </Text>
            <Text fontSize="$2" color="$color11">
              <Text fontWeight="700" color="$color12">4,209</Text> followers
            </Text>
          </XStack>
        </YStack>
      </Popover.Content>
    </Popover>
  )
}

HoverCardProfile.fileName = 'HoverCardProfile'
