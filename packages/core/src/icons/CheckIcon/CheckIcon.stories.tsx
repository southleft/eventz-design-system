import type { Meta, StoryObj } from '@storybook/react';
import { CheckIcon, CheckIconProps } from './CheckIcon';

const meta: Meta<CheckIconProps> = {
  title: 'Icons/CheckIcon',
  component: CheckIcon,
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

type Story = StoryObj<CheckIconProps>;

export const Default: Story = {};

export const NonDecorative: Story = {
  args: {
    decorative: false,
    title: 'Dismiss notification',
    titleId: 'close-icon-title'
  }
};
