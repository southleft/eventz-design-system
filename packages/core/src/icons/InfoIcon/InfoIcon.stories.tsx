import type { Meta, StoryObj } from '@storybook/react';
import { InfoIcon, InfoIconProps } from './InfoIcon';

const meta: Meta<InfoIconProps> = {
  title: 'Icons/InfoIcon',
  component: InfoIcon,
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

type Story = StoryObj<InfoIconProps>;

export const Default: Story = {};

export const NonDecorative: Story = {
  args: {
    decorative: false,
    title: 'Information',
    titleId: 'info-icon-title'
  }
};
