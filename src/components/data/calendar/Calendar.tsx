import {
  CalendarDays,
  CalendarX2,
  ChevronLeft,
  ChevronRight,
  MapPin,
} from '@tamagui/lucide-icons-2'
import { type KeyboardEvent, useMemo, useState } from 'react'
import {
  Button,
  Paragraph,
  ScrollView,
  Separator,
  Text,
  View,
  XStack,
  YStack,
  isWeb,
  type ColorTokens,
} from 'tamagui'
import { useGroupMedia } from '../../hooks/useGroupMedia'
import {
  FIXED_TODAY,
  addDays,
  addMonths,
  dateKey,
  getAgendaDays,
  getAgendaHeading,
  getEventsForDate,
  getLongDateLabel,
  getMonthGrid,
  getMonthLabel,
  sameDay,
  sameMonth,
  startOfWeek,
  weekdayLabels,
  type CalendarEvent,
  type EventCategory,
} from './calendarData'

const categoryStyles: Record<
  EventCategory,
  { soft: ColorTokens; text: ColorTokens; dot: ColorTokens }
> = {
  Design: { soft: '$purple4', text: '$purple11', dot: '$purple9' },
  Focus: { soft: '$blue4', text: '$blue11', dot: '$blue9' },
  Personal: { soft: '$orange4', text: '$orange11', dot: '$orange9' },
  Team: { soft: '$green4', text: '$green11', dot: '$green9' },
}

const focusRing = {
  outlineColor: '$blue8',
  outlineOffset: 2,
  outlineStyle: 'solid' as const,
  outlineWidth: 2,
} as const

export function CalendarMonth() {
  const [selectedDate, setSelectedDate] = useState(() => new Date(FIXED_TODAY))
  const [visibleMonth, setVisibleMonth] = useState(
    () => new Date(FIXED_TODAY.getFullYear(), FIXED_TODAY.getMonth(), 1)
  )

  return (
    <YStack width="100%" maxW={960} self="center" gap="$4" py="$5">
      <DemoHeading
        title="Project calendar"
        description="Navigate with arrow keys and press Enter to select a day."
      />
      <MonthCalendar
        selectedDate={selectedDate}
        visibleMonth={visibleMonth}
        onSelectDate={setSelectedDate}
        onVisibleMonthChange={setVisibleMonth}
      />
      <Text color="$color10" fontSize="$3" aria-live="polite">
        Selected: {getLongDateLabel(selectedDate)}
      </Text>
    </YStack>
  )
}

CalendarMonth.fileName = 'CalendarMonth'

export function AgendaList() {
  const days = useMemo(() => getAgendaDays(FIXED_TODAY, 7), [])
  const { sm } = useGroupMedia('window')
  const eventCount = days.reduce(
    (count, date) => count + getEventsForDate(date).length,
    0
  )

  return (
    <YStack width="100%" maxW={760} self="center" gap="$4" py="$5">
      <XStack
        items="flex-start"
        justify="space-between"
        gap="$3"
        flexDirection={sm ? 'column' : 'row'}
      >
        <DemoHeading
          title="Upcoming agenda"
          description="A seven-day view with time, category, and location context."
        />
        <View bg="$color3" rounded="$10" px="$3" py="$1.5" self="flex-start">
          <Text color="$color11" fontSize="$2" fontWeight="700">
            {eventCount} events
          </Text>
        </View>
      </XStack>
      <AgendaSurface days={days} />
    </YStack>
  )
}

AgendaList.fileName = 'AgendaList'

export function CalendarAgendaSplit() {
  const [selectedDate, setSelectedDate] = useState(() => new Date(FIXED_TODAY))
  const [visibleMonth, setVisibleMonth] = useState(
    () => new Date(FIXED_TODAY.getFullYear(), FIXED_TODAY.getMonth(), 1)
  )
  const { sm } = useGroupMedia('window')

  const selectDate = (date: Date) => {
    setSelectedDate(date)
    setVisibleMonth(new Date(date.getFullYear(), date.getMonth(), 1))
  }

  return (
    <YStack width="100%" maxW={1180} self="center" gap="$4" py="$5">
      <DemoHeading
        title="Calendar and agenda"
        description={
          sm
            ? 'Choose a day from the week strip to update the agenda.'
            : 'Select a day in the month to inspect its schedule.'
        }
      />

      {sm ? (
        <YStack
          borderWidth={1}
          borderColor="$color5"
          rounded="$7"
          overflow="hidden"
          bg="$color1"
        >
          <WeekStrip selectedDate={selectedDate} onSelectDate={selectDate} />
          <Separator />
          <DayAgendaPanel date={selectedDate} />
        </YStack>
      ) : (
        <XStack
          borderWidth={1}
          borderColor="$color5"
          rounded="$8"
          overflow="hidden"
          bg="$color1"
          items="stretch"
        >
          <YStack flex={1} minW={0} p="$4">
            <MonthCalendar
              embedded
              selectedDate={selectedDate}
              visibleMonth={visibleMonth}
              onSelectDate={selectDate}
              onVisibleMonthChange={setVisibleMonth}
            />
          </YStack>
          <Separator vertical />
          <YStack width={360} minW={320}>
            <DayAgendaPanel date={selectedDate} />
          </YStack>
        </XStack>
      )}
    </YStack>
  )
}

