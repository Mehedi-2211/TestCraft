/**
 * ErrorHelper - Error handling abstraction
 * Use this helper instead of try/catch in test files
 */

/**
 * Try/catch with explicit error handling
 */
export async function tryCatch(
  action: () => Promise<void>,
  description: string,
  softFail: boolean = false
): Promise<{ success: boolean; error?: Error }> {
  try {
    await action();
    return { success: true };
  } catch (error) {
    const err = error as Error;
    if (!softFail) {
      console.error(`❌ ${description} failed:`, err.message);
    }
    return { success: false, error: err };
  }
}

/**
 * Try or else - execute alternative if action fails
 */
export async function tryOrElse(
  action: () => Promise<void>,
  alternativeAction: () => Promise<void>
): Promise<void> {
  try {
    await action();
  } catch {
    await alternativeAction();
  }
}

/**
 * Try/catch/return - return default value on error
 */
export async function tryCatchReturn<T>(
  action: () => Promise<T>,
  defaultValue: T
): Promise<T> {
  try {
    return await action();
  } catch {
    return defaultValue;
  }
}

/**
 * Try/catch with custom default value
 */
export async function tryCatchWithDefault<T>(
  action: () => Promise<T>,
  defaultValueFactory: () => T
): Promise<T> {
  try {
    return await action();
  } catch {
    return defaultValueFactory();
  }
}

/**
 * Execute multiple actions safely
 */
export async function executeMultipleSafe(
  actions: Array<() => Promise<void>>
): Promise<Array<{ action: () => Promise<void>; success: boolean; error?: Error }>> {
  const results = [];
  for (const action of actions) {
    const result = await tryCatch(action, 'executeMultipleSafe');
    results.push({ action, success: result.success, error: result.error });
  }
  return results;
}

/**
 * Verify all actions succeed
 */
export async function verifyAllSucceed(
  actions: Array<() => Promise<void>>
): Promise<boolean> {
  const results = await executeMultipleSafe(actions);
  return results.every((r) => r.success);
}

/**
 * Expect error to be thrown
 */
export async function expectError(
  action: () => Promise<void>,
  expectedErrorMessage?: string
): Promise<void> {
  try {
    await action();
    throw new Error('Expected error was not thrown');
  } catch (error) {
    const err = error as Error;
    if (expectedErrorMessage && !err.message.includes(expectedErrorMessage)) {
      throw new Error(
        `Expected error message "${expectedErrorMessage}" but got "${err.message}"`
      );
    }
  }
}

/**
 * With timeout - execute action with timeout
 */
export async function withTimeout<T>(
  action: () => Promise<T>,
  timeoutMs: number,
  timeoutMessage: string = 'Action timed out'
): Promise<T> {
  const timeoutPromise = new Promise<never>((_, reject) => {
    setTimeout(() => reject(new Error(timeoutMessage)), timeoutMs);
  });

  return Promise.race([action(), timeoutPromise]);
}

/**
 * Execute with retry on specific error
 */
export async function retryOnError<T>(
  action: () => Promise<T>,
  shouldRetry: (error: Error) => boolean,
  maxRetries: number = 3
): Promise<T> {
  let lastError: Error | undefined;

  for (let attempt = 0; attempt <= maxRetries; attempt++) {
    try {
      return await action();
    } catch (error) {
      lastError = error as Error;
      if (!shouldRetry(lastError) || attempt >= maxRetries) {
        break;
      }
      // Exponential backoff
      await new Promise((resolve) => setTimeout(resolve, Math.pow(2, attempt) * 1000));
    }
  }

  throw lastError || new Error('Retry failed');
}

/**
 * Execute action and log error but don't throw
 */
export async function executeWithErrorLogging(
  action: () => Promise<void>,
  errorMessage: string = 'Action failed'
): Promise<void> {
  try {
    await action();
  } catch (error) {
    const err = error as Error;
    console.error(`❌ ${errorMessage}:`, err.message);
  }
}

/**
 * Catch and rethrow with custom message
 */
export async function catchAndRethrow(
  action: () => Promise<void>,
  customMessage: string
): Promise<never> {
  try {
    await action();
    throw new Error('Expected action to throw an error');
  } catch (error) {
    const err = error as Error;
    throw new Error(`${customMessage}: ${err.message}`);
  }
}

/**
 * Try/catch finally - execute cleanup regardless of success/failure
 */
export async function tryCatchFinally(
  action: () => Promise<void>,
  cleanup: () => Promise<void>,
  handleError?: (error: Error) => Promise<void>
): Promise<void> {
  try {
    await action();
  } catch (error) {
    const err = error as Error;
    if (handleError) {
      await handleError(err);
    }
    throw err;
  } finally {
    await cleanup();
  }
}

/**
 * Validate no error thrown
 */
export async function validateNoError(
  action: () => Promise<void>,
  description: string = 'Action should not throw error'
): Promise<void> {
  try {
    await action();
  } catch (error) {
    const err = error as Error;
    throw new Error(`${description}: ${err.message}`);
  }
}

/**
 * Batch execute with individual error handling
 */
export async function batchExecute<T>(
  items: T[],
  action: (item: T) => Promise<void>,
  continueOnError: boolean = true
): Promise<Array<{ item: T; success: boolean; error?: Error }>> {
  const results = [];
  for (const item of items) {
    try {
      await action(item);
      results.push({ item, success: true });
    } catch (error) {
      const err = error as Error;
      results.push({ item, success: false, error: err });
      if (!continueOnError) {
        break;
      }
    }
  }
  return results;
}
