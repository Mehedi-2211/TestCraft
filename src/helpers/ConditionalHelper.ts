/**
 * ConditionalHelper - Control flow abstraction for conditionals
 * Use this helper instead of writing if/else in test files
 */

/**
 * Execute if/else logic based on condition
 */
export async function executeIfElse(
  condition: () => Promise<boolean>,
  trueAction: () => Promise<void>,
  falseAction?: () => Promise<void>
): Promise<void> {
  const result = await condition();
  if (result) {
    await trueAction();
  } else if (falseAction) {
    await falseAction();
  }
}

/**
 * Execute action only if element exists
 */
export async function executeIfExists<T>(
  element: T | null | undefined,
  action: (element: T) => Promise<void>
): Promise<void> {
  if (element !== null && element !== undefined) {
    await action(element);
  }
}

/**
 * Switch case implementation
 */
export async function switchCase<K extends string, V>(
  key: K,
  cases: Record<K, () => Promise<V>>,
  defaultCase?: () => Promise<V>
): Promise<V | undefined> {
  const caseFn = cases[key];
  if (caseFn) {
    return await caseFn();
  } else if (defaultCase) {
    return await defaultCase();
  }
  return undefined;
}

/**
 * Assert multiple conditions
 */
export async function assertMultipleConditions(
  conditions: Array<() => Promise<boolean>>
): Promise<boolean[]> {
  const results = await Promise.all(conditions.map((c) => c()));
  return results;
}

/**
 * For each matching item, execute action
 */
export async function forEachMatching<T>(
  array: T[],
  predicate: (item: T) => boolean,
  action: (item: T) => Promise<void>
): Promise<void> {
  const matching = array.filter(predicate);
  for (const item of matching) {
    await action(item);
  }
}

/**
 * Assert value is one of allowed values
 */
export function assertIsOneOf<T>(value: T, allowedValues: T[]): void {
  if (!allowedValues.includes(value)) {
    throw new Error(`Value ${value} is not one of: ${allowedValues.join(', ')}`);
  }
}

/**
 * Match value and execute corresponding action
 */
export async function matchAndExecute<T>(
  value: T,
  matchers: Array<{
    condition: (val: T) => boolean;
    action: (val: T) => Promise<void>;
  }>,
  defaultAction?: (val: T) => Promise<void>
): Promise<void> {
  for (const matcher of matchers) {
    if (matcher.condition(value)) {
      await matcher.action(value);
      return;
    }
  }

  if (defaultAction) {
    await defaultAction(value);
  }
}

/**
 * Wait for condition to be true
 */
export async function waitForCondition(
  condition: () => Promise<boolean>,
  timeout: number = 5000,
  interval: number = 100
): Promise<void> {
  const startTime = Date.now();
  while (Date.now() - startTime < timeout) {
    if (await condition()) {
      return;
    }
    await new Promise((resolve) => setTimeout(resolve, interval));
  }
  throw new Error(`Condition not met within ${timeout}ms`);
}

/**
 * Execute if value is not null/undefined
 */
export async function executeIfNotNil<T>(
  value: T | null | undefined,
  action: (val: T) => Promise<void>
): Promise<void> {
  if (value !== null && value !== undefined) {
    await action(value);
  }
}

/**
 * Execute if value is null/undefined
 */
export async function executeIfNil(
  value: unknown,
  action: () => Promise<void>
): Promise<void> {
  if (value === null || value === undefined) {
    await action();
  }
}

/**
 * Ternary operator equivalent
 */
export async function ternary<T>(
  condition: boolean,
  trueValue: T,
  falseValue: T
): Promise<T> {
  return condition ? trueValue : falseValue;
}

/**
 * Execute based on value range
 */
export async function executeIfInRange(
  value: number,
  min: number,
  max: number,
  inRangeAction: () => Promise<void>,
  outOfRangeAction: () => Promise<void>
): Promise<void> {
  if (value >= min && value <= max) {
    await inRangeAction();
  } else {
    await outOfRangeAction();
  }
}

/**
 * Execute if array contains value
 */
export async function executeIfContains<T>(
  array: T[],
  value: T,
  containsAction: (val: T) => Promise<void>,
  notContainsAction?: () => Promise<void>
): Promise<void> {
  if (array.includes(value)) {
    await containsAction(value);
  } else if (notContainsAction) {
    await notContainsAction();
  }
}

/**
 * Execute if string contains substring
 */
export async function executeIfContainsString(
  text: string,
  substring: string,
  containsAction: () => Promise<void>,
  notContainsAction?: () => Promise<void>
): Promise<void> {
  if (text.includes(substring)) {
    await containsAction();
  } else if (notContainsAction) {
    await notContainsAction();
  }
}
