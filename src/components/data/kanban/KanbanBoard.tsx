import {
  CalendarDays,
  Check,
  ChevronRight,
  MoreHorizontal,
  RotateCcw,
} from '@tamagui/lucide-icons-2'
import { type KeyboardEvent, type PointerEvent, useMemo, useRef, useState } from 'react'
import { ScrollView } from 'react-native'
import type { ColorTokens } from 'tamagui'
import {
  Avatar,
  Button,
  Paragraph,
  Popover,
  Separator,
  Text,
  View,
  XStack,
  YStack,
  isWeb,
} from 'tamagui'
import { useGroupMedia } from '../../hooks/useGroupMedia'

type ColumnId = 'todo' | 'progress' | 'done'
type TaskLabel = 'Design' | 'Engineering' | 'Research' | 'Marketing'

type Task = {
  id: string
  title: string
  label: TaskLabel
  assignee: string
  avatar: string
  due: string
}

type BoardState = Record<ColumnId, Task[]>

type DragState = {
  taskId: string
  fromColumn: ColumnId
  overColumn: ColumnId
  overIndex: number
  startX: number
  startY: number
  x: number
  y: number
  mode: 'pointer' | 'keyboard'
}

const columnOrder: ColumnId[] = ['todo', 'progress', 'done']
const columnNames: Record<ColumnId, string> = {
  todo: 'Todo',
  progress: 'In Progress',
  done: 'Done',
}

const initialBoard: BoardState = {
  todo: [
    task('launch', 'Plan launch campaign', 'Marketing', 'Sofia Reyes', 47, 'Aug 14'),
    task(
      'interviews',
      'Schedule customer interviews',
      'Research',
      'Noah Kim',
      12,
      'Aug 16'
    ),
    task('tokens', 'Audit semantic color tokens', 'Design', 'Avery Chen', 32, 'Aug 18'),
  ],
  progress: [
    task('billing', 'Build billing settings', 'Engineering', 'Maya Patel', 5, 'Aug 12'),
    task(
      'prototype',
      'Prototype mobile navigation',
      'Design',
      'Iris Stone',
      25,
      'Aug 15'
    ),
    task('metrics', 'Define activation metrics', 'Research', 'Leo Martin', 58, 'Aug 17'),
  ],
  done: [
    task('brief', 'Finalize product brief', 'Marketing', 'Nora Singh', 44, 'Aug 8'),
    task('schema', 'Migrate workspace schema', 'Engineering', 'Eli Rivera', 14, 'Aug 9'),
    task('journey', 'Map onboarding journey', 'Design', 'Sofia Reyes', 47, 'Aug 10'),
  ],
}

export function KanbanBoard() {
  return <KanbanCore />
}

KanbanBoard.fileName = 'KanbanBoard'

export function KanbanCompact() {
  return <KanbanCore compact />
}

KanbanCompact.fileName = 'KanbanCompact'

