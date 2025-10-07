import type { Meta, StoryObj } from '@storybook/react';
import 'rsuite/DateRangePicker/styles/index.css';

import { DatePicker } from './DatePicker';

const meta: Meta<typeof DatePicker> = {
  title: 'Components/DatePicker',
  component: DatePicker,
  argTypes: {
    showOneCalendar: { control: 'boolean' },
    fullWidth: { control: 'boolean' },
    placeholder: { control: 'text' }
  }
};

export default meta;

type Story = StoryObj<typeof DatePicker>;

export const Default: Story = {
  args: {}
};
