import { addons } from 'storybook/manager-api';
import { create } from 'storybook/theming/create';

/**
 * Storybook manager (chrome) theme — dark, branded to match the Eventz Figma project.
 * Only themes the manager UI (top + left navigation); the preview canvas is unchanged.
 * brandImage is served from `public/images` via staticDirs in main.ts.
 */
const eventzTheme = create({
  base: 'dark',
  brandTitle: 'Eventz Design System',
  brandImage: '/images/eventz-logo--horiz.png',
  brandTarget: '_self',

  // Brand accents (teal)
  colorPrimary: '#3D7A95',
  colorSecondary: '#9EC2D2',

  // App chrome
  appBg: '#1c1e20',
  appContentBg: '#1c1e20',
  appPreviewBg: '#ffffff',
  appBorderColor: '#2c2e30',
  appBorderRadius: 6,

  // Toolbar / text
  barBg: '#1c1e20',
  barTextColor: '#c6c7c6',
  barSelectedColor: '#9EC2D2',
  textColor: '#f7f8f7',
  textInverseColor: '#1c1e20',
});

addons.setConfig({ theme: eventzTheme });
