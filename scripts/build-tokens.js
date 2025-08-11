import StyleDictionary from 'style-dictionary';

// Temporary config until tokens are defined
const config = {
  source: ['styles/tokens/**/*.json'],
  platforms: {
    css: {
      transformGroup: 'css',
      buildPath: 'dist/',
      files: [
        {
          destination: 'tokens.css',
          format: 'css/variables'
        }
      ]
    }
  }
};

const SD = StyleDictionary.extend(config);
SD.buildAllPlatforms();
