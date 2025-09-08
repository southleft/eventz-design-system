/* eslint-disable no-console */
import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import yaml from 'js-yaml';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const repoRoot = path.resolve(__dirname, '..');

const META_PATH = path.join(repoRoot, 'AGENTS', 'META.yml');

function makePathsBlock(meta) {
  return [
    '<!-- @agents:paths:start -->',
    '### 📍 Canonical paths',
    `- Components root: \`${meta.paths.components_root}\``,
    `- Contract: \`${meta.paths.contract}\``,
    `- styleMap: \`${meta.paths.styleMap}\``,
    `> Source: AGENTS/META.yml (version: ${meta.version})`,
    '<!-- @agents:paths:end -->'
  ].join('\n');
}

async function main() {
  const metaRaw = await fs.readFile(META_PATH, 'utf8');
  const meta = yaml.load(metaRaw);

  const agentsDir = path.join(repoRoot, 'AGENTS');
  const files = (await fs.readdir(agentsDir))
    .filter(f => f.endsWith('.md'))
    // Keep ROOT last so we don't over-noise its short overview
    .sort((a, b) => (a === 'ROOT.md' ? 1 : b === 'ROOT.md' ? -1 : a.localeCompare(b)));

  const banned = [
    /restricted from direct edits in an IDE/i, // legacy rule we removed
    /no direct mcp edits/i
  ];

  const pathsBlock = makePathsBlock(meta);
  const markerRegex = /<!-- @agents:paths:start -->[\s\S]*?<!-- @agents:paths:end -->/m;

  for (const filename of files) {
    const filePath = path.join(agentsDir, filename);
    let s = await fs.readFile(filePath, 'utf8');

    // Fail on banned phrases
    if (banned.some(rx => rx.test(s))) {
      throw new Error(
        `Banned phrase found in ${filename}. Please remove legacy MCP restriction text.`
      );
    }

    // Replace or insert canonical paths block
    if (markerRegex.test(s)) {
      s = s.replace(markerRegex, pathsBlock);
    } else {
      // Insert after first top-level heading, or at top if not present
      const lines = s.split('\n');
      let inserted = false;
      for (let i = 0; i < lines.length; i++) {
        if (/^#\s+/.test(lines[i])) {
          lines.splice(i + 1, 0, '', pathsBlock, '');
          inserted = true;
          break;
        }
      }
      if (!inserted) {
        s = pathsBlock + '\n\n' + s;
      } else {
        s = lines.join('\n');
      }
    }

    await fs.writeFile(filePath, s);
    console.log(`Synced: ${path.relative(repoRoot, filePath)}`);
  }

  console.log('AGENTS synced ✅');
}

main().catch(err => {
  console.error(err);
  process.exit(1);
});

