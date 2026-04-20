/**
 * Environment Configuration Management
 * Loads and validates environment variables
 */

import dotenv from 'dotenv';

// Load environment variables from .env file
dotenv.config();

/**
 * Environment configuration interface
 */
interface Environment {
  // Application URLs
  baseUrl: string;
  apiUrl: string;

  // Test credentials
  testUsername: string;
  testPassword: string;
  productionTestUser: string;
  productionTestPassword: string;

  // Test configuration
  headless: boolean;
  slowMo: number;
  timeoutMultiplier: number;

  // CI/CD flags
  isCI: boolean;
  buildNumber: string;

  // TestRail configuration (optional)
  testRailHost: string;
  testRailUsername: string;
  testRailApiKey: string;
  testRailProjectId: string;
  testRailSuiteId: string;
  testRailParentSectionId: string;

  // Reporting
  reportPort: number;
  allureResultsDir: string;
}

/**
 * Environment configuration object
 */
export const ENV: Environment = {
  // Application URLs
  baseUrl: process.env.BASE_URL || 'http://localhost:3000',
  apiUrl: process.env.API_URL || 'http://localhost:3000/api',

  // Test credentials
  testUsername: process.env.TEST_USERNAME || 'test@example.com',
  testPassword: process.env.TEST_PASSWORD || 'TestPassword123!',
  productionTestUser: process.env.PRODUCTION_TEST_USER || 'prod_test@example.com',
  productionTestPassword: process.env.PRODUCTION_TEST_PASSWORD || 'ProdTestPassword123!',

  // Test configuration
  headless: process.env.HEADLESS === 'true',
  slowMo: parseInt(process.env.SLOW_MO || '0'),
  timeoutMultiplier: parseFloat(process.env.TIMEOUT_MULTIPLIER || '1'),

  // CI/CD flags
  isCI: process.env.CI === 'true',
  buildNumber: process.env.BUILD_NUMBER || 'local',

  // TestRail configuration (optional)
  testRailHost: process.env.TESTRAIL_HOST || '',
  testRailUsername: process.env.TESTRAIL_USERNAME || '',
  testRailApiKey: process.env.TESTRAIL_API_KEY || '',
  testRailProjectId: process.env.TESTRAIL_PROJECT_ID || '',
  testRailSuiteId: process.env.TESTRAIL_SUITE_ID || '',
  testRailParentSectionId: process.env.TESTRAIL_PARENT_SECTION_ID || '',

  // Reporting
  reportPort: parseInt(process.env.REPORT_PORT || '9323'),
  allureResultsDir: process.env.ALLURE_RESULTS_DIR || 'reports/allure-results',
};

/**
 * Validate required environment variables
 */
function validateEnv(): void {
  const required = ['baseUrl', 'testUsername', 'testPassword'];
  const missing = required.filter((key) => {
    const value = ENV[key as keyof Environment];
    return !value || value === '';
  });

  if (missing.length > 0) {
    throw new Error(`❌ Missing required environment variables: ${missing.join(', ')}`);
  }

  console.log('✅ Environment variables validated successfully');
  console.log(`🌐 Base URL: ${ENV.baseUrl}`);
  console.log(`🔑 Test User: ${ENV.testUsername}`);
  console.log(`🏗️ CI Mode: ${ENV.isCI}`);
}

// Validate environment on import
validateEnv();

/**
 * Get TestRail configuration if available
 */
export function getTestRailConfig(): { host: string; username: string; apiKey: string } | null {
  if (!ENV.testRailHost || !ENV.testRailUsername || !ENV.testRailApiKey) {
    console.log('⚠️ TestRail configuration not found. TestRail features will be disabled.');
    return null;
  }

  return {
    host: ENV.testRailHost,
    username: ENV.testRailUsername,
    apiKey: ENV.testRailApiKey,
  };
}

/**
 * Check if running in production environment
 */
export function isProduction(): boolean {
  return ENV.baseUrl.includes('production') || ENV.baseUrl.includes('.com');
}

/**
 * Check if running in CI environment
 */
export function isCI(): boolean {
  return ENV.isCI;
}

/**
 * Get timeout adjusted by multiplier
 */
export function getAdjustedTimeout(baseTimeout: number): number {
  return baseTimeout * ENV.timeoutMultiplier;
}