function KanbanCore({ compact = false }: { compact?: boolean }) {
  const [board, setBoard] = useState<BoardState>(() => cloneBoard(initialBoard))
  const [drag, setDragState] = useState<DragState | null>(null)
  const [announcement, setAnnouncement] = useState('')
  const dragRef = useRef<DragState | null>(null)
  const { sm } = useGroupMedia('window')
  const columnWidth = compact ? 276 : 304
  const gap = 16

  const setDrag = (next: DragState | null) => {
    dragRef.current = next
    setDragState(next)
  }

  const locateTask = (taskId: string) => {
    for (const columnId of columnOrder) {
      const index = board[columnId].findIndex((taskItem) => taskItem.id === taskId)
      if (index >= 0) return { columnId, index, taskItem: board[columnId][index] }
    }
    return null
  }

  const moveTask = (taskId: string, toColumn: ColumnId, toIndex?: number) => {
    const location = locateTask(taskId)
    if (!location) return
    const next = cloneBoard(board)
    const [taskItem] = next[location.columnId].splice(location.index, 1)
    const destination = next[toColumn]
    const index = Math.max(0, Math.min(toIndex ?? destination.length, destination.length))
    destination.splice(index, 0, taskItem)
    setBoard(next)
    setAnnouncement(
      `${taskItem.title} moved to ${columnNames[toColumn]}, position ${index + 1}`
    )
    if (isWeb) {
      requestAnimationFrame(() => {
        document.querySelector<HTMLElement>(`[data-task-id="${taskId}"]`)?.focus()
      })
    }
  }

  const drop = () => {
    const current = dragRef.current
    if (!current) return
    moveTask(current.taskId, current.overColumn, current.overIndex)
    setDrag(null)
  }

  const startPointerDrag = (
    event: PointerEvent<HTMLDivElement>,
    taskItem: Task,
    columnId: ColumnId,
    index: number
  ) => {
    if (!isWeb || event.button !== 0) return
    if ((event.target as HTMLElement).closest('button')) return
    event.preventDefault()
    event.currentTarget.setPointerCapture(event.pointerId)
    setDrag({
      taskId: taskItem.id,
      fromColumn: columnId,
      overColumn: columnId,
      overIndex: index,
      startX: event.clientX,
      startY: event.clientY,
      x: event.clientX,
      y: event.clientY,
      mode: 'pointer',
    })
    setAnnouncement(
      `${taskItem.title} lifted. Move pointer to a column and release to drop.`
    )
  }

  const updatePointerDrag = (event: PointerEvent<HTMLDivElement>) => {
    const current = dragRef.current
    if (!isWeb || !current || current.mode !== 'pointer') return
    const elements = document.elementsFromPoint(event.clientX, event.clientY)
    const target = elements.find(
      (element) =>
        !element.closest('[data-dragging="true"]') &&
        element.closest('[data-kanban-column]')
    )
    const columnElement = target?.closest<HTMLElement>('[data-kanban-column]')
    const overColumn = columnElement?.dataset.columnId as ColumnId | undefined
    if (!columnElement || !overColumn) {
      setDrag({ ...current, x: event.clientX, y: event.clientY })
      return
    }

    const cards = Array.from(
      columnElement.querySelectorAll<HTMLElement>('[data-kanban-card]')
    ).filter((card) => card.dataset.taskId !== current.taskId)
    const overIndex = cards.findIndex((card) => {
      const rect = card.getBoundingClientRect()
      return event.clientY < rect.top + rect.height / 2
    })
    setDrag({
      ...current,
      overColumn,
      overIndex: overIndex < 0 ? cards.length : overIndex,
      x: event.clientX,
      y: event.clientY,
    })
  }

  const handleKeyboard = (
    event: KeyboardEvent<HTMLDivElement>,
    taskItem: Task,
    columnId: ColumnId,
    index: number
  ) => {
    if (event.key === ' ' || event.key === 'Enter') {
      event.preventDefault()
      if (dragRef.current?.mode === 'keyboard') {
        drop()
      } else {
        setDrag({
          taskId: taskItem.id,
          fromColumn: columnId,
          overColumn: columnId,
          overIndex: index,
          startX: 0,
          startY: 0,
          x: 0,
          y: 0,
          mode: 'keyboard',
        })
        setAnnouncement(`${taskItem.title} lifted. Use arrow keys, then Space to drop.`)
      }
      return
    }

    const current = dragRef.current
    if (!current || current.mode !== 'keyboard' || current.taskId !== taskItem.id) return

    if (event.key === 'Escape') {
      event.preventDefault()
      setDrag(null)
      setAnnouncement('Move cancelled')
      return
    }

    const columnIndex = columnOrder.indexOf(current.overColumn)
    if (event.key === 'ArrowLeft' || event.key === 'ArrowRight') {
      event.preventDefault()
      const direction = event.key === 'ArrowRight' ? 1 : -1
      const overColumn = columnOrder[Math.max(0, Math.min(2, columnIndex + direction))]
      setDrag({
        ...current,
        overColumn,
        overIndex: Math.min(current.overIndex, board[overColumn].length),
      })
      setAnnouncement(`Over ${columnNames[overColumn]}`)
    } else if (event.key === 'ArrowUp' || event.key === 'ArrowDown') {
      event.preventDefault()
      const direction = event.key === 'ArrowDown' ? 1 : -1
      const overIndex = Math.max(
        0,
        Math.min(board[current.overColumn].length, current.overIndex + direction)
      )
      setDrag({ ...current, overIndex })
      setAnnouncement(`Position ${overIndex + 1} in ${columnNames[current.overColumn]}`)
    }
  }

  const columns = useMemo(
    () =>
      columnOrder.map((columnId) => ({
        id: columnId,
        label: columnNames[columnId],
        tasks: board[columnId],
      })),
    [board]
  )

  const boardContent = (
    <XStack gap={gap} px={sm ? '$2' : 0} py="$2" minW={sm ? undefined : '100%'}>
      {columns.map((column) => {
        const highlighted = drag?.overColumn === column.id
        return (
          <YStack
            key={column.id}
            data-kanban-column
            data-column-id={column.id}
            aria-label={`${column.label}, ${column.tasks.length} tasks`}
            bg={highlighted ? '$color3' : '$color2'}
            borderColor={highlighted ? '$color8' : '$color5'}
            borderWidth={1}
            rounded="$7"
            minH={compact ? 430 : 520}
            p="$3"
            gap="$2"
            width={sm ? '82vw' : columnWidth}
            maxW={columnWidth}
            style={
              isWeb
                ? {
                    transition:
                      'background-color 180ms cubic-bezier(0.32, 0.72, 0, 1), border-color 100ms ease-out',
                  }
                : undefined
            }
          >
            <XStack items="center" justify="space-between" minH={38}>
              <Text fontSize="$4" fontWeight="700">
                {column.label}
              </Text>
              <View
                bg="$color4"
                borderColor="$color6"
                borderWidth={1}
                rounded={1000}
                minW={28}
                height={28}
                items="center"
                justify="center"
              >
                <Text
                  color="$color11"
                  fontSize="$2"
                  fontWeight="700"
                  data-kanban-count={column.id}
                >
                  {column.tasks.length}
                </Text>
              </View>
            </XStack>
            <Separator />
            <YStack gap="$2" flex={1}>
              {column.tasks.map((taskItem, index) => {
                const isDragging = drag?.taskId === taskItem.id
                const showIndicator =
                  drag?.overColumn === column.id && drag.overIndex === index
                return (
                  <View key={taskItem.id}>
                    {showIndicator && <DropIndicator />}
                    <TaskCard
                      taskItem={taskItem}
                      columnId={column.id}
                      compact={compact}
                      dragging={isDragging}
                      drag={isDragging ? drag : null}
                      onKeyDown={(event) =>
                        handleKeyboard(event, taskItem, column.id, index)
                      }
                      onPointerDown={(event) =>
                        startPointerDrag(event, taskItem, column.id, index)
                      }
                      onPointerMove={updatePointerDrag}
                      onPointerUp={drop}
                      onMoveTo={(toColumn) => moveTask(taskItem.id, toColumn)}
                    />
                  </View>
                )
              })}
              {drag?.overColumn === column.id &&
                drag.overIndex >= column.tasks.length && <DropIndicator />}
            </YStack>
          </YStack>
        )
      })}
    </XStack>
  )

  return (
    <YStack width="100%" maxW={1040} gap="$4" py="$5">
      <XStack
        items={sm ? 'stretch' : 'center'}
        justify="space-between"
        gap="$3"
        flexDirection={sm ? 'column' : 'row'}
      >
        <YStack gap="$1">
          <Text fontSize={compact ? '$6' : '$7'} fontWeight="700">
            Product launch
          </Text>
          <Paragraph color="$color10">
            {isWeb
              ? 'Drag work forward or use Space and arrow keys.'
              : 'Use the card menu to move work forward.'}
          </Paragraph>
        </YStack>
        <Button
          aria-label="Reset board"
          icon={RotateCcw}
          onPress={() => {
            setBoard(cloneBoard(initialBoard))
            setDrag(null)
            setAnnouncement('Board reset')
          }}
          size="$3"
          self={sm ? 'flex-start' : undefined}
          variant="outlined"
        >
          Reset board
        </Button>
      </XStack>

      {sm ? (
        <ScrollView
          horizontal
          decelerationRate="fast"
          showsHorizontalScrollIndicator={false}
          snapToInterval={columnWidth + gap}
        >
          {boardContent}
        </ScrollView>
      ) : (
        boardContent
      )}

      <Text
        render="output"
        aria-live="assertive"
        position="absolute"
        width={1}
        height={1}
        opacity={0}
        overflow="hidden"
      >
        {announcement}
      </Text>
    </YStack>
  )
}

