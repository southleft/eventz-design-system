import type { Meta, StoryObj } from '@storybook/react';
import { ArtistIcon, ArtistIconProps } from './ArtistIcon';

const meta: Meta<ArtistIconProps> = {
  title: 'Icons/ArtistIcon',
  component: ArtistIcon,
  args: {
    decorative: true,
    color: 'currentColor'
  }
};

export default meta;

type Story = StoryObj<ArtistIconProps>;

export const Default: Story = {};

export const NonDecorative: Story = {
  args: {
    decorative: false,
    title: 'Dismiss notification',
    titleId: 'close-icon-title'
  }
};
