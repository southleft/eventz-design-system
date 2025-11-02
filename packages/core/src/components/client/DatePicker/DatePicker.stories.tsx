import type { Meta, StoryObj } from '@storybook/react';
import 'rsuite/DateRangePicker/styles/index.css';

import { DatePicker } from './DatePicker';

const meta: Meta<typeof DatePicker> = {
  title: 'Client components/DatePicker',
  component: DatePicker
};

export default meta;

type Story = StoryObj<typeof DatePicker>;

export const Default: Story = {
  args: {}
};