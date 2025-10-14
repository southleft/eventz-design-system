import type { Meta, StoryObj } from '@storybook/react';
import {
  AnimatedCircularProgressIcon,
  AnimatedCircularProgressIconProps
} from './AnimatedCircularProgressIcon';

const meta: Meta<AnimatedCircularProgressIconProps> = {
  title: 'Icons/AnimatedCircularProgressIcon',
  component: AnimatedCircularProgressIcon,
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

type Story = StoryObj<AnimatedCircularProgressIconProps>;

export const Default: Story = {};

export const NonDecorative: Story = {
  args: {
    decorative: false,
    title: 'Dismiss notification',
    titleId: 'close-icon-title'
  }
};
