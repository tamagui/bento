import {
  Bell,
  CalendarDays,
  Clock3,
  CreditCard,
  Download,
  FilePlus2,
  FileText,
  FolderOpen,
  HelpCircle,
  Home,
  LayoutDashboard,
  LogOut,
  Mail,
  Moon,
  Plus,
  Search,
  Settings,
  Upload,
  UserPlus,
  Users,
} from '@tamagui/lucide-icons-2'
import type { ElementType } from 'react'

export type CommandItem = {
  id: string
  label: string
  description: string
  keywords: string[]
  icon: ElementType
  shortcut?: string[]
}

export type CommandGroup = {
  id: string
  label: string
  items: CommandItem[]
}

export const commandGroups: CommandGroup[] = [
  {
    id: 'pages',
    label: 'Pages',
    items: [
      command('home', 'Home', 'Return to your workspace overview', Home, ['start']),
      command(
        'dashboard',
        'Dashboard',
        'Review product health and activity',
        LayoutDashboard,
        ['analytics', 'metrics']
      ),
      command('projects', 'Projects', 'Browse every active project', FolderOpen, [
        'files',
        'work',
      ]),
      command('team', 'Team', 'Manage members and permissions', Users, [
        'people',
        'members',
      ]),
      command('inbox', 'Inbox', 'Read messages and mentions', Mail, ['messages']),
      command('calendar', 'Calendar', 'Plan meetings and deadlines', CalendarDays, [
        'schedule',
      ]),
      command('billing', 'Billing', 'Update plan and payment details', CreditCard, [
        'subscription',
      ]),
      command('settings', 'Settings', 'Customize your workspace', Settings, [
        'preferences',
      ]),
    ],
  },
  {
    id: 'actions',
    label: 'Actions',
    items: [
      command(
        'new-project',
        'Create project',
        'Start a new team project',
        Plus,
        ['add', 'new'],
        ['mod', 'P']
      ),
      command(
        'new-document',
        'Create document',
        'Draft a new shared document',
        FilePlus2,
        ['add', 'new']
      ),
      command(
        'invite',
        'Invite teammate',
        'Create and send a workspace invitation',
        UserPlus,
        ['member', 'add']
      ),
      command('upload', 'Upload files', 'Add files from your device', Upload, ['import']),
      command('export', 'Export workspace', 'Download a workspace archive', Download, [
        'backup',
      ]),
      command('theme', 'Switch appearance', 'Toggle the light or dark theme', Moon, [
        'theme',
        'mode',
      ]),
      command('sign-out', 'Sign out', 'End this browser session', LogOut, ['logout']),
    ],
  },
  {
    id: 'recent',
    label: 'Recent',
    items: [
      command('recent-roadmap', 'Q3 product roadmap', 'Opened 8 minutes ago', FileText, [
        'document',
      ]),
      command('recent-research', 'Customer research', 'Opened yesterday', Search, [
        'project',
      ]),
      command(
        'recent-notifications',
        'Notification settings',
        'Opened 2 days ago',
        Bell,
        ['preferences']
      ),
      command('recent-help', 'Getting started', 'Opened last week', HelpCircle, ['help']),
      command('recent-activity', 'Workspace activity', 'Opened last week', Clock3, [
        'history',
      ]),
    ],
  },
]

function command(
  id: string,
  label: string,
  description: string,
  icon: ElementType,
  keywords: string[],
  shortcut?: string[]
): CommandItem {
  return { id, label, description, icon, keywords, shortcut }
}

export function fuzzyScore(query: string, text: string) {
  const needle = query.trim().toLocaleLowerCase()
  const haystack = text.toLocaleLowerCase()
  if (!needle) return 0

  let score = 0
  let needleIndex = 0
  let streak = 0

  for (let index = 0; index < haystack.length && needleIndex < needle.length; index++) {
    if (haystack[index] !== needle[needleIndex]) {
      streak = 0
      continue
    }

    streak += 1
    score += 1 + streak * 2
    if (index === 0 || /[\s/_-]/.test(haystack[index - 1])) score += 4
    needleIndex += 1
  }

  return needleIndex === needle.length ? score - haystack.length / 1000 : null
}

export function filterCommandGroups(query: string) {
  if (!query.trim()) return commandGroups

  return commandGroups
    .map((group) => ({
      ...group,
      items: group.items
        .map((item) => ({
          item,
          score: fuzzyScore(
            query,
            `${item.label} ${item.description} ${item.keywords.join(' ')}`
          ),
        }))
        .filter(
          (entry): entry is { item: CommandItem; score: number } => entry.score !== null
        )
        .sort((first, second) => second.score - first.score)
        .map((entry) => entry.item),
    }))
    .filter((group) => group.items.length > 0)
}
