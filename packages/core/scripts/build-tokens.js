import StyleDictionary from 'style-dictionary';
import config from '../styles/tokens/tokens-config.js';

// ✅ Register custom format: css/variables-with-selector
StyleDictionary.registerFormat({
  name: 'css/variables-with-selector',
  format: function ({ dictionary, file }) {
    console.log({ file });
    const selector = file.selector || ':root';
    const header = `/**\n* Do not edit directly, this file was auto-generated.\n*/\n\n`;
    const body = dictionary.allTokens.map(prop => `--${prop.name}: ${prop.value};`).join('\n');
    return `${header}${selector} {\n${body}\n}`;
  }
});

console.log('🔧 Building tokens...');

const sd = new StyleDictionary(config);
await sd.buildAllPlatforms();

console.log('✅ Token build complete.');
