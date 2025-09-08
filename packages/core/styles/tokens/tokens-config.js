/** @type {import('style-dictionary').Config} */
const config = {
  source: ['styles/tokens/**/*.json'], // Core design tokens (theme-agnostic)
  platforms: {
    css: {
      transformGroup: 'css',
      prefix: 'dt',
      buildPath: 'styles/css/',
      files: [
        {
          destination: 'tokens.css',
          format: 'css/variables',
          filter: token => !token.attributes?.theme,
          selector: ':root'
        },
        {
          destination: 'light.css',
          format: 'css/variables-with-selector',
          filter: token => token.attributes?.theme === 'light',
          selector: '[data-theme="light"]'
        }
      ]
    }
  }
};

export default config;
