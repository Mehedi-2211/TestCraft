/**
 * Playwright Configuration
 *
 * ═══════════════════════════════════════════════════════════════════════════════
 * INSTALLATION REQUIRED - This file requires dependencies to be installed
 * ═══════════════════════════════════════════════════════════════════════════════
 *
 * To fix ALL errors in this file, run:
 *   npm install
 *
 * Common errors BEFORE installation:
 * ✗ "Cannot find module '@playwright/test'"      → Fixed by: npm install
 * ✗ "Cannot find name 'process'"                → Fixed by: npm install (installs @types/node)
 *
 * ═══════════════════════════════════════════════════════════════════════════════
 * OPTIONAL FEATURES - Currently commented out
 * ═══════════════════════════════════════════════════════════════════════════════
 *
 * To enable additional features after npm install:
 * 1. Allure Reporter: Uncomment allure-playwright in reporter section
 * 2. Auth Setup: Uncomment globalSetup and create tests/auth.setup.ts
 * 3. Global Teardown: Uncomment globalTeardown line
 */

// NOTE: This import requires @playwright/test to be installed (run: npm install)
import { defineConfig, devices } from '@playwright/test';

// NOTE: This helper requires the project to be built
// Uncomment after running: npm install
// import { getReportPath } from './src/helpers/reportPath';

// const reportPath = getReportPath();

export default defineConfig({
  testDir: './tests',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 2 : 4,
  reporter: [
    ['html', {
      open: 'never',
      outputFolder: 'playwright-report'
    }],
    ['json', { outputFile: 'results/results.json' }],
    ['junit', { outputFile: 'results/junit.xml' }],
    // OPTIONAL: Uncomment after npm install
    // ['allure-playwright', {
    //   outputFolder: 'reports/allure-results',
    //   detail: true,
    //   suiteTitle: true
    // }]
  ],
  // OPTIONAL: Create tests/auth.setup.ts if needed
  // globalSetup: './tests/auth.setup.ts',
  // OPTIONAL: Uncomment if using global teardown
  // globalTeardown: './src/helpers/globalTeardown.ts',
  use: {
    baseURL: process.env.BASE_URL || 'http://localhost:3000',
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
    actionTimeout: 15_000,
    navigationTimeout: 30_000,
  },
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'] },
    },
    {
      name: 'webkit',
      use: { ...devices['Desktop Safari'] },
    },
    {
      name: 'Mobile Chrome',
      use: { ...devices['Pixel 5'] },
    },
    {
      name: 'Mobile Safari',
      use: { ...devices['iPhone 12'] },
    },
  ],
  outputDir: 'results/test-artifacts',
});
