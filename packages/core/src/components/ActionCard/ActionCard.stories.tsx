// packages/core/src/components/ActionCard/ActionCard.stories.tsx
import type { Meta, StoryObj } from '@storybook/react';
import * as React from 'react';
import { ActionCard, type ActionCardProps } from './ActionCard';
import { Button } from '../Button';

const meta: Meta<ActionCardProps> = {
  title: 'Components/ActionCard',
  component: ActionCard,
  args: {
    title: 'Join now',
    subtitle: 'Get the most out of DoXYZ',
    description: 'Unlock premium features.',
    ariaLabel: undefined,
    action: <Button variant="primary">Follow</Button>
  }
};

export default meta;

type Story = StoryObj<ActionCardProps>;

export const Default: Story = {
  args: {}
};

export const Image: Story = {
  args: {
    imgSrc: 'https://picsum.photos/seed/action-card/640/360',
    imgAlt: 'Abstract gradient background',
    badge: 'Featured'
  }
};
