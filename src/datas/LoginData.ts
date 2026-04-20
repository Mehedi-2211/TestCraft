// Login Data - Static test data for authentication feature
export class LoginData {
  static readonly validCredentials = {
    username: 'test@example.com',
    password: 'TestPassword123!',
    email: 'test@example.com',
  };

  static readonly invalidCredentials = {
    username: 'invalid@example.com',
    password: 'WrongPassword123!',
    email: 'invalid@example.com',
  };

  static readonly validationMessages = {
    emailRequired: 'Email is required',
    emailInvalid: 'Please enter a valid email address',
    passwordRequired: 'Password is required',
    passwordTooShort: 'Password must be at least 8 characters',
    passwordWeak: 'Password must contain uppercase, lowercase, and number',
  };

  static readonly pages = {
    login: '/login',
    dashboard: '/dashboard',
    forgotPassword: '/forgot-password',
  };

  static readonly uiElements = {
    usernameInput: 'Email Address',
    passwordInput: 'Password',
    loginButton: 'Sign In',
    forgotPasswordLink: 'Forgot Password?',
    rememberMeCheckbox: 'Remember me',
  };

  static readonly timeouts = {
    pageLoad: 5000,
    loginSuccess: 3000,
    loginFailure: 2000,
  };
}
