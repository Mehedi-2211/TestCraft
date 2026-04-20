import { test, expect } from '@playwright/test';

/**
 * Production Tests - Safe Production Validation
 * Purpose: Verify production environment health without affecting real users
 * Execution Time: Continuous (scheduled)
 * When: After production deployment, ongoing monitoring
 */

test.describe('@production @readonly Health Checks', () => {
  test('@critical should verify application health endpoint', async ({ request }) => {
    const response = await request.get('/api/health');
    expect(response.ok()).toBeTruthy();

    const health = await response.json();
    expect(health.status).toBe('healthy');
  });

  test('@critical should verify critical APIs responding', async ({ request }) => {
    const criticalEndpoints = ['/api/users', '/api/devices', '/api/dashboard'];

    for (const endpoint of criticalEndpoints) {
      const response = await request.get(endpoint);
      expect(response.ok(), `${endpoint} should respond`).toBeTruthy();
    }
  });

  test('@critical should verify authentication service', async ({ page }) => {
    await page.goto('/login');
    await expect(page.locator('h1')).toContainText('Sign In');
  });
});
