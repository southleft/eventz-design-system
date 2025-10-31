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
        'Header inline text for cancel affordance. When active and cancelHref is provided, a TextLink will be rendered using this label.'
    },

    /** When provided (and isActive=true), render a TextLink (variant="subtle") in the header. */
    cancelHref: {
      type: 'string',
      description:
        'URL for the Cancel action (active state only). When isActive=true, this MUST be a non-empty string and is rendered via TextLink (variant="subtle").'
    },

    isActive: {
      type: 'boolean',
      default: false,
      description: 'When true, renders account details and shows the Cancel link.'
    },

    nextBillingDate: {
      type: 'string',
      description: 'Value-only (e.g., "Nov 30, 2025"). Required when isActive=true.'
    },

    memberSince: {
      type: 'string',
      description: 'Value-only (e.g., "Jun 2024"). Required when isActive=true.'
    },

    inactiveSubtitle: {
      type: 'string',
      default: 'Cancel anytime.',
      description: 'Subtitle shown only when isActive=false.'
    }
  },

  /**
   * Optional override slot:
   * - If provided, render this slot where the Cancel link/text would go.
   * - Otherwise:
   *    - When isActive=true and cancelHref is non-empty: render TextLink (variant="subtle") using cancelHref + cancelText.
   *    - When isActive=false: render subtitle only (no link).
   */
  slots: ['cancel'] as const,

  styleMap: true,

  rules: [
    {
      validate: props => typeof props.terms === 'string' && props.terms.trim().length > 0,
      message: 'terms must be a non-empty string.'
    },
    {
      validate: props => {
        const { isActive, nextBillingDate, memberSince, cancelHref } = props as Record<
          string,
          unknown
        >;
        if (isActive !== true) return true;
        const nbdOk = typeof nextBillingDate === 'string' && nextBillingDate.trim().length > 0;
        const msOk = typeof memberSince === 'string' && memberSince.trim().length > 0;
        const chOk = typeof cancelHref === 'string' && cancelHref.trim().length > 0;
        return nbdOk && msOk && chOk;
      },
      message:
        'When isActive=true, nextBillingDate, memberSince, and cancelHref must be non-empty strings.'
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
     *   - Apply `slots.cancel` classes ONLY when rendering the plain-text fallback; do NOT wrap or style the TextLink with them.
     * - When `isActive=false`:
     *   - Do not render a link; render only the inactive subtitle below the terms.
     * - If a `cancel` slot is provided, render it instead of the default TextLink.
     */
    generator:
      'Active state: render TextLink with variant="subtle" using cancelHref + cancelText (unless `cancel` slot provided). Inactive state: omit link; show subtitle. Do not apply `slots.cancel` classes to the TextLink—use them only for the plain-text fallback.'
  }
});
