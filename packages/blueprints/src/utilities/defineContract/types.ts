// packages/blueprints/src/utilities/defineContract/types.ts

/** Primitive prop kinds supported in blueprints. */
export type ContractPropKind =
  | 'string'
  | 'boolean'
  | 'number'
  | 'enum'
  | 'slot'
  | 'event'
  | 'callback';

/** Base shape shared by all prop definitions. */
interface BasePropDef {
  /** Human-friendly description; useful for agent UIs and docs. */
  description?: string;
  /** Whether the prop must be provided by the caller. */
  required?: boolean;
}

/** String prop. */
export interface StringPropDef extends BasePropDef {
  type: 'string';
  default?: string;
}

/** Boolean prop. */
export interface BooleanPropDef extends BasePropDef {
  type: 'boolean';
  default?: boolean;
}

/** Number prop. */
export interface NumberPropDef extends BasePropDef {
  type: 'number';
  default?: number;
}

/** Object prop. */
export interface ObjectPropDef extends BasePropDef {
  type: 'object';
  default?: object;
}

/**
 * Enum prop.
 * Use a const tuple for `options` to get default narrowing:
 *  options: ['primary','secondary'] as const
 */
export interface EnumPropDef<TOptions extends readonly string[] = readonly string[]>
  extends BasePropDef {
  type: 'enum';
  options: TOptions;
  default?: TOptions[number];
}

/** Slot prop — a placeholder for slottable content (icons, loaders, custom nodes). */
export interface SlotPropDef extends BasePropDef {
  type: 'slot';
}

/** Event prop — describes an emitted callback signature. */
export interface EventPropDef extends BasePropDef {
  type: 'event';
  /** Ordered list of argument signatures, e.g., ['expanded: boolean']. */
  args: readonly string[];
}

/** Callback prop — preferred alias for event-style callbacks. */
export interface CallbackPropDef extends BasePropDef {
  type: 'callback';
  /** Ordered list of argument signatures, e.g., ['expanded: boolean']. */
  args: readonly string[];
}

/** Union of all supported prop definitions. */
export type PropDef =
  | StringPropDef
  | BooleanPropDef
  | NumberPropDef
  | ObjectPropDef
  | SlotPropDef
  | EnumPropDef
  | EventPropDef
  | CallbackPropDef;

/** Record of prop name → definition. */
export type PropsTable = Record<string, PropDef>;

/** Simple implication/validation rules to guide generators. */
export type ContractRule =
  | {
      /** A small validator; return true when props are valid. */
      validate: (props: Record<string, unknown>) => boolean;
      /** Message to show when validate returns false. */
      message: string;
    }
  | {
      /** When these props are true/equal, imply the following props/values. */
      when: Partial<Record<string, unknown>>;
      /** Props/values to imply when `when` matches. */
      imply?: Partial<Record<string, unknown>>;
      /** Optional human hint for the agent. */
      hint?: string;
      /** Optional message to display when implication is applied. */
      message?: string;
    };

/** Layout node for composing slots. */
export interface LayoutNode {
  /** Slot name to render at this position (mutually exclusive with children-only containers). */
  slot?: string;
  /** HTML tag to use for this node. */
  tag?: string;
  /** Class list to apply (Tailwind utilities / token classes). */
  className?: string | string[];
  /** Child nodes (for containers). */
  children?: LayoutNode[];
}

/** Layout spec for the root of a component. */
export interface LayoutSpec {
  /** For now we only support container; add more kinds later if needed. */
  type: 'container';
  /** HTML tag for the root element. */
  tag: string;
  /** Root className (string or list). */
  className?: string | string[];
  /** Children in render order. */
  children?: LayoutNode[];
}

/** Adapter and accessibility hints for generators (backward-compatible). */
export interface ContractHints {
  radixAdapter?: {
    /**
     * Structural primitives used by the generator (preferred).
     * Example: { uses: ['Checkbox'] }
     */
    uses?: readonly string[];

    /**
     * Legacy Radix Themes variant mapping (kept for back-compat).
     * Example: map our design variants to Radix Themes Button props.
     */
    variantMap?: Record<
      string,
      {
        /** Radix Themes variant. */
        variant: 'solid' | 'soft' | 'ghost' | 'outline' | 'classic';
        /** Radix color token (optional). */
        color?: string;
      }
    >;
  };

  /**
   * Accessibility guidance. Accepts either:
   *  - a concise string hint (preferred), or
   *  - an object with a `recommendation` field (legacy), or
   *  - structured flags used by older contracts.
   */
  a11y?:
    | string
    | { recommendation: string }
    | {
        loadingAddsAriaBusy?: boolean;
        preserveFocusRing?: boolean;
      };

  /**
   * Additional adapter/prompt guidance fields. These are informational only and
   * are not interpreted by the schema checker.
   */
  [key: string]: unknown;
}

/** The top-level blueprint contract spec. */
export interface ContractSpec {
  /** One-line description for docs/agents. */
  description?: string;
  /** Logical DoXYZ component name, e.g., 'Button'. */
  component: string;
  /** Optional passthrough type for component props (e.g., 'React.SVGAttributes<SVGSVGElement>'). */
  extends?: string;
  /**
   * Radix Themes primitive to wrap, e.g., 'Button', 'Badge'.
   * Unless otherwise noted, base refers to @radix-ui/themes.
   */
  base: string | string[];
  /** Public props table for the component. */
  props: PropsTable;
  /**
   * Ordered list of slot names. The names here may correspond to `type:'slot'` props; generators can source slots from this list.
   * Example: ['startIcon','label','endIcon']
   */
  slots?: readonly string[];
  /** Optional layout composition hint for generators. */
  layout?: LayoutSpec;
  /** Simple validation/implication rules. */
  rules?: readonly ContractRule[];
  /**
   * Indicates a styleMap exists for this component (or name of the styleMap to use).
   * Most components set `true`.
   */
  styleMap?: boolean | string;
  /** Optional adapter/a11y hints. */
  hints?: ContractHints;
}
