// packages/core/styles/tokens/tokens-config.js
/** @type {import('style-dictionary').Config[]} */
export const configs = [
  // 1) Default build: :root gets Default + Dark (dark is default)
  {
    include: ['styles/tokens/core/Default.json', 'styles/tokens/component/**/*.json'],
    source: ['styles/tokens/theme/dark.json'],
    platforms: {
      css: {
        transformGroup: 'css',
        prefix: 'dt',
        buildPath: 'styles/css/',
        files: [
          {
            destination: 'tokens.css',
            format: 'css/variables'
          }
        ]
      }
    }
  },

  // 2) Light overrides only: build with Default + Dark + Light, but emit only tokens that come from light.json
  {
    include: ['styles/tokens/core/Default.json'],
    source: ['styles/tokens/theme/light.json'],
    platforms: {
      css: {
        transformGroup: 'css',
        prefix: 'dt',
        buildPath: 'styles/css/',
        files: [
          {
            destination: 'light.css',
            format: 'css/variables-with-selector',
            selector: '[data-theme="light"]',
            filter: token =>
              typeof token.filePath === 'string' &&
              token.filePath.replace(/\\\\/g, '/').endsWith('/styles/tokens/theme/light.json')
          }
        ]
      }
    }
  }
];
