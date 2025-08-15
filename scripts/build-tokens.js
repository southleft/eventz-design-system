import StyleDictionary from 'style-dictionary';
import config from '../styles/tokens/tokens-config.js';

console.log('🔧 Building tokens...');
const SD = StyleDictionary.extend(config);
SD.buildAllPlatforms();
console.log('✅ Token build complete.');
