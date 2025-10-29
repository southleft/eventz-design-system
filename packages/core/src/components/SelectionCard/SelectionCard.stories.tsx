// packages/core/src/components/SelectionCard/SelectionCard.stories.tsx
import type { Meta, StoryObj } from '@storybook/react';
import * as React from 'react';
import { SelectionCard, type SelectionCardProps } from './SelectionCard';

const ExampleIcon = () => (
  <svg
    width="48"
    height="48"
    viewBox="0 0 48 48"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <rect width="48" height="48" rx="12" fill="#EEF2FF" />
    <path
      d="M16 24L22 30L32 18"
      stroke="#4C1D95"
      strokeWidth="3"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const meta: Meta<SelectionCardProps> = {
  title: 'Components/SelectionCard',
  component: SelectionCard,
  args: {
    label: 'Workspace Alpha',
    icon: <ExampleIcon />,
    isSelected: false,
    ariaLabel: undefined
  }
};

export default meta;

type Story = StoryObj<SelectionCardProps>;

export const Default: Story = {
  args: {}
};

export const SelectedComparison: Story = {
  render: args => (
    <div className="flex gap-6">
      <SelectionCard {...args} />
      <SelectionCard {...args} isSelected />
    </div>
  )
};
