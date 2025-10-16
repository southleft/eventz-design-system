import type { Meta, StoryObj } from '@storybook/react';
import { NewsmodeIcon, NewsmodeIconProps } from './NewsmodeIcon';

const meta: Meta<NewsmodeIconProps> = {
  title: 'Icons/NewsmodeIcon',
  component: NewsmodeIcon,
  args: {
    decorative: true,
    color: 'currentColor'
  }
};

export default meta;

type Story = StoryObj<NewsmodeIconProps>;

export const Default: Story = {};

export const NonDecorative: Story = {
  args: {
    decorative: false,
    title: 'Dismiss notification',
    titleId: 'close-icon-title'
  }
};
