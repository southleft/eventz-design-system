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

  // 2) Light overrides scoped under [data-theme="light"]
  //    No filter: emit the full resolved dictionary under the selector,
  //    so CI path/merge differences can’t zero-out the file.
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
            selector: '[data-theme="light"]'
          }
        ]
      }
    }
  }
];
