// packages/core/src/components/ExpandableContent/ExpandableContent.stories.tsx
import type { Meta, StoryObj } from '@storybook/react';
import * as React from 'react';
import { ExpandableContent } from './ExpandableContent';

const sampleParagraph = `
  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec at felis a orci efficitur gravida.
`;

const longText = `${sampleParagraph.repeat(6)}Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae.`;

const meta: Meta<typeof ExpandableContent> = {
  title: 'Components/ExpandableContent',
  component: ExpandableContent,
  argTypes: {
    onExpandedChange: { action: 'expanded change' }
  }
};

export default meta;

type Story = StoryObj<typeof ExpandableContent>;

export const Default: Story = {
  args: {
    defaultExpanded: false,
    children: sampleParagraph.repeat(3)
  }
};

export const WithDefaultExpanded: Story = {
  args: {
    defaultExpanded: true,
    children: sampleParagraph.repeat(3)
  }
};

export const Controlled: Story = {
  args: {
    expanded: false,
    children: sampleParagraph.repeat(3)
  },
  render: args => {
    const [expanded, setExpanded] = React.useState(args.expanded ?? false);

    React.useEffect(() => {
      setExpanded(args.expanded ?? false);
    }, [args.expanded]);

    return (
      <ExpandableContent
        {...args}
        expanded={expanded}
        onExpandedChange={next => {
          setExpanded(next);
          args.onExpandedChange?.(next);
        }}
      >
        {args.children}
      </ExpandableContent>
    );
  }
};

export const LongContent: Story = {
  args: {
    defaultExpanded: false,
    children: longText
  }
};
