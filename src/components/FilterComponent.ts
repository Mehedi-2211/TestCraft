import { Page, Locator } from '@playwright/test';

/**
 * Filter Component
 * Reusable filter component for consistent filter interactions
 */
export class FilterComponent {
  constructor(
    private page: Page,
    private root: Locator
  ) {}

  /**
   * Select filter option
   */
  async selectFilter(filterName: string, option: string): Promise<void> {
    const filter = this.root.locator(`[data-testid="filter-${filterName}"]`);
    await filter.click();

    const optionLocator = filter.locator(`[data-testid="option-${option}"]`);
    await optionLocator.click();
  }

  /**
   * Clear all filters
   */
  async clearAll(): Promise<void> {
    const clearButton = this.root.locator('button:has-text("Clear")');
    if (await clearButton.isVisible()) {
      await clearButton.click();
    }
  }

  /**
   * Get active filters
   */
  async getActiveFilters(): Promise<string[]> {
    const activeFilters = this.root.locator('[data-testid="active-filter"]');
    const count = await activeFilters.count();
    const filters: string[] = [];

    for (let i = 0; i < count; i++) {
      const filterText = await activeFilters.nth(i).textContent();
      filters.push(filterText || '');
    }

    return filters;
  }

  /**
   * Check if filter is active
   */
  async isFilterActive(filterName: string): Promise<boolean> {
    const activeFilter = this.root.locator(`[data-testid="active-filter-${filterName}"]`);
    return await activeFilter.isVisible();
  }
}
