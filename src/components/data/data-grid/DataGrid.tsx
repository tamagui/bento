import {
  Archive,
  Check,
  ChevronDown,
  ChevronFirst,
  ChevronLast,
  ChevronLeft,
  ChevronRight,
  ChevronUp,
  ChevronsUpDown,
  Download,
  Minus,
  RefreshCw,
  Trash2,
} from '@tamagui/lucide-icons-2'
import type {
  ColumnDef,
  RowSelectionState,
  SortingState,
  Table as TableInstance,
} from '@tanstack/react-table'
import {
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from '@tanstack/react-table'
import { useMemo, useState } from 'react'
import {
  AnimatePresence,
  Avatar,
  Button,
  Checkbox,
  Paragraph,
  ScrollView,
  Separator,
  Text,
  View,
  XStack,
  YStack,
  isWeb,
} from 'tamagui'
import { EmptyStateBasic } from '../../feedback/empty-states/EmptyStateBasic'
import { Skeleton, SkeletonScene } from '../../feedback/skeletons/common/Skeleton'
import { useGroupMedia } from '../../hooks/useGroupMedia'
import { StatusBadge } from '../../elements/tables/common/cells'
import { Table } from '../../elements/tables/common/tableParts'

type PersonStatus = 'active' | 'paused' | 'vacation'

type GridPerson = {
  id: string
  name: string
  email: string
  avatar: string
  role: string
  status: PersonStatus
  /** timestamp so sorting is chronological; format only when rendering */
  joinedAt: number
  projects: number
}

type DataGridCoreProps = {
  compact?: boolean
}

const widths: Record<string, number> = {
  select: 52,
  name: 250,
  role: 180,
  status: 140,
  joinedAt: 160,
  projects: 120,
}

const formatJoined = (timestamp: number) =>
  new Date(timestamp).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  })

const toCsv = (people: GridPerson[]) =>
  [
    'Name,Email,Role,Status,Joined,Projects',
    ...people.map(
      (p) =>
        `${p.name},${p.email},${p.role},${p.status},${formatJoined(p.joinedAt)},${p.projects}`
    ),
  ].join('\n')

export function DataGrid() {
  return <DataGridCore />
}

DataGrid.fileName = 'DataGrid'

export function DataGridCompact() {
  return <DataGridCore compact />
}

DataGridCompact.fileName = 'DataGridCompact'

