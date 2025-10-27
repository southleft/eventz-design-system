// packages/core/src/components/ContentCard/ContentCard.stories.tsx
import type { Meta, StoryObj } from '@storybook/react';
import * as React from 'react';
import { ContentCard, ContentCardProps } from './ContentCard';

const meta: Meta<ContentCardProps> = {
  title: 'Components/ContentCard',
  component: ContentCard,
  args: {
    layout: 'vertical',
    focusable: false,
    title: 'Content card title',
    subtitle: 'Optional subtitle',
    description: 'Additional description copy providing supporting detail.',
    imgSrc: 'https://via.placeholder.com/400x240',
    imgAlt: '',
    badge: 'Featured',
    labels: [
      {
        label: 'Marketing',
        icon: <span aria-hidden="true">★</span>
      },
      {
        label: 'Strategy'
      }
    ],
    ariaLabel: undefined
  }
};

export default meta;

type Story = StoryObj<ContentCardProps>;

export const Default: Story = {
  args: {
    layout: 'vertical',
    focusable: false,
    subtitle: 'Optional subtitle',
    description: 'Additional description copy providing supporting detail.',
    imgSrc: 'https://via.placeholder.com/400x240',
    imgAlt: '',
    badge: 'Featured',
    labels: [
      {
        label: 'Marketing',
        icon: <span aria-hidden="true">★</span>
      },
      {
        label: 'Strategy'
      }
    ],
    ariaLabel: undefined
  }
};