CalendarAgendaSplit.fileName = 'CalendarAgendaSplit'

function DemoHeading({ title, description }: { title: string; description: string }) {
  return (
    <YStack gap="$1" minW={0} maxW="100%" flex={1}>
      <Text color="$color12" fontSize="$7" fontWeight="700">
        {title}
      </Text>
      <Paragraph color="$color10">{description}</Paragraph>
    </YStack>
  )
}

type MonthCalendarProps = {
  embedded?: boolean
  selectedDate: Date
  visibleMonth: Date
  onSelectDate: (date: Date) => void
  onVisibleMonthChange: (date: Date) => void
}

function MonthCalendar({
  embedded,
  selectedDate,
  visibleMonth,
  onSelectDate,
  onVisibleMonthChange,
}: MonthCalendarProps) {
  const [focusedDate, setFocusedDate] = useState(() => new Date(selectedDate))
  const { sm } = useGroupMedia('window')
  const days = getMonthGrid(visibleMonth)

  const moveFocus = (date: Date, amount: number) => {
    const next = addDays(date, amount)
    setFocusedDate(next)
    if (!sameMonth(next, visibleMonth)) {
      onVisibleMonthChange(new Date(next.getFullYear(), next.getMonth(), 1))
    }
    focusCalendarDay(next)
  }

  const handleDayKeyDown = (event: KeyboardEvent<HTMLDivElement>, date: Date) => {
    const direction =
      event.key === 'ArrowLeft'
        ? -1
        : event.key === 'ArrowRight'
          ? 1
          : event.key === 'ArrowUp'
            ? -7
            : event.key === 'ArrowDown'
              ? 7
              : 0

    if (direction) {
      event.preventDefault()
      moveFocus(date, direction)
      return
    }

    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault()
      onSelectDate(date)
    }
  }

  const rows = Array.from({ length: 6 }, (_, rowIndex) =>
    days.slice(rowIndex * 7, rowIndex * 7 + 7)
  )

  return (
    <YStack
      width="100%"
      borderWidth={embedded ? 0 : 1}
      borderColor="$color5"
      rounded={embedded ? 0 : '$8'}
      overflow="hidden"
      bg="$color1"
    >
      <CalendarHeader
        label={getMonthLabel(visibleMonth)}
        previousLabel="Previous month"
        nextLabel="Next month"
        onPrevious={() => onVisibleMonthChange(addMonths(visibleMonth, -1))}
        onNext={() => onVisibleMonthChange(addMonths(visibleMonth, 1))}
      />

      <YStack
        width="100%"
        aria-label={getMonthLabel(visibleMonth)}
        render={isWeb ? <table role="grid" /> : undefined}
      >
        <YStack render={isWeb ? <thead /> : undefined}>
          <XStack
            render={isWeb ? <tr /> : undefined}
            bg="$color2"
            borderBottomWidth={1}
            borderColor="$color4"
          >
            {weekdayLabels.map((weekday) => (
              <View
                key={weekday}
                render={isWeb ? <th scope="col" /> : undefined}
                flex={1}
                items="center"
                py="$2"
              >
                <Text color="$color10" fontSize="$1" fontWeight="700">
                  {weekday}
                </Text>
              </View>
            ))}
          </XStack>
        </YStack>

        <YStack render={isWeb ? <tbody /> : undefined}>
          {rows.map((week, rowIndex) => (
            <XStack
              key={dateKey(week[0])}
              render={isWeb ? <tr /> : undefined}
              borderBottomWidth={rowIndex < rows.length - 1 ? 1 : 0}
              borderColor="$color4"
            >
              {week.map((date, columnIndex) => (
                <MonthDay
                  key={dateKey(date)}
                  date={date}
                  compact={sm}
                  currentMonth={sameMonth(date, visibleMonth)}
                  focused={sameDay(date, focusedDate)}
                  selected={sameDay(date, selectedDate)}
                  borderLeft={columnIndex > 0}
                  onFocus={() => setFocusedDate(date)}
                  onKeyDown={(event) => handleDayKeyDown(event, date)}
                  onSelect={() => onSelectDate(date)}
                />
              ))}
            </XStack>
          ))}
        </YStack>
      </YStack>
    </YStack>
  )
}

