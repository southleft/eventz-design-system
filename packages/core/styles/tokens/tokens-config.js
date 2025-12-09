// packages/core/styles/tokens/tokens-config.js
/** @type {import('style-dictionary').Config[]} */
export const configs = [
  // 1) Default build: :root gets Default + Components + Dark (dark is default)
  {
    // Use only `source` and order files so later files override earlier ones deterministically
    source: [
      'styles/tokens/core/Default.json',
      'styles/tokens/component/**/*.json',
      'styles/tokens/theme/dark.json'
    ],
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
  {
    // Same deterministic ordering; light placed last so it wins for this build
    source: [
      'styles/tokens/core/Default.json',
      'styles/tokens/component/**/*.json',
      'styles/tokens/theme/Light.json'
    ],
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
