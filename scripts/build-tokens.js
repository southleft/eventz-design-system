import StyleDictionary from 'style-dictionary';

// Optional: Load dynamic config or extend this later
const config = {
  source: ['styles/tokens/**/*.json'],
  platforms: {
    css: {
      transformGroup: 'css',
      buildPath: 'dist/',
      files: [
        {
          destination: 'tokens.css',
          format: 'css/variables',
          options: {
            outputReferences: true // future-proof: allow referencing other tokens
          }
        }
      ]
    }
  }
};

console.log('🔧 Building tokens...');
const SD = StyleDictionary.extend(config);
SD.buildAllPlatforms();
console.log('✅ Token build complete.');
