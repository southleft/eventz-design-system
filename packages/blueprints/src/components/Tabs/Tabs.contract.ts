import { defineContract } from '../../utilities';

export const TabsContract = defineContract({
  component: 'Tabs',
  description: 'Tabbed interface built on Radix Tabs with two trigger render modes.',
  base: 'Tabs',

  props: {
    type: {
      type: 'enum',
      options: ['section', 'button'] as const,
      default: 'section',
      description: 'Trigger rendering mode. Section renders styled tab triggers; button wraps each trigger in Button via asChild.'
    },
    tabsList: {
      type: 'array',
      required: true,
      description:
        'Array of tab descriptors. Each item must include { value: string; label: string; content: slot; icon?: slot; disabled?: boolean; forceMount?: boolean }.',
      of: {
        type: 'object',
        shape: {
          value: {
            type: 'string',
            required: true,
            description: 'Unique identifier for the tab (not enforced by the contract).'
          },
          label: {
            type: 'string',
            required: true,
            description: 'Visible text for the tab trigger. Must be non-empty.'
          },
          content: {
            type: 'slot',
            required: true,
            description: 'Content rendered inside Tabs.Content for the tab.'
          },
          icon: {
            type: 'slot',
            description: 'Optional leading icon shown for section mode triggers; ignored when type=button.'
          },
          disabled: {
            type: 'boolean',
            description: 'Disables this tab trigger when true.'
          },
          forceMount: {
            type: 'boolean',
            description: 'Passthrough to Tabs.Content forceMount; when present it must be true (Radix literal flag).'
          }
        }
      }
    },
    value: {
      type: 'string',
      description: 'Controlled active tab value.'
    },
    defaultValue: {
      type: 'string',
      description: 'Uncontrolled initial tab value.'
    },
    onValueChange: {
      type: 'callback',
      args: ['value: string'],
      description: 'Called when the active tab changes: (value: string) => void.'
    },
    activationMode: {
      type: 'enum',
      options: ['automatic', 'manual'] as const,
      description: 'Radix activationMode passthrough. Undefined uses Radix default.'
    },
    loop: {
      type: 'boolean',
      default: false,
      description: 'When true, keyboard navigation loops from end to start of the tab list.'
    },
    ariaLabel: {
      type: 'string',
      required: true,
      description: 'Accessible label applied to the tab list container.'
    },
    disabled: {
      type: 'boolean',
      default: false,
      description:
        'Global disabled state. Disables all triggers and freezes selection unless parent controls value.'
    }
  },

  slots: ['base', 'list', 'trigger', 'content'] as const,

  rules: [
    {
      validate: (props: Record<string, unknown>) => {
        const ariaLabel = props['ariaLabel'];
        return typeof ariaLabel === 'string' && ariaLabel.trim().length > 0;
      },
      message: 'ariaLabel must be non-empty'
    }
  ],

  styleMap: true,

  hints: {
    radixAdapter: { uses: ['Tabs', 'Button'] as const },
    notes: [
      'type=section: style Tabs.Trigger directly; optional start icon is decorative (aria-hidden).',
      'type=button: Tabs.Trigger asChild → Button; no icons; no Button prop passthrough.',
      'Global disabled disables all triggers; per-item disabled only disables that trigger.',
      'forceMount passes through to Tabs.Content for the matching item.'
    ]
  }
});
