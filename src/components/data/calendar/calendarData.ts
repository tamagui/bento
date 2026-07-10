export type EventCategory = 'Design' | 'Focus' | 'Personal' | 'Team'

export type CalendarEvent = {
  id: string
  date: string
  title: string
  start: string
  end: string
  category: EventCategory
  location: string
}

export const FIXED_TODAY = new Date(2026, 6, 15)

export const weekdayLabels = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']

export const monthLabels = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
]

export const calendarEvents: CalendarEvent[] = [
  event('research', 3, 'Research synthesis', '9:30 AM', '10:30 AM', 'Design', 'Studio 2'),
  event('planning', 7, 'Launch planning', '11:00 AM', '12:00 PM', 'Team', 'Orchid room'),
  event(
    'prototype',
    10,
    'Prototype review',
    '2:00 PM',
    '3:00 PM',
    'Design',
    'Design lab'
  ),
  event('standup', 15, 'Product stand-up', '9:00 AM', '9:30 AM', 'Team', 'Video call'),
  event(
    'deep-work',
    15,
    'Roadmap deep work',
    '10:30 AM',
    '12:30 PM',
    'Focus',
    'Focus room'
  ),
  event(
    'dentist',
    15,
    'Dentist appointment',
    '3:30 PM',
    '4:15 PM',
    'Personal',
    'Kapiolani Center'
  ),
  event(
    'interviews',
    16,
    'Customer interviews',
    '10:00 AM',
    '11:30 AM',
    'Design',
    'Research room'
  ),
  event('copy', 18, 'Launch copy review', '9:30 AM', '10:15 AM', 'Team', 'Video call'),
  event('lunch', 18, 'Lunch with Ana', '12:30 PM', '1:30 PM', 'Personal', 'Moku Kitchen'),
  event(
    'metrics',
    20,
    'Metrics working session',
    '1:00 PM',
    '2:30 PM',
    'Focus',
    'Library'
  ),
  event(
    'design-crit',
    22,
    'Design critique',
    '10:00 AM',
    '11:00 AM',
    'Design',
    'Studio 2'
  ),
  event('retro', 22, 'Sprint retrospective', '3:00 PM', '4:00 PM', 'Team', 'Orchid room'),
  event('strategy', 24, 'Strategy review', '11:00 AM', '12:00 PM', 'Team', 'Boardroom'),
  event(
    'workshop',
    28,
    'Accessibility workshop',
    '9:00 AM',
    '11:00 AM',
    'Design',
    'Design lab'
  ),
  event('budget', 31, 'Quarterly budget', '10:30 AM', '11:30 AM', 'Focus', 'Library'),
  event(
    'movie',
    31,
    'Outdoor movie night',
    '7:30 PM',
    '9:30 PM',
    'Personal',
    'Kapiolani Park'
  ),
]

export function dateKey(date: Date) {
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')
  return `${year}-${month}-${day}`
}

export function dateFromKey(key: string) {
  const [year, month, day] = key.split('-').map(Number)
  return new Date(year, month - 1, day)
}

export function addDays(date: Date, amount: number) {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate() + amount)
}

export function addMonths(date: Date, amount: number) {
  return new Date(date.getFullYear(), date.getMonth() + amount, 1)
}

export function startOfWeek(date: Date) {
  const mondayOffset = (date.getDay() + 6) % 7
  return addDays(date, -mondayOffset)
}

export function sameDay(first: Date, second: Date) {
  return dateKey(first) === dateKey(second)
}

export function sameMonth(first: Date, second: Date) {
  return (
    first.getFullYear() === second.getFullYear() && first.getMonth() === second.getMonth()
  )
}

export function getMonthGrid(month: Date) {
  const first = new Date(month.getFullYear(), month.getMonth(), 1)
  const start = startOfWeek(first)
  return Array.from({ length: 42 }, (_, index) => addDays(start, index))
}

export function getEventsForDate(date: Date) {
  const key = dateKey(date)
  return calendarEvents.filter((calendarEvent) => calendarEvent.date === key)
}

export function getAgendaDays(start: Date, count = 7) {
  return Array.from({ length: count }, (_, index) => addDays(start, index))
}

export function getMonthLabel(date: Date) {
  return `${monthLabels[date.getMonth()]} ${date.getFullYear()}`
}

export function getLongDateLabel(date: Date) {
  const weekday = weekdayLabels[(date.getDay() + 6) % 7]
  return `${weekday}, ${monthLabels[date.getMonth()]} ${date.getDate()}`
}

export function getAgendaHeading(date: Date) {
  if (sameDay(date, FIXED_TODAY)) return 'Today'
  if (sameDay(date, addDays(FIXED_TODAY, 1))) return 'Tomorrow'
  return getLongDateLabel(date)
}

function event(
  id: string,
  day: number,
  title: string,
  start: string,
  end: string,
  category: EventCategory,
  location: string
): CalendarEvent {
  return {
    id,
    date: dateKey(new Date(2026, 6, day)),
    title,
    start,
    end,
    category,
    location,
  }
}
