/**
 * Global Teardown - Runs after all tests complete
 * Handles report generation and cleanup
 */

import { FullConfig } from '@playwright/test';
import { getLatestReportPath, cleanOldReports } from './reportPath';

/**
 * Global teardown function
 * Called automatically by Playwright after all tests complete
 */
async function globalTeardown(config: FullConfig): Promise<void> {
  console.log('🏁 Global teardown started');

  // Clean old reports (keep last 10)
  try {
    cleanOldReports(10);
  } catch (error) {
    console.error('❌ Error cleaning old reports:', error);
  }

  // Get latest report path
  const latestReportPath = getLatestReportPath();
  if (latestReportPath) {
    console.log(`📊 Latest report: ${latestReportPath}`);
    console.log('📊 View HTML report: npx playwright show-report');
    console.log('📊 View Allure report: npm run report:allure');
  }

  console.log('✅ Global teardown completed');
}

export default globalTeardown;
