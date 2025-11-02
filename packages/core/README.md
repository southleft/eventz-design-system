# DoXYZ Design System

Reusable UI primitives and components for DoXYZ projects, built with [React](https://react.dev/), [Radix UI](https://www.radix-ui.com/), and [Tailwind CSS](https://tailwindcss.com/).

---

## Installation

```bash
npm install @doxyz-ui/core
# or
yarn add @doxyz-ui/core
# or
pnpm add @doxyz-ui/core
```

---

## Peer dependencies

This package expects the following to already be installed in your application:

- `react` (>=18)
- `react-dom` (>=18)
- `radix-ui` (>=1.0.0)

They are marked as **peerDependencies** to avoid duplicate React or Radix versions in consuming apps.

---

## Usage examples

```ts
// RSC-safe (layouts/pages, SSR-only)
import { Heading, TextLink } from '@doxyz-ui/core/server-components';
// Client islands (hooks/Radix/portals)
import { Button, Dialog, Accordion } from '@doxyz-ui/core/client-components';
// Icons & utilities
import { PlayIcon } from '@doxyz-ui/core/icons';
import { cx } from '@doxyz-ui/core/utilities';
```

> Do not import from `@doxyz-ui/core` (root); use explicit subpaths.

---

## Using with Next.js

- **React & ReactDOM**: ensure you are using a compatible version (React 18+).
- **Radix UI**: install `radix-ui` in your app; our components build on Radix primitives.
- **ESM only**: the library publishes only ES modules. Next.js (14+) supports this by default.
- **Optional transpilation**: If your Next.js app requires transpilation of node_modules, add the package to your config:
  ```js
  // next.config.mjs
  export default {
    transpilePackages: ['@doxyz-ui/core']
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

MIT © DoXYZ
