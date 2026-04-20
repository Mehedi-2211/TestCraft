import { Page } from '@playwright/test';

/**
 * Login Locators
 * Selectors for login page elements
 */
export const loginLocators = (page: Page) => ({
  // Form elements
  emailInput: page.locator('[data-testid="username-input"]'),
  passwordInput: page.locator('[data-testid="password-input"]'),
  loginButton: page.locator('button[type="submit"]', has-text("Sign In")'),

  // Links
  forgotPasswordLink: page.locator('a[href="/forgot-password"]'),

  // Messages
  errorMessage: page.locator('[data-testid="error-message"]'),
  successMessage: page.locator('[data-testid="success-message"]'),

  // Remember me
  rememberMeCheckbox: page.locator('[data-testid="remember-me"]'),

  // Login form container
  loginForm: page.locator('[data-testid="login-form"]'),
}) as const;
