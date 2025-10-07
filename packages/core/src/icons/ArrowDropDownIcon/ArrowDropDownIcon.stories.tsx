import type { Meta, StoryObj } from '@storybook/react';
import { ArrowDropDownIcon, ArrowDropDownIconProps } from './ArrowDropDownIcon';

const meta: Meta<ArrowDropDownIconProps> = {
  title: 'Icons/ArrowDropDownIcon',
  component: ArrowDropDownIcon,
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

type Story = StoryObj<ArrowDropDownIconProps>;

export const Default: Story = {};

export const NonDecorative: Story = {
  args: {
    decorative: false,
    title: 'Dismiss notification',
    titleId: 'close-icon-title'
  }
};
