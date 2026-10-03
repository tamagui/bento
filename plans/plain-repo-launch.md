# Bento source repository launch

Owner: r54299 / one-tamagui-launch. Candidate: `tm/launch-plain-repo-main`,
based on `origin/main` at `06163a5`. This prepares the plain repository option
in Contrast goal 5 for Nate's approval.

The repository remains private. Nate must approve the source repository
option and making `tamagui/bento` public before launch. The candidate describes
MIT source reuse, documents the current v2 baseline and separate `v3-beta`
migration, uses the package manager already used by CI, and adds a source archive
workflow without changing the existing Supabase/GitHub Packages integration.
No component, skin, price, checkout, or site page changes in this branch.

RAN: `bun run build:bento` exited 0 and produced a 243,306-byte archive.
TESTED: ZIP integrity passes; the archive contains 228 entries and 172 TSX
component sources. Every documented command exists in package.json. Runtime
components are unchanged; this receipt validates source distribution, not the
unlanded v3 gallery migration or native behavior.

RAN: a separate fresh install of the existing `v3-beta` migration with current
Tamagui beta `3.0.0-beta.1564.1` succeeded but typecheck returned 1,336 lines of
errors, including old color keys, numeric control sizes and transition arrays.
The static config probe also failed on the older Worklets mock entry. Those
results are in `/tmp/bento-launch-types.log` and `/tmp/bento-launch-grammar.log`
on pro-64. That migration is preserved on its existing remote branches and is
not included in this candidate. The goal's source repository option does not
require a v3 gallery redesign.
