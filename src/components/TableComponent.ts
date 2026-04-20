import { Page, Locator } from '@playwright/test';

/**
 * Table Component
 * Reusable table component for consistent table interactions
 */
export class TableComponent {
  constructor(
    private page: Page,
    private root: Locator
  ) {}

  /**
   * Get row count
   */
  async getRowCount(): Promise<number> {
    return await this.root.locator('tbody tr').count();
  }

  /**
   * Get cell text
   */
  async getCellText(row: number, columnName: string): Promise<string> {
    const column = await this.getColumnIndex(columnName);
    const cell = this.root.locator(`tbody tr`).nth(row - 1).locator('td').nth(column);
    return await cell.textContent() || '';
  }

  /**
   * Sort by column
   */
  async sortBy(columnName: string, order: 'asc' | 'desc' = 'asc'): Promise<void> {
    const header = this.root.locator(`th:has-text("${columnName}")`);
    await header.click();

    if (order === 'desc') {
      await header.click();
    }
  }

  /**
   * Get column index
   */
  private async getColumnIndex(name: string): Promise<number> {
    const headers = await this.root.locator('th').allTextContents();
    return headers.findIndex((h) => h.includes(name));
  }

  /**
   * Click row action button
   */
  async clickRowAction(row: number, action: string): Promise<void> {
    const rowLocator = this.root.locator('tbody tr').nth(row - 1);
    await rowLocator.locator(`button:has-text("${action}")`).click();
  }

  /**
   * Get all row data
   */
  async getAllRowData(): Promise<string[][]> {
    const rows = await this.root.locator('tbody tr').count();
    const data: string[][] = [];

    for (let i = 0; i < rows; i++) {
      const row = this.root.locator('tbody tr').nth(i);
      const cells = await row.locator('td').allTextContents();
      data.push(cells);
    }

    return data;
  }
}
