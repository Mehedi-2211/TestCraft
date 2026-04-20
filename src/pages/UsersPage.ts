import { Page } from '@playwright/test';
import { BasePage } from './BasePage';
import { userManagementLocators } from '../locators/user-management';
import { UserFactory } from '../datas/UserFactory';

/**
 * Users Page Object
 * Handles user management operations
 */
export class UsersPage extends BasePage {
  private locators: ReturnType<typeof userManagementLocators>;

  constructor(page: Page) {
    super(page);
    this.locators = userManagementLocators(page);
  }

  // =========================================================================
  // NAVIGATION
  // =========================================================================

  async goto(): Promise<void> {
    await this.page.goto('/users');
    await this.isLoaded();
  }

  async isLoaded(): Promise<void> {
    await this.waitForVisible(this.locators.pageHeading);
  }

  // =========================================================================
  // USER ACTIONS
  // =========================================================================

  /**
   * Invite new user
   */
  async inviteUser(email: string, role: string): Promise<void> {
    await this.click(this.locators.inviteButton);
    await this.fill(this.locators.inviteEmailInput, email);
    await this.selectOption(this.locators.inviteRoleSelect, role);
    await this.click(this.locators.sendInviteButton);
  }

  /**
   * Search users
   */
  async searchUsers(query: string): Promise<void> {
    await this.fill(this.locators.searchInput, query);
    await this.page.waitForTimeout(500); // Wait for debounce
  }

  /**
   * Filter by status
   */
  async filterByStatus(status: string): Promise<void> {
    await this.click(this.locators.statusFilter);
    await this.click(this.locators.statusOption(status));
  }

  // =========================================================================
  // QUERIES
  // =========================================================================

  /**
   * Get user count
   */
  async getUserCount(): Promise<number> {
    return await this.getCount(this.locators.userRows);
  }

  /**
   * Get user email by row
   */
  async getUserEmail(row: number): Promise<string> {
    const userRow = this.locators.userRows.nth(row - 1);
    const emailCell = userRow.locator('[data-testid="user-email"]');
    return await this.getText(emailCell);
  }

  /**
   * Get user role by row
   */
  async getUserRole(row: number): Promise<string> {
    const userRow = this.locators.userRows.nth(row - 1);
    const roleCell = userRow.locator('[data-testid="user-role"]');
    return await this.getText(roleCell);
  }

  /**
   * Get user status by row
   */
  async getUserStatus(row: number): Promise<string> {
    const userRow = this.locators.userRows.nth(row - 1);
    const statusCell = userRow.locator('[data-testid="user-status"]');
    return await this.getText(statusCell);
  }

  /**
   * Check if user exists
   */
  async userExists(email: string): Promise<boolean> {
    await this.searchUsers(email);
    const count = await this.getUserCount();
    return count > 0;
  }
}
