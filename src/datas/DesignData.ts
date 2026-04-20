// Design Data - PNG reference paths for visual regression testing
import path from 'path';

/**
 * PNG Design File Paths
 * Store your PNG screenshots in the designs/ folder
 * These paths are used for visual comparison tests
 */
export const PNG_DESIGNS = {
  // Authentication Screens
  loginPage: path.join(__dirname, '../../designs/login-page.png'),
  loginError: path.join(__dirname, '../../designs/login-error.png'),
  forgotPassword: path.join(__dirname, '../../designs/forgot-password.png'),

  // Dashboard Screens
  dashboard: path.join(__dirname, '../../designs/dashboard.png'),
  dashboardHeader: path.join(__dirname, '../../designs/dashboard-header.png'),
  dashboardSidebar: path.join(__dirname, '../../designs/dashboard-sidebar.png'),

  // User Management Screens
  usersList: path.join(__dirname, '../../designs/users-list.png'),
  inviteUser: path.join(__dirname, '../../designs/invite-user.png'),
  userSettings: path.join(__dirname, '../../designs/user-settings.png'),

  // Settings Screens
  settings: path.join(__dirname, '../../designs/settings.png'),
  profile: path.join(__dirname, '../../designs/profile.png'),
  security: path.join(__dirname, '../../designs/security.png'),
} as const;

/**
 * Helper function to check if PNG exists
 */
export function pngExists(pngKey: keyof typeof PNG_DESIGNS): boolean {
  const fs = require('fs');
  return fs.existsSync(PNG_DESIGNS[pngKey]);
}

/**
 * Get all PNG paths for a feature
 */
export function getPNGsForFeature(feature: 'auth' | 'dashboard' | 'users' | 'settings') {
  const featurePNGs: Record<string, string[]> = {
    auth: [
      PNG_DESIGNS.loginPage,
      PNG_DESIGNS.loginError,
      PNG_DESIGNS.forgotPassword,
    ],
    dashboard: [
      PNG_DESIGNS.dashboard,
      PNG_DESIGNS.dashboardHeader,
      PNG_DESIGNS.dashboardSidebar,
    ],
    users: [
      PNG_DESIGNS.usersList,
      PNG_DESIGNS.inviteUser,
      PNG_DESIGNS.userSettings,
    ],
    settings: [
      PNG_DESIGNS.settings,
      PNG_DESIGNS.profile,
      PNG_DESIGNS.security,
    ],
  };

  return featurePNGs[feature] || [];
}
