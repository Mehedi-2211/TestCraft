import { Page, Locator } from '@playwright/test';

/**
 * Dropdown Component
 * Reusable dropdown select component
 */
export class DropdownComponent {
  constructor(
    private page: Page,
    private root: Locator
  ) {}

  /**
   * Open dropdown
   */
  async open(): Promise<void> {
    await this.root.click();
  }

  /**
   * Select option by value
   */
  async selectByValue(value: string): Promise<void> {
    await this.root.selectOption(value);
  }

  /**
   * Select option by text
   */
  async selectByText(text: string): Promise<void> {
    const option = this.root.locator(`option:has-text("${text}")`);
    await option.click();
  }

  /**
   * Select option by index
   */
  async selectByIndex(index: number): Promise<void> {
    const options = await this.root.locator('option').all();
    await options[index].click();
  }

  /**
   * Get selected value
   */
  async getSelectedValue(): Promise<string> {
    return await this.root.inputValue();
  }

  /**
   * Get all available options
   */
  async getOptions(): Promise<string[]> {
    return await this.root.locator('option').allTextContents();
  }

  /**
   * Is dropdown disabled
   */
  async isDisabled(): Promise<boolean> {
    return await this.root.isDisabled();
  }

  /**
   * Is dropdown open
   */
  async isOpen(): Promise<boolean> {
    // This depends on implementation - adjust selector
    const expandedAttr = await this.root.getAttribute('aria-expanded');
    return expandedAttr === 'true';
  }

  /**
   * Get placeholder text
   */
  async getPlaceholder(): Promise<string> {
    return await this.root.getAttribute('placeholder') || '';
  }
}
