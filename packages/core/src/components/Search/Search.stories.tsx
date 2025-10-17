// packages/core/src/components/Search/Search.stories.tsx
import type { Meta, StoryObj } from '@storybook/react';
import * as React from 'react';
import { fn } from 'storybook/test';
import { CancelIcon, CircleCheckIcon, MapIcon } from '../../icons';
import { Search, SearchProps, SearchResult } from './Search';

const mixedResults: SearchResult[] = [
  {
    id: 'venue-1',
    label: 'Grand Hall',
    description: 'Capacity 2,500 · Downtown',
    type: 'venue',
    href: 'https://venue.example.com/grand-hall'
  },
  {
    id: 'event-1',
    label: 'Summer Fest 2025',
    description: 'Outdoor · June 21',
    type: 'event'
  },
  {
    id: 'article-1',
    label: 'How to plan a tour',
    description: 'Guidance from industry experts',
    type: 'article',
    href: 'https://blog.example.com/plan-a-tour'
  },
  {
    id: 'guide-1',
    label: 'City highlights',
    description: 'Top spots for first-time visitors',
    type: 'guide'
  },
  {
    id: 'artist-1',
    label: 'The Wanderers',
    description: 'Indie · 5 upcoming shows',
    type: 'artist'
  }
];

const meta: Meta<SearchProps> = {
  title: 'Components/Search',
  component: Search,
  args: {
    placeholder: 'Search…',
    results: [],
    loading: false,
    onSearchTermChange: fn(),
    onResultSelect: fn(),
    onViewAllClick: fn(),
    noResultsMessage: 'No matches for this search.'
  }
};

export default meta;

type Story = StoryObj<SearchProps>;

export const Default: Story = {
  args: {
    defaultValue: '',
    results: [],
    loading: false
  }
};

export const Loading: Story = {
  args: {
    defaultValue: 'ven',
    loading: true
  }
};

export const NoResults: Story = {
  args: {
    defaultValue: 'unknown',
    results: [],
    loading: false,
    noResultsMessage: 'Nothing matched your search. Try a different keyword.'
  }
};

export const Results: Story = {
  args: {
    defaultValue: 'city',
    results: mixedResults
  }
};

export const CloseIconOverride: Story = {
  args: {
    defaultValue: 'warning',
    results: mixedResults.slice(0, 2),
    closeIcon: <CancelIcon aria-hidden="true" />
  }
};

export const InputOverrides: Story = {
  args: {
    defaultValue: '',
    results: [],
    InputProps: {
      label: 'Global search',
      hint: 'Search everything across the workspace',
      startIcon: <MapIcon aria-hidden="true" />,
      endIcon: <CircleCheckIcon aria-hidden="true" />
    },
    placeholder: 'Search destinations…'
  }
};

// Ensure the input auto-focuses for all stories so the popover state is visible in Canvas
const _stories = [
  typeof Default !== 'undefined' ? Default : undefined,
  typeof Loading !== 'undefined' ? Loading : undefined,
  typeof NoResults !== 'undefined' ? NoResults : undefined,
  typeof Results !== 'undefined' ? Results : undefined,
  typeof CloseIconOverride !== 'undefined' ? CloseIconOverride : undefined,
  typeof InputOverrides !== 'undefined' ? InputOverrides : undefined
].filter(Boolean) as Array<{ args?: any }>;

for (const s of _stories) {
  s.args = {
    ...s.args,
    InputProps: {
      ...(s.args?.InputProps ?? {}),
      autoFocus: true
    }
  };
}
