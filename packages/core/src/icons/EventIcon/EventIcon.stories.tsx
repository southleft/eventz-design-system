import type { Meta, StoryObj } from '@storybook/react';
import { EventIcon, EventIconProps } from './EventIcon';

const meta: Meta<EventIconProps> = {
  title: 'Icons/EventIcon',
  component: EventIcon,
  args: {
    decorative: true,
    color: 'currentColor'
  }
};

export default meta;

type Story = StoryObj<EventIconProps>;

export const Default: Story = {};

export const NonDecorative: Story = {
  args: {
    decorative: false,
    title: 'Dismiss notification',
    titleId: 'close-icon-title'
  }
};
