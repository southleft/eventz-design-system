import type { Meta, StoryObj } from '@storybook/react';
import * as React from 'react';
import { FormElement } from './FormElement';

const meta = {
  title: 'Components/FormElement',
  component: FormElement
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
