import { Page } from '@playwright/test';

/**
 * User Management Locators
 * Selectors for user management elements
 */
export const userManagementLocators = (page: Page) => ({
  // Page structure
  pageHeading: page.locator('[data-testid="users-heading"]'),
  breadcrumb: page.locator('[data-testid="breadcrumb"]'),

  // Actions
  inviteButton: page.locator('[data-testid="invite-user-button"]'),
  exportButton: page.locator('[data-testid="export-users-button"]'),
  bulkActionButton: page.locator('[data-testid="bulk-action-button"]'),

  // Filters
  searchInput: page.locator('[data-testid="search-input"]'),
  statusFilter: page.locator('[data-testid="status-filter"]'),
  roleFilter: page.locator('[data-testid="role-filter"]'),

  // Table
  userTable: page.locator('[data-testid="users-table"]'),
  userRows: page.locator('[data-testid="users-table"] tbody tr'),

  // Invite modal
  inviteModal: page.locator('[data-testid="invite-user-modal"]'),
  inviteEmailInput: page.locator('[data-testid="invite-email-input"]'),
  inviteRoleSelect: page.locator('[data-testid="invite-role-select"]'),
  sendInviteButton: page.locator('[data-testid="send-invite-button"]'),

  // User row elements
  userEmail: '[data-testid="user-email"]',
  userRole: '[data-testid="user-role"]',
  userStatus: '[data-testid="user-status"]',

  // Status options
  statusOption: (status: string) => page.locator(`[data-testid="status-${status}"]`),
}) as const;