function CalendarHeader({
  label,
  previousLabel,
  nextLabel,
  onPrevious,
  onNext,
}: {
  label: string
  previousLabel: string
  nextLabel: string
  onPrevious: () => void
  onNext: () => void
}) {
  return (
    <XStack minH={64} px="$3" items="center" justify="space-between" gap="$3">
      <Button
        aria-label={previousLabel}
        circular
        icon={ChevronLeft}
        onPress={onPrevious}
        size="$3"
        variant="outlined"
        focusVisibleStyle={focusRing}
      />
      <XStack gap="$2" items="center">
        <CalendarDays size={18} color="$color10" aria-hidden />
        <Text color="$color12" fontSize="$5" fontWeight="700">
          {label}
        </Text>
      </XStack>
      <Button
        aria-label={nextLabel}
        circular
        icon={ChevronRight}
        onPress={onNext}
        size="$3"
        variant="outlined"
        focusVisibleStyle={focusRing}
      />
    </XStack>
  )
}

type MonthDayProps = {
  date: Date
  compact: boolean
  currentMonth: boolean
  focused: boolean
  selected: boolean
  borderLeft: boolean
  onFocus: () => void
  onKeyDown: (event: KeyboardEvent<HTMLDivElement>) => void
  onSelect: () => void
}

function MonthDay({
  date,
  compact,
  currentMonth,
  focused,
  selected,
  borderLeft,
  onFocus,
  onKeyDown,
  onSelect,
}: MonthDayProps) {
  const events = getEventsForDate(date)
  const visibleEvents = events.slice(0, 2)
  const hiddenCount = Math.max(0, events.length - visibleEvents.length)
  const today = sameDay(date, FIXED_TODAY)
  const eventLabel = events.length ? `, ${events.length} events` : ', no events'

  return (
    <View
      render={isWeb ? <td /> : undefined}
      borderLeftWidth={borderLeft ? 1 : 0}
      borderColor="$color4"
      flex={1}
      height={compact ? 72 : 96}
      minW={0}
    >
      <Button
        unstyled
        render={isWeb ? <button /> : undefined}
        aria-current={today ? 'date' : undefined}
        aria-label={`${getLongDateLabel(date)}${eventLabel}`}
        aria-selected={selected}
        data-calendar-day={dateKey(date)}
        bg={selected ? '$blue3' : currentMonth ? '$color1' : '$color2'}
        borderColor={selected ? '$blue9' : '$color4'}
        borderWidth={selected ? 2 : 0}
        cursor="pointer"
        width="100%"
        height="100%"
        minW={0}
        opacity={currentMonth ? 1 : 0.52}
        p={compact ? '$1' : '$2'}
        rounded={0}
        tabIndex={focused ? 0 : -1}
        transition="100ms"
        items="stretch"
        justify="flex-start"
        onFocus={onFocus}
        onKeyDown={onKeyDown}
        onPress={onSelect}
        hoverStyle={{ bg: '$color3' }}
        pressStyle={{ scale: 0.98 }}
        focusVisibleStyle={focusRing}
        {...(today && !selected
          ? {
              outlineColor: '$blue8',
              outlineOffset: -3,
              outlineStyle: 'solid',
              outlineWidth: 2,
            }
          : {})}
      >
        <Text
          self="flex-end"
          color={selected ? '$blue11' : today ? '$color12' : '$color10'}
          fontSize="$2"
          fontWeight={selected || today ? '800' : '600'}
          lineHeight={16}
        >
          {date.getDate()}
        </Text>
        <YStack gap={2} mt={compact ? 1 : '$1'} overflow="hidden">
          {visibleEvents.map((calendarEvent) => (
            <EventChip
              key={calendarEvent.id}
              calendarEvent={calendarEvent}
              compact={compact}
            />
          ))}
          {!!hiddenCount && (
            <Text color="$color10" fontSize={9} fontWeight="700" numberOfLines={1}>
              +{hiddenCount} more
            </Text>
          )}
        </YStack>
      </Button>
    </View>
  )
}

