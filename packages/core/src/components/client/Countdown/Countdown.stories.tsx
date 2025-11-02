import type { Meta, StoryObj } from '@storybook/react';
import { Countdown, type CountdownProps } from './Countdown';

const meta: Meta<CountdownProps> = {
  title: 'Client components/Countdown',
  component: Countdown,
  args: {
    until: new Date(Date.now() + 5 * 60 * 1000).toISOString(),
    announceLabel: 'Time remaining',
    variant: 'default'
  }
};

export default meta;

type Story = StoryObj<CountdownProps>;

export const Default: Story = {
  args: {}
};

export const Expiring: Story = {
  args: {
    variant: 'expiring'
  }
};

export const LongDuration: Story = {
  args: {
    until: new Date(Date.now() + 2 * 60 * 60 * 1000 + 15 * 60 * 1000).toISOString()
  }
};