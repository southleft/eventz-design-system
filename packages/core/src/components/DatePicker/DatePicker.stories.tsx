import type { Meta, StoryObj } from '@storybook/react';
import 'rsuite/dist/rsuite.min.css';

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

export const FullWidth: Story = {
  args: {
    fullWidth: true
  }
};

export const OneCalendarForced: Story = {
  args: {
    showOneCalendar: true
  }
};

const subtractDays = (days: number) => {
  const date = new Date();
  date.setDate(date.getDate() - days);
  return date;
};

export const WithRanges: Story = {
  args: {
    showOneCalendar: true,
    ranges: [
      {
        label: 'Last 7 Days',
        value: [subtractDays(6), new Date()]
      },
      {
        label: 'Last 30 Days',
        value: [subtractDays(29), new Date()]
      }
    ]
  }
};

export const Controls: Story = {
  args: {
    placeholder: 'Select a date range'
  }
};

