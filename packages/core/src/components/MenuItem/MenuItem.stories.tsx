// packages/core/src/components/MenuItem/MenuItem.stories.tsx
import type { Meta, StoryObj } from '@storybook/react';
import { MenuItem, MenuItemProps } from './MenuItem';

type MenuItemStoryArgs = Omit<MenuItemProps, 'option' | 'supportingText' | 'startIcon'> & {
  option: string;
  supportingText?: string;
  showStartIcon: boolean;
};

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
    supportingText: 'Supporting description',
    showStartIcon: true
  },
  argTypes: {
    type: {
      control: { type: 'radio' },
      options: ['simple', 'complex']
    },
    isSelected: { control: 'boolean' },
    borderBottom: { control: 'boolean' },
    ariaLabel: { control: 'text' },
    imgSrc: { control: 'text' },
    imgAlt: { control: 'text' },
    option: { control: 'text' },
    supportingText: { control: 'text' },
    showStartIcon: { control: 'boolean', name: 'showStartIcon (simple only)' }
  },
  render: ({ showStartIcon, option, supportingText, imgSrc, imgAlt, ...args }) => (
    <MenuItem
      {...args}
      option={option}
      supportingText={args.type === 'complex' ? supportingText : undefined}
      startIcon={
        args.type === 'simple' && showStartIcon ? (
          <span aria-hidden="true">⭐️</span>
        ) : undefined
      }
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
    showStartIcon: true,
    isSelected: false
  }
};

export const SimpleSelected: Story = {
  args: {
    type: 'simple',
    option: 'Selected menu item',
    isSelected: true,
    showStartIcon: false
  }
};

export const ComplexWithImage: Story = {
  args: {
    type: 'complex',
    option: 'Complex menu item',
    supportingText: 'Additional supporting information',
    imgSrc: 'https://via.placeholder.com/40',
    imgAlt: 'Menu item thumbnail',
    showStartIcon: false
  }
};

export const ComplexPlaceholder: Story = {
  args: {
    type: 'complex',
    option: 'Placeholder menu item',
    supportingText: 'Supporting copy without image',
    imgSrc: '',
    imgAlt: '',
    showStartIcon: false
  }
};
