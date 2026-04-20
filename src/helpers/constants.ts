/**
 * Constants used throughout the test framework
 */

/**
 * Timeout values for different operations
 */
export const TIMEOUTS = {
  // Action timeouts
  action: 15_000, // Click, fill, select
  navigation: 30_000, // Page navigation
  apiCall: 10_000, // API requests

  // Test timeouts
  test: 60_000, // Single test execution
  suite: 300_000, // Test suite execution
  slowTest: 120_000, // Slow test threshold

  // Wait timeouts
  shortWait: 1_000, // Quick UI settle
  mediumWait: 3_000, // Medium wait
  longWait: 10_000, // Long wait
  veryLongWait: 30_000, // Very long wait

  // Specific timeouts
  elementVisible: 10_000,
  elementHidden: 10_000,
  networkIdle: 30_000,
} as const;

/**
 * Common application routes
 */
export const ROUTES = {
  login: '/login',
  dashboard: '/dashboard',
  users: '/users',
  devices: '/devices',
  settings: '/settings',
  profile: '/profile',
  logout: '/logout',
} as const;

/**
 * Test tags for organizing and filtering tests
 */
export const TAGS = {
  // Test Type
  smoke: '@smoke',
  sanity: '@sanity',
  regression: '@regression',
  uat: '@uat',
  production: '@production',

  // Test Level
  critical: '@critical',
  high: '@high',
  medium: '@medium',
  low: '@low',

  // Feature Areas
  auth: '@auth',
  users: '@users',
  devices: '@devices',
  dashboard: '@dashboard',
  api: '@api',
  ui: '@ui',

  // Platform
  mobile: '@mobile',
  desktop: '@desktop',

  // Special
  slow: '@slow', // Long-running tests
  flaky: '@flaky', // Known flaky tests
  wip: '@wip', // Work in progress
  readonly: '@readonly', // Read-only operations (production)
} as const;

/**
 * User roles
 */
export const USER_ROLES = {
  admin: 'admin',
  user: 'user',
  guest: 'guest',
  readonly: 'readonly',
} as const;

/**
 * Common error messages
 */
export const ERROR_MESSAGES = {
  elementNotFound: 'Element not found',
  elementNotVisible: 'Element not visible',
  timeout: 'Operation timed out',
  networkError: 'Network error occurred',
  unauthorized: 'Unauthorized access',
} as const;

/**
 * Validation patterns
 */
export const VALIDATION_PATTERNS = {
  email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  url: /^https?:\/\/.+/,
  number: /^\d+$/,
  phoneNumber: /^\+?[\d\s-()]+$/,
  password: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/,
} as const;

/**
 * Test data constants
 */
export const TEST_DATA = {
  maxRetries: 3,
  defaultTimeout: 5000,
  apiTimeout: 10000,
  screenshotTimeout: 3000,
} as const;
