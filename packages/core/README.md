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

## Usage

In a Next.js App Router project:

```tsx
"use client";

import { Button } from '@doxyz-ui/core';
import '@doxyz-ui/core/styles.css'; // if you are using the provided CSS
```

Components are ESM-only and tree-shakeable. Import just what you need.

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
