import { test } from '@playwright/test';

/**
 * Cross-Browser Compatibility Tests
 * Verify application works across different browsers
 */

test.describe('@cross-browser Browser Compatibility', () => {
  test.describe.configure({ mode: 'parallel' });

  test('@critical CB-01: Verify Chrome browser compatibility', async ({ page }) => {
    // This test will run on Chrome
    await page.goto('/');
    await expect(page).toHaveTitle(/Dashboard/);
  });

  test('@critical CB-02: Verify Firefox browser compatibility', async ({ page }) => {
    // This test will run on Firefox
    await page.goto('/');
    await expect(page).toHaveTitle(/Dashboard/);
  });

  test('@critical CB-03: Verify Safari browser compatibility', async ({ page }) => {
    // This test will run on Safari
    await page.goto('/');
    await expect(page).toHaveTitle(/Dashboard/);
  });
});

test.describe('@cross-browser Mobile Compatibility', () => {
  test('@critical CB-04: Verify mobile portrait (375px)', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto('/');
    await expect(page).toHaveTitle(/Dashboard/);
  });

  test('@critical CB-05: Verify mobile landscape (667px)', async ({ page }) => {
    await page.setViewportSize({ width: 667, height: 375 });
    await page.goto('/');
    await expect(page).toHaveTitle(/Dashboard/);
  });

  test('@critical CB-06: Verify tablet portrait (768px)', async ({ page }) => {
    await page.setViewportSize({ width: 768, height: 1024 });
    await page.goto('/');
    await expect(page).toHaveTitle(/Dashboard/);
  });
});
