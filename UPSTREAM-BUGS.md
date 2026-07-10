# tamagui v2 (npm latest) bugs found while building bento

Accumulating repros for upstream fixes. Fixed ones move to the bottom.

## open

1. RESOLVED AS BENTO BUG (not upstream): animated driver resolves theme tokens from the wrong scheme
   - repro: a styled View with `transition="200ms"` + `bg="$color1"` inside a
     dark-theme page renders with LIGHT theme values (white card), and its
     children's `$color12` text becomes invisible. Removing `transition` fixes it.
   - seen in: marketing/sections/FeatureGrid card (git history of this file);
     suspect the moti/animated web driver resolves tokens against the root
     scheme instead of the nearest Theme.
2. animated components leak `nativeID` to DOM (console warning) — appears on
   any animated Image/View via the moti web driver.
3. RESOLVED AS BENTO BUG (not upstream): portaled content hard-wrapped in t_light: Popover.Content / Toast portals
   mount under `SPAN.t_light` at body level regardless of the active scheme
   (html has t_dark), so every portal renders light-in-dark. DOM evidence:
   #floating-0 > ... > SPAN.t_sub_theme.t_light.is_Theme > SPAN.t_light > BODY.
   workaround in bento: re-assert theme via useThemeName() + theme prop on
   portaled content (see elements/menus).

## fixed upstream (PRs open)

- animated custom component clobbered by render-as-string (PR tamagui#4119)
- size={undefined} overrides styled-context and crashes variant token lookup
  (PR tamagui#4119)
- slider invisible track/fill on $background surfaces (PR tamagui#4107, v3 landed)

## resolved locally (were bento bugs)

- items 1 and 3 above shared one root cause: bento's Provider rendered
  `<TamaguiProvider config {...rest} defaultTheme="light">` — the hardcoded
  defaultTheme AFTER the spread overrode every caller, so the JS theme context
  was permanently light while only the html class went dark. Anything resolving
  theme at runtime (animated views, portaled popovers/toasts/dialogs) rendered
  light-in-dark. Fixed by moving defaultTheme before the spread (Provider.tsx).
  Only the nativeID DOM leak remains a real upstream issue.
