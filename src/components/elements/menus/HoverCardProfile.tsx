import { Avatar } from '../../BentoSkins'
import { Calendar, MapPin } from '@tamagui/lucide-icons-2'
import { useEffect, useRef, useState } from 'react'
import { Anchor, Button, Popover, Text, XStack, YStack, isWeb } from 'tamagui'
import { useReducedMotion } from '../../hooks'

const OPEN_DELAY = 250
const CLOSE_DELAY = 300

/** ------ EXAMPLE ------ */
export function HoverCardProfile() {
  const [open, setOpen] = useState(false)
  const [following, setFollowing] = useState(false)
  const timer = useRef<ReturnType<typeof setTimeout>>(undefined)
  const reducedMotion = useReducedMotion()

  useEffect(() => () => clearTimeout(timer.current), [])

  // cancellable delays so pointer travel between trigger and card never flickers
  const scheduleOpen = () => {
    clearTimeout(timer.current)
    timer.current = setTimeout(() => setOpen(true), OPEN_DELAY)
  }
  const scheduleClose = () => {
    clearTimeout(timer.current)
    timer.current = setTimeout(() => setOpen(false), CLOSE_DELAY)
  }
  const cancelClose = () => clearTimeout(timer.current)

  return (
    <Popover open={open} onOpenChange={setOpen} placement="bottom-start" offset={8}>
      <Popover.Trigger asChild>
        {/* view-based trigger: text-based triggers don't press/measure on native */}
        <XStack
          self="flex-start"
          cursor="pointer"
          onMouseEnter={scheduleOpen}
          onMouseLeave={scheduleClose}
          onPress={() => setOpen(true)}
        >
          {isWeb ? (
            <Anchor
              href="https://github.com/tamagui"
              target="_blank"
              fontSize="4"
              fontWeight="600"
              color="blue-600 hover:blue-700"
              textDecorationLine="none"
              outlineColor="focus-visible:outline-color"
              outlineOffset="focus-visible:2px"
              outlineStyle="focus-visible:solid"
              outlineWidth="focus-visible:2px"
              onFocus={scheduleOpen}
              onBlur={scheduleClose}
            >
              @sofia
            </Anchor>
          ) : (
            <Text fontSize="4" fontWeight="600" color="blue-600">
              @sofia
            </Text>
          )}
        </XStack>
      </Popover.Trigger>
      <Popover.Content
        rounded="6"
        borderWidth={1}
        borderColor="color5"
        bg="color1"
        p="4"
        maxW={300}
        boxShadow="0 6px 16px shadow-color"
        transition={reducedMotion ? undefined : '100ms'}
        opacity={`${reducedMotion ? '' : 'enter:0'} exit:0`}
        y={`${reducedMotion ? '' : 'enter:4px'} exit:4px`}
        scale={`${reducedMotion ? '' : 'enter:0.98'} exit:0.98`}
        onMouseEnter={cancelClose}
        onMouseLeave={scheduleClose}
        onFocus={cancelClose}
        onBlur={scheduleClose}
      >
        <YStack gap="3">
          <XStack justify="space-between" items="flex-start" gap="4">
            <Avatar circular size="5">
              <Avatar.Image
                aria-label="Sofia Reyes"
                src="https://i.pravatar.cc/96?img=47"
              />
              <Avatar.Fallback bg="color6" />
            </Avatar>
            <Button
              size="8"
              rounded="10"
              bg={`${following ? 'color4' : 'color11'}`}
              borderWidth={following ? 1 : 0}
              borderColor="color6"
              aria-pressed={following}
              hitSlop={isWeb ? undefined : 8}
              onPress={() => setFollowing((f) => !f)}
            >
              <Text
                color={`${following ? 'color11' : 'color1'}`}
                fontWeight="600"
                fontSize="2"
              >
                {following ? 'Following' : 'Follow'}
              </Text>
            </Button>
          </XStack>
          <YStack gap="px">
            <Text fontWeight="700" color="color11">
              Sofia Reyes
            </Text>
            <Text fontSize="2" color="color9">
              Design Engineer building universal UI systems.
            </Text>
          </YStack>
          <XStack gap="4" flexWrap="wrap">
            <XStack items="center" gap="1">
              <MapPin size={12} color="color8" aria-hidden />
              <Text fontSize="2" color="color9">
                Lisbon
              </Text>
            </XStack>
            <XStack items="center" gap="1">
              <Calendar size={12} color="color8" aria-hidden />
              <Text fontSize="2" color="color9">
                Joined 2023
              </Text>
            </XStack>
          </XStack>
          <XStack gap="4">
            <Text fontSize="2" color="color10">
              <Text fontWeight="700" color="color11">
                128
              </Text>{' '}
              following
            </Text>
            <Text fontSize="2" color="color10">
              <Text fontWeight="700" color="color11">
                {following ? '4,210' : '4,209'}
              </Text>{' '}
              followers
            </Text>
          </XStack>
        </YStack>
      </Popover.Content>
    </Popover>
  )
}

HoverCardProfile.fileName = 'HoverCardProfile'
