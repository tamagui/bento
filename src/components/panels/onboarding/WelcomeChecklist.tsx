import { Check, Circle, Rocket } from '@tamagui/lucide-icons-2'
import { useState } from 'react'
import { Button, Text, View, XStack, YStack } from 'tamagui'
import { ProgressBar } from '../../feedback/progress/ProgressBars'

const tasks = [
  { id: 'profile', label: 'Complete your profile', action: 'Review' },
  { id: 'workspace', label: 'Name your workspace', action: 'Edit' },
  { id: 'invite', label: 'Invite a teammate', action: 'Invite' },
  { id: 'project', label: 'Create your first project', action: 'Create' },
  { id: 'integration', label: 'Connect an integration', action: 'Connect' },
] as const

export function WelcomeChecklist() {
  const [done, setDone] = useState(['profile', 'workspace', 'project'])
  const percent = (done.length / tasks.length) * 100
  return (
    <YStack
      width="100%"
      maxW={620}
      self="center"
      gap="$5"
      p="$5"
      rounded="$8"
      borderWidth={1}
      borderColor="$borderColor"
      bg="$background"
    >
      <XStack items="center" gap="$3">
        <View
          width={46}
          height={46}
          rounded="$5"
          bg="$color3"
          items="center"
          justify="center"
        >
          <Rocket size={23} color="$accentColor" />
        </View>
        <YStack flex={1} gap="$1">
          <Text fontSize="$7" fontWeight="900" letterSpacing={0}>
            Welcome aboard
          </Text>
          <Text color="$color9">Finish these steps to set up your workspace.</Text>
        </YStack>
      </XStack>
      <ProgressBar
        value={percent}
        label={`${done.length} of ${tasks.length} complete`}
        color="$green9"
      />
      <YStack gap="$2">
        {tasks.map((task) => {
          const complete = done.includes(task.id)
          return (
            <XStack
              key={task.id}
              minH={58}
              items="center"
              gap="$3"
              p="$3"
              rounded="$5"
              bg={complete ? '$color2' : 'transparent'}
            >
              {complete ? (
                <View
                  width={26}
                  height={26}
                  rounded={999}
                  bg="$green9"
                  items="center"
                  justify="center"
                >
                  <Check size={15} color="white" />
                </View>
              ) : (
                <Circle size={26} color="$color7" />
              )}
              <Text
                flex={1}
                fontWeight="700"
                color={complete ? '$color9' : '$color12'}
                textDecorationLine={complete ? 'line-through' : 'none'}
                letterSpacing={0}
              >
                {task.label}
              </Text>
              <Button
                size="$3"
                chromeless
                onPress={() =>
                  setDone((current) =>
                    complete
                      ? current.filter((id) => id !== task.id)
                      : [...current, task.id]
                  )
                }
              >
                {complete ? 'Undo' : task.action}
              </Button>
            </XStack>
          )
        })}
      </YStack>
    </YStack>
  )
}

WelcomeChecklist.fileName = 'WelcomeChecklist'
