// packages/blueprints/src/components/SubscriptionCard/SubscriptionCard.contract.ts
import { defineContract } from '../../utilities';

export const SubscriptionCardContract = defineContract({
  component: 'SubscriptionCard',
  description:
    'Presentational card showing current or available subscription state. Server component; no interactivity.',
  base: 'div',

  props: {
    terms: {
      type: 'string',
      required: true,
      description: 'Visible plan terms, e.g., "$12 per month".'
    },

    cancelText: {
      type: 'string',
      default: 'Cancel',
      description:
        'Header inline text label for the Cancel affordance. Used as the TextLink label when isActive=true. Ignored when isActive=false (no cancel text in the inactive header).'
    },

    /** When provided (and isActive=true), render a TextLink (variant="subtle") in the header. */
    cancelHref: {
      type: 'string',
      description:
        'URL for the Cancel action (active state only). When isActive=true, provide a non-empty string.'
    },

    isActive: {
      type: 'boolean',
      default: false,
      description: 'When true, renders account details and shows the Cancel link.'
    },

    nextBillingDate: {
      type: 'string',
      description: 'Value-only (e.g., "Nov 30, 2025"). Provide when isActive=true.'
    },

    memberSince: {
      type: 'string',
      description: 'Value-only (e.g., "Jun 2024"). Provide when isActive=true.'
    },

    inactiveSubtitle: {
      type: 'string',
      default: 'Cancel anytime.',
      description: 'Subtitle shown only when isActive=false.'
    }
  },

  /**
   * Optional override slot:
   * - If provided AND isActive=true, render this slot in the header where the Cancel affordance appears.
   * - Otherwise:
   *    - When isActive=true and cancelHref is non-empty: render TextLink (variant="subtle") using cancelHref + cancelText.
   *    - When isActive=false: render the subtitle only; do NOT render header cancel text/link and do NOT render the `cancel` slot.
   */
  slots: ['cancel'] as const,

  styleMap: true,

  // NOTE: No runtime validation. These hints guide generation only.
  rules: [
    {
      hint: 'Inactive state behavior: omit header cancel entirely and ignore cancelHref/cancelText and the `cancel` slot. Render only inactiveSubtitle beneath terms.'
    },
    {
      hint: 'Do NOT add runtime guards/validation in the component. Rely on TypeScript for types and story/test coverage for usage guidance.'
    },
    {
      hint: 'Server component, base <div>. Do not add focus/interactive semantics to the container. The Cancel affordance is an inline TextLink when active.'
    }
  ],

  hints: {
    a11y: 'Container is presentational. The Cancel TextLink provides its own role/name. No nested interactive controls other than the single inline link.',
    /**
     * Generator directive:
     * - When `isActive=true` and no custom `cancel` slot is provided:
     *   - Import { TextLink } from the local core path: `../TextLink`
     *   - Render <TextLink variant="subtle" href={cancelHref} label={cancelText} />
     * - When `isActive=false`:
     *   - Omit header cancel entirely (ignore `cancel` slot and cancel* props); render only the inactive subtitle below the terms.
     * - If a `cancel` slot is provided AND isActive=true, render it instead of the default TextLink.
     */
    generator:
      'Active: render TextLink (variant="subtle") with cancelHref + cancelText unless a `cancel` slot is provided. Inactive: omit header cancel entirely (ignore `cancel` slot and cancel* props); render subtitle only.'
  }
});
