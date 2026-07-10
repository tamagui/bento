import { Check, Circle, Rocket } from '@tamagui/lucide-icons-2'
import { useState } from 'react'
import { Button, Input, Text, View, XStack, YStack, isWeb } from 'tamagui'
import { ProgressBar } from '../../feedback/progress/ProgressBars'

// completion derives from real workspace state, never a toggled boolean
type Workspace = {
  profileReviewed: boolean
  workspaceName: string
  invitedEmail: string
  projectName: string
  integration: string
}

const isEmail = (value: string) => /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(value.trim())

const tasks = [
  {
    id: 'profile',
    label: 'Complete your profile',
    action: 'Review',
    done: (w: Workspace) => w.profileReviewed,
  },
  {
    id: 'workspace',
    label: 'Name your workspace',
    action: 'Edit',
    done: (w: Workspace) => w.workspaceName.trim().length >= 2,
  },
  {
    id: 'invite',
    label: 'Invite a teammate',
    action: 'Invite',
    done: (w: Workspace) => isEmail(w.invitedEmail),
  },
  {
    id: 'project',
    label: 'Create your first project',
    action: 'Create',
    done: (w: Workspace) => w.projectName.trim().length >= 2,
  },
  {
    id: 'integration',
    label: 'Connect an integration',
    action: 'Connect',
    done: (w: Workspace) => w.integration !== '',
  },
] as const

type TaskId = (typeof tasks)[number]['id']

export function WelcomeChecklist() {
  const [workspace, setWorkspace] = useState<Workspace>({
    profileReviewed: true,
    workspaceName: 'Bento HQ',
    invitedEmail: '',
    projectName: 'Launch plan',
    integration: '',
  })
  const [editing, setEditing] = useState<TaskId | null>(null)
  const [draft, setDraft] = useState('')

  const doneCount = tasks.filter((task) => task.done(workspace)).length
  const percent = (doneCount / tasks.length) * 100

  const startTask = (id: TaskId) => {
    if (id === 'profile') {
      setWorkspace((w) => ({ ...w, profileReviewed: true }))
      return
    }
    setEditing(id)
    setDraft(
      id === 'workspace'
        ? workspace.workspaceName
        : id === 'invite'
          ? workspace.invitedEmail
          : id === 'project'
            ? workspace.projectName
            : ''
    )
  }

  const commit = () => {
    if (!editing) return
    setWorkspace((w) =>
      editing === 'workspace'
        ? { ...w, workspaceName: draft }
        : editing === 'invite'
          ? { ...w, invitedEmail: draft }
          : editing === 'project'
            ? { ...w, projectName: draft }
            : w
    )
    setEditing(null)
  }

  const editorFor = (id: TaskId) => {
    if (editing !== id) return null
    const placeholder =
      id === 'workspace'
        ? 'Workspace name'
        : id === 'invite'
          ? 'teammate@example.com'
          : 'Project name'
    return (
      <XStack gap="$2" pl={38} pb="$2" flexWrap="wrap">
        <Input
          flex={1}
          minW={180}
          size="$3"
          value={draft}
          onChangeText={setDraft}
          placeholder={placeholder}
          aria-label={placeholder}
          autoFocus
          onKeyDown={
            isWeb
              ? (event: any) => {
                  if (event.key === 'Enter') commit()
                  if (event.key === 'Escape') setEditing(null)
                }
              : undefined
          }
        />
        <Button size="$3" onPress={commit}>
          Save
        </Button>
        <Button size="$3" chromeless onPress={() => setEditing(null)}>
          Cancel
        </Button>
      </XStack>
    )
  }

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
          <Rocket size={23} color="$accentColor" aria-hidden />
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
        label={`${doneCount} of ${tasks.length} complete`}
        color="$green9"
      />
      <YStack gap="$2" role={isWeb ? 'list' : undefined} aria-label="Setup tasks">
        {tasks.map((task) => {
          const complete = task.done(workspace)
          const detail =
            task.id === 'workspace' && complete
              ? workspace.workspaceName
              : task.id === 'invite' && complete
                ? workspace.invitedEmail
                : task.id === 'project' && complete
                  ? workspace.projectName
                  : task.id === 'integration' && complete
                    ? workspace.integration
                    : ''
          return (
            <YStack key={task.id} role={isWeb ? 'listitem' : undefined}>
              <XStack
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
                    <Check size={15} color="$white1" aria-hidden />
                  </View>
                ) : (
                  <Circle size={26} color="$color7" aria-hidden />
                )}
                <YStack flex={1} minW={0}>
                  <Text
                    fontWeight="700"
                    color={complete ? '$color9' : '$color12'}
                    textDecorationLine={complete ? 'line-through' : 'none'}
                    letterSpacing={0}
                  >
                    {task.label}
                  </Text>
                  {!!detail && (
                    <Text fontSize="$2" color="$color9" numberOfLines={1}>
                      {detail}
                    </Text>
                  )}
                </YStack>
                {task.id === 'integration' ? (
                  <Button
                    size="$3"
                    chromeless
                    hitSlop={isWeb ? undefined : 8}
                    aria-label={
                      complete ? 'Disconnect integration' : 'Connect an integration'
                    }
                    onPress={() =>
                      setWorkspace((w) => ({
                        ...w,
                        integration: complete ? '' : 'GitHub',
                      }))
                    }
                  >
                    {complete ? 'Disconnect' : 'Connect'}
                  </Button>
                ) : (
                  <Button
                    size="$3"
                    chromeless
                    hitSlop={isWeb ? undefined : 8}
                    aria-label={`${task.action}: ${task.label}`}
                    onPress={() => startTask(task.id)}
                  >
                    {complete && task.id !== 'profile' ? 'Edit' : task.action}
                  </Button>
                )}
              </XStack>
              {editorFor(task.id)}
            </YStack>
          )
        })}
      </YStack>
      <Text
        render="output"
        aria-live="polite"
        position="absolute"
        width={1}
        height={1}
        opacity={0}
        overflow="hidden"
      >
        {`${doneCount} of ${tasks.length} setup tasks complete`}
      </Text>
    </YStack>
  )
}

WelcomeChecklist.fileName = 'WelcomeChecklist'
