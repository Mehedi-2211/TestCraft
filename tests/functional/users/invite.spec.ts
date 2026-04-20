import { test, expect } from '@playwright/test';
import { LoginPage } from '../../../src/pages/LoginPage';
import { UsersPage } from '../../../src/pages/UsersPage';
import { UserFactory } from '../../../src/datas/UserFactory';

/**
 * User Management Feature Tests
 * Complete test suite for user management functionality
 */

test.describe('@smoke User Management', () => {
  test.beforeEach(async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    const userData = UserFactory.createAdmin();
    await loginPage.login(userData.email, userData.password);
  });

  test('@critical TC-01: Verify that users page loads successfully', async ({ page }) => {
    const usersPage = new UsersPage(page);

    // Act
    await usersPage.goto();

    // Assert
    await usersPage.isLoaded();
    await expect(usersPage.locators.pageHeading).toBeVisible();
  });

  test('@critical TC-02: Verify that user count is displayed', async ({ page }) => {
    const usersPage = new UsersPage(page);

    // Act
    await usersPage.goto();

    // Assert
    const userCount = await usersPage.getUserCount();
    expect(userCount).toBeGreaterThanOrEqual(0);
  });
});

test.describe('@functional User CRUD Operations', () => {
  test.beforeEach(async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    const userData = UserFactory.createAdmin();
    await loginPage.login(userData.email, userData.password);
  });

  test('TC-03: Verify that admin can invite new user', async ({ page }) => {
    const usersPage = new UsersPage(page);
    const newUser = UserFactory.create();

    // Act
    await usersPage.goto();
    await usersPage.inviteUser(newUser.email, 'user');

    // Assert
    await expect(usersPage.locators.successMessage).toBeVisible();
  });

  test('TC-04: Verify that users can be searched', async ({ page }) => {
    const usersPage = new UsersPage(page);
    const existingUser = UserFactory.create();

    // Act
    await usersPage.goto();
    await usersPage.searchUsers(existingUser.email);

    // Assert
    const found = await usersPage.userExists(existingUser.email);
    expect(found).toBe(true);
  });

  test('TC-05: Verify that users can be filtered by status', async ({ page }) => {
    const usersPage = new UsersPage(page);

    // Act
    await usersPage.goto();
    await usersPage.filterByStatus('active');

    // Assert
    // Verify filter applied
    await expect(page.locator('[data-testid="status-active"]')).toBeVisible();
  });
});

test.describe('@functional User Data Retrieval', () => {
  test.beforeEach(async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    const userData = UserFactory.createAdmin();
    await loginPage.login(userData.email, userData.password);
  });

  test('TC-06: Verify that user details can be retrieved', async ({ page }) => {
    const usersPage = new UsersPage(page);

    // Act
    await usersPage.goto();
    const userRole = await usersPage.getUserRole(1);

    // Assert
    expect(userRole).toBeTruthy();
  });
});
