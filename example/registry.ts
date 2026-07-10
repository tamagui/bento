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
  'ai-chat': Components.AIChat,
  command: Components.Command,
  toasts: Components.Toasts,
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
