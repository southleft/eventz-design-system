import type { Meta, StoryObj } from '@storybook/react';
import * as React from 'react';
import { FormElement } from './FormElement';

const meta = {
  title: 'Components/FormElement',
  component: FormElement,
  parameters: {
    docs: {
      description: {
        component:
          'Shell-only wrapper. In non-Slot mode (asChild=false), the value slot renders a neutral wrapper and the child is not auto-wired with id/aria; use asChild=true to have FormElement pass id/aria/disabled/className into your control via Radix Slot.'
      }
    }
  }
} satisfies Meta<typeof FormElement>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    label: 'Email',
    info: 'We use this to send important account updates.',
    hint: 'Use your work email address.',
    asChild: true,
    children: <input type="email" placeholder="name@example.com" />
  }
};