function DataGridCore({ compact = false }: DataGridCoreProps) {
  const initialData = useMemo(() => makeGridData(200), [])
  const [data, setData] = useState(initialData)
  const [loading, setLoading] = useState(false)
  const [sorting, setSorting] = useState<SortingState>([])
  const [rowSelection, setRowSelection] = useState<RowSelectionState>({})
  const [announcement, setAnnouncement] = useState('')
  const [archived, setArchived] = useState<GridPerson[]>([])
  const { sm } = useGroupMedia('window')

  const columns = useMemo<ColumnDef<GridPerson>[]>(
    () => [
      {
        id: 'select',
        enableSorting: false,
        header: ({ table }) => (
          <SelectionCheckbox
            checked={
              table.getIsAllPageRowsSelected()
                ? true
                : table.getIsSomePageRowsSelected()
                  ? 'indeterminate'
                  : false
            }
            label="Select all rows on this page"
            onCheckedChange={(checked) => table.toggleAllPageRowsSelected(!!checked)}
          />
        ),
        cell: ({ row }) => (
          <SelectionCheckbox
            checked={row.getIsSelected()}
            label={`Select ${row.original.name}`}
            onCheckedChange={(checked) => row.toggleSelected(!!checked)}
          />
        ),
      },
      {
        accessorKey: 'name',
        header: 'Member',
        cell: ({ row }) => (
          <XStack gap="$3" items="center" minW={0}>
            {!compact && (
              <Avatar circular size="$3">
                <Avatar.Image
                  aria-label={`${row.original.name} profile photo`}
                  src={row.original.avatar}
                />
                <Avatar.Fallback bg="$color5" />
              </Avatar>
            )}
            <YStack minW={0}>
              <Text
                color="$color12"
                fontSize={compact ? '$3' : '$4'}
                fontWeight="600"
                numberOfLines={1}
              >
                {row.original.name}
              </Text>
              <Text color="$color10" fontSize="$2" numberOfLines={1}>
                {row.original.email}
              </Text>
            </YStack>
          </XStack>
        ),
      },
      { accessorKey: 'role', header: 'Role' },
      {
        accessorKey: 'status',
        header: 'Status',
        cell: ({ getValue }) => <StatusBadge status={getValue<PersonStatus>()} />,
      },
      {
        accessorKey: 'joinedAt',
        header: 'Joined',
        cell: ({ getValue }) => formatJoined(getValue<number>()),
      },
      { accessorKey: 'projects', header: 'Projects' },
    ],
    [compact]
  )

  const table = useReactTable({
    columns,
    data,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getRowId: (row) => row.id,
    getSortedRowModel: getSortedRowModel(),
    onRowSelectionChange: setRowSelection,
    onSortingChange: setSorting,
    state: { rowSelection, sorting },
    initialState: { pagination: { pageIndex: 0, pageSize: compact ? 12 : 8 } },
  })

  const rows = table.getRowModel().rows
  const selectedCount = table.getSelectedRowModel().rows.length
  const tableWidth = Object.values(widths).reduce((sum, width) => sum + width, 0)

  const resetData = () => {
    setData(initialData)
    setRowSelection({})
    setArchived([])
    setAnnouncement('')
    table.setPageIndex(0)
  }

  const archiveSelected = () => {
    const selected = table.getSelectedRowModel().rows.map((row) => row.original)
    setData((current) => current.filter((p) => !selected.some((s) => s.id === p.id)))
    setArchived(selected)
    setRowSelection({})
    setAnnouncement(
      `${selected.length} member${selected.length === 1 ? '' : 's'} archived`
    )
  }

  const undoArchive = () => {
    setData((current) =>
      // restore in original order
      initialData.filter(
        (p) => current.some((c) => c.id === p.id) || archived.some((a) => a.id === p.id)
      )
    )
    setArchived([])
    setAnnouncement('Archive undone')
  }

  const exportSelected = async () => {
    const selected = table.getSelectedRowModel().rows.map((row) => row.original)
    const csv = toCsv(selected)
    if (isWeb) {
      const url = URL.createObjectURL(new Blob([csv], { type: 'text/csv' }))
      const link = document.createElement('a')
      link.href = url
      link.download = 'team-directory.csv'
      link.click()
      URL.revokeObjectURL(url)
    } else {
      const { Share } = require('react-native')
      await Share.share({ message: csv })
    }
    setAnnouncement(
      `Exported ${selected.length} member${selected.length === 1 ? '' : 's'}`
    )
  }

  return (
    <YStack width="100%" maxW={1180} gap="$3" py="$5">
      <XStack
        gap="$3"
        items={sm ? 'stretch' : 'center'}
        justify="space-between"
        flexDirection={sm ? 'column' : 'row'}
      >
        <YStack gap="$1">
          <Text fontSize={compact ? '$6' : '$7'} fontWeight="700">
            {compact ? 'Compact team grid' : 'Team directory'}
          </Text>
          <Paragraph color="$color10" maxW="100%" numberOfLines={sm ? 2 : 1}>
            {data.length} members · sortable, selectable, and responsive
          </Paragraph>
        </YStack>
        <XStack gap="$2">
          <Button
            aria-label={loading ? 'Stop loading preview' : 'Preview loading state'}
            icon={RefreshCw}
            onPress={() => setLoading((current) => !current)}
            size="$3"
            variant="outlined"
          >
            {loading ? 'Show data' : 'Loading state'}
          </Button>
          <Button
            aria-label={data.length ? 'Show empty state' : 'Restore grid data'}
            icon={data.length ? Trash2 : RefreshCw}
            onPress={() => (data.length ? setData([]) : resetData())}
            size="$3"
            variant="outlined"
          >
            {data.length ? 'Empty state' : 'Restore'}
          </Button>
        </XStack>
      </XStack>

      <View minH={56}>
        <AnimatePresence>
          {!!selectedCount && (
            <XStack
              key="bulk-actions"
              bg="$color2"
              borderColor="$color6"
              borderWidth={1}
              rounded="$5"
              gap="$2"
              items={sm ? 'stretch' : 'center'}
              flexDirection={sm ? 'column' : 'row'}
              minH={sm ? 88 : 52}
              px="$3"
              transition={{ default: 'quicker', exit: 'quickest' }}
              enterStyle={{ opacity: 0, y: -8 }}
              exitStyle={{ opacity: 0, y: -4 }}
            >
              <Text color="$color12" fontWeight="700" mr="auto" data-grid-selected-count>
                {selectedCount} selected
              </Text>
              <XStack gap="$1" justify={sm ? 'space-between' : 'flex-end'}>
                <Button
                  chromeless
                  color="$color12"
                  icon={Archive}
                  onPress={archiveSelected}
                  size="$3"
                >
                  Archive
                </Button>
                <Button
                  chromeless
                  color="$color12"
                  icon={Download}
                  onPress={exportSelected}
                  size="$3"
                >
                  Export
                </Button>
                <Button
                  chromeless
                  color="$color12"
                  onPress={() => setRowSelection({})}
                  size="$3"
                >
                  Clear
                </Button>
              </XStack>
            </XStack>
          )}
          {!selectedCount && !!announcement && (
            <XStack
              key="announcement"
              render="output"
              aria-live="polite"
              bg="$color2"
              borderColor="$color6"
              borderWidth={1}
              rounded="$5"
              gap="$3"
              items="center"
              minH={52}
              px="$3"
              transition={{ default: 'quicker', exit: 'quickest' }}
              enterStyle={{ opacity: 0, y: -8 }}
              exitStyle={{ opacity: 0, y: -4 }}
            >
              <Text color="$color11" data-grid-announcement>
                {announcement}
              </Text>
              {archived.length > 0 && (
                <Button onPress={undoArchive} size="$2.5" variant="outlined">
                  Undo
                </Button>
              )}
            </XStack>
          )}
        </AnimatePresence>
      </View>

      <YStack
        bg="$background"
        borderColor="$borderColor"
        borderWidth={1}
        overflow="hidden"
        rounded="$7"
      >
        {loading ? (
          <GridSkeleton compact={compact} mobile={sm} />
        ) : !data.length ? (
          <YStack py="$4" items="center">
            <EmptyStateBasic />
          </YStack>
        ) : sm ? (
          <MobileCards table={table} compact={compact} />
        ) : (
          <ScrollView horizontal showsHorizontalScrollIndicator>
            <ScrollView maxH={compact ? 560 : 620} nestedScrollEnabled>
              <Table
                aria-label="Team directory data grid"
                borderWidth={0}
                cellHeight={compact ? 46 : 64}
                minW={tableWidth}
                width={tableWidth}
              >
                <Table.Head position="sticky" t={0} z={20}>
                  {table.getHeaderGroups().map((headerGroup) => (
                    <Table.Row key={headerGroup.id} bg="$color2" borderBottomWidth={1}>
                      {headerGroup.headers.map((header) => {
                        const sorted = header.column.getIsSorted()
                        const pinned = pinnedStyle(header.column.id, true)
                        return (
                          <Table.HeaderCell
                            key={header.id}
                            aria-sort={
                              sorted === 'asc'
                                ? 'ascending'
                                : sorted === 'desc'
                                  ? 'descending'
                                  : 'none'
                            }
                            bg="$color2"
                            cellWidth={widths[header.column.id]}
                            px="$3"
                            style={pinned}
                            z={pinned ? 22 : 20}
                          >
                            {header.isPlaceholder ? null : header.column.getCanSort() ? (
                              <Button
                                aria-label={`Sort by ${String(header.column.columnDef.header)}`}
                                chromeless
                                iconAfter={
                                  sorted === 'asc'
                                    ? ChevronUp
                                    : sorted === 'desc'
                                      ? ChevronDown
                                      : ChevronsUpDown
                                }
                                onPress={header.column.getToggleSortingHandler()}
                                px={0}
                                size="$2"
                              >
                                {flexRender(
                                  header.column.columnDef.header,
                                  header.getContext()
                                )}
                              </Button>
                            ) : (
                              flexRender(
                                header.column.columnDef.header,
                                header.getContext()
                              )
                            )}
                          </Table.HeaderCell>
                        )
                      })}
                    </Table.Row>
                  ))}
                </Table.Head>
                <Table.Body>
                  {rows.map((row, index) => {
                    const rowBg = row.getIsSelected()
                      ? '$color3'
                      : index % 2
                        ? '$color2'
                        : '$background'
                    return (
                      <Table.Row
                        key={row.id}
                        aria-selected={row.getIsSelected()}
                        bg={rowBg}
                        borderBottomWidth={index === rows.length - 1 ? 0 : 1}
                        hoverStyle={{ bg: '$color3' }}
                      >
                        {row.getVisibleCells().map((cell) => {
                          const pinned = pinnedStyle(cell.column.id, false)
                          return (
                            <Table.Cell
                              key={cell.id}
                              bg={pinned ? rowBg : undefined}
                              cellWidth={widths[cell.column.id]}
                              px="$3"
                              style={pinned}
                              z={pinned ? 2 : 1}
                            >
                              {cell.column.id !== 'select' &&
                              cell.column.id !== 'name' &&
                              cell.column.id !== 'status' ? (
                                <Text color="$color11" fontSize={compact ? '$2' : '$3'}>
                                  {flexRender(
                                    cell.column.columnDef.cell,
                                    cell.getContext()
                                  )}
                                </Text>
                              ) : (
                                flexRender(cell.column.columnDef.cell, cell.getContext())
                              )}
                            </Table.Cell>
                          )
                        })}
                      </Table.Row>
                    )
                  })}
                </Table.Body>
              </Table>
            </ScrollView>
          </ScrollView>
        )}

        {!!data.length && !loading && (
          <PaginationFooter table={table} selectedCount={selectedCount} />
        )}
      </YStack>
    </YStack>
  )
}

