// single source of truth for browsing bento components, shared by the native
// navigator and the web gallery. ids are url-safe slugs.
import * as Components from '../src/components'

export const componentMap: Record<string, Record<string, any>> = {
  inputs: Components.Inputs,
  checkboxes: Components.Checkboxes,
  radiogroups: Components.Radiogroups,
  switches: Components.Switches,
  textareas: Components.Textareas,
  layouts: Components.Layouts,
  avatars: Components.Avatars,
  buttons: Components.Buttons,
  chips: Components.Chips,
  datepickers: Components.Datepickers,
  dialogs: Components.Dialogs,
  list: Components.List,
  pickers: Components.Pickers,
  tables: Components.Tables,
  navbars: Components.Navbars,
  tabbars: Components.Tabbars,
  'animation-buttons': Components.AnimationButtons,
  'animation-avatars': Components.AnimationAvatars,
  microinteractions: Components.Microinteractions,
  slide: Components.Slide,
  payment: Components.Payment,
  productpage: Components.Productpage,
  preferences: Components.Preferences,
  profile: Components.UserProfile,
  walkthrough: Components.Walkthrough,
  'product-list': Components.ProductList,
  shells: Components.Shells,
  'empty-states': Components.EmptyStates,
  skeletons: Components.Skeletons,
  stats: Components.Stats,
  banners: Components.Banners,
  ratings: Components.Ratings,
  timeline: Components.Timeline,
  'segmented-controls': Components.SegmentedControls,
  accordions: Components.Accordions,
  'ai-chat': Components.AIChat,
  command: Components.Command,
  toasts: Components.Toasts,
  carousels: Components.Carousels,
  'data-grid': Components.DataGrid,
}

// only capitalized function exports are renderable demos (skip helpers/types)
export function getGroupItems(groupId: string): [string, any][] {
  const group = componentMap[groupId]
  if (!group) return []
  return Object.entries(group).filter(
    ([name, val]) => /^[A-Z]/.test(name) && typeof val === 'function'
  )
}

export const groupIds = Object.keys(componentMap)

// sectioned presentation shared by native home + web index
export const sections: { label: string; items: { title: string; id: string }[] }[] = [
  {
    label: 'Forms',
    items: [
      { title: 'Inputs', id: 'inputs' },
      { title: 'Checkboxes', id: 'checkboxes' },
      { title: 'Radio Groups', id: 'radiogroups' },
      { title: 'Switches', id: 'switches' },
      { title: 'Textareas', id: 'textareas' },
      { title: 'Form Layouts', id: 'layouts' },
      { title: 'Pickers', id: 'pickers' },
    ],
  },
  {
    label: 'Elements',
    items: [
      { title: 'Avatars', id: 'avatars' },
      { title: 'Buttons', id: 'buttons' },
      { title: 'Chips', id: 'chips' },
      { title: 'Datepickers', id: 'datepickers' },
      { title: 'Dialogs', id: 'dialogs' },
      { title: 'Lists', id: 'list' },
      { title: 'Tables', id: 'tables' },
      { title: 'Carousels', id: 'carousels' },
    ],
  },
  {
    label: 'Feedback',
    items: [
      { title: 'Toasts', id: 'toasts' },
      { title: 'Banners', id: 'banners' },
      { title: 'Empty States', id: 'empty-states' },
      { title: 'Skeletons', id: 'skeletons' },
      { title: 'Stats', id: 'stats' },
    ],
  },
  {
    label: 'Data',
    items: [
      { title: 'Data Grid', id: 'data-grid' },
      { title: 'Timeline', id: 'timeline' },
    ],
  },
  {
    label: 'AI',
    items: [{ title: 'Chat', id: 'ai-chat' }],
  },
  {
    label: 'Navigation & Shells',
    items: [
      { title: 'Command Palette', id: 'command' },
      { title: 'Navigation Bars', id: 'navbars' },
      { title: 'Tab Bars', id: 'tabbars' },
      { title: 'Drawer', id: 'shells' },
    ],
  },
  {
    label: 'Animations',
    items: [
      { title: 'Buttons', id: 'animation-buttons' },
      { title: 'Avatars', id: 'animation-avatars' },
      { title: 'Microinteractions', id: 'microinteractions' },
      { title: 'Slides', id: 'slide' },
    ],
  },
  {
    label: 'E-commerce',
    items: [
      { title: 'Payment', id: 'payment' },
      { title: 'Product Page', id: 'productpage' },
      { title: 'Product Lists', id: 'product-list' },
    ],
  },
  {
    label: 'User & Panels',
    items: [
      { title: 'Preferences', id: 'preferences' },
      { title: 'Profile', id: 'profile' },
      { title: 'Walkthrough', id: 'walkthrough' },
    ],
  },
]
