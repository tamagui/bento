# @tamagui/bento

Premium Tamagui components library - now a standalone repo!

## Quick Start

```bash
# Install dependencies
yarn install

# Development
yarn dev           # Web dev server (webpack)
yarn start         # Native dev server (Expo)
yarn android       # Run on Android
yarn ios           # Run on iOS
```

## Development

### Web
```bash
yarn dev           # Start webpack dev server (localhost:9000)
yarn dev:web:prod  # Production mode
```

The web gallery is URL-driven:

- `http://localhost:9000/` — index of every group with counts
- `?group=tables` — all items in a group
- `?group=tables&item=BasicTable` — a single item (used for screenshots)
- `&theme=dark` / `&theme=light` — force a theme
- `&centered=false` — top-aligned frame for tall components

### Visual audit sweep

```bash
node scripts/audit-sweep.mjs            # all groups × light/dark × 360/1280
node scripts/audit-sweep.mjs tables toasts   # only specific groups
```

Writes screenshots to `audit/screenshots/` and a `sweep-report.json` with
console errors and horizontal-overflow measurements per capture. A group is
"clean" when it has zero console errors and zero overflow at both widths in
both themes.

### Native (iOS/Android)
The bento repo includes a standalone native app showcasing components:

```bash
yarn start         # Start Expo dev client
yarn android       # Build & run on Android
yarn ios           # Build & run on iOS (runs pod install first)
```

**First time setup:**
```bash
# iOS
yarn pod           # Install CocoaPods dependencies
yarn ios          # Opens in iOS Simulator

# Android (requires Android Studio & emulator)
yarn android      # Opens in Android emulator
```

The native app (`example/App.native.tsx`) displays bento components in isolation.

### Build & Deploy
```bash
yarn build              # Build package for distribution
yarn build:bento        # Build component bundle for Supabase
yarn upload:bento       # Upload to Supabase storage
```

## Usage in tamagui monorepo

Bento is automatically available via `@tamagui/bento-or-not`:
- **Local dev with ~/bento**: Auto-detected via relative path
- **CI/Production**: Installed from GitHub Packages
- **Without bento**: Graceful stubs (components won't render)

### Import tamagui from `tamagui`, not from `@tamagui/*`

tamagui.dev bundles this repo's `src/` directly (aliased, not the built
package), so bento's bare imports resolve against **bento's own
`node_modules`** first. The site's vite config only dedupes `tamagui`,
`@tamagui/core`, `@tamagui/web` and the packages in its `include` list
(`@tamagui/get-token`, `@tamagui/get-font-sized`, `@tamagui/linear-gradient`,
`@tamagui/roving-focus`, `@tamagui/focus-scope`).

Any *other* bare `@tamagui/*` import silently pulls a second, stale copy of
that package into the bundle, compiled against the deduped core. It fails at
runtime, not at build time — e.g. importing `@tamagui/switch-headless` dragged
in an old `@tamagui/label` whose module body called the removed
`.styleable()`, crashing the whole site build.

So: import from `tamagui` whenever the umbrella re-exports what you need, and
only reach for a bare `@tamagui/*` package if it is in the deduped list above.

### v3 ships several primitives unstyled

`tamagui` v3's styled skin set covers Button, Select, Sheet, Accordion,
Dialog, Slider, ToggleGroup, Input/TextArea, ListItem, Toast, Card, Progress,
Label, Separator and Surface. **Switch, Checkbox, RadioGroup, Tabs, Avatar and
Group are behavior-only**. Their roots retain behavior and structural layout,
but no longer provide the v2 visual defaults. Code can compile while required
chrome is missing. Bento carries its own skins for these; use those rather than
the bare primitive:

- `components/BentoSkins` -> `Avatar`, `Tabs`, `Group`, `XGroup`, `YGroup`
- `forms/switches/common/switchParts` -> `Switch`
- `forms/checkboxes/common/checkboxParts` -> `CheckboxSkin`, `Checkboxes`
- `forms/radiogroups/components/radioParts` -> `RadioGroup`

Two traps when writing such a skin:

- **Do not `styled()` a primitive that owns a styled context** (Switch,
  Checkbox). A `styled()` layer reads that context and re-emits its values as
  props, which re-provides the empty outer context over the real one. The
  control still toggles, but its thumb/indicator never gets `active` or `size`.
  Use a plain wrapper component that spreads style props instead.
- **`withStaticProperties` mutates its argument in place.** Wrapping an
  imported component overwrites the real one for every consumer, and a wrapper
  that renders `Imported.Item` then recurses into itself. Capture the base
  parts in `const`s first and wrap a local function.

Several v2 values have no exact v6 token equivalent. Bento deliberately keeps
raw values where changing them would alter the layout: 21px in
`WritePreviewAction`, 18px/36px in `ScrollProgress`, 204px in `SortableTable`,
and 1.5px in `PaginationControl`. Revisit these after beta if the designs can be
retuned to the v6 scale.

## GitHub Actions

On every push to `main`:
1. Builds component bundle
2. Uploads to Supabase
3. Publishes package to GitHub Packages

## Project Structure

```
/src
  /components     - Bento component library
  /sections       - Component section groupings
  /hoc            - Higher-order components
  data.ts         - Component metadata
  index.ts        - Package exports

/example          - Standalone demo app
  App.native.tsx  - Native app entry
  App.tsx         - Web app entry
  registry.ts     - Shared group registry (web gallery + native navigator)
  Gallery.tsx     - Web gallery browser
  /features       - Native navigator screens
```

### Adding a component group

1. Create `src/components/<area>/<group>/YourComponent.tsx` exporting a
   capitalized component with a `fileName` static.
2. Register the group in `example/registry.ts` in BOTH `componentMap` and
   the `sections` array (the sections array drives the native home screen).
3. Verify: `node scripts/audit-sweep.mjs <group>` must pass clean in both
   themes at 360 and 1280.
