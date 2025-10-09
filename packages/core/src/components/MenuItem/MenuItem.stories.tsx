// packages/core/src/components/MenuItem/MenuItem.stories.tsx
import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { MenuItem, MenuItemProps } from './MenuItem';
import { InfoIcon } from '../../icons';

type MenuItemStoryArgs = MenuItemProps;

const meta: Meta<MenuItemStoryArgs> = {
  title: 'Components/MenuItem',
  component: MenuItem,
  args: {
    type: 'simple',
    isSelected: false,
    borderBottom: true,
    ariaLabel: '',
    imgSrc: '',
    imgAlt: '',
    option: 'Default menu item',
    supportingText: 'Supporting description'
  },
  render: ({ option, supportingText, imgSrc, imgAlt, ...args }) => (
    <MenuItem
      {...args}
      option={option}
      supportingText={args.type === 'complex' ? supportingText : undefined}
      startIcon={args.type === 'simple' ? <InfoIcon /> : undefined}
      imgSrc={args.type === 'complex' ? imgSrc || undefined : undefined}
      imgAlt={args.type === 'complex' ? imgAlt || undefined : undefined}
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

export const ComplexWithImage: Story = {
  args: {
    type: 'complex',
    option: 'Complex menu item',
    supportingText: 'Additional supporting information',
    imgSrc: 'https://picsum.photos/seed/doxyz/40/40',
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
