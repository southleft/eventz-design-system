// packages/core/src/utilities/mergeDescribedBy/mergeDescribedBy.ts

function isStringArray(v: unknown): v is readonly string[] {
  return Array.isArray(v) && v.every(x => typeof x === 'string');
}

export function mergeDescribedBy(
  existing?: string,
  addition?: string | readonly string[]
): string | undefined {
  const tokens = new Set<string>();

  const add = (val?: string) => {
    if (!val) return;
    const trimmed = val.trim();
    if (trimmed.length === 0) return;
    for (const t of trimmed.split(/\s+/u).filter(Boolean)) {
      tokens.add(t);
    }
  };

  if (existing) add(existing);
  if (isStringArray(addition)) {
    for (const a of addition) add(a);
  } else if (typeof addition === 'string') {
    add(addition);
  }

  if (tokens.size === 0) {
    return undefined;
  }
  return Array.from(tokens).join(' ');
}