function SelectionCheckbox({
  checked,
  label,
  onCheckedChange,
}: {
  checked: boolean | 'indeterminate'
  label: string
  onCheckedChange: (checked: boolean | 'indeterminate') => void
}) {
  return (
    <Checkbox
      aria-label={label}
      checked={checked}
      hitSlop={isWeb ? undefined : 12}
      onCheckedChange={onCheckedChange}
      size="$3"
    >
      <Checkbox.Indicator>
        {checked === 'indeterminate' ? <Minus size={14} /> : <Check size={14} />}
      </Checkbox.Indicator>
    </Checkbox>
  )
}

function MobileCards({
  table,
  compact,
}: {
  table: TableInstance<GridPerson>
  compact: boolean
}) {
  const rows = table.getRowModel().rows
  return (
    <YStack>
      <XStack borderBottomWidth={1} gap="$2" items="center" minH={48} px="$4">
        <SelectionCheckbox
          checked={
            table.getIsAllPageRowsSelected()
              ? true
              : table.getIsSomePageRowsSelected()
                ? 'indeterminate'
                : false
          }
          label="Select all cards on this page"
          onCheckedChange={(checked) => table.toggleAllPageRowsSelected(!!checked)}
        />
        <Text color="$color10" fontSize="$2" fontWeight="600">
          Select this page
        </Text>
      </XStack>
      <MobileSortChips table={table} />
      <YStack
        aria-label="Team directory cards"
        accessibilityRole={isWeb ? undefined : 'list'}
        gap="$2"
        m={0}
        p="$3"
        render={isWeb ? <ul /> : undefined}
        style={isWeb ? { listStyleType: 'none' } : undefined}
      >
        {rows.map((row) => (
          <YStack
            key={row.id}
            bg={row.getIsSelected() ? '$color3' : '$background'}
            borderColor={row.getIsSelected() ? '$color8' : '$color5'}
            borderWidth={1}
            rounded="$5"
            gap="$3"
            p={compact ? '$3' : '$4'}
            render={isWeb ? <li /> : undefined}
          >
            <XStack gap="$3" items="center">
              <SelectionCheckbox
                checked={row.getIsSelected()}
                label={`Select ${row.original.name}`}
                onCheckedChange={(checked) => row.toggleSelected(!!checked)}
              />
              {!compact && (
                <Avatar circular size="$4">
                  <Avatar.Image
                    aria-label={`${row.original.name} profile photo`}
                    src={row.original.avatar}
                  />
                  <Avatar.Fallback bg="$color5" />
                </Avatar>
              )}
              <YStack flex={1} minW={0}>
                <Text fontSize="$4" fontWeight="700" numberOfLines={1}>
                  {row.original.name}
                </Text>
                <Text color="$color10" fontSize="$2" numberOfLines={1}>
                  {row.original.email}
                </Text>
              </YStack>
              <StatusBadge status={row.original.status} />
            </XStack>
            <Separator />
            {/* wrap so fields never crush each other at very narrow widths */}
            <XStack flexWrap="wrap" gap="$3">
              <CardField label="Role" value={row.original.role} />
              <CardField label="Joined" value={formatJoined(row.original.joinedAt)} />
              <CardField label="Projects" value={String(row.original.projects)} />
            </XStack>
          </YStack>
        ))}
      </YStack>
    </YStack>
  )
}

