import type { Meta, StoryObj } from '@storybook/react';
import { InfoPopover, InfoPopoverProps } from './InfoPopover';

const meta: Meta<InfoPopoverProps> = {
  title: 'Components/InfoPopover',
  component: InfoPopover,
  args: {
    ariaLabel: 'More information',
    side: 'top',
    sideOffset: 8,
    children: 'Helpful context for completing this field.'
  },
  argTypes: {
    ariaLabel: { control: 'text' },
    side: {
      options: ['top', 'right', 'bottom', 'left'],
      control: { type: 'inline-radio' }
    },
    sideOffset: {
      control: { type: 'number' }
    }
  }
};

export default meta;

type Story = StoryObj<InfoPopoverProps>;

export const Default: Story = {};

