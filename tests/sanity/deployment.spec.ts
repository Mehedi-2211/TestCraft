import { test, expect } from '@playwright/test';

/**
 * Sanity Tests - Post-Deployment Verification
 * Purpose: Quick verification after deployment/config changes
 * Execution Time: <5 minutes
 * When: After deployment, configuration updates, hotfixes
 */

test.describe('@sanity Post-Deployment Checks', () => {
  test('@critical should load application successfully', async ({ page }) => {
    await page.goto('/');
    await expect(page).toHaveTitle(/Dashboard/);
  });

  test('@critical should allow user login', async ({ page }) => {
    // Template - implement actual login test
  });

  test('@critical should access primary API endpoints', async ({ request }) => {
    const response = await request.get('/api/health');
    expect(response.ok()).toBeTruthy();
  });

  test('@critical should load critical resources', async ({ page }) => {
    await page.goto('/');
    const performanceEntries = await page.evaluate(() =>
      performance.getEntriesByType('resource')
    );

    const failedResources = performanceEntries.filter((entry: any) =>
      entry.transferSize === 0 && entry.initiatorType === 'script'
    );

    expect(failedResources.length).toBe(0);
  });
});
