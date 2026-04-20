/**
 * LoopHelper - Control flow abstraction for loops
 * Use this helper instead of writing loops in test files
 */

/**
 * Repeat an action N times with optional assertion after each iteration
 */
export async function repeatAction(
  action: () => Promise<void>,
  iterations: number,
  assertionAfterEach?: () => Promise<void>
): Promise<void> {
  for (let i = 0; i < iterations; i++) {
    await action();
    if (assertionAfterEach) {
      await assertionAfterEach();
    }
  }
}

/**
 * Repeat an action until a condition is met or max attempts reached
 */
export async function repeatUntilCondition(
  action: () => Promise<void>,
  condition: () => Promise<boolean>,
  maxAttempts: number = 5,
  waitBetween: number = 1000
): Promise<void> {
  for (let i = 0; i < maxAttempts; i++) {
    await action();
    const result = await condition();
    if (result) {
      return;
    }
    await new Promise((resolve) => setTimeout(resolve, waitBetween));
  }
  throw new Error(`Condition not met after ${maxAttempts} attempts`);
}

/**
 * Retry an action with exponential backoff
 */
export async function retryAction<T>(
  action: () => Promise<T>,
  maxRetries: number = 3,
  baseDelay: number = 1000
): Promise<T> {
  let lastError: Error | undefined;

  for (let attempt = 0; attempt <= maxRetries; attempt++) {
    try {
      return await action();
    } catch (error) {
      lastError = error as Error;
      if (attempt < maxRetries) {
        const delay = baseDelay * Math.pow(2, attempt);
        await new Promise((resolve) => setTimeout(resolve, delay));
      }
    }
  }

  throw lastError || new Error('Retry failed');
}

/**
 * ForEach with async callback
 */
export async function forEachAsync<T>(
  array: T[],
  callback: (item: T, index: number) => Promise<void>
): Promise<void> {
  for (let i = 0; i < array.length; i++) {
    await callback(array[i], i);
  }
}

/**
 * Repeat action and collect results
 */
export async function repeatAndCollect<T>(
  action: (iteration: number) => Promise<T>,
  iterations: number
): Promise<T[]> {
  const results: T[] = [];
  for (let i = 0; i < iterations; i++) {
    const result = await action(i);
    results.push(result);
  }
  return results;
}

/**
 * ForEach with index and collection access
 */
export async function forEachWithIndex<T>(
  array: T[],
  callback: (item: T, index: number, collection: T[]) => Promise<void>
): Promise<void> {
  for (let i = 0; i < array.length; i++) {
    await callback(array[i], i, array);
  }
}

/**
 * Map with async callback
 */
export async function mapAsync<T, R>(
  array: T[],
  callback: (item: T, index: number) => Promise<R>
): Promise<R[]> {
  const results: R[] = [];
  for (let i = 0; i < array.length; i++) {
    const result = await callback(array[i], i);
    results.push(result);
  }
  return results;
}

/**
 * Filter with async callback
 */
export async function filterAsync<T>(
  array: T[],
  callback: (item: T, index: number) => Promise<boolean>
): Promise<T[]> {
  const results: T[] = [];
  for (let i = 0; i < array.length; i++) {
    const result = await callback(array[i], i);
    if (result) {
      results.push(array[i]);
    }
  }
  return results;
}

/**
 * Reduce with async callback
 */
export async function reduceAsync<T, R>(
  array: T[],
  callback: (accumulator: R, item: T, index: number) => Promise<R>,
  initialValue: R
): Promise<R> {
  let accumulator = initialValue;
  for (let i = 0; i < array.length; i++) {
    accumulator = await callback(accumulator, array[i], i);
  }
  return accumulator;
}
