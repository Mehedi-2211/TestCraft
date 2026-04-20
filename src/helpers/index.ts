// Helper Barrel Exports
export { TIMEOUTS, ROUTES, TAGS, USER_ROLES, ERROR_MESSAGES, VALIDATION_PATTERNS, TEST_DATA } from './constants';
export {
  generateEmail,
  generateUsername,
  generatePassword,
  generateDeviceId,
  generateMacAddress,
  generateSerialNumber,
  generatePhoneNumber,
  generateCompanyName,
  randomInt,
  randomItem,
  randomDate,
  UserDataBuilder,
  DeviceDataBuilder,
} from './testData';
export { ENV, getTestRailConfig, isProduction, isCI, getAdjustedTimeout } from './env';

// LoopHelper exports
export {
  repeatAction,
  repeatUntilCondition,
  retryAction,
  forEachAsync,
  repeatAndCollect,
  forEachWithIndex,
  mapAsync,
  filterAsync,
  reduceAsync,
} from './LoopHelper';

// ConditionalHelper exports
export {
  executeIfElse,
  executeIfExists,
  switchCase,
  assertMultipleConditions,
  forEachMatching,
  assertIsOneOf,
  matchAndExecute,
  waitForCondition,
  executeIfNotNil,
  executeIfNil,
  ternary,
  executeIfInRange,
  executeIfContains,
  executeIfContainsString,
} from './ConditionalHelper';

// ErrorHelper exports
export {
  tryCatch,
  tryOrElse,
  tryCatchReturn,
  tryCatchWithDefault,
  executeMultipleSafe,
  verifyAllSucceed,
  expectError,
  withTimeout,
  retryOnError,
  executeWithErrorLogging,
  catchAndRethrow,
  tryCatchFinally,
  validateNoError,
  batchExecute,
} from './ErrorHelper';

// DataHelper exports
export {
  extractValues,
  filterByCondition,
  groupByKey,
  compareDatasets,
  assertCustomEqual,
  assertArrayContainsExactly,
  assertAllMatch,
  assertMinimumMatches,
  transformAndAssert,
  flatten,
  extractNumber,
  extractAllNumbers,
  sanitize,
  normalizeWhitespace,
  sortByKey,
  unique,
  findDuplicates,
  mergeUnique,
  chunk,
  pick,
  omit,
  deepClone,
  mergeDeep,
} from './DataHelper';
