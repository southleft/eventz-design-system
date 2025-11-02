import type { StorybookConfig } from '@storybook/react-vite';

const config: StorybookConfig = {
  stories: [
    '../src/components/server/**/*.stories.@(tsx|mdx)',
    '../src/components/client/**/*.stories.@(tsx|mdx)',
    '../src/icons/**/*.stories.@(tsx|mdx)'
  ],
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
