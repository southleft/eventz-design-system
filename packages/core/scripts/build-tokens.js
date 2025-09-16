// packages/core/scripts/build-tokens.js
import StyleDictionary from 'style-dictionary';
import { configs } from '../styles/tokens/tokens-config.js';

// Custom format you already use
StyleDictionary.registerFormat({
  name: 'css/variables-with-selector',
  format: ({ dictionary, file }) => {
    const selector = file.selector || ':root';
    const header = `/**\n* Do not edit directly, this file was auto-generated.\n*/\n\n`;
    const body = dictionary.allTokens.map(p => `--${p.name}: ${p.value};`).join('\n');
    return `${header}${selector} {\n${body}\n}`;
  }
});

console.log('🔧 Building tokens...\n');

for (const cfg of configs) {
  const sd = new StyleDictionary(cfg); // v4 ctor API
  await sd.buildAllPlatforms();
}

console.log('✅ Token build complete.');
