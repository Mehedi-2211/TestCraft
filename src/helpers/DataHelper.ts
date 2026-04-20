/**
 * DataHelper - Data transformation and manipulation
 * Use this helper for data operations in test files
 */

/**
 * Extract values from array of objects
 */
export function extractValues<T, K extends keyof T>(array: T[], key: K): T[K][] {
  return array.map((item) => item[key]);
}

/**
 * Filter array by condition
 */
export function filterByCondition<T>(
  array: T[],
  condition: (item: T) => boolean
): T[] {
  return array.filter(condition);
}

/**
 * Group array by key
 */
export function groupByKey<T, K extends keyof T>(array: T[], key: K): Record<string, T[]> {
  return array.reduce((groups, item) => {
    const groupKey = String(item[key]);
    if (!groups[groupKey]) {
      groups[groupKey] = [];
    }
    groups[groupKey].push(item);
    return groups;
  }, {} as Record<string, T[]>);
}

/**
 * Compare two datasets
 */
export function compareDatasets<T>(
  actual: T[],
  expected: T[],
  compareFn: (a: T, b: T) => boolean
): { match: boolean; missing: T[]; extra: T[] } {
  const missing: T[] = [];
  const extra: [...expected] = [...actual];

  for (const exp of expected) {
    const found = extra.findIndex((act) => compareFn(act, exp));
    if (found === -1) {
      missing.push(exp);
    } else {
      extra.splice(found, 1);
    }
  }

  return {
    match: missing.length === 0 && extra.length === 0,
    missing,
    extra,
  };
}

/**
 * Custom equal assertion
 */
export function assertCustomEqual<T>(actual: T, expected: T, message?: string): void {
  const isEqual = JSON.stringify(actual) === JSON.stringify(expected);
  if (!isEqual) {
    throw new Error(
      message || `Expected ${JSON.stringify(expected)} but got ${JSON.stringify(actual)}`
    );
  }
}

/**
 * Assert array contains exact items
 */
export function assertArrayContainsExactly<T>(
  actual: T[],
  expected: T[],
  compareFn?: (a: T, b: T) => boolean
): void {
  const compare = compareFn || ((a: T, b: T) => a === b);

  if (actual.length !== expected.length) {
    throw new Error(
      `Array length mismatch: expected ${expected.length} but got ${actual.length}`
    );
  }

  for (const exp of expected) {
    const found = actual.some((act) => compare(act, exp));
    if (!found) {
      throw new Error(`Expected array to contain ${JSON.stringify(exp)}`);
    }
  }
}

/**
 * Assert all items match condition
 */
export function assertAllMatch<T>(array: T[], condition: (item: T) => boolean): void {
  const failures = array.filter((item) => !condition(item));
  if (failures.length > 0) {
    throw new Error(`${failures.length} items do not match condition`);
  }
}

/**
 * Assert minimum matches in array
 */
export function assertMinimumMatches<T>(
  array: T[],
  condition: (item: T) => boolean,
  minimum: number
): void {
  const matches = array.filter(condition).length;
  if (matches < minimum) {
    throw new Error(`Expected at least ${minimum} matches but found ${matches}`);
  }
}

/**
 * Transform and assert
 */
export function transformAndAssert<T, R>(
  data: T[],
  transform: (item: T) => R,
  assertion: (transformed: R[]) => void
): void {
  const transformed = data.map(transform);
  assertion(transformed);
}

/**
 * Flatten nested arrays
 */
export function flatten<T>(array: (T | T[])[]): T[] {
  return array.reduce((flat, item) => {
    return flat.concat(Array.isArray(item) ? flatten(item as T[][]) : item);
  }, [] as T[]);
}

/**
 * Extract number from string
 */
export function extractNumber(text: string): number | null {
  const match = text.match(/\d+/);
  return match ? parseInt(match[0], 10) : null;
}

/**
 * Extract all numbers from string
 */
export function extractAllNumbers(text: string): number[] {
  const matches = text.match(/\d+/g);
  return matches ? matches.map((m) => parseInt(m, 10)) : [];
}

/**
 * Sanitize string for comparison
 */
export function sanitize(text: string): string {
  return text
    .trim()
    .replace(/\s+/g, ' ')
    .replace(/[\r\n\t]/g, '')
    .toLowerCase();
}

/**
 * Normalize whitespace
 */
export function normalizeWhitespace(text: string): string {
  return text.replace(/\s+/g, ' ').trim();
}

/**
 * Sort array of objects by key
 */
export function sortByKey<T, K extends keyof T>(array: T[], key: K): T[] {
  return [...array].sort((a, b) => {
    const aVal = a[key];
    const bVal = b[key];
    if (aVal < bVal) return -1;
    if (aVal > bVal) return 1;
    return 0;
  });
}

/**
 * Unique array items
 */
export function unique<T>(array: T[]): T[] {
  return Array.from(new Set(array));
}

/**
 * Find duplicates in array
 */
export function findDuplicates<T>(array: T[], key?: keyof T): T[] {
  const seen = new Set<any>();
  const duplicates: T[] = [];

  for (const item of array) {
    const identifier = key ? item[key] : item;
    if (seen.has(identifier)) {
      duplicates.push(item);
    } else {
      seen.add(identifier);
    }
  }

  return duplicates;
}

/**
 * Merge arrays without duplicates
 */
export function mergeUnique<T>(...arrays: T[][]): T[] {
  return unique(flatten(arrays));
}

/**
 * Chunk array into smaller arrays
 */
export function chunk<T>(array: T[], size: number): T[][] {
  const chunks: T[][] = [];
  for (let i = 0; i < array.length; i += size) {
    chunks.push(array.slice(i, i + size));
  }
  return chunks;
}

/**
 * Pick specific keys from object
 */
export function pick<T, K extends keyof T>(obj: T, keys: K[]): Pick<T, K> {
  const result = {} as Pick<T, K>;
  keys.forEach((key) => {
    if (key in obj) {
      result[key] = obj[key];
    }
  });
  return result;
}

/**
 * Omit specific keys from object
 */
export function omit<T, K extends keyof T>(obj: T, keys: K[]): Omit<T, K> {
  const result = { ...obj };
  keys.forEach((key) => {
    delete result[key];
  });
  return result as Omit<T, K>;
}

/**
 * Deep clone object
 */
export function deepClone<T>(obj: T): T {
  return JSON.parse(JSON.stringify(obj));
}

/**
 * Merge objects
 */
export function mergeDeep<T extends object>(target: T, ...sources: Partial<T>[]): T {
  if (!sources.length) return target;
  const source = sources.shift();

  if (isObject(target) && isObject(source)) {
    for (const key in source) {
      if (isObject(source[key])) {
        if (!target[key]) Object.assign(target, { [key]: {} });
        mergeDeep(target[key], source[key]);
      } else {
        Object.assign(target, { [key]: source[key] });
      }
    }
  }

  return mergeDeep(target, ...sources);
}

function isObject(item: unknown): item is Record<string, unknown> {
  return Boolean(item && typeof item === 'object' && !Array.isArray(item));
}
