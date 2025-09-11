// packages/blueprints/src/utilities/defineStyleMap/types.ts

/** Class lists are arrays of Tailwind/token classes. */
export type ClassList = string | string[];

/**
 * styleMap spec:
 * - base: always-applied classes
 * - slots: classes for root container and named slots
 * - layout: boolean toggles (e.g., fullWidth)
 * - variants: keys must match contract variant options
 * - state: extra hooks (e.g., data-[loading=true])
 */
export interface StyleMapSpec {
  /** Component name, e.g., 'Button' (optional if your defineStyleMap infers it). */
  component?: string;

  base?: ClassList;

  slots?: {
    /** Root container class list (optional but common). */
    container?: ClassList;
    /** Additional entries must match contract slot names: startIcon, label, endIcon, etc. */
    [slotName: string]: ClassList | undefined;
  };

  layout?: Record<string, ClassList>;

  variants?: Record<string, ClassList>;

  state?: Record<string, ClassList>;
}