type TaskCardProps = {
  taskItem: Task
  columnId: ColumnId
  compact: boolean
  dragging: boolean
  drag: DragState | null
  onKeyDown: (event: KeyboardEvent<HTMLDivElement>) => void
  onPointerDown: (event: PointerEvent<HTMLDivElement>) => void
  onPointerMove: (event: PointerEvent<HTMLDivElement>) => void
  onPointerUp: () => void
  onMoveTo: (columnId: ColumnId) => void
}

function TaskCard({
  taskItem,
  columnId,
  compact,
  dragging,
  drag,
  onKeyDown,
  onPointerDown,
  onPointerMove,
  onPointerUp,
  onMoveTo,
}: TaskCardProps) {
  return (
    <YStack
      data-kanban-card
      data-task-id={taskItem.id}
      data-dragging={dragging}
      aria-label={`${taskItem.title}, ${taskItem.label}, due ${taskItem.due}`}
      bg="$background"
      borderColor={dragging ? '$color8' : '$color5'}
      borderWidth={1}
      rounded="$5"
      cursor={dragging ? 'grabbing' : 'grab'}
      elevation={dragging ? '$8' : '$1'}
      gap="$3"
      opacity={dragging && drag?.mode === 'keyboard' ? 0.72 : 1}
      p={compact ? '$3' : '$4'}
      rotate={dragging && drag?.mode === 'pointer' ? '2deg' : '0deg'}
      scale={dragging ? 1.03 : 1}
      tabIndex={0}
      x={drag?.mode === 'pointer' ? drag.x - drag.startX : 0}
      y={drag?.mode === 'pointer' ? drag.y - drag.startY : 0}
      z={dragging ? 100 : 1}
      style={
        isWeb
          ? {
              transition:
                'transform 180ms cubic-bezier(0.32, 0.72, 0, 1), box-shadow 180ms cubic-bezier(0.32, 0.72, 0, 1), border-color 100ms ease-out',
            }
          : undefined
      }
      focusVisibleStyle={{
        outlineColor: '$color8',
        outlineOffset: 2,
        outlineStyle: 'solid',
        outlineWidth: 2,
      }}
      hoverStyle={{ borderColor: '$color7', y: dragging ? undefined : -2 }}
      {...(isWeb
        ? {
            onKeyDown,
            onPointerDown,
            onPointerMove,
            onPointerUp,
          }
        : {})}
    >
      <XStack items="flex-start" gap="$2">
        <LabelChip label={taskItem.label} />
        <View ml="auto">
          <MoveMenu currentColumn={columnId} taskItem={taskItem} onMoveTo={onMoveTo} />
        </View>
      </XStack>
      <Text color="$color12" fontSize={compact ? '$3' : '$4'} fontWeight="700">
        {taskItem.title}
      </Text>
      <XStack items="center" gap="$2">
        {!compact && (
          <Avatar circular size="$2.5">
            <Avatar.Image aria-label={taskItem.assignee} src={taskItem.avatar} />
            <Avatar.Fallback bg="$color5" />
          </Avatar>
        )}
        <Text color="$color10" fontSize="$2" numberOfLines={1}>
          {taskItem.assignee}
        </Text>
        <XStack ml="auto" gap="$1" items="center">
          <CalendarDays size={13} color="$color9" aria-hidden />
          <Text color="$color10" fontSize="$1">
            {taskItem.due}
          </Text>
        </XStack>
      </XStack>
    </YStack>
  )
}

