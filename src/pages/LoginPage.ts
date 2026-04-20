import { Page, Locator } from '@playwright/test';
import { BasePage } from './BasePage';
import { loginLocators } from '../locators/login';
import { LoginData } from '../datas/LoginData';

/**
 * Login Page Object
 * Handles user authentication interactions
 */
export class LoginPage extends BasePage {
  private locators: ReturnType<typeof loginLocators>;

  constructor(page: Page) {
    super(page);
    this.locators = loginLocators(page);
  }

  // =========================================================================
  // NAVIGATION
  // =========================================================================

  async goto(): Promise<void> {
    await this.page.goto(LoginData.pages.login);
    await this.isLoaded();
  }

  async isLoaded(): Promise<void> {
    await this.waitForVisible(this.locators.loginForm);
  }

  // =========================================================================
  // ACTIONS
  // =========================================================================

  /**
   * Login with valid credentials
   */
  async login(username: string, password: string): Promise<void> {
    await this.fill(this.locators.emailInput, username);
    await this.fill(this.locators.passwordInput, password);
    await this.click(this.locators.loginButton);
  }

  /**
   * Login with default test credentials
   */
  async loginWithDefaultCredentials(): Promise<void> {
    await this.login(
      LoginData.validCredentials.username,
      LoginData.validCredentials.password
    );
  }

  /**
   * Clear all form fields
   */
  async clearForm(): Promise<void> {
    await this.clear(this.locators.emailInput);
    await this.clear(this.locators.passwordInput);
  }

  // =========================================================================
  // ERROR HANDLING
  // =========================================================================

  /**
   * Get error message from login attempt
   */
  async getErrorMessage(): Promise<string> {
    return await this.getText(this.locators.errorMessage);
  }

  /**
   * Get success message from login attempt
   */
  async getSuccessMessage(): Promise<string> {
    return await this.getText(this.locators.successMessage);
  }

  /**
   * Check if error message is displayed
   */
  async hasErrorMessage(): Promise<boolean> {
    return await this.isVisible(this.locators.errorMessage);
  }

  // =========================================================================
  // PASSWORD RECOVERY
  // =========================================================================

  /**
   * Click forgot password link
   */
  async clickForgotPassword(): Promise<void> {
    await this.click(this.locators.forgotPasswordLink);
  }

  /**
   * Toggle remember me checkbox
   */
  async toggleRememberMe(): Promise<void> {
    await this.check(this.locators.rememberMeCheckbox);
  }
}
