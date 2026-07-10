# tamagui v2 (npm latest) bugs found while building bento

Accumulating repros for upstream fixes. Fixed ones move to the bottom.

## open

1. animated driver resolves theme tokens from the wrong scheme
   - repro: a styled View with `transition="200ms"` + `bg="$color1"` inside a
     dark-theme page renders with LIGHT theme values (white card), and its
     children's `$color12` text becomes invisible. Removing `transition` fixes it.
   - seen in: marketing/sections/FeatureGrid card (git history of this file);
     suspect the moti/animated web driver resolves tokens against the root
     scheme instead of the nearest Theme.
2. animated components leak `nativeID` to DOM (console warning) — appears on
   any animated Image/View via the moti web driver.

## fixed upstream (PRs open)

- animated custom component clobbered by render-as-string (PR tamagui#4119)
- size={undefined} overrides styled-context and crashes variant token lookup
  (PR tamagui#4119)
- slider invisible track/fill on $background surfaces (PR tamagui#4107, v3 landed)
