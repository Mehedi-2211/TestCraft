import { test, expect } from '@playwright/test';
import { LoginPage } from '../../src/pages/LoginPage';
import { PNG_DESIGNS } from '../../src/datas/DesignData';

/**
 * Visual Regression Tests for Login Page
 * Compares current UI against reference PNG screenshots
 */

test.describe('@ui Visual Regression - Login Page', () => {
  test('VR-01: Verify that login page UI matches reference PNG exactly', async ({ page }) => {
    // Arrange
    const loginPage = new LoginPage(page);

    // Act
    await loginPage.goto();

    // Assert - Full page visual comparison
    await expect(page).toHaveScreenshot(PNG_DESIGNS.loginPage, {
      maxDiffPixels: 0,
      fullPage: true,
    });
  });

  test('VR-02: Verify that login form layout matches reference', async ({ page }) => {
    // Arrange
    const loginPage = new LoginPage(page);

    // Act
    await loginPage.goto();
    const loginForm = page.locator('[data-testid="login-form"]');

    // Assert - Component level comparison
    await expect(loginForm).toHaveScreenshot(PNG_DESIGNS.loginPage, {
      maxDiffPixels: 100,
    });
  });
});
