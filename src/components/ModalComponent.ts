import { Page, Locator } from '@playwright/test';

/**
 * Modal Component
 * Reusable modal dialog component
 */
export class ModalComponent {
  constructor(
    private page: Page,
    private root: Locator
  ) {}

  /**
   * Open modal
   */
  async open(): Promise<void> {
    await this.root.click();
  }

  /**
   * Close modal
   */
  async close(): Promise<void> {
    const closeButton = this.root.locator('[data-testid="modal-close"]');
    await closeButton.click();
  }

  /**
   * Is modal visible
   */
  async isVisible(): Promise<boolean> {
    return await this.root.isVisible();
  }

  /**
   * Wait for modal to be visible
   */
  async waitForVisible(): Promise<void> {
    await this.root.waitFor({ state: 'visible' });
  }

  /**
   * Wait for modal to be hidden
   */
  async waitForHidden(): Promise<void> {
    await this.root.waitFor({ state: 'hidden' });
  }

  /**
   * Get modal title
   */
  async getTitle(): Promise<string> {
    const title = this.root.locator('[data-testid="modal-title"]');
    return await title.textContent() || '';
  }

  /**
   * Click modal action button
   */
  async clickAction(action: string): Promise<void> {
    const button = this.root.locator(`button:has-text("${action}")`);
    await button.click();
  }

  /**
   * Click cancel button
   */
  async clickCancel(): Promise<void> {
    const cancelButton = this.root.locator('[data-testid="modal-cancel"]');
    await cancelButton.click();
  }

  /**
   * Click confirm button
   */
  async clickConfirm(): Promise<void> {
    const confirmButton = this.root.locator('[data-testid="modal-confirm"]');
    await confirmButton.click();
  }

  /**
   * Is action button enabled
   */
  async isActionEnabled(action: string): Promise<boolean> {
    const button = this.root.locator(`button:has-text("${action}")`);
    return await button.isEnabled();
  }
}
