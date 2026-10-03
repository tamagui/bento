# Bento

Tamagui component examples for web, iOS, and Android. The source is available
under the [MIT license](LICENSE). Copy the components you need from
`src/components/`, including their local imports, into your app.

This repository uses the existing Tamagui v2 component APIs. The Tamagui v3
migration is on `v3-beta`; use that branch when working on the migration.

## Run the examples

```bash
bun install --frozen-lockfile
bun run dev:web
```

The web demo runs at `http://localhost:9000`. The native demo requires an Expo
development build:

```bash
bun run ios
# or
bun run android
```

After installing the development build, use `bun run start` for the native
JavaScript server.

## Use a component

Find an example in `src/components/`, then copy its local components, hooks,
and assets as well. Keep the Tamagui config, animation driver, and native
libraries that the example imports. `tamagui.config.ts` and `config/` contain
the demo configuration; `example/App.native.tsx` is the native entry point.

Components retain their MIT license when copied. Include the license notice
with redistributed source.

## Build

```bash
bun run build
bun run build:bento
bun run typecheck
```

`build` produces the package files. `build:bento` prepares source bundles and
an archive in `bento-output/`. CI checks that source bundle on pushes and pull
requests. Download the generated archive from the workflow artifacts.

The `upload:bento` script supports the existing authenticated Supabase
integration. Running the examples or copying source does not require it.

## Tamagui site integration

The Tamagui site consumes this repository through `@tamagui/bento-or-not`.
Local development can resolve the sibling Bento checkout; the existing
production integration uses GitHub Packages.