const sortOptions = [
  { id: 'name', label: 'Name' },
  { id: 'joinedAt', label: 'Joined' },
  { id: 'projects', label: 'Projects' },
]

/** card mode keeps sort parity with the desktop table */
function MobileSortChips({ table }: { table: TableInstance<GridPerson> }) {
  const sorting = table.getState().sorting
  return (
    <XStack borderBottomWidth={1} gap="$2" items="center" px="$4" py="$2">
      <Text color="$color9" fontSize="$1" fontWeight="700" textTransform="uppercase">
        Sort
      </Text>
      {sortOptions.map((option) => {
        const active = sorting[0]?.id === option.id
        const desc = active && sorting[0]?.desc
        return (
          <Button
            key={option.id}
            aria-label={`Sort by ${option.label}${
              active ? (desc ? ', descending' : ', ascending') : ''
            }`}
            aria-pressed={active}
            bg={active ? '$color4' : '$color2'}
            borderColor={active ? '$color8' : '$color5'}
            borderWidth={1}
            hitSlop={isWeb ? undefined : 6}
            iconAfter={active ? (desc ? ChevronDown : ChevronUp) : undefined}
            onPress={() =>
              table.setSorting(
                !active
                  ? [{ id: option.id, desc: false }]
                  : desc
                    ? []
                    : [{ id: option.id, desc: true }]
              )
            }
            rounded="$10"
            size="$2.5"
          >
            <Text color={active ? '$color12' : '$color11'} fontSize="$2">
              {option.label}
            </Text>
          </Button>
        )
      })}
    </XStack>
  )
}

