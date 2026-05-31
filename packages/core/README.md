# Eventz Design System

Reusable UI primitives and components for Eventz projects, built with [React](https://react.dev/), [Radix UI](https://www.radix-ui.com/), and [Tailwind CSS](https://tailwindcss.com/).

---

## Installation

```bash
npm install @eventz-ui/core
# or
yarn add @eventz-ui/core
# or
pnpm add @eventz-ui/core
```

---

## Peer dependencies

This package expects the following to already be installed in your application:

- `react` (>=18)
- `react-dom` (>=18)
- `radix-ui` (>=1.0.0)
- `embla-carousel` (>=8.6.0)
- `embla-carousel-autoplay` (>=8.6.0)
- `rsuite` (>=5.83.3)

They are marked as **peerDependencies** to avoid duplicate React or Radix versions in consuming apps.

---

## Usage examples

```ts
// RSC-safe (layouts/pages, SSR-only)
import { Heading, TextLink } from '@eventz-ui/core/server-components';
// Client islands (hooks/Radix/portals)
import { Button, Dialog, Accordion } from '@eventz-ui/core/client-components';
// Icons & utilities
import { PlayIcon } from '@eventz-ui/core/icons';
import { collapseWhitespace, composeClasses } from '@eventz-ui/core/utilities';
```

> Do not import from `@eventz-ui/core` (root); use explicit subpaths.

---

## Using with Next.js

- **React & ReactDOM**: ensure you are using a compatible version (React 18+).
- **Radix UI**: install `radix-ui` in your app; our components build on Radix primitives.
- **ESM only**: the library publishes only ES modules. Next.js (14+) supports this by default.
- **Optional transpilation**: If your Next.js app requires transpilation of node_modules, add the package to your config:
  ```js
  // next.config.mjs
  export default {
    transpilePackages: ['@eventz-ui/core']
  };
  ```
  Most projects won’t need this if targeting Node 20 + modern Next.js.

---

## Development

Run locally with Storybook:

```bash
npm run storybook
```

Build the library:

```bash
npm run build
```

Run tests:

```bash
npm test
```

---

## License

MIT © Eventz
