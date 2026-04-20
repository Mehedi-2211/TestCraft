import { Page } from '@playwright/test';
import { BasePage } from './BasePage';
import { dashboardLocators } from '../locators/dashboard';
import { DashboardData } from '../datas/DashboardData';

/**
 * Dashboard Page Object
 * Handles dashboard interactions and verifications
 */
export class DashboardPage extends BasePage {
  private locators: ReturnType<typeof dashboardLocators>;

  constructor(page: Page) {
    super(page);
    this.locators = dashboardLocators(page);
  }

  // =========================================================================
  // NAVIGATION
  // =========================================================================

  async goto(): Promise<void> {
    await this.page.goto(DashboardData.pages.dashboard);
    await this.isLoaded();
  }

  async isLoaded(): Promise<void> {
    await this.waitForVisible(this.locators.dashboardHeading);
    await this.waitForVisible(this.locators.statCardsContainer);
  }

  // =========================================================================
  // STAT CARDS
  // =========================================================================

  /**
   * Get total devices value
   */
  async getTotalDevicesValue(): Promise<string> {
    return await this.getText(this.locators.statCard(DashboardData.statCards.totalDevices));
  }

  /**
   * Get enrolled devices value
   */
  async getEnrolledDevicesValue(): Promise<string> {
    return await this.getText(this.locators.statCard(DashboardData.statCards.enrolledDevices));
  }

  /**
   * Get online devices value
   */
  async getOnlineDevicesValue(): Promise<string> {
    return await this.getText(this.locators.statCard(DashboardData.statCards.onlineDevices));
  }

  /**
   * Get alerts value
   */
  async getAlertsValue(): Promise<string> {
    return await this.getText(this.locators.statCard(DashboardData.statCards.alerts));
  }

  /**
   * Click stat card
   */
  async clickStatCard(cardName: string): Promise<void> {
    await this.click(this.locators.statCard(cardName));
  }

  // =========================================================================
  // MENU NAVIGATION
  // =========================================================================

  /**
   * Navigate to menu item
   */
  async navigateToMenuItem(item: string): Promise<void> {
    await this.click(this.locators.menuItem(item));
  }

  /**
   * Navigate to devices page
   */
  async navigateToDevices(): Promise<void> {
    await this.navigateToMenuItem(DashboardData.menuItems.devices);
  }

  /**
   * Navigate to users page
   */
  async navigateToUsers(): Promise<void> {
    await this.navigateToMenuItem(DashboardData.menuItems.users);
  }

  /**
   * Navigate to settings page
   */
  async navigateToSettings(): Promise<void> {
    await this.navigateToMenuItem(DashboardData.menuItems.settings);
  }

  // =========================================================================
  // TIME RANGE SELECTOR
  // =========================================================================

  /**
   * Select time range
   */
  async selectTimeRange(range: keyof typeof DashboardData.timeRanges): Promise<void> {
    await this.click(this.locators.timeRangeDropdown);
    await this.click(this.locators.timeRangeOption(DashboardData.timeRanges[range]));
  }

  // =========================================================================
  // CHARTS
  // =========================================================================

  /**
   * Get chart data
   */
  async getChartData(chartType: keyof typeof DashboardData.chartTypes): Promise<string[]> {
    const chart = this.locators.chart(DashboardData.chartTypes[chartType]);
    const segments = await chart.locator('.chart-segment').allTextContents();
    return segments;
  }

  /**
   * Verify chart is displayed
   */
  async isChartVisible(chartType: keyof typeof DashboardData.chartTypes): Promise<boolean> {
    return await this.isVisible(this.locators.chart(DashboardData.chartTypes[chartType]));
  }
}
