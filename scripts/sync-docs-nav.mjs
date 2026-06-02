#!/usr/bin/env node
/**
 * Sync the Mintlify "Components" nav in docs/docs.json with the files in
 * docs/components/. New component docs are appended (alphabetically); existing
 * curated order is preserved; pages whose files were removed are dropped.
 *
 * Runs automatically as the first step of `pnpm docs:release`, so a newly
 * generated component doc shows up in the site sidebar without manual edits.
 * Can also be run on its own: `pnpm docs:nav`.
 */
import { readFileSync, writeFileSync, readdirSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const docsJsonPath = resolve(root, 'docs/docs.json');
const componentsDir = resolve(root, 'docs/components');

const docs = JSON.parse(readFileSync(docsJsonPath, 'utf8'));

const files = readdirSync(componentsDir)
  .filter((f) => f.endsWith('.md'))
  .map((f) => `components/${f.replace(/\.md$/, '')}`);

const group = (docs.navigation?.groups ?? []).find((g) => g.group === 'Components');
if (!group) {
  console.error('✗ No "Components" group found in docs/docs.json navigation.');
  process.exit(1);
}

const existing = group.pages ?? [];
const kept = existing.filter((p) => files.includes(p)); // preserve curated order, drop removed
const added = files.filter((p) => !existing.includes(p)).sort(); // new docs, alphabetical
const next = [...kept, ...added];

if (JSON.stringify(next) === JSON.stringify(existing)) {
  console.log(`✓ docs.json nav already in sync (${next.length} component pages).`);
  process.exit(0);
}

group.pages = next;
writeFileSync(docsJsonPath, JSON.stringify(docs, null, 2) + '\n');
const removed = existing.filter((p) => !files.includes(p));
console.log(
  `✓ docs.json nav updated → ${next.length} component pages` +
    (added.length ? ` | added: ${added.join(', ')}` : '') +
    (removed.length ? ` | removed: ${removed.join(', ')}` : '')
);
