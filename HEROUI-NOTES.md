# HeroUI study — quality bar + expansion checklist

(Condensed from deep study of heroui.com / heroui.pro / github.com/heroui-inc/heroui,
clone at ~/github/heroui. See PLAN.md for how this drives phases 2-3.)

## Quality bar to copy (exact patterns)

- semantic token layers; surface vs overlay elevation tokens; full state ramps
  (accent / accent-hover / -soft / -soft-hover); dark mode = token swap only
- easing scale as tokens; the iOS-feel one: cubic-bezier(0.32, 0.72, 0, 1)
- press feedback scales by size: scale(0.97) md / 0.98 sm / 0.96 lg
- layered transitions: transform 250ms smooth, color 100ms ease-out (color
  faster than movement); overlay enter 250ms zoom-in-105 fade, exit 100ms
  (exit FASTER than enter); scrim 150ms in / 100ms out
- reduced-motion handled on every animated style, after the transition rule
- focus: 2px ring w/ offset; disabled: 0.5 opacity + not-allowed; invalid:
  1px danger unfocused -> 2px ring focused
- hover styles only under @media (hover: hover)
- skeleton: one synchronized shimmer sweep across children (not per-element)
- mobile-first sizes: touch targets larger on mobile (h-10 -> md:h-9)
- RTL-safe logical properties throughout

## Expansion build list (ranked; target ~100 new components)

Tier 1 (build first):
1. AI chat kit: message list, streaming shimmer, prompt input w/ attachments +
   suggestions, code block w/ copy, markdown, tool-call/chain-of-thought, sources
2. Command palette (cmd+k; mobile = full-screen search sheet)
3. Advanced data table: sort/pin/select/sticky/pagination/skeleton/empty;
   mobile collapses rows to cards
4. Stats/KPI cards + trend chip + animated number (+ sparkline)
5. Charts: area/bar/line/pie/radial + themed tooltip
6. Empty states
7. Toast/notification system (stacked, swipe dismiss)
8. Skeleton loaders (shimmer + pulse)

Tier 2:
9. Collapsible app sidebar (rail/inset, nested groups, mobile sheet)
10. Segmented control (animated pill)
11. iOS settings cells (switch/select/slider/disclosure rows)
12. Kanban board (long-press drag on mobile)
13. Calendar/agenda view (beyond datepicker)
14. Stepper / multi-step form wizard
15. File upload / drop zone (mobile: picker sheet)
16. OTP input (bento has OneTimeCodeInput — verify vs bar, maybe promote)
17. Rating stars + reviews block
18. Carousel (snap, dots, autoplay, peek)
19. Timeline / activity feed
20. Accordion / FAQ

Tier 3:
21. Product filters / faceted search (mobile: filter sheet)
22. Checkout flow (steps + summary)
23. Quantity stepper
24. Pricing tables + comparison (monthly/yearly toggle)
25. Auth blocks (sign in/up, forgot, magic link, social)
26. Marketing: hero, feature grid, CTA, footer, logo cloud, newsletter
27. Hover card + context menu / dropdown menu
28. Progress + meter + circular progress
29. Bottom sheet as first-class primitive; resizable panes (web-first)
30. Color picker (rich text editor = stretch, web-first)

Packaging signal: premium value concentrates in composed app-scale surfaces
(command palette, data grid, kanban, charts, AI kit, shells, templates) —
atoms are table stakes. Marketing sections were the flagship paid product of
HeroUI v2 Pro; bento has zero marketing components today.
