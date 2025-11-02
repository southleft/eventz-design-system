import type { Meta, StoryObj } from '@storybook/react';
import { InfoPopover, InfoPopoverProps } from '@doxyz-ui/core/client-components';

const meta: Meta<InfoPopoverProps> = {
  title: 'Client components/InfoPopover',
  component: InfoPopover,
  args: {
    ariaLabel: 'More information',
    side: 'top',
    sideOffset: 8,
    children: 'Helpful context for completing this field.'
  }
};

export default meta;

type Story = StoryObj<InfoPopoverProps>;

export const Default: Story = {};