import type { Meta, StoryObj } from '@storybook/react';
import { InteractiveListItem, InteractiveListItemProps } from '@doxyz-ui/core/server-components';

const meta: Meta<InteractiveListItemProps> = {
  title: 'Server components/InteractiveListItem',
  component: InteractiveListItem,
  args: {
    title: 'Account settings',
    supportingText: 'Manage how your account appears to others.',
    highlightText: 'Last updated 2 days ago',
    imgSrc: 'https://placehold.co/80x80',
    imgAlt: 'Account avatar placeholder',
    isRemovable: false,
    borderBottom: true
  }
};

export default meta;

type Story = StoryObj<InteractiveListItemProps>;

export const Default: Story = {};

export const Removable: Story = {
  args: {
    title: 'Remove account from list',
    isRemovable: true
  }
};

export const AsLink: Story = {
  args: {
    title: 'Manage account security',
    highlightText: 'Requires authentication',
    href: '#'
  }
};