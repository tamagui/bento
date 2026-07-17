# Bento design quality bar

Distilled from HeroUI's styles package (`~/github/heroui/packages/styles`) into
concrete values, mapped to bento's tamagui idiom. This is the checklist every
component is audited and uplifted against. Consistency comes from these shared
token VALUES used inline in each component — no new shared helpers or
abstractions in component files (copy-paste ethos).

## 1. Motion

HeroUI's system (exact values):

- easing library as tokens; the signature "Apple feel" curve is
  `cubic-bezier(0.32, 0.72, 0, 1)` (`--ease-out-fluid`) used for drawers/sheets;
  general UI uses ease-out family (`--ease-out-quart`
  `cubic-bezier(0.165, 0.84, 0.44, 1)` for transform, plain ease-out for color).
- layered durations on ONE element: transform 250ms smooth, background-color
  100ms ease-out, box-shadow 100ms ease-out. Color always responds faster than
  movement.
- exits are FASTER than enters: overlay enter 250ms / exit 100ms (modal),
  drawer enter 250ms / exit 200ms, scrim fade 150ms in / 100ms out.
- modal enter = fade + zoom-in from 105% + 4px slide from placement edge;
  exit = fade + zoom-out to 95%. Drawer = pure translate on the axis of its
  edge, fluid curve.
- reduced-motion: every animated style pairs with a reduced-motion disable,
  declared AFTER the transition.

Bento mapping: the moti spring presets have no shared easing/duration
convention (css driver even uses `ease-in` everywhere, which reads sluggish).
Uplift rule: interactive state changes use `quickest`/`100ms`-class timing for
color, `quick` for transform; overlay enter `quick`, exit `quickest`; sheets
and drawers get the fluid-feel spring (damping ~26, stiffness ~300, mass ~1 —
tune once, reuse the same values verbatim). Anything animating checks
`prefers-reduced-motion` (useReducedMotion / `$platform-web` media).

## 2. Press + hover feedback

- press scales by size: `scale(0.97)` default, `0.98` for sm, `0.96` for lg.
  Applied on the element's own transform with the 250ms smooth transition, so
  release springs back visibly.
- hover is a one-step background shift computed from the fill
  (`color-mix(bg 96%, fg 4%)` for neutral, `90%/10%` for accent fills) — never
  a big jump. Hover styles only under `@media (hover: hover)` (tamagui
  hoverStyle already gated).
- EVERY interactive element has all three: hoverStyle, pressStyle (with
  scale), focusVisibleStyle.

Bento numbers: pressStyle `scale: 0.97` (0.98 small / 0.96 large targets),
hoverStyle one step up the palette (`$color2`→`$color3` etc), never two.

## 3. Focus / disabled / invalid

- focus ring: 2px ring in the accent/focus color with 2px offset
  (outlineWidth 2, outlineOffset 2, outlineStyle solid, outlineColor accent).
  Form fields: ring sits flush (offset 0).
- invalid fields: 1px danger border unfocused → 2px danger ring focused.
- disabled: opacity 0.5 + cursor not-allowed + pointerEvents none. One rule,
  everywhere identical.

## 4. Color derivation (state ramps)

HeroUI derives full ramps per intent: base / hover / soft (15% alpha tint) /
soft-hover (20%) / soft-foreground (70% intent + 30% fg). Dark mode softs drop
to 12%/16% alpha and foregrounds go 80% intent + 30% fg (brighter text on
dark). Bento mapping: use the theme palette steps consistently — soft chip =
`$colorX3` bg + `$colorX11` text (light) / same tokens, verify legibility dark;
solid = step 9 bg, hover step 10.

## 5. Elevation

- light mode: two shadow levels only. Surface (cards):
  `0 2px 4px rgba(0,0,0,.04), 0 1px 2px rgba(0,0,0,.06), 0 0 1px rgba(0,0,0,.06)`
  — soft, small, layered. Overlay (menus/modals/sheets):
  `0 2px 8px rgba(0,0,0,.06), 0 -6px 12px rgba(0,0,0,.03), 0 14px 28px rgba(0,0,0,.08)`.
- dark mode: shadows OFF, replaced by a 1px inset white ring
  (`0 0 1px rgba(255,255,255,.3) inset`) and a one-step-lighter overlay
  surface. Never keep light-mode drop shadows in dark.
- backdrop/scrim: black 50% light / 60% dark, optionally blurred.

Bento mapping: shadowColor `$shadowColor` + theme-specific tokens; on web can
use boxShadow strings; dark = borderColor `$color4`-ish 1px + lighter bg
instead of shadow.

## 6. Radius rhythm

One base radius (8px) with a multiplier scale: xs 2 / sm 4 / md 6 / lg 8 /
xl 12 / 2xl 16 / 3xl 24 / 4xl 32. Big surfaces use big radii: cards + modals
`min(32px, 24)`, drawer top corners `min(32px, 16)`, buttons pill-ish
(rounded-3xl on h-9/10). Fields 1.5× base (12). Nested elements step DOWN the
scale (chip inside card is smaller-radius than card). No arbitrary one-off
radii.

## 7. Sizing + spacing rhythm

- mobile-first heights that SHRINK on desktop: button h-10 mobile → h-9
  desktop (sm: h-9→8, lg: h-11→10). Touch targets ≥44pt on touch, denser with
  a pointer.
- icons in buttons: 20px mobile → 16px desktop, with optical negative margin
  (-mx-0.5).
- overlay padding: modal/drawer panels p-6 (24), header→body gap 8,
  body→footer gap 20, footer buttons gap 8, close button pinned top-4 right-4.
  Card: p-4, gap 12, title text-sm medium, description text-sm muted.
- body copy in overlays: text-sm, line-height 1.43, muted color — panels don't
  shout.

## 8. States that exist

Loading (skeleton with ONE synchronized shimmer sweep across children, or
pending spinner + pointer-events none), empty (icon + one-line explain +
primary action), error/invalid where input can fail. Component demos show
real state transitions, not static happy paths.

## 9. Dark mode is tuned, not inherited

Checked separately in every capture: legibility of soft/tinted text, shadow →
ring/lighter-surface inversion, scrim strength, border visibility on fields.

## 10. Typography discipline

Weights: medium (500) for headings/labels, regular for body — never 700+ for
UI chrome. Sizes: overlay headings text-base (16) medium; card titles text-sm
(14) medium; body/description text-sm muted. No letterSpacing hacks, no
all-caps except tiny eyebrow labels.
