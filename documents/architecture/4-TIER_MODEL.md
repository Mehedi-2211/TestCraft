# 4-Tier Model Architecture

## Overview

The TulipTech QA Architecture follows a strict 4-tier model to ensure maintainability, scalability, and reliability of test automation.

## The 4 Tiers

### Tier 1: Locators (`src/locators/`)

**Purpose**: Element identification only

**Responsibilities**:
- Define selectors for UI elements
- Use data-testid attributes
- No logic, no conditionals
- Arrow function properties

**Example**:
```typescript
export const loginLocators = (page: Page) => ({
  usernameInput: page.locator('[data-testid="username-input"]'),
  passwordInput: page.locator('[data-testid="password-input"]'),
  loginButton: page.locator('[data-testid="login-button"]'),
}) as const;
```

**Rules**:
- ✅ Use data-testid selectors
- ✅ Return type is Locator
- ✅ No logic, no conditionals
- ❌ No page manipulation
- ❌ No assertions

---

### Tier 2: Pages (`src/pages/`)

**Purpose**: User interaction methods

**Responsibilities**:
- Orchestrate user interactions
- Return data for tests to assert
- Use `verify*` methods for assertions only
- Extend BasePage

**Example**:
```typescript
export class LoginPage extends BasePage {
  private locators: ReturnType<typeof loginLocators>;

  constructor(page: Page) {
    super(page);
    this.locators = loginLocators(page);
  }

  async goto(): Promise<void> {
    await this.page.goto('/login');
    await this.isLoaded();
  }

  async login(username: string, password: string): Promise<void> {
    await this.fill(this.locators.usernameInput, username);
    await this.fill(this.locators.passwordInput, password);
    await this.click(this.locators.loginButton);
  }

  async getErrorMessage(): Promise<string> {
    return await this.getText(this.locators.errorMessage);
  }
}
```

**Rules**:
- ✅ Methods named: `click*`, `fill*`, `get*`, `verify*`
- ✅ No assertions except in `verify*` methods
- ✅ Return data for tests to assert
- ❌ No test-specific logic
- ❌ No loops, no conditionals

---

### Tier 3: Data (`src/datas/`)

**Purpose**: Test data management

**Responsibilities**:
- Static readonly constants
- Random data generation with factories
- Validation patterns
- Expected results

**Example - Static Data**:
```typescript
export class DashboardData {
  static readonly validationPatterns = {
    numberFormat: /^[\d,]+$/,
    timestamp: /\d+\s(minutes|hours|days)\sago/,
  };

  static readonly statusOptions = ['Active', 'Inactive', 'Pending'] as const;
}
```

**Example - Factory Data**:
```typescript
import { faker } from '@faker-js/faker';

export class UserFactory {
  static create() {
    return {
      name: faker.person.fullName(),
      email: faker.internet.email(),
      phone: faker.phone.number(),
    };
  }

  static createMany(count: number) {
    return Array.from({ length: count }, () => UserFactory.create());
  }
}
```

**Rules**:
- ✅ Static data for assertions/expectations
- ✅ Factory data for inputs
- ✅ Use `@faker-js/faker` for random data
- ❌ No functions in static data files
- ❌ No test logic

---

### Tier 4: Specs (`tests/`)

**Purpose**: Pure test logic

**Responsibilities**:
- Business logic validation
- Linear, deterministic flow
- Max 10 lines per test
- Arrange → Act → Assert structure

**Example**:
```typescript
test('TC-01: Verify that user can login with valid credentials', async ({ page }) => {
  // Arrange
  const loginPage = new LoginPage(page);
  const userData = UserDataBuilder.create().build();

  // Act
  await loginPage.goto();
  await loginPage.login(userData.email, userData.password);

  // Assert
  await expect(page).toHaveURL('/dashboard');
});
```

**Rules**:
- ✅ Max 10 lines per test
- ✅ No selectors, no hardcoded data
- ✅ No loops, no conditionals
- ✅ Use helpers for control flow
- ❌ No direct page manipulation
- ❌ No string manipulation

---

## Helper System

All control flow lives in helpers, never in test files:

### LoopHelper
- `repeatAction()` - Repeat action N times
- `repeatUntilCondition()` - Repeat until condition met
- `retryAction()` - Retry with exponential backoff

### ConditionalHelper
- `executeIfElse()` - If/else logic
- `executeIfExists()` - Execute if element exists
- `waitForCondition()` - Wait for condition

### ErrorHelper
- `tryCatch()` - Try/catch with explicit handling
- `withTimeout()` - Execute with timeout
- `retryOnError()` - Retry on specific error

### DataHelper
- `extractValues()` - Extract values from array
- `filterByCondition()` - Filter array
- `sanitize()` - Sanitize string for comparison

---

## Zero-Tolerance Rules

### ❌ NO Loops in Test Files

```typescript
// WRONG
test('should verify multiple items', async () => {
  for (let i = 0; i < 3; i++) {
    await page.click('.item');
  }
});

// CORRECT
test('should verify multiple items', async () => {
  await repeatAction(
    async () => await page.click('.item'),
    3
  );
});
```

### ❌ NO If/Else in Test Files

```typescript
// WRONG
test('should verify value', async () => {
  const value = await getValue();
  if (value > 0) {
    expect(value).toBeGreaterThan(0);
  }
});

// CORRECT
test('should verify value', async () => {
  const value = await getValue();
  expect(value).toBeGreaterThanOrEqual(0);
});
```

### ❌ NO Try/Catch in Test Files

```typescript
// WRONG
test('should handle error', async () => {
  await action().catch(() => {});
});

// CORRECT
test('should handle error', async () => {
  await tryCatch(action, 'Action description');
});
```

---

## Benefits

1. **Maintainability**: Clear separation makes updates easy
2. **Scalability**: Add new tests without modifying existing code
3. **Reliability**: Consistent patterns reduce flaky tests
4. **Readability**: Tests are easy to understand and modify

---

**Version**: 1.0.0
**Last Updated**: 2026-04-20
