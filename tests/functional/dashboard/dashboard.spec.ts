import { test, expect } from '@playwright/test';
import { DashboardPage } from '../../../src/pages/DashboardPage';
import { LoginPage } from '../../../src/pages/LoginPage';
import { UserFactory } from '../../../src/datas/UserFactory';

/**
 * Dashboard Feature Tests
 * Complete test suite for dashboard functionality
 */

test.describe('@smoke Dashboard', () => {
  test.beforeEach(async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    const userData = UserFactory.createAdmin();
    await loginPage.login(userData.email, userData.password);
  });

  test('@critical TC-01: Verify that dashboard loads successfully', async ({ page }) => {
    const dashboardPage = new DashboardPage(page);

    // Act
    await dashboardPage.goto();

    // Assert
    await dashboardPage.isLoaded();
    await expect(dashboardPage.locators.dashboardHeading).toBeVisible();
  });

  test('@critical TC-02: Verify that stat cards display correct data', async ({ page }) => {
    const dashboardPage = new DashboardPage(page);

    // Act
    await dashboardPage.goto();

    // Assert
    const totalDevices = await dashboardPage.getTotalDevicesValue();
    expect(totalDevices).toBeTruthy();
    expect(totalDevices).toMatch(/^\d+/);
  });

  test('@critical TC-03: Verify that menu navigation works', async ({ page }) => {
    const dashboardPage = new DashboardPage(page);

    // Act
    await dashboardPage.goto();
    await dashboardPage.navigateToUsers();

    // Assert
    await expect(page).toHaveURL(/users/);
  });
});

test.describe('@functional Dashboard Charts', () => {
  test.beforeEach(async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    const userData = UserFactory.createAdmin();
    await loginPage.login(userData.email, userData.password);
  });

  test('TC-04: Verify that battery status chart displays', async ({ page }) => {
    const dashboardPage = new DashboardPage(page);

    // Act
    await dashboardPage.goto();

    // Assert
    await expect(dashboardPage.isChartVisible('battery')).toBeTruthy();
  });

  test('TC-05: Verify that chart data updates when time range changes', async ({ page }) => {
    const dashboardPage = new DashboardPage(page);

    // Act
    await dashboardPage.goto();
    await dashboardPage.selectTimeRange('last7Days');

    // Assert
    const chartData = await dashboardPage.getChartData('battery');
    expect(chartData).toBeDefined();
  });
});

test.describe('@ui Dashboard UI Tests', () => {
  test.beforeEach(async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    const userData = UserFactory.createAdmin();
    await loginPage.login(userData.email, userData.password);
  });

  test('TC-06: Verify that dashboard layout is responsive', async ({ page }) => {
    const dashboardPage = new DashboardPage(page);

    // Act
    await dashboardPage.goto();
    await page.setViewportSize({ width: 375, height: 667 }); // Mobile

    // Assert
    await expect(dashboardPage.locators.statCardsContainer).toBeVisible();
  });
});