function EventChip({
  calendarEvent,
  compact,
}: {
  calendarEvent: CalendarEvent
  compact: boolean
}) {
  const colors = categoryStyles[calendarEvent.category]
  return (
    <View
      bg={colors.soft}
      rounded="$2"
      px={compact ? 2 : '$1.5'}
      py={1}
      overflow="hidden"
    >
      <Text
        color={colors.text}
        fontSize={compact ? 8 : 10}
        fontWeight="700"
        lineHeight={compact ? 10 : 13}
        numberOfLines={1}
      >
        {calendarEvent.title}
      </Text>
    </View>
  )
}

function AgendaSurface({ days }: { days: Date[] }) {
  return (
    <ScrollView
      maxH={620}
      borderWidth={1}
      borderColor="$color5"
      rounded="$8"
      bg="$color1"
    >
      <YStack pb="$3">
        {days.map((date) => (
          <AgendaDay key={dateKey(date)} date={date} />
        ))}
      </YStack>
    </ScrollView>
  )
}

function AgendaDay({ date }: { date: Date }) {
  const events = getEventsForDate(date)
  return (
    <YStack>
      <XStack
        position="sticky"
        t={0}
        z={10}
        bg="$color2"
        borderBottomWidth={1}
        borderColor="$color4"
        items="center"
        justify="space-between"
        px="$4"
        py="$2.5"
      >
        <Text color="$color12" fontSize="$3" fontWeight="800">
          {getAgendaHeading(date)}
        </Text>
        <Text color="$color10" fontSize="$2">
          {date.getDate()} {getMonthLabel(date).split(' ')[0].slice(0, 3)}
        </Text>
      </XStack>
      {events.length ? (
        <YStack px="$4" py="$2">
          {events.map((calendarEvent, index) => (
            <AgendaEventRow
              key={calendarEvent.id}
              calendarEvent={calendarEvent}
              last={index === events.length - 1}
            />
          ))}
        </YStack>
      ) : (
        <AgendaEmptyState compact />
      )}
    </YStack>
  )
}

function AgendaEventRow({
  calendarEvent,
  last,
}: {
  calendarEvent: CalendarEvent
  last: boolean
}) {
  const colors = categoryStyles[calendarEvent.category]
  return (
    <XStack minH={88} gap="$3">
      <YStack width={72} pt="$3">
        <Text color="$color12" fontSize="$2" fontWeight="700">
          {calendarEvent.start}
        </Text>
        <Text color="$color9" fontSize="$1">
          {calendarEvent.end}
        </Text>
      </YStack>
      <YStack width={14} items="center" pt="$4">
        <View width={10} height={10} rounded="$10" bg={colors.dot} />
        {!last && <View flex={1} width={2} bg="$color4" mt="$1" />}
      </YStack>
      <YStack flex={1} minW={0} py="$3" gap="$1.5">
        <XStack gap="$2" items="center" flexWrap="wrap">
          <Text color="$color12" fontSize="$4" fontWeight="700" numberOfLines={1}>
            {calendarEvent.title}
          </Text>
          <View bg={colors.soft} rounded="$10" px="$2" py={2}>
            <Text color={colors.text} fontSize="$1" fontWeight="700">
              {calendarEvent.category}
            </Text>
          </View>
        </XStack>
        <XStack gap="$1.5" items="center">
          <MapPin size={13} color="$color9" aria-hidden />
          <Text color="$color10" fontSize="$2" numberOfLines={1}>
            {calendarEvent.location}
          </Text>
        </XStack>
      </YStack>
    </XStack>
  )
}

function DayAgendaPanel({ date }: { date: Date }) {
  const events = getEventsForDate(date)
  return (
    <YStack minH={520} flex={1}>
      <YStack px="$4" py="$4" gap="$1" bg="$color2">
        <Text color="$color10" fontSize="$2" fontWeight="700" textTransform="uppercase">
          {getAgendaHeading(date)}
        </Text>
        <Text color="$color12" fontSize="$6" fontWeight="800">
          {getLongDateLabel(date)}
        </Text>
        <Text color="$color10" fontSize="$2" aria-live="polite">
          {events.length ? `${events.length} scheduled` : 'Your day is open'}
        </Text>
      </YStack>
      <Separator />
      {events.length ? (
        <ScrollView flex={1}>
          <YStack px="$4" py="$2">
            {events.map((calendarEvent, index) => (
              <AgendaEventRow
                key={calendarEvent.id}
                calendarEvent={calendarEvent}
                last={index === events.length - 1}
              />
            ))}
          </YStack>
        </ScrollView>
      ) : (
        <AgendaEmptyState />
      )}
    </YStack>
  )
}

