# Bento design-quality audit (phase 1)

Method: 10 parallel reviewers graded all 57 groups against `QUALITY-BAR.md`
(concrete values extracted from HeroUI's styles package), each reading the
group's source plus the fresh sweep screenshots (light/dark × 360/1280).
Grades are DESIGN craft only — the functional/a11y overhaul in `AUDIT.md`
already passed; this is the layer above it. A = HeroUI-level polish.

## Systemic defects (every group inherits some of these)

Fix these as conventions applied per component (copy-paste ethos — same
values inline everywhere, no shared helpers):

1. **Typography abuse** — the single most widespread defect. `fontWeight`
   700/800/900 on UI chrome in ~30 groups (pricing 900 prices, notifications
   900 heading, checkout 900 everywhere, onboarding, social-proof, calendar,
   kanban…), paired with washed-out `300`/`200` body text (textareas,
   preferences) and negative `letterSpacing` hacks. Bar: 500 medium for
   headings/labels, 600 ceiling, regular body.
2. **Flat everything** — nearly all cards/panels are `borderWidth 1` +
   `$borderColor` with zero elevation; where shadows exist they're wrong
   (layouts FormCard heavy 0.5-opacity drop, Calendar gray `$color10` blob,
   ButtonPulse `elevation 15`) and none invert for dark (HeroUI: light =
   soft layered shadow, dark = shadows OFF + 1px inset ring + lighter
   surface).
3. **Overlay surfaces untuned** (the owner's callout, confirmed everywhere):
   shells `Drawer` frame has no elevation, fixed `rgba(0,0,0,.5)` scrim in
   both themes, symmetric enter/exit spring; dialogs have NO light-mode
   elevation at all; FilterSheet / datepicker sheet / CellSelect /
   GeneralSelect / payment Fullpage sheets are bare `Sheet.Frame`s with
   default handles, no fluid curve, no faster exit.
4. **Missing press/hover/focus trio** — only 25 of 312 files have any
   `pressStyle`; 17 have `focusVisibleStyle`. Whole interactive classes are
   inert: chips, carousel arrows, datepicker day cells, preferences radio
   cards, product-list cards, stepper buttons, pricing CTAs.
5. **Motion gaps** — instant state snaps where animation is the point
   (progress bars/rings animate NOTHING; steppers, notifications, ratings
   fills, month changes all snap); symmetric enter/exit everywhere (bar:
   exit faster); plain `ease` inline strings; `prefers-reduced-motion`
   handled in only a handful of groups (skeletons, kanban, command,
   segmented, carousels) and absent in the animation-demo groups themselves.
6. **Radius one-offs** — hardcoded `5, 10, 15, 20, 30, 1000, 1000_000,
   1000_000_000` sprinkled across navbars, payment, preferences, chips
   (`borderRadius: 5`), product-list, kanban.
7. **Hardcoded colors** — `#fff`, `#FFFF00`, `"red"`, `"green"`, `"gray"`,
   `$blue3/9/11` selection in calendar, `#fff`/`black` in walkthrough.
8. **Latent bugs found during audit** — base `SwitchFrame` off-track
   defaults to `$red10` (switchParts.tsx:88); `Meeting.tsx:73` gradient
   token typo `'color3'`; `Calendar.tsx:155` `'transprent'`;
   `ButtonLoading.tsx:43` missing effect deps; `ButtonPulse.tsx:55`
   `Math.random()` sort each render; product-list strikethrough price ==
   live price; productpage hardcoded $599 disagrees with product data;
   onboarding FeatureTour draws the raw browser focus ring in every capture;
   navbars TopNavBarWithLogo ships a broken logo image.

## Per-group grades (worst first)

| Group | Grade | Headline defects |
|---|---|---|
| walkthrough | F | WIP scaffolding: bare Squares, `#fff`/`black` hardcodes, undesigned popover; near-duplicate files |
| product-list | F | wireframe cards (no radius/shadow/feedback), broken images, strikethrough price == price, `rounded={1e9}`, `bg="gray"` |
| payment | D | −10° marquee bleeds off-screen, incoherent money math, radii 5/15/10, bare sheet, no reduced-motion on marquee |
| pickers | D | dashed-box wireframes, no drop-surface feedback, redundant with far better file-upload |
| dialogs | D+ | zero light-mode elevation, hardcoded scrim both themes, symmetric quick enter/exit, letterSpacing hacks, unstyled action buttons |
| textareas | D+ | 300-weight everywhere, broken-looking tab strip, focus ring suppressed, radius mix $4/0/$10 |
| radiogroups | C- | flat shared card, bare H2 headings, static dot, 700-vs-300 whiplash |
| checkboxes | C | same flat card parts, no check-in animation, H2 titles, untuned dark |
| shells (Drawer) | C | shared drawer frame: no elevation, fixed scrim, enter==exit, no reduced-motion |
| navbars | C | broken logo, `#FFFF00` chips, links locked at 0.7 opacity, fake shadow, radius one-offs |
| onboarding | C | raw browser focus ring in every capture, 800/900 weights, stepless jumps, competing accents |
| microinteractions | C | zero reduced-motion in motion-heavy group, illegible silkscreen number at 360 |
| animation-buttons | C | elevation 15 (vanishes dark), press GROWS 1.2×, random reshuffle per render |
| datepickers | C | gray shadow kept in dark, dead day cells, bare sheet (opacity .8 scrim, no handle), 'transprent' typo |
| productpage | C | CTA truncates to "A.." at 360, gibberish falso reviews, price sources disagree |
| layouts | C+ | heavy un-inverted FormCard shadow, three identical accent CTAs, rounded 30/20 |
| chips | C+ | borderRadius:5, zero press feedback, white-on-pastel contrast failure, red X on every chip |
| list | C+ | Chat reads broken at 1280, literal red/green colors, bold sprawl |
| preferences | C+ | inert radio cards, token typo, bare sheet, 300/200 weights, no-op shadow |
| checkout | C+ | 900 headings throughout, flat cards, focus-ring-less inputs |
| pricing | C+ | 900 prices + letterSpacing hacks, featured tier doesn't lift, inert CTA |
| social-proof | C+ | 900/800 pervasive, static flat cards, pseudo-masonry minH hack |
| progress | C+ | nothing animates (bars jump, ring static), raw traffic-light 9s, yellow-on-white label |
| notifications | B- | 900 heading, zero motion, $color8 timestamps, flat rows |
| segmented-controls | B- | dark selected pill nearly vanishes, 600 both states, no hover/press |
| ratings | B- | no hover preview, instant fill jumps, raw $yellow9 bars |
| tabbars | B- | $color7 inactive labels, theme not expressed in indicator, plain ease |
| carousels | B- | dead nav arrows, flat cards |
| toasts | B- | symmetric 200ms, dark keeps drop shadow, no reduced-motion |
| filters | B- | FilterSheet frame bare (default handle/spring, no elevation), 900 headings |
| quantity | B- | flat cards, 800/900 chrome, sharp inert steppers |
| slide | B- | shadow kept in dark, no reduced-motion in animation demo |
| profile | B- | glitchy pixel-font count, 900 + pixel fonts as chrome |
| search | B- | dead result rows, 900 highlight, dark popover invisible |
| inputs | B- | zero motion on state changes, dead add-on buttons |
| switches | B- | red off-track default (latent bug), inconsistent thumb timing |
| steppers | B- | 700/800 labels, zero motion, invisible dark connectors |
| accordions | B- | no press, pops instead of tween, edgeless dark borders |
| marketing-sections | B- | 700/800 headings, no press on cards, flat |
| banners | B | dismiss = unmount (no exit), inconsistent action states |
| timeline | B | 700 titles, instant advance, undifferentiated dots |
| menus | B | shadows not dark-inverted, symmetric motion, 700 weights |
| calendar | B | 700-800 sprawl, hardcoded $blue selection, month snaps |
| stats | B+ | flat cards, static sparkline, no loading variant |
| empty-states | B+ | flat, heavy headings, instant swaps |
| file-upload | B+ | 700 headings, weak dark separation, near-black progress fill |
| data-grid | B+ | hover == selected color collision, 700 chrome |
| kanban | B+ | loud step-11 chip borders, 700 titles (motion is best-in-catalog) |
| animation-avatars | B+ | no reduced-motion, plain ease (else premium) |
| buttons | B+ | inline-only disabled, dup variant, default press only |
| color-picker | B+ | 700/800 labels, flat cards |
| avatars | A- | baked elevation kept in dark |
| tables | A- | 700 mobile card names |
| settings-cells | A- | bare CellSelect sheet, 600 titles, label wrap at 360 |
| ai-chat | A- | no message enter animation |
| command | A- | symmetric exits, elevate kept in dark |
| skeletons | A- | web/native motion language differs (reference group otherwise) |

Reference groups to copy patterns from: **skeletons** (reduced-motion rigor,
synchronized shimmer clock), **command** (scrim + narrow adaptation + row
states), **ai-chat** (state machines, restrained type), **kanban** (layered
fluid-curve motion), **data-grid** (loading/empty coverage).

## Prioritized uplift plan (phase 2)

Order optimizes visible-quality-per-effort: overlay system first (owner's
callout + shared frames multiply), then the F/D groups, then convention
sweeps that lift 30 groups at once.

- **Wave 1 — overlay/sheet system.** shells `Drawer`, dialogs (all 4),
  filters `FilterSheet`, datepickers sheet+popover, settings `CellSelect`,
  preferences `GeneralSelect`, payment `Fullpage` sheet/dialog, toasts,
  menus. One consistent recipe applied inline in each: overlay elevation
  (layered shadow light / inset ring + lighter surface dark), theme-tuned
  scrim (50% light / 60% dark), styled handle, fluid-curve enter with
  faster exit, reduced-motion, panel padding/radius rhythm (p-6,
  radius $8-ish top corners), 500-weight headings.
- **Wave 2 — rebuild the F/Ds.** walkthrough (redesign to the bar or a
  designed spotlight-tour), product-list (real cards: radius, elevation,
  hover lift, press, price fix, image fallback), payment (kill the broken
  marquee, coherent money, tokened radii), pickers (uplift to file-upload's
  visual language), textareas, navbars (fix logo, tokens, active states).
- **Wave 3 — selection + form cards.** checkboxes/radiogroups shared parts
  (one elevated card recipe, animated check/dot, medium headings), layouts
  FormCard shadow + CTA hierarchy, inputs motion (100ms color transitions,
  add-on button states), chips (press, contrast, radius token).
- **Wave 4 — motion where it's the product.** progress (animated fills +
  ring), ratings (hover preview + fill tween), notifications (enter/exit +
  read transition), steppers/onboarding (step transitions, kill browser
  focus ring), microinteractions + animation-buttons (reduced-motion,
  press-down convention, deterministic layout), banners exit animation.
- **Wave 5 — catalog-wide convention sweeps** (mechanical, per group,
  verified by re-sweep): weight 900/800/700→500-600 + drop letterSpacing
  hacks; radius one-offs → tokens; hardcoded colors → tokens; press/hover/
  focusVisible trio on remaining interactive elements; dark shadow →
  ring inversion. Fix the latent bugs from systemic-defects #8 as touched.

Every uplifted group: before/after screenshots light+dark via the gallery,
`node scripts/audit-sweep.mjs <group>` clean, granular `fix(<group>):`
commits on `bento-quality`.
