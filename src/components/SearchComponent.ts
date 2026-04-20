import { Page, Locator } from '@playwright/test';

/**
 * Search Component
 * Reusable search component for consistent search interactions
 */
export class SearchComponent {
  constructor(
    private page: Page,
    private root: Locator
  ) {}

  /**
   * Enter search query
   */
  async search(query: string): Promise<void> {
    const searchInput = this.root.locator('input[type="search"], input[placeholder*="Search" i]');
    await searchInput.fill(query);

    // Wait for debounce
    await this.page.waitForTimeout(500);
  }

  /**
   * Clear search
   */
  async clear(): Promise<void> {
    const searchInput = this.root.locator('input[type="search"], input[placeholder*="Search" i]');
    await searchInput.clear();
  }

  /**
   * Get search results count
   */
  async getResultsCount(): Promise<number> {
    const results = this.root.locator('[data-testid="search-results"]');
    return await results.locator('> *').count();
  }

  /**
   * Click search result by index
   */
  async clickResult(index: number): Promise<void> {
    const results = this.root.locator('[data-testid="search-results"]');
    await results.locator('> *').nth(index).click();
  }

  /**
   * Get all result texts
   */
  async getAllResultTexts(): Promise<string[]> {
    const results = this.root.locator('[data-testid="search-results"]');
    return await results.locator('> *').allTextContents();
  }
}
