/** @type {import('style-dictionary').Config} */
const config = {
  source: ['styles/tokens/**/*.json'],
  platforms: {
    css: {
      transformGroup: 'css',
      buildPath: 'styles/css/',
      files: [
        {
          destination: 'tokens.css',
          format: 'css/variables'
        }
      ]
    }
  }
};

export default config;
