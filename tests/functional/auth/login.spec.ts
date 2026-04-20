import { test, expect } from '@playwright/test';
import { LoginPage } from '../../src/pages/LoginPage';
import { DashboardPage } from '../../src/pages/DashboardPage';
import { UsersPage } from '../../src/pages/UsersPage';
import { UserFactory } from '../../src/datas/UserFactory';
import { PNG_DESIGNS } from '../../src/datas/DesignData';

/**
 * Login Feature Tests
 * Complete test suite for authentication functionality
 */

test.describe('@smoke Authentication', () => {
  test('@critical TC-01: Verify that user can login with valid credentials', async ({ page }) => {
    const loginPage = new LoginPage(page);

    // Arrange
    const userData = UserFactory.create();

    // Act
    await loginPage.goto();
    await loginPage.login(userData.email, userData.password);

    // Assert
    await expect(page).toHaveURL(/dashboard/);
  });

  test('@critical TC-02: Verify that login fails with invalid credentials', async ({ page }) => {
    const loginPage = new LoginPage(page);

    // Arrange
    const invalidUser = UserFactory.create();

    // Act
    await loginPage.goto();
    await loginPage.login(invalidUser.email, 'WrongPassword123!');

    // Assert
    await expect(loginPage.hasErrorMessage()).toBeTruthy();
    await expect(page).toHaveURL(/login/);
  });

  test('@critical TC-03: Verify that email validation works on login', async ({ page }) => {
    const loginPage = new LoginPage(page);

    // Act
    await loginPage.goto();
    await loginPage.login('invalid-email', 'password');

    // Assert
    await expect(loginPage.hasErrorMessage()).toBeTruthy();
  });
});

test.describe('@functional Password Recovery', () => {
  test('TC-04: Verify that user can reset password', async ({ page }) => {
    const loginPage = new LoginPage(page);

    // Act
    await loginPage.goto();
    await loginPage.clickForgotPassword();

    // Assert
    await expect(page).toHaveURL(/forgot-password/);
  });
});

test.describe('@ui Login Page UI Tests', () => {
  test('TC-05: Verify that login page displays all required elements', async ({ page }) => {
    const loginPage = new LoginPage(page);

    // Act
    await loginPage.goto();

    // Assert
    await expect(loginPage.locators.emailInput).toBeVisible();
    await expect(loginPage.locators.passwordInput).toBeVisible();
    await expect(loginPage.locators.loginButton).toBeVisible();
    await expect(loginPage.locators.forgotPasswordLink).toBeVisible();
  });

  test('TC-06: Verify that form labels are correct', async ({ page }) => {
    const loginPage = new LoginPage(page);

    // Act
    await loginPage.goto();

    // Assert
    await expect(loginPage.locators.emailInput).toHaveAttribute('placeholder', /email/i);
    await expect(loginPage.locators.passwordInput).toHaveAttribute('type', 'password');
  });
});
