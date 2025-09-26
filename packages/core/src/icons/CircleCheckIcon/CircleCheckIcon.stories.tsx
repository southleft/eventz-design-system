import type { Meta, StoryObj } from '@storybook/react';
import { CircleCheckIcon, CircleCheckIconProps } from './CircleCheckIcon';

const meta: Meta<CircleCheckIconProps> = {
  title: 'Icons/CircleCheckIcon',
  component: CircleCheckIcon,
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

type Story = StoryObj<CircleCheckIconProps>;

export const Default: Story = {};

export const NonDecorative: Story = {
  args: {
    decorative: false,
    title: 'Success status',
    titleId: 'circle-check-icon-title'
  }
};
