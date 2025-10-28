// packages/core/src/components/ActionCard/ActionCard.stories.tsx
import type { Meta, StoryObj } from '@storybook/react';
import * as React from 'react';
import { ActionCard, type ActionCardProps } from './ActionCard';
import { Button } from '../Button';

const meta: Meta<ActionCardProps> = {
  title: 'Components/ActionCard',
  component: ActionCard,
  args: {
    focusable: false,
    title: 'Upgrade your workspace',
    subtitle: 'Get the most out of DoXYZ',
    description: "Unlock premium features to accelerate your team's workflow.",
    imgSrc: 'https://picsum.photos/seed/action-card/640/360',
    imgAlt: 'Abstract gradient background',
    ariaLabel: undefined,
    action: <Button variant="primary">Choose plan</Button>
  }
};

export default meta;

type Story = StoryObj<ActionCardProps>;

export const Default: Story = {
  args: {
    subtitle: 'Get the most out of DoXYZ',
    description: "Unlock premium features to accelerate your team's workflow.",
    focusable: false,
    imgSrc: 'https://picsum.photos/seed/action-card/640/360',
    imgAlt: 'Abstract gradient background'
  }
};
