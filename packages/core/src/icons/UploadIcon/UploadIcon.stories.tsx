import type { Meta, StoryObj } from '@storybook/react';
import { UploadIcon, UploadIconProps } from './UploadIcon';

const meta: Meta<UploadIconProps> = {
  title: 'Icons/UploadIcon',
  component: UploadIcon,
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

type Story = StoryObj<UploadIconProps>;

export const Default: Story = {};

export const NonDecorative: Story = {
  args: {
    decorative: false,
    title: 'Dismiss notification',
    titleId: 'close-icon-title'
  }
};
