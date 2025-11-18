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
yarn dev           # Start webpack dev server (localhost:8080)
yarn dev:web:prod  # Production mode
```

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
  /components     - Demo app components
```
