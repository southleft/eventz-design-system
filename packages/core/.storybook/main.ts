import type { StorybookConfig } from '@storybook/react-vite';

const config: StorybookConfig = {
  stories: ['../src/**/*.mdx', '../src/**/*.stories.@(js|jsx|mjs|ts|tsx)'],
  addons: ['@chromatic-com/storybook', '@storybook/addon-docs', '@storybook/addon-a11y'],
  framework: {
    name: '@storybook/react-vite',
    options: {}
  },
  viteFinal(config) {
    // 1) Remove the dts plugin (can mutate graph / chunk order in CI)
    config.plugins = (config.plugins ?? []).filter(
      plugin => plugin && 'name' in plugin && (plugin as any).name !== 'vite:dts'
    );

    // 2) Make CSS bundling deterministic in CI (Chromatic)
    config.build = {
      ...(config.build ?? {}),
      cssCodeSplit: false
    } as any;

    // 3) Use relative base so CSS/assets resolve the same on Chromatic
    (config as any).base = './';

    // 4) Dedupe React to avoid duplicate runtime affecting SB globals timing
    config.resolve = {
      ...(config.resolve ?? {}),
      dedupe: ['react', 'react-dom'],
      preserveSymlinks: true
    } as any;

    return config;
  }
};

export default config;
