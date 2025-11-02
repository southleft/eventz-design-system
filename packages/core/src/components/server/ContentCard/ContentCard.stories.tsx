// packages/core/src/components/ContentCard/ContentCard.stories.tsx
import type { Meta, StoryObj } from '@storybook/react';
import * as React from 'react';
import { ContentCard, ContentCardProps } from './ContentCard';
import { EventIcon } from '../../../icons';

const meta: Meta<ContentCardProps> = {
  title: 'Components/ContentCard',
  component: ContentCard,
  args: {
    layout: 'vertical',
    focusable: false,
    title: 'Content card title',
    subtitle: 'Optional subtitle',
    labels: [
      {
        label: 'Marketing',
        icon: <EventIcon />
      },
      {
        label: 'Strategy',
        icon: <EventIcon />
      }
    ],
    ariaLabel: undefined,
    href: ''
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
    imgSrc: 'https://picsum.photos/seed/doxyz/400/400',
    imgAlt: '',
    badge: 'Featured',
    labels: [
      {
        label: 'Marketing',
        icon: <EventIcon />
      },
      {
        label: 'Strategy',
        icon: <EventIcon />
      }
    ],
    ariaLabel: undefined
  }
};

export const Link: Story = {
  args: {
    layout: 'vertical',
    focusable: false,
    subtitle: 'Optional subtitle',
    description: 'Additional description copy providing supporting detail.',
    imgSrc: 'https://picsum.photos/seed/doxyz/400/400',
    imgAlt: '',
    badge: 'Featured',
    labels: [
      {
        label: 'Marketing',
        icon: <EventIcon />
      },
      {
        label: 'Strategy',
        icon: <EventIcon />
      }
    ],
    ariaLabel: undefined,
    href: 'https://example.com'
  }
};

export const Plain: Story = {
  args: {
    layout: 'vertical',
    focusable: false,
    subtitle: 'Optional subtitle',
    description: 'Additional description copy providing supporting detail.',
    labels: [
      {
        label: 'Marketing',
        icon: <EventIcon />
      },
      {
        label: 'Strategy',
        icon: <EventIcon />
      }
    ],
    ariaLabel: undefined,
    href: 'https://example.com'
  }
};
