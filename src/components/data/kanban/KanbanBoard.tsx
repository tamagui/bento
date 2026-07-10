import {
  CalendarDays,
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
import { useReducedMotion } from '../../hooks'

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
  mode: 'pointer' | 'keyboard'
}

type PendingDrag = {
  taskId: string
  columnId: ColumnId
  index: number
  startX: number
  startY: number
  el: HTMLElement
}

type DragGeometry = {
  id: ColumnId
  left: number
  right: number
  cardMids: number[]
}[]

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
  const [page, setPage] = useState(0)
  const dragRef = useRef<DragState | null>(null)
  // pointer-drag internals live in refs: the moving card follows the pointer
  // through direct DOM transforms, and React state only changes when the
  // target column/position changes — never per pointer frame
  const pending = useRef<PendingDrag | null>(null)
  const dragEl = useRef<HTMLElement | null>(null)
  const dragStart = useRef({ x: 0, y: 0 })
  const geometry = useRef<DragGeometry>([])
  const boardRef = useRef<HTMLElement | null>(null)
  const reducedMotion = useReducedMotion()
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
        // scope to this board so duplicate boards on a page don't cross-focus
        boardRef.current
          ?.querySelector<HTMLElement>(`[data-task-id="${taskId}"]`)
          ?.focus()
      })
    }
  }

  const clearPointerVisuals = () => {
    if (dragEl.current) {
      dragEl.current.style.transform = ''
      dragEl.current.style.transition = ''
    }
    dragEl.current = null
    pending.current = null
  }

  const drop = () => {
    const current = dragRef.current
    clearPointerVisuals()
    if (!current) return
    moveTask(current.taskId, current.overColumn, current.overIndex)
    setDrag(null)
  }

  const snapshotGeometry = (taskId: string): DragGeometry => {
    const root = boardRef.current
    if (!root) return []
    return Array.from(root.querySelectorAll<HTMLElement>('[data-kanban-column]')).map(
      (column) => {
        const rect = column.getBoundingClientRect()
        return {
          id: column.dataset.columnId as ColumnId,
          left: rect.left,
          right: rect.right,
          cardMids: Array.from(column.querySelectorAll<HTMLElement>('[data-kanban-card]'))
            .filter((card) => card.dataset.taskId !== taskId)
            .map((card) => {
              const cardRect = card.getBoundingClientRect()
              return cardRect.top + cardRect.height / 2
            }),
        }
      }
    )
  }

  const startPointerDrag = (
    event: PointerEvent<HTMLDivElement>,
    taskItem: Task,
    columnId: ColumnId,
    index: number
  ) => {
    // mouse only: touch keeps native scrolling and uses the move menu instead
    if (!isWeb || event.pointerType !== 'mouse' || event.button !== 0) return
    if ((event.target as HTMLElement).closest('button')) return
    pending.current = {
      taskId: taskItem.id,
      columnId,
      index,
      startX: event.clientX,
      startY: event.clientY,
      el: event.currentTarget as HTMLElement,
    }
  }

  const updatePointerDrag = (event: PointerEvent<HTMLDivElement>) => {
    if (!isWeb) return

    // promote a pending press to a drag only after real movement, so plain
    // clicks (menu, focus) never lift the card
    const waiting = pending.current
    if (waiting && !dragRef.current) {
      const distance = Math.hypot(
        event.clientX - waiting.startX,
        event.clientY - waiting.startY
      )
      if (distance < 6) return
      waiting.el.setPointerCapture(event.pointerId)
      dragEl.current = waiting.el
      dragStart.current = { x: waiting.startX, y: waiting.startY }
      waiting.el.style.transition = 'none'
      geometry.current = snapshotGeometry(waiting.taskId)
      const location = locateTask(waiting.taskId)
      setDrag({
        taskId: waiting.taskId,
        fromColumn: waiting.columnId,
        overColumn: waiting.columnId,
        overIndex: waiting.index,
        mode: 'pointer',
      })
      setAnnouncement(
        `${location?.taskItem.title ?? 'Card'} lifted. Move pointer to a column and release to drop.`
      )
      pending.current = null
    }

    const current = dragRef.current
    if (!current || current.mode !== 'pointer' || !dragEl.current) return

    const dx = event.clientX - dragStart.current.x
    const dy = event.clientY - dragStart.current.y
    dragEl.current.style.transform = reducedMotion
      ? `translate(${dx}px, ${dy}px)`
      : `translate(${dx}px, ${dy}px) rotate(2deg) scale(1.03)`

    // hit-test the geometry snapshot — no layout reads during the drag
    const overColumn =
      geometry.current.find(
        (column) => event.clientX >= column.left && event.clientX <= column.right
      ) ?? null
    if (!overColumn) return
    const midIndex = overColumn.cardMids.findIndex((mid) => event.clientY < mid)
    const overIndex = midIndex < 0 ? overColumn.cardMids.length : midIndex
    if (current.overColumn !== overColumn.id || current.overIndex !== overIndex) {
      setDrag({ ...current, overColumn: overColumn.id, overIndex })
    }
  }

  const endPointer = () => {
    if (dragRef.current?.mode === 'pointer') {
      drop()
    } else {
      pending.current = null
    }
  }

  const cancelPointer = () => {
    clearPointerVisuals()
    if (dragRef.current?.mode === 'pointer') {
      setDrag(null)
      setAnnouncement('Move cancelled')
    }
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
            render={isWeb ? 'section' : undefined}
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
              isWeb && !reducedMotion
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
            <YStack gap="$2" flex={1} role={isWeb ? 'list' : undefined}>
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
                      reducedMotion={reducedMotion}
                      onKeyDown={(event) =>
                        handleKeyboard(event, taskItem, column.id, index)
                      }
                      onPointerDown={(event) =>
                        startPointerDrag(event, taskItem, column.id, index)
                      }
                      onPointerMove={updatePointerDrag}
                      onPointerUp={endPointer}
                      onPointerCancel={cancelPointer}
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
    <YStack width="100%" maxW={1040} gap="$4" py="$5" ref={boardRef as any}>
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
            clearPointerVisuals()
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
        <YStack gap="$2">
          <ScrollView
            horizontal
            decelerationRate="fast"
            showsHorizontalScrollIndicator={false}
            snapToInterval={columnWidth + gap}
            scrollEventThrottle={64}
            onScroll={(event) => {
              const next = Math.round(
                event.nativeEvent.contentOffset.x / (columnWidth + gap)
              )
              const clamped = Math.max(0, Math.min(columnOrder.length - 1, next))
              if (clamped !== page) setPage(clamped)
            }}
          >
            {boardContent}
          </ScrollView>
          <XStack self="center" gap="$1.5" aria-hidden>
            {columnOrder.map((columnId, index) => (
              <View
                key={columnId}
                width={7}
                height={7}
                rounded={1000}
                bg={index === page ? '$color10' : '$color6'}
              />
            ))}
          </XStack>
        </YStack>
      ) : (
        boardContent
      )}

      <Text
        render="output"
        aria-live="polite"
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
  reducedMotion: boolean
  onKeyDown: (event: KeyboardEvent<HTMLDivElement>) => void
  onPointerDown: (event: PointerEvent<HTMLDivElement>) => void
  onPointerMove: (event: PointerEvent<HTMLDivElement>) => void
  onPointerUp: () => void
  onPointerCancel: () => void
  onMoveTo: (columnId: ColumnId) => void
}

function TaskCard({
  taskItem,
  columnId,
  compact,
  dragging,
  drag,
  reducedMotion,
  onKeyDown,
  onPointerDown,
  onPointerMove,
  onPointerUp,
  onPointerCancel,
  onMoveTo,
}: TaskCardProps) {
  return (
    <YStack
      data-kanban-card
      data-task-id={taskItem.id}
      data-dragging={dragging}
      role={isWeb ? 'listitem' : undefined}
      aria-roledescription={isWeb ? 'Draggable task. Press Space to lift.' : undefined}
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
      tabIndex={0}
      z={dragging ? 100 : 1}
      style={
        isWeb && !reducedMotion
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
            onPointerCancel,
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
          hitSlop={isWeb ? undefined : 10}
          icon={MoreHorizontal}
          size="$2.5"
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
