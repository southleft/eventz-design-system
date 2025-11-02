// packages/core/src/components/SelectionCard/SelectionCard.stories.tsx
import type { Meta, StoryObj } from '@storybook/react';
import * as React from 'react';
import { EventIcon } from '../../../icons';
import { SelectionCard, type SelectionCardProps } from '@doxyz-ui/core/server-components';

const meta: Meta<SelectionCardProps> = {
  title: 'Server components/SelectionCard',
  component: SelectionCard,
  args: {
    label: 'Workspace Alpha',
    icon: <EventIcon />,
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