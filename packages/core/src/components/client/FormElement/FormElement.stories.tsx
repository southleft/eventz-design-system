import type { Meta, StoryObj } from '@storybook/react';
import * as React from 'react';
import { FormElement } from '@doxyz-ui/core/client-components';

const meta = {
  title: 'Client components/FormElement',
  component: FormElement,
  parameters: {
    docs: {
      description: {
        component:
          'Shell-only wrapper. In non-Slot mode (asChild=false), the value slot renders a neutral wrapper and the child is not auto-wired with id/aria; use asChild=true to have FormElement pass id/aria/disabled into your control via Radix Slot.'
      }
    }
  }
} satisfies Meta<typeof FormElement>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    label: 'Form shell',
    info: 'This component provides label, info, focus ring, and messaging. Your control renders as children.',
    hint: 'Use asChild=true to have FormElement pass id/aria/disabled into your control.',
    asChild: false,
    children: (
      <p>
        Place your focusable control here. In Slot mode (asChild=true), FormElement wires id/aria/disabled
        into your child; styling the control remains the consumer’s responsibility.
      </p>
    )
  }
};