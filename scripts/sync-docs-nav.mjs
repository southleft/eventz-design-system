#!/usr/bin/env node
/**
 * Sync the Mintlify nav in docs/docs.json with the files in docs/components/,
 * grouped by atomic-design level (read from each doc's `level:` frontmatter).
 *
 * Groups render in hierarchy order: Atoms → Molecules → Organisms → Templates → Pages.
 * Docs without a `level` fall back to a "Components" group. Pages are alphabetised
 * within each group. Non-component groups (e.g. "Get Started") are preserved.
 *
 * Runs as the first step of `pnpm docs:release`; also available as `pnpm docs:nav`.
 */
import { readFileSync, writeFileSync, readdirSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const docsJsonPath = resolve(root, 'docs/docs.json');
const componentsDir = resolve(root, 'docs/components');

// atomic-design level → nav group title, in hierarchy order
const LEVEL_GROUPS = [
  ['atom', 'Atoms'],
  ['molecule', 'Molecules'],
  ['organism', 'Organisms'],
  ['template', 'Templates'],
  ['page', 'Pages'],
];
const FALLBACK_GROUP = 'Components';

function levelOf(file) {
  const txt = readFileSync(resolve(componentsDir, file), 'utf8');
  const fm = txt.match(/^---\n([\s\S]*?)\n---/);
  const m = fm && fm[1].match(/^level:\s*([\w-]+)/m);
  return m ? m[1].toLowerCase() : '__fallback__';
}

const byLevel = {};
for (const f of readdirSync(componentsDir).filter((f) => f.endsWith('.md'))) {
  const page = `components/${f.replace(/\.md$/, '')}`;
  (byLevel[levelOf(f)] ||= []).push(page);
}
for (const k of Object.keys(byLevel)) byLevel[k].sort();

const componentGroups = [];
for (const [lvl, title] of LEVEL_GROUPS) {
  if (byLevel[lvl]?.length) componentGroups.push({ group: title, pages: byLevel[lvl] });
}
if (byLevel.__fallback__?.length) {
  componentGroups.push({ group: FALLBACK_GROUP, pages: byLevel.__fallback__ });
}

const docs = JSON.parse(readFileSync(docsJsonPath, 'utf8'));
const groups = docs.navigation?.groups ?? [];
const componentTitles = new Set([FALLBACK_GROUP, ...LEVEL_GROUPS.map(([, t]) => t)]);
const preserved = groups.filter((g) => !componentTitles.has(g.group));
const next = [...preserved, ...componentGroups];

const before = JSON.stringify(groups);
docs.navigation.groups = next;
if (JSON.stringify(next) === before) {
  console.log('✓ docs.json nav already in sync.');
  process.exit(0);
}
writeFileSync(docsJsonPath, JSON.stringify(docs, null, 2) + '\n');
console.log(`✓ docs.json nav grouped by atomic level → ${componentGroups.map((g) => `${g.group} (${g.pages.length})`).join(', ')}`);
