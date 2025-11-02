// packages/core/src/components/MenuItem/MenuItem.stories.tsx
import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { MenuItem, MenuItemProps } from '@doxyz-ui/core/server-components';
import { CloseIcon, InfoIcon } from '../../../icons';

type MenuItemStoryArgs = MenuItemProps;

const meta: Meta<MenuItemStoryArgs> = {
  title: 'Server components/MenuItem',
  component: MenuItem,
  args: {
    type: 'simple',
    isSelected: false,
    borderBottom: true,
    ariaLabel: '',
    href: '',
    imgSrc: '',
    imgAlt: '',
    mediaIcon: undefined,
    option: 'Default menu item',
    supportingText: 'Supporting description'
  },
  render: ({ option, supportingText, imgSrc, imgAlt, mediaIcon, ...args }) => (
    <MenuItem
      {...args}
      option={option}
      supportingText={args.type === 'complex' ? supportingText : undefined}
      startIcon={args.type === 'simple' ? <InfoIcon /> : undefined}
      imgSrc={args.type === 'complex' ? imgSrc || undefined : undefined}
      imgAlt={args.type === 'complex' ? imgAlt || undefined : undefined}
      mediaIcon={args.type === 'complex' ? mediaIcon : undefined}
      href={args.href || undefined}
    />
  )
};

export default meta;

type Story = StoryObj<MenuItemStoryArgs>;

export const SimpleDefault: Story = {
  args: {
    type: 'simple',
    option: 'Default menu item',
    isSelected: false
  }
};

export const SimpleSelected: Story = {
  args: {
    type: 'simple',
    option: 'Selected menu item',
    isSelected: true
  }
};

export const SimpleLink: Story = {
  args: {
    type: 'simple',
    option: 'Menu item link',
    href: 'https://example.com'
  }
};

export const ComplexWithImage: Story = {
  args: {
    type: 'complex',
    option: 'Complex menu item',
    supportingText: 'Additional supporting information',
    imgSrc: 'https://picsum.photos/seed/doxyz/160/160',
    imgAlt: 'Menu item thumbnail'
  }
};

export const ComplexPlaceholder: Story = {
  args: {
    type: 'complex',
    option: 'Placeholder menu item',
    supportingText: 'Supporting copy without image',
    imgSrc: '',
    imgAlt: ''
  }
};

export const ComplexWithMediaIcon: Story = {
  args: {
    type: 'complex',
    option: 'Media icon menu item',
    supportingText: 'Icon rendered in media slot',
    mediaIcon: <CloseIcon />
  }
};