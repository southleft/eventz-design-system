import type { Meta, StoryObj } from '@storybook/react';
import { ChevronRightIcon, ChevronRightIconProps } from './ChevronRightIcon';

const meta: Meta<ChevronRightIconProps> = {
  title: 'Icons/ChevronRightIcon',
  component: ChevronRightIcon,
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

type Story = StoryObj<ChevronRightIconProps>;

export const Default: Story = {};

export const NonDecorative: Story = {
  args: {
    decorative: false,
    title: 'Warning status',
    titleId: 'warning-icon-title'
  }
};
