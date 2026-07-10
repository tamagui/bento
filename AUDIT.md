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

## Critique round (post-expansion deep review)

A dedicated reviewer critiqued all 30 new groups one by one against an 8-axis
rubric (UI, UX, perf, design taste, responsive, platform-unique primitives,
tamagui size/theme leverage, HeroUI Pro comparison). Full per-group notes were
produced externally; every ranked blocker/major finding was then fixed,
playwright-verified, and committed per group. The recurring classes fixed:

- **Inert/fake actions** (banners, empty-states, marketing, social-proof,
  pricing, checkout, kanban, menus, timeline): every CTA now performs a real
  navigation, mutation, or visible state change; dead `href="#"` links and
  decorative buttons were removed or wired.
- **Broken interaction contracts**: command palette dismissal (853ms → 133ms
  with focus restore), filters draft/commit sheet (Apply used to discard
  edits), calendar's unequal table columns + 42 tab stops (now an equal-width
  ARIA grid with a single roving tab stop), carousel snap interval vs measured
  slide width, segmented-control pill misalignment, quantity hold-repeat
  runaway, stale toast timers killing the wrong toast.
- **Unnamed controls**: sliders name the semantic Thumb (settings-cells,
  color-picker, filters range), progress bars/meters/rings all carry
  role + label + clamped values.
- **State honesty**: counts/results derive from real data (search, filters,
  notifications badge, checkout totals in integer cents with validated promo
  codes); onboarding checklist completion derives from domain state through
  real inline flows; stats decouple direction from sentiment.
- **Platform adapters**: touch gets sheets (notifications, settings select),
  long-press context menus, 44pt targets via native hitSlop, reduced-motion
  everywhere timers/transitions animate; native file picks actually work.

Consciously deferred (noted per group, out of demo scope): extracting fully
generic typed component APIs, virtualization for unbounded lists, RTL logical
properties, URL/history sync, and multi-variant families at HeroUI Pro's
breadth.

## Known remaining (tracked, not blockers)

- Upstream tamagui PRs #4119 / #4120 / #4121 (Button clobbered user
  `tabIndex`) / #4123 (Toast stale close timer hides the replacing toast) are
  patched into this repo's `node_modules` dists; a fresh `yarn install`
  before those PRs publish will reintroduce those bugs. The #4119 local patch
  also gained a guard so `__tamaguiTheme` props only attach to animated
  custom components (they leaked to the DOM on every element otherwise).
- The iOS simulator runthrough (all 24 post-expansion groups, light + dark,
  interactive) surfaced and got fixes for: native toast crash (example app had
  its own Provider without ToastProvider — now unified), non-functional theme
  toggle + white nav header in dark (dynamic Theme wrapper + react-navigation
  DarkTheme), generic "Component" screen titles, toast text collapsing
  (flex-in-content-sized-row), Progress "NaN%" (parameterized primitive was
  barrel-exported and rendered bare), command palette under the status bar +
  keyboard hints on touch, hover card with no tap fallback, desktop copy in
  kanban/file-upload/menus, outline-only rating stars (SVG fill token),
  segmented pill inset, missing avatar fallback color ($teal5 isn't a token).
  All verified on the simulator and re-swept on web.
