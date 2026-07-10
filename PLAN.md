# Bento v2 — quality overhaul + 2x expansion

## Goal (hard, do not stop until met)

1. Every existing component (99 renderable demos, 23 groups) audited and improved:
   renders correctly in light AND dark, responsive at 360px and 1280px, accessible
   (real roles/labels/focus order/keyboard), smooth performance, verified on real
   web (webpack dev server, port 9000) and the iOS simulator.
2. Catalog doubled: 99 → 200+ components, new ones informed by the HeroUI Pro
   gap analysis (see HEROUI-NOTES.md when it lands), built to the elevated bar.
3. Everything browsable in the example gallery (web `/?group=X&item=Y&theme=dark`,
   native navigator), committed to the `v2` branch in coherent commits.

## Quality bar (applies to every component, old and new)

- theme tokens only — no hardcoded hex/rgb outside intentional brand colors;
  verify visually in BOTH themes
- responsive: no fixed widths that overflow 360px; use maxW + width 100% patterns;
  $sm/$md media adjustments where layout should change
- a11y: correct roles (button/checkbox/switch...), aria-labels on icon-only
  controls, focusVisible styles, disabled states, labels tied to inputs
- interactions: hover + press + focus states on everything interactive;
  animations use the repo's transition presets, respect reduced motion
- states: where meaningful, show loading/empty/error variants
- code: self-contained demo (own mock data), no dead code, typed props,
  matches existing file/naming conventions (Group/ComponentName.tsx + index)

## Workstreams

- COORDINATOR (Claude, this session): gallery infra, audit sweep + issue catalog,
  hardest visual work, iOS verification, reviews every commit, merges.
- WORKER-FAST (codex sol/medium, slug bento-fast): mechanical sweeps + bulk
  fixes from the issue catalog; later, simpler new components.
- WORKER-DEEP (codex sol/high, slug bento-deep): complex components
  (datepickers, tables, walkthrough, payment flows); later, flagship new
  components.
- REVIEWER (opus xhigh, spawned per-batch): adversarial review of each batch.

Ownership is by GROUP directory — never edit a group assigned to someone else.
Commit style: `fix(chips): ...` / `feat(stats): ...`, explicit file pathspec,
one group per commit. The repo is shared: never `git add .`, never stash,
never touch files outside your assigned groups + your registry entries.

## Phases

0. infra (done): gallery, theme forcing, dev setup fixes
1. audit: screenshot sweep all groups × {light,dark} × {360,1280}; catalog
   issues in AUDIT.md with per-group checklists
2. improve: fix all catalogued issues, group by group
3. expand: new groups/components per gap analysis, same bar
4. verify: full re-sweep, iOS simulator runthrough, perf pass (no jank on
   lists/animations), final review

## Dev notes

- web: `yarn dev` → http://localhost:9000 (webpack). HMR works; config changes
  need restart. `?group=chips&item=Chips&theme=dark&centered` for isolation.
- native: `yarn start` (expo dev client) — coordinator handles simulator.
- typecheck: `yarn typecheck`; lint: `yarn lint:fix` (biome).
- deps are `latest` tamagui v2 from npm (this repo does NOT use the v3-beta
  monorepo; write against current stable tamagui API).
