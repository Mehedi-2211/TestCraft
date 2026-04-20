import { test, expect } from '@playwright/test';
import { LoginPage } from '../../src/pages/LoginPage';
import { UserFactory } from '../../src/datas/UserFactory';

/**
 * UAT - Business Workflow Tests
 * Real-world user scenarios validating business requirements
 */

test.describe('@uat User Onboarding Workflow', () => {
  test('UAT-01: Verify that complete new user onboarding workflow works', async ({ page }) => {
    // This is a real business scenario test

    // Step 1: Admin invites user
    const adminUser = UserFactory.createAdmin();
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await loginPage.login(adminUser.email, adminUser.password);

    // Navigate to user management (assumes this works after login)
    await page.goto('/users');

    // Step 2: Click invite button and fill form
    const newUserEmail = `newuser@company.com`;
    await page.click('[data-testid="invite-user-button"]');
    await page.fill('[data-testid="invite-email-input"]', newUserEmail);
    await page.selectOption('[data-testid="invite-role-select"]', 'Standard User');
    await page.click('[data-testid="send-invite-button"]');

    // Step 3: Verify invitation sent
    const successMessage = page.locator('[data-testid="success-message"]');
    await expect(successMessage).toContainText('Invitation sent');

    // Step 4: User receives and accepts invitation (simulated)
    // In real scenario, this would come from email
    const inviteLink = `/accept-invite?token=test-token`;
    await page.goto(inviteLink);

    // Step 5: User completes registration
    await page.fill('[data-testid="password-input"]', 'SecurePassword123!');
    await page.fill('[data-testid="confirm-password-input"]', 'SecurePassword123!');
    await page.click('[data-testid="complete-registration"]');

    // Step 6: Verify user can access system
    await expect(page).toHaveURL(/dashboard/);
    await expect(page.locator('h1')).toContainText('Welcome');

    // Step 7: Verify user has appropriate permissions
    await page.click('[data-testid="user-menu"]');
    await expect(page.locator('[data-testid="settings-option"]')).toBeVisible();
    await expect(page.locator('[data-testid="admin-option"]')).not.toBeVisible(); // Not admin
  });

  test('UAT-02: Verify dashboard information accuracy for reporting', async ({ page }) => {
    const userData = UserFactory.createAdmin();
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await loginPage.login(userData.email, userData.password);

    // Navigate to dashboard
    await page.goto('/dashboard');

    // Business requirement: Dashboard shows accurate device counts
    const totalDevices = await page.locator('[data-testid="stat-card-total"]').textContent();
    expect(totalDevices).toMatch(/\d+/);

    // Business requirement: Data is refreshed and current
    await page.click('[data-testid="refresh-button"]');
    await expect(page.locator('[data-testid="last-updated"]')).toBeVisible();
  });
});
