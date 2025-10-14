import type { Meta, StoryObj } from '@storybook/react';
import { ProgressActivityIcon, ProgressActivityIconProps } from './ProgressActivityIcon';

const meta: Meta<ProgressActivityIconProps> = {
  title: 'Icons/ProgressActivityIcon',
  component: ProgressActivityIcon,
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

type Story = StoryObj<ProgressActivityIconProps>;

export const Default: Story = {};

export const NonDecorative: Story = {
  args: {
    decorative: false,
    title: 'Dismiss notification',
    titleId: 'close-icon-title'
  }
};