function CardField({ label, value }: { label: string; value: string }) {
  return (
    <YStack gap="$1" minW={0} grow={1} flexBasis="28%">
      <Text color="$color9" fontSize="$1" fontWeight="700" textTransform="uppercase">
        {label}
      </Text>
      <Text color="$color11" fontSize="$2" numberOfLines={1}>
        {value}
      </Text>
    </YStack>
  )
}

function PaginationFooter({
  selectedCount,
  table,
}: {
  selectedCount: number
  table: ReturnType<typeof useReactTable<GridPerson>>
}) {
  return (
    <XStack
      borderTopWidth={1}
      flexWrap="wrap"
      gap="$3"
      items="center"
      justify="space-between"
      minH={64}
      px="$3"
      py="$2"
    >
      <Text color="$color10" fontSize="$2">
        {selectedCount
          ? `${selectedCount} of ${table.getPrePaginationRowModel().rows.length} selected`
          : `${table.getPrePaginationRowModel().rows.length} total members`}
      </Text>
      <Text color="$color11" fontSize="$2" fontWeight="600" data-grid-page>
        Page {table.getState().pagination.pageIndex + 1} of {table.getPageCount()}
      </Text>
      <XStack gap="$1">
        <PageButton
          label="First page"
          icon={ChevronFirst}
          disabled={!table.getCanPreviousPage()}
          onPress={() => table.setPageIndex(0)}
        />
        <PageButton
          label="Previous page"
          icon={ChevronLeft}
          disabled={!table.getCanPreviousPage()}
          onPress={() => table.previousPage()}
        />
        <PageButton
          label="Next page"
          icon={ChevronRight}
          disabled={!table.getCanNextPage()}
          onPress={() => table.nextPage()}
        />
        <PageButton
          label="Last page"
          icon={ChevronLast}
          disabled={!table.getCanNextPage()}
          onPress={() => table.setPageIndex(table.getPageCount() - 1)}
        />
      </XStack>
    </XStack>
  )
}

