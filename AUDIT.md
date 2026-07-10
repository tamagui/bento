<!-- final state of the bento v2 overhaul; the original issue catalog this file
     replaced is preserved in git history (see AUDIT.md before this commit) -->

# Bento v2 — Visual Audit, Final State

Verification: `node scripts/audit-sweep.mjs` (all groups × {light,dark} ×
{360,1280}, headless chromium) plus manual playwright interaction probes and an
iOS simulator runthrough.

## Result

- **228/228 captures clean**: zero console errors, zero runtime crashes, zero
  horizontal overflow at 360px, both themes.
- **57 groups · 202 components** (was 23 renderable groups · 108 components at
  the start of the overhaul).
- Typecheck and biome pass. Idle 60fps on the heaviest groups (data-grid @ 200
  rows, kanban, streaming ai-chat) on the unminified dev server.

## Before → after

The original sweep graded 23 groups; 9 of them were hard-crashed (F) and none
graded above B. Every catalogued issue was fixed:

| Was | Root cause | Fix |
|---|---|---|
| radiogroups/tables/productpage/payment/microinteractions crashed (`useGroupMedia: no parent group "window"`) | gallery didn't provide the `window` container group; hook also missed initial layout | gallery `ItemFrame` wraps in `group="window"`; `useGroupMedia` reads `groups.state.layout` before subscribing |
| switches/animation-buttons crashed (CSSStyleDeclaration indexed setter) | tamagui v2 core `elementType` clobber + `size={undefined}` token crash | fixed upstream (tamagui PR #4119), patched into local dists |
| list crashed (Reanimated useAnimatedStyle) | moti/reanimated web wrappers leaking `nativeID` + missing dep arrays | fixed upstream (tamagui PR #4120), component-side dep arrays |
| portals + `transition` content rendered light-in-dark | bento `Provider.tsx` put `defaultTheme="light"` AFTER the props spread, overriding every caller | destructured `defaultTheme = 'light'` param, passed before spread |
| broken avatar/logo images (preferences, navbars, animation-avatars, slide) | dead remote URLs / unbundled assets | bundled local assets + reliable placeholder services |
| non-responsive at 360 (layouts sign-in, navbars, slide card, inputs group) | fixed widths, no mobile branch | `maxW` + `width:100%` + `$group-window-sm` collapse patterns |
| dark theme illegibility (checkboxes, textareas, pickers, buttons yellow) | untuned dark tokens, borderless fills | one-step-lighter surfaces, visible borders, normalized chip/badge palettes |
| jammed all-caps section labels ("INPUTGROUPEDICONSEXAMPLE") | raw export names | `prettyName()` word-splits in gallery + native screens |
| missing a11y | icon buttons unlabeled, wrong roles | aria-labels, real roles (tablist/tab, radiogroup, switch), focusVisible styles across the catalog |

## Catalog (57 groups)

Forms: inputs, checkboxes, radiogroups, switches, textareas, datepickers,
pickers, color-picker, search, filters.
Elements: avatars, buttons, chips, list, tables, dialogs, menus, carousels,
accordions, ratings, segmented-controls, steppers, timeline, file-upload,
command, data-grid, kanban, calendar.
Feedback: toasts, banners, empty-states, skeletons, progress, notifications.
AI: ai-chat.
Navigation & shells: navbars, tabbars, shells, settings-cells.
Data & marketing: stats, pricing, marketing-sections, social-proof.
E-commerce: payment, productpage, product-list, quantity, checkout.
User & panels: preferences, profile, walkthrough, onboarding, layouts.
Animation: animation-buttons, animation-avatars, microinteractions, slide.

## Standing quality bar (enforced, see PLAN.md)

Theme tokens only; clean at 360 and 1280 in both themes; roles/labels/focus
on everything interactive; hover+press+focusVisible states; transition presets
only (`100ms`/`150ms`/`200ms`/`quick`); self-contained demos with mock data.

New groups must pass `node scripts/audit-sweep.mjs <group>` clean before
registering (see README).

## Known remaining (tracked, not blockers)

- Upstream tamagui PRs #4119 / #4120 are patched into this repo's
  `node_modules` dists; a fresh `yarn install` before those PRs publish will
  reintroduce the switches/animation-buttons crashes and nativeID warnings.
- iOS runthrough findings are appended below when the pass completes; anything
  actionable gets filed as a fix commit, not left in this doc.