function MoveMenu({
  currentColumn,
  taskItem,
  onMoveTo,
}: {
  currentColumn: ColumnId
  taskItem: Task
  onMoveTo: (columnId: ColumnId) => void
}) {
  return (
    <Popover placement="bottom-end">
      <Popover.Trigger asChild>
        <Button
          aria-label={`Move ${taskItem.title}`}
          chromeless
          circular
          icon={MoreHorizontal}
          size="$2"
        />
      </Popover.Trigger>
      <Popover.Content
        borderWidth={1}
        borderColor="$color6"
        p="$2"
        gap="$1"
        elevation="$6"
      >
        <Text color="$color9" fontSize="$1" fontWeight="700" px="$2" py="$1">
          Move to…
        </Text>
        {columnOrder
          .filter((columnId) => columnId !== currentColumn)
          .map((columnId) => (
            <Popover.Close key={columnId} asChild>
              <Button
                chromeless
                iconAfter={ChevronRight}
                justify="space-between"
                onPress={() => onMoveTo(columnId)}
                size="$3"
              >
                {columnNames[columnId]}
              </Button>
            </Popover.Close>
          ))}
      </Popover.Content>
    </Popover>
  )
}

function LabelChip({ label }: { label: TaskLabel }) {
  const colors: Record<TaskLabel, { bg: ColorTokens; color: ColorTokens }> = {
    Design: { bg: '$purple4', color: '$purple11' },
    Engineering: { bg: '$blue4', color: '$blue11' },
    Research: { bg: '$green4', color: '$green11' },
    Marketing: { bg: '$orange4', color: '$orange11' },
  }
  const tone = colors[label]
  return (
    <View
      bg={tone.bg}
      borderColor={tone.color}
      borderWidth={1}
      rounded={1000}
      px="$2"
      py="$1"
    >
      <Text color={tone.color} fontSize="$1" fontWeight="700">
        {label}
      </Text>
    </View>
  )
}

function DropIndicator() {
  return (
    <XStack height={8} items="center" aria-hidden>
      <View width={7} height={7} rounded={1000} bg="$color9" />
      <View flex={1} height={2} bg="$color9" />
    </XStack>
  )
}

function task(
  id: string,
  title: string,
  label: TaskLabel,
  assignee: string,
  avatarIndex: number,
  due: string
): Task {
  return {
    id,
    title,
    label,
    assignee,
    avatar: `https://i.pravatar.cc/80?img=${avatarIndex}`,
    due,
  }
}

function cloneBoard(board: BoardState): BoardState {
  return {
    todo: [...board.todo],
    progress: [...board.progress],
    done: [...board.done],
  }
}
