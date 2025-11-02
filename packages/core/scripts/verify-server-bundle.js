#!/usr/bin/env node
import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';

const bundlePath = resolve('dist/server-components.mjs');

let contents;
try {
  contents = readFileSync(bundlePath, 'utf8');
} catch (error) {
  console.error(`Error: server bundle missing at ${bundlePath}`);
  process.exit(1);
}

if (contents.includes('use client')) {
  console.error("Error: server bundle must not contain the 'use client' directive.");
  process.exit(1);
}

const disallowedHookPattern = /\buse(?:Ref|Effect|State|LayoutEffect)\b/;
if (disallowedHookPattern.test(contents)) {
  console.error('Error: server bundle must not reference client hooks (useRef/useEffect/useState/useLayoutEffect).');
  process.exit(1);
}

const disallowedRadixPattern = /from\s+["']radix-ui["']/;
if (disallowedRadixPattern.test(contents)) {
  console.error('Error: server bundle must not import radix-ui primitives directly.');
  process.exit(1);
}

console.log('Server bundle verification passed.');
