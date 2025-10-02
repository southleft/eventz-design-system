// packages/core/scripts/build-tokens.js
import StyleDictionary from 'style-dictionary';
import { configs } from '../styles/tokens/tokens-config.js';

// Custom format you already use
StyleDictionary.registerFormat({
  name: 'css/variables-with-selector',
  format: ({ dictionary, file }) => {
    const selector = file.selector || ':root';
    const header = `/**\n* Do not edit directly, this file was auto-generated.\n*/\n\n`;
    const toShadow = layers =>
      Array.isArray(layers)
        ? layers
            .map(l => {
              const inset = l.type === 'innerShadow' ? 'inset ' : '';
              const x = `${Number(l.x)}px`;
              const y = `${Number(l.y)}px`;
              const blur = `${Number(l.blur)}px`;
              const spread = `${Number(l.spread)}px`;
              const color = String(l.color);
              return `${inset}${x} ${y} ${blur} ${spread} ${color}`.trim();
            })
            .join(', ')
        : '';

    const body = dictionary.allTokens
      .map(p => {
        const v = p.type === 'boxShadow' ? toShadow(p.value) : p.value;
        return `--${p.name}: ${v};`;
      })
      .join('\n');
    return `${header}${selector} {\n${body}\n}`;
  }
});

console.log('🔧 Building tokens...\n');

for (const cfg of configs) {
  const sd = new StyleDictionary(cfg); // v4 ctor API
  await sd.buildAllPlatforms();
}

console.log('✅ Token build complete.');
