import type { Meta, StoryObj } from '@storybook/react';
import { CheckIcon, CheckIconProps } from './CheckIcon';

const meta: Meta<CheckIconProps> = {
  title: 'Icons/CheckIcon',
  component: CheckIcon,
  args: {
    decorative: true,
    color: 'currentColor'
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
