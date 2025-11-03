import type { StorybookConfig } from '@storybook/react-vite';

const config: StorybookConfig = {
  stories: ['../src/**/*.stories.tsx', '../src/**/*.mdx'],
  addons: ['@chromatic-com/storybook', '@storybook/addon-docs', '@storybook/addon-a11y'],
  staticDirs: ['../public'],
  framework: {
    name: '@storybook/react-vite',
    options: {}
  },
  typescript: {
    // Use TS-aware docgen so extended interfaces are included
    reactDocgen: 'react-docgen-typescript',
    // Filter out React DOM/HTML attributes coming from @types/react
    reactDocgenTypescriptOptions: {
      shouldExtractLiteralValuesFromEnum: true,
      propFilter: prop => {
        const parentFile = prop.parent?.fileName ?? '';
        return !/node_modules\/@types\/react/i.test(parentFile);
      }
    }
  },
  viteFinal(config) {
    config.plugins = (config.plugins ?? []).filter(
      plugin => plugin && 'name' in plugin && (plugin as any).name !== 'vite:dts'
    );
    return config;
  }
};

export default config;