function AgendaEmptyState({ compact }: { compact?: boolean }) {
  return (
    <YStack
      render="output"
      aria-label="No events scheduled"
      flex={compact ? undefined : 1}
      minH={compact ? 112 : 260}
      items="center"
      justify="center"
      gap="$2"
      px="$5"
      py={compact ? '$4' : '$7'}
    >
      <View bg="$color3" rounded="$10" p="$2.5">
        <CalendarX2 size={compact ? 20 : 28} color="$color9" aria-hidden />
      </View>
      <Text color="$color12" fontSize={compact ? '$3' : '$5'} fontWeight="700">
        No events scheduled
      </Text>
      <Text color="$color10" fontSize="$2" text="center" maxW={280}>
        Keep the time open or add a focus block.
      </Text>
    </YStack>
  )
}

function WeekStrip({
  selectedDate,
  onSelectDate,
}: {
  selectedDate: Date
  onSelectDate: (date: Date) => void
}) {
  const weekStart = startOfWeek(selectedDate)
  const days = getAgendaDays(weekStart, 7)

  const handleKeyDown = (event: KeyboardEvent<HTMLDivElement>, date: Date) => {
    const amount = event.key === 'ArrowLeft' ? -1 : event.key === 'ArrowRight' ? 1 : 0
    if (!amount) return
    event.preventDefault()
    const next = addDays(date, amount)
    onSelectDate(next)
    focusWeekDay(next)
  }

  return (
    <YStack bg="$color1">
      <CalendarHeader
        label={getMonthLabel(selectedDate)}
        previousLabel="Previous week"
        nextLabel="Next week"
        onPrevious={() => onSelectDate(addDays(selectedDate, -7))}
        onNext={() => onSelectDate(addDays(selectedDate, 7))}
      />
      <XStack
        px="$2"
        pb="$3"
        gap="$1"
        aria-label="Choose a day"
        accessibilityRole={isWeb ? undefined : 'menu'}
        render={isWeb ? <div role="listbox" tabIndex={-1} /> : undefined}
      >
        {days.map((date) => {
          const selected = sameDay(date, selectedDate)
          const today = sameDay(date, FIXED_TODAY)
          const events = getEventsForDate(date)
          return (
            <Button
              key={dateKey(date)}
              unstyled
              render={
                isWeb ? <button role="option" aria-selected={selected} /> : undefined
              }
              aria-label={`${getLongDateLabel(date)}, ${events.length} events`}
              aria-selected={selected}
              data-calendar-week-day={dateKey(date)}
              bg={selected ? '$blue3' : '$color2'}
              borderColor={selected ? '$blue9' : '$color4'}
              borderWidth={selected ? 2 : 1}
              rounded="$5"
              flex={1}
              minW={0}
              height={72}
              items="center"
              justify="center"
              gap={2}
              tabIndex={selected ? 0 : -1}
              transition="100ms"
              onKeyDown={(event) => handleKeyDown(event, date)}
              onPress={() => onSelectDate(date)}
              hoverStyle={{ bg: '$color3' }}
              pressStyle={{ scale: 0.98 }}
              focusVisibleStyle={focusRing}
            >
              <Text color="$color10" fontSize={9} fontWeight="700">
                {weekdayLabels[(date.getDay() + 6) % 7].slice(0, 2)}
              </Text>
              <Text
                color={selected ? '$blue11' : today ? '$color12' : '$color11'}
                fontSize="$4"
                fontWeight={selected || today ? '800' : '600'}
              >
                {date.getDate()}
              </Text>
              <XStack height={6} gap={2} items="center">
                {events.slice(0, 3).map((calendarEvent) => (
                  <View
                    key={calendarEvent.id}
                    width={4}
                    height={4}
                    rounded="$10"
                    bg={categoryStyles[calendarEvent.category].dot}
                  />
                ))}
              </XStack>
            </Button>
          )
        })}
      </XStack>
    </YStack>
  )
}

function focusCalendarDay(date: Date) {
  if (!isWeb) return
  requestAnimationFrame(() => {
    document.querySelector<HTMLElement>(`[data-calendar-day="${dateKey(date)}"]`)?.focus()
  })
}

function focusWeekDay(date: Date) {
  if (!isWeb) return
  requestAnimationFrame(() => {
    document
      .querySelector<HTMLElement>(`[data-calendar-week-day="${dateKey(date)}"]`)
      ?.focus()
  })
}
