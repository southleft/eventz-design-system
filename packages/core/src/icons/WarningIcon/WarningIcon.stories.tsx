import type { Meta, StoryObj } from '@storybook/react';
import { WarningIcon, WarningIconProps } from './WarningIcon';

const meta: Meta<WarningIconProps> = {
  title: 'Icons/WarningIcon',
  component: WarningIcon,
  args: {
    decorative: true,
    color: 'currentColor'
  },
  argTypes: {
    decorative: { control: 'boolean' },
    title: { control: 'text' },
    titleId: { control: 'text' },
    color: { control: 'color' },
    className: { control: 'text' }
  }
};

export default meta;

type Story = StoryObj<WarningIconProps>;

export const Default: Story = {};

export const NonDecorative: Story = {
  args: {
    decorative: false,
    title: 'Warning status',
    titleId: 'warning-icon-title'
  }
};
