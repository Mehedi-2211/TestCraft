import { Page } from '@playwright/test';

/**
 * Dashboard Locators
 * Selectors for dashboard elements
 */
export const dashboardLocators = (page: Page) => ({
  // Page structure
  dashboardHeading: page.locator('[data-testid="dashboard-heading"]'),
  statCardsContainer: page.locator('[data-testid="stat-cards-container"]'),

  // Stat cards
  statCard: (cardName: string) => page.locator(`[data-testid="stat-card-${cardName}"]`),

  // Navigation menu
  menu: page.locator('[data-testid="main-menu"]'),
  menuItem: (itemName: string) => page.locator(`[data-testid="menu-item-${itemName}"]`),

  // Time range selector
  timeRangeDropdown: page.locator('[data-testid="time-range-dropdown"]'),
  timeRangeOption: (range: string) => page.locator(`[data-testid="time-range-${range}"]`),

  // Charts
  chart: (chartType: string) => page.locator(`[data-testid="chart-${chartType}"]`),

  // Breadcrumb
  breadcrumb: page.locator('[data-testid="breadcrumb"]'),
}) as const;