function PageButton({
  disabled,
  icon,
  label,
  onPress,
}: {
  disabled: boolean
  icon: typeof ChevronLeft
  label: string
  onPress: () => void
}) {
  return (
    <Button
      aria-label={label}
      circular
      disabled={disabled}
      icon={icon}
      onPress={onPress}
      // comfortable touch size on native. tamagui keeps disabled buttons
      // focusable with aria-disabled (discoverable-disabled pattern)
      size={isWeb ? '$3' : '$4'}
      variant="outlined"
    />
  )
}

function GridSkeleton({ compact, mobile }: { compact: boolean; mobile: boolean }) {
  return (
    <SkeletonScene>
      <YStack render="output" aria-label="Loading team directory" gap="$2" p="$3">
        {Array.from({ length: compact ? 10 : 7 }, (_, index) => (
          <XStack
            key={index}
            borderBottomWidth={index === (compact ? 9 : 6) ? 0 : 1}
            gap="$3"
            items="center"
            minH={mobile ? 74 : compact ? 46 : 64}
            px="$2"
          >
            <Skeleton width={20} height={20} rounded="$2" />
            {!compact && <Skeleton width={36} height={36} rounded={1000} />}
            <YStack flex={1} gap="$2">
              <Skeleton width={index % 2 ? '42%' : '34%'} height={12} rounded="$3" />
              <Skeleton width={index % 2 ? '64%' : '52%'} height={10} rounded="$3" />
            </YStack>
            {!mobile && <Skeleton width={90} height={22} rounded={1000} />}
          </XStack>
        ))}
      </YStack>
    </SkeletonScene>
  )
}

function pinnedStyle(columnId: string, header: boolean) {
  if (columnId === 'select') {
    return { position: 'sticky' as const, left: 0, zIndex: header ? 22 : 2 }
  }
  if (columnId === 'name') {
    return { position: 'sticky' as const, left: widths.select, zIndex: header ? 22 : 2 }
  }
  return undefined
}

function makeGridData(count: number): GridPerson[] {
  const firstNames = ['Avery', 'Maya', 'Noah', 'Sofia', 'Eli', 'Iris', 'Leo', 'Nora']
  const lastNames = [
    'Chen',
    'Patel',
    'Rivera',
    'Kim',
    'Martin',
    'Okafor',
    'Singh',
    'Stone',
  ]
  const roles = ['Product Designer', 'Engineer', 'Researcher', 'Product Manager']
  const statuses: PersonStatus[] = ['active', 'paused', 'vacation']

  return Array.from({ length: count }, (_, index) => {
    const firstName = firstNames[index % firstNames.length]
    const lastName = lastNames[Math.floor(index / firstNames.length) % lastNames.length]
    const name = `${firstName} ${lastName}`
    return {
      id: `member-${index + 1}`,
      name,
      email: `${firstName}.${lastName}.${index + 1}@example.com`.toLocaleLowerCase(),
      avatar: `https://i.pravatar.cc/96?img=${(index % 68) + 1}`,
      role: roles[index % roles.length],
      status: statuses[index % statuses.length],
      joinedAt: new Date(2022 + (index % 4), index % 12, (index % 27) + 1).getTime(),
      projects: (index * 7) % 24,
    }
  })
}
