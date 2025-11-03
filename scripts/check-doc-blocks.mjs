#!/usr/bin/env node
import { readFileSync, existsSync } from 'node:fs';
import { execSync } from 'node:child_process';
import { relative, sep, posix } from 'node:path';

const repoRoot = process.cwd();
const arg = flag => process.argv.includes(flag);

// Modes
const changedOnly = arg('--changed-only');
const requireHeader = arg('--require-header'); // Phase 2+: require header on selected files

// Helpers
const toPosix = p => posix.normalize(p.split(sep).join('/'));
const rel = p => toPosix(relative(repoRoot, p));

// Target classification
const isStory = f => /\.stories\.tsx$/.test(f);
const isTest = f => /\.(test|spec)\.tsx$/.test(f);
const isIndex = f => /\/index\.tsx?$/.test(f);
const isDocsMdx = f => /\.docs\.mdx$/.test(f);

const inComponents = f => f.startsWith('packages/core/src/components/');
const inIcons = f => f.startsWith('packages/core/src/icons/');

const isClientRuntime = f =>
  f.startsWith('packages/core/src/components/client/') &&
  f.endsWith('.tsx') &&
  !isIndex(f) &&
  !isStory(f) &&
  !isTest(f);

const isServerRuntime = f =>
  f.startsWith('packages/core/src/components/server/') &&
  f.endsWith('.tsx') &&
  !isIndex(f) &&
  !isStory(f) &&
  !isTest(f);

const isIconRuntime = f =>
  f.startsWith('packages/core/src/icons/') &&
  f.endsWith('.tsx') &&
  !isIndex(f) &&
  !isStory(f) &&
  !isTest(f);

const isTarget = f =>
  (isClientRuntime(f) ||
    isServerRuntime(f) ||
    isIconRuntime(f) ||
    ((isStory(f) || isTest(f)) && (inComponents(f) || inIcons(f)))) &&
  !isDocsMdx(f) &&
  !/\/(__tests__|__mocks__|__stories__|__fixtures__)\/.*/.test(f);

// File list
const listFiles = () => {
  if (changedOnly) {
    const baseRef = process.env.GITHUB_BASE_REF ? `origin/${process.env.GITHUB_BASE_REF}` : 'origin/main';
    let baseCommit = '';
    try {
      // Prefer the true common ancestor with the base branch
      baseCommit = execSync(`git merge-base HEAD ${baseRef}`, { stdio: ['ignore', 'pipe', 'ignore'] }).toString().trim();
    } catch {
      try {
        // Fallback to the base ref itself if merge-base is unavailable
        baseCommit = execSync(`git rev-parse ${baseRef}`, { stdio: ['ignore', 'pipe', 'ignore'] }).toString().trim();
      } catch {
        // Last resort: previous commit on this branch
        baseCommit = execSync(`git rev-parse HEAD~1`, { stdio: ['ignore', 'pipe', 'ignore'] }).toString().trim();
      }
    }
    const out = execSync(`git diff --diff-filter=d --name-only ${baseCommit}...HEAD`, { stdio: ['ignore', 'pipe', 'ignore'] }).toString();
    return out.split('\n').filter(Boolean).filter(isTarget);
  }
  const out = execSync(`git ls-files`, { stdio: ['ignore', 'pipe', 'ignore'] }).toString();
  return out.split('\n').filter(Boolean).filter(isTarget);
};

// Find the first top-of-file path header (only the path line), within first 40 lines
function findFirstPathHeaderLine(lines) {
  for (let i = 0; i < Math.min(40, lines.length); i++) {
    const line = lines[i] || '';
    if (/^\s*\/\/\s+packages\/.+/.test(line)) return i;
  }
  return -1;
}

function checkFile(f) {
  if (!existsSync(f)) return []; // ignore missing (deleted/renamed in diff)
  let src = readFileSync(f, 'utf8');

  // Strip BOM from very first char if present
  if (src.charCodeAt(0) === 0xfeff) src = src.slice(1);

  const lines = src.split(/\r?\n/);
  const headerIdx = findFirstPathHeaderLine(lines);
  const hasHeader = headerIdx >= 0;

  const issues = [];
  const expectedPath = `// ${toPosix(f)}`;

  if (hasHeader) {
    const foundPath = (lines[headerIdx] || '').trim();
    if (foundPath !== expectedPath) {
      issues.push({ msg: 'Path line wrong', found: foundPath, expected: expectedPath });
    }
  } else if (requireHeader) {
    issues.push({ msg: 'Missing path header' });
  }

  return issues;
}

// Run
const files = listFiles();
const problemsByFile = new Map();

for (const f of files) {
  const issues = checkFile(f);
  if (issues.length) problemsByFile.set(f, issues);
}

// Output
if (problemsByFile.size) {
  console.error('Doc-block issues:\n');
  for (const [file, issues] of problemsByFile.entries()) {
    console.error(`- ${file}`);
    for (const p of issues) {
      const extra = p.expected ? ` (found: "${p.found}" expected: "${p.expected}")` : '';
      console.error(`  • ${p.msg}${extra}`);
    }
  }
  process.exit(1);
} else {
  console.log(`Doc-block check passed on ${files.length} ${changedOnly ? 'changed ' : ''}file(s).`);
}
