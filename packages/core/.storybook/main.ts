import type { StorybookConfig } from '@storybook/react-vite';

const config: StorybookConfig = {
  stories: ['../src/**/*.mdx', '../src/**/*.stories.@(js|jsx|mjs|ts|tsx)'],
  addons: ['@chromatic-com/storybook', '@storybook/addon-docs', '@storybook/addon-a11y'],
  framework: {
    name: '@storybook/react-vite',
    options: {}
  },
  viteFinal(config) {
    config.plugins = (config.plugins ?? []).filter(
      plugin => plugin && 'name' in plugin && (plugin as any).name !== 'vite:dts'
    );
    return config;
  }
};

export default config;
