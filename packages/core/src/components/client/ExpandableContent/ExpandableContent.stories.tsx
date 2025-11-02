// packages/core/src/components/ExpandableContent/ExpandableContent.stories.tsx
import type { Meta, StoryObj } from '@storybook/react';
import { ExpandableContent } from '@doxyz-ui/core/client-components';

const sampleParagraph = `
 Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin tincidunt pellentesque accumsan. Pellentesque quis fermentum lectus. Interdum et malesuada fames ac ante ipsum primis in faucibus. Maecenas dictum arcu ac nunc gravida posuere. Maecenas consectetur nunc at iaculis ultricies. Etiam id turpis risus. Phasellus massa diam, porttitor vel urna in, pellentesque convallis diam. Donec at maximus mauris. Mauris in venenatis metus, ut congue massa. Integer lobortis tristique diam eget finibus. Morbi pretium fringilla felis ut tempor. Aenean bibendum a tellus id venenatis. Aenean non porttitor leo, eu elementum lectus. Duis arcu mi, tincidunt sed imperdiet et, mollis vitae elit. Duis pretium lectus et lacinia accumsan. Nunc eu ligula et nulla ultrices vehicula.
Duis vel elementum dui. Vestibulum dictum lectus eget odio iaculis, eu porttitor velit consectetur. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Suspendisse sagittis tellus in porttitor sodales. Quisque mollis ligula leo, in fermentum dui volutpat quis. Sed in turpis ut felis ultricies hendrerit sed auctor magna. Vestibulum iaculis aliquam scelerisque. Etiam id erat quis nunc fermentum rhoncus. Vestibulum imperdiet lorem ligula, quis scelerisque ex dignissim id. Nulla facilisi. Integer semper tellus augue, gravida luctus lacus venenatis id. Vivamus vel justo bibendum orci porttitor bibendum. Phasellus aliquam massa eu nulla commodo, sit amet pharetra ligula lacinia.
Sed venenatis rhoncus purus, ut interdum leo facilisis id. Nam quis posuere magna. Maecenas ultrices tristique sagittis. Maecenas magna dui, aliquet at risus sit amet, mattis aliquam nisi. Quisque id libero risus. Duis a risus lorem. In condimentum ut massa id efficitur. Aliquam tristique pellentesque molestie. Fusce ultrices, odio sed convallis faucibus, metus nulla porta nibh, ac aliquam arcu nisi nec nisi. Donec id sem at arcu aliquam lobortis. Fusce sem purus, convallis sit amet dapibus sed, aliquet at ligula. Vivamus posuere quam justo, non eleifend erat maximus ac. `;

const meta: Meta<typeof ExpandableContent> = {
  title: 'Client components/ExpandableContent',
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