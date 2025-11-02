import type { Meta, StoryObj } from '@storybook/react';
import * as React from 'react';
import { Dialog, DialogProps } from './Dialog';

const meta: Meta<typeof Dialog> = {
  title: 'Client components/Dialog',
  component: Dialog,
  argTypes: {
    onControlLeftClick: { action: 'control left click' },
    onControlRightClick: { action: 'control right click' },
    open: { control: false },
    defaultOpen: { control: false },
    onOpenChange: { action: 'open change' }
  }
};

export default meta;

type Story = StoryObj<typeof Dialog>;

const renderTrigger = (label: string) => <button type="button">{label}</button>;

const renderContent = () => (
  <div style={{ width: '100%' }}>
    <h2>Team Upgrade</h2>
    <p>Use the navigation controls to preview team members or close to exit.</p>
  </div>
);

export const Default: Story = {
  args: {
    size: 'md'
  },
  render: args => {
    const { ...rest } = args as DialogProps;

    return (
      <Dialog {...rest} trigger={renderTrigger('Open dialog')}>
        {renderContent()}
      </Dialog>
    );
  }
};

export const WithNavigation: Story = {
  args: {
    hasNavigation: true
  },
  render: args => {
    const { ...rest } = args as DialogProps;

    return (
      <Dialog {...rest} trigger={renderTrigger('Open dialog with navigation')}>
        {renderContent()}
      </Dialog>
    );
  }
};

export const Sizes: Story = {
  args: {
    hasNavigation: false
  },
  render: args => {
    const { ...rest } = args as DialogProps;

    return (
      <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
        {(['sm', 'md', 'lg'] as const).map(variant => (
          <Dialog
            key={variant}
            {...rest}
            size={variant}
            trigger={renderTrigger(`Open ${variant} dialog`)}
          >
            {renderContent()}
          </Dialog>
        ))}
      </div>
    );
  }
};