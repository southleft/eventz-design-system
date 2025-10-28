import type { Meta, StoryObj } from '@storybook/react';
import { PauseIcon, PauseIconProps } from './PauseIcon';

const meta: Meta<PauseIconProps> = {
  title: 'Icons/PauseIcon',
  component: PauseIcon,
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

type Story = StoryObj<PauseIconProps>;

export const Default: Story = {};

export const NonDecorative: Story = {
  args: {
    decorative: false,
    title: 'Dismiss notification',
    titleId: 'close-icon-title'
  }
};
