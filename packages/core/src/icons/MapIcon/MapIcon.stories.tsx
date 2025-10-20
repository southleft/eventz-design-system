import type { Meta, StoryObj } from '@storybook/react';
import { MapIcon, MapIconProps } from './MapIcon';

const meta: Meta<MapIconProps> = {
  title: 'Icons/MapIcon',
  component: MapIcon,
  args: {
    decorative: true,
    color: 'currentColor'
  }
};

export default meta;

type Story = StoryObj<MapIconProps>;

export const Default: Story = {};

export const NonDecorative: Story = {
  args: {
    decorative: false,
    title: 'Dismiss notification',
    titleId: 'close-icon-title'
  }
};
