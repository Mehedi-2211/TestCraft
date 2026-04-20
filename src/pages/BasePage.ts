import { Page, Locator, expect } from '@playwright/test';
import { TIMEOUTS } from '../helpers/constants';

/**
 * Base Page Object
 * All page objects should extend this class
 * Provides common methods for page interactions
 */
export abstract class BasePage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  // =========================================================================
  // ABSTRACT METHODS - Must be implemented by child classes
  // =========================================================================

  /**
   * Navigate to the page
   */
  abstract goto(): Promise<void>;

  /**
   * Verify that the page is loaded
   */
  abstract isLoaded(): Promise<void>;

  // =========================================================================
  // NAVIGATION METHODS
  // =========================================================================

  /**
   * Navigate to URL and wait for page load
   */
  async navigateTo(url: string): Promise<void> {
    await this.page.goto(url);
    await this.page.waitForLoadState('networkidle');
  }

  /**
   * Reload current page
   */
  async reload(): Promise<void> {
    await this.page.reload();
    await this.page.waitForLoadState('networkidle');
  }

  /**
   * Go back in browser history
   */
  async goBack(): Promise<void> {
    await this.page.goBack();
    await this.page.waitForLoadState('networkidle');
  }

  // =========================================================================
  // ACTION METHODS
  // =========================================================================

  /**
   * Click on an element
   */
  async click(locator: Locator): Promise<void> {
    await locator.click({ timeout: TIMEOUTS.action });
  }

  /**
   * Double click on an element
   */
  async doubleClick(locator: Locator): Promise<void> {
    await locator.dblclick({ timeout: TIMEOUTS.action });
  }

  /**
   * Right click on an element
   */
  async rightClick(locator: Locator): Promise<void> {
    await locator.click({ button: 'right', timeout: TIMEOUTS.action });
  }

  /**
   * Fill an input field with text
   */
  async fill(locator: Locator, text: string): Promise<void> {
    await locator.fill(text);
  }

  /**
   * Clear an input field
   */
  async clear(locator: Locator): Promise<void> {
    await locator.clear();
  }

  /**
   * Select an option from a dropdown
   */
  async selectOption(locator: Locator, value: string): Promise<void> {
    await locator.selectOption(value);
  }

  /**
   * Check a checkbox
   */
  async check(locator: Locator): Promise<void> {
    await locator.check();
  }

  /**
   * Uncheck a checkbox
   */
  async uncheck(locator: Locator): Promise<void> {
    await locator.uncheck();
  }

  /**
   * Upload a file
   */
  async uploadFile(locator: Locator, filePath: string): Promise<void> {
    await locator.setInputFiles(filePath);
  }

  /**
   * Hover over an element
   */
  async hover(locator: Locator): Promise<void> {
    await locator.hover();
  }

  // =========================================================================
  // QUERY METHODS
  // =========================================================================

  /**
   * Get text content of an element
   */
  async getText(locator: Locator): Promise<string> {
    return await locator.textContent() || '';
  }

  /**
   * Get input value of an element
   */
  async getInputValue(locator: Locator): Promise<string> {
    return await locator.inputValue();
  }

  /**
   * Get inner HTML of an element
   */
  async getHTML(locator: Locator): Promise<string> {
    return await locator.innerHTML();
  }

  /**
   * Get attribute value of an element
   */
  async getAttribute(locator: Locator, attributeName: string): Promise<string | null> {
    return await locator.getAttribute(attributeName);
  }

  /**
   * Check if element is visible
   */
  async isVisible(locator: Locator): Promise<boolean> {
    return await locator.isVisible();
  }

  /**
   * Check if element is enabled
   */
  async isEnabled(locator: Locator): Promise<boolean> {
    return await locator.isEnabled();
  }

  /**
   * Check if element is checked
   */
  async isChecked(locator: Locator): Promise<boolean> {
    return await locator.isChecked();
  }

  /**
   * Get count of elements
   */
  async getCount(locator: Locator): Promise<number> {
    return await locator.count();
  }

  // =========================================================================
  // WAIT METHODS
  // =========================================================================

  /**
   * Wait for element to be visible
   */
  async waitForVisible(locator: Locator, timeout?: number): Promise<void> {
    await locator.waitFor({ state: 'visible', timeout });
  }

  /**
   * Wait for element to be hidden
   */
  async waitForHidden(locator: Locator, timeout?: number): Promise<void> {
    await locator.waitFor({ state: 'hidden', timeout });
  }

  /**
   * Wait for element to be attached to DOM
   */
  async waitForAttached(locator: Locator, timeout?: number): Promise<void> {
    await locator.waitFor({ state: 'attached', timeout });
  }

  /**
   * Wait for element to be detached from DOM
   */
  async waitForDetached(locator: Locator, timeout?: number): Promise<void> {
    await locator.waitFor({ state: 'detached', timeout });
  }

  /**
   * Wait for navigation to complete
   */
  async waitForNavigation(): Promise<void> {
    await this.page.waitForLoadState('networkidle');
  }

  /**
   * Wait for specific timeout
   */
  async waitForTimeout(milliseconds: number): Promise<void> {
    await this.page.waitForTimeout(milliseconds);
  }

  // =========================================================================
  // ASSERTION HELPER METHODS
  // =========================================================================

  /**
   * Assert element contains text
   */
  async shouldContainText(locator: Locator, text: string): Promise<void> {
    await expect(locator).toContainText(text);
  }

  /**
   * Assert element has text
   */
  async haveText(locator: Locator, text: string): Promise<void> {
    await expect(locator).toHaveText(text);
  }

  /**
   * Assert element is visible
   */
  async shouldBeVisible(locator: Locator): Promise<void> {
    await expect(locator).toBeVisible();
  }

  /**
   * Assert element is hidden
   */
  async shouldBeHidden(locator: Locator): Promise<void> {
    await expect(locator).toBeHidden();
  }

  /**
   * Assert element exists
   */
  async shouldExist(locator: Locator): Promise<void> {
    await expect(locator).toHaveCount(1);
  }

  /**
   * Assert element has attribute value
   */
  async haveAttribute(locator: Locator, attribute: string, value: string): Promise<void> {
    await expect(locator).toHaveAttribute(attribute, value);
  }

  /**
   * Assert element has class
   */
  async haveClass(locator: Locator, className: string): Promise<void> {
    await expect(locator).toHaveClass(className);
  }

  // =========================================================================
  // UTILITY METHODS
  // =========================================================================

  /**
   * Take screenshot
   */
  async takeScreenshot(options?: { path?: string; fullPage?: boolean }): Promise<void> {
    await this.page.screenshot(options);
  }

  /**
   * Get page URL
   */
  async getUrl(): Promise<string> {
    return this.page.url();
  }

  /**
   * Get page title
   */
  async getTitle(): Promise<string> {
    return await this.page.title();
  }

  /**
   * Execute JavaScript in page context
   */
  async evaluate<R>(pageFunction: () => R): Promise<R> {
    return await this.page.evaluate(pageFunction);
  }

  /**
   * Execute JavaScript with element
   */
  async evaluateOnElement<R, Arg>(
    locator: Locator,
    pageFunction: (element: HTMLElement, arg: Arg) => R,
    arg: Arg
  ): Promise<R> {
    return await locator.evaluate(pageFunction, arg);
  }
}
