import type { Meta, StoryObj } from '@storybook/react';
import { PlayIcon, PlayIconProps } from './PlayIcon';

const meta: Meta<PlayIconProps> = {
  title: 'Icons/PlayIcon',
  component: PlayIcon,
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

type Story = StoryObj<PlayIconProps>;

export const Default: Story = {};

export const NonDecorative: Story = {
  args: {
    decorative: false,
    title: 'Dismiss notification',
    titleId: 'close-icon-title'
  }
};
