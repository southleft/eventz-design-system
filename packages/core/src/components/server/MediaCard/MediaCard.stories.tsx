// packages/core/src/components/MediaCard/MediaCard.stories.tsx
import type { Meta, StoryObj } from '@storybook/react';
import * as React from 'react';
import { MediaCard, MediaCardProps } from './MediaCard';
import { MediaControl } from '../MediaControl';
import { EventIcon } from '../../../icons';

const meta: Meta<MediaCardProps> = {
  title: 'Components/MediaCard',
  component: MediaCard,
  args: {
    subtitle: 'Episode 5 · 48 min',
    title: 'The Design Systems Podcast',
    labels: [
      {
        label: 'Design',
        icon: <EventIcon />
      },
      {
        label: 'Research',
        icon: <EventIcon />
      }
    ]
  }
};

export default meta;

type Story = StoryObj<MediaCardProps>;

export const Default: Story = {
  args: {
    subtitle: 'Episode 5 · 48 min',
    title: 'The Design Systems Podcast',
    labels: [
      {
        label: 'Design',
        icon: <EventIcon />
      },
      {
        label: 'Research',
        icon: <EventIcon />
      }
    ],
    imgSrc: 'https://picsum.photos/seed/doxyz-media/400/400',
    imgAlt: 'Podcast artwork',
    control: <MediaControl ariaLabelPlay="Play media" ariaLabelPause="Pause media" />
  }
};

export const NoImage: Story = {
  args: {
    subtitle: 'Episode 5 · 48 min',
    title: 'The Design Systems Podcast',
    labels: [
      {
        label: 'Design',
        icon: <EventIcon />
      },
      {
        label: 'Research',
        icon: <EventIcon />
      }
    ],
    control: <MediaControl ariaLabelPlay="Play media" ariaLabelPause="Pause media" />
  }
};
