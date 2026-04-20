# TulipTech QA Architecture - AI Assistant Guide

## Overview

This document guides AI assistants (Claude, Copilot, etc.) in understanding and working with the TulipTech QA Architecture.

## Project Structure

```
tuliptech-qa-architecture/
├── src/                    # Source code
│   ├── pages/             # Page Object Models
│   ├── locators/          # Locator definitions
│   ├── components/        # Reusable components
│   ├── helpers/           # Utility functions
│   └── fixtures/          # Playwright fixtures
├── tests/                 # Test specifications
│   ├── smoke/            # Critical path tests
│   ├── sanity/           # Post-deployment checks
│   ├── uat/              # User acceptance tests
│   ├── functional/       # Business logic tests
│   ├── ui/               # Visual design tests
│   ├── integration/      # API integration tests
│   ├── production/       # Production health checks
│   └── cross-browser/    # Compatibility tests
├── scripts/              # Utility scripts
├── tools/qa-agents/      # QA Helper Agents
└── documents/            # Documentation
```

## Key Principles

### 1. 4-Tier Architecture

**Always follow this strict separation:**

1. **Locators** (`src/locators/`) - Selectors only, no logic
2. **Pages** (`src/pages/`) - Interaction methods, no assertions (except `verify*`)
3. **Data** (`src/datas/`) - Static constants and factories
4. **Specs** (`tests/`) - Pure test logic, max 10 lines

### 2. Zero-Tolerance Rules

**NEVER violate these rules:**

- ❌ No loops in test files
- ❌ No if/else in test files
- ❌ No try/catch in test files
- ❌ No complex logic in test files
- ❌ No assertions in page objects (except `verify*`)
- ❌ No multiple responsibilities in page object methods

**ALWAYS use helpers instead:**

- ✅ Use `LoopHelper` for loops
- ✅ Use `ConditionalHelper` for conditionals
- ✅ Use `ErrorHelper` for error handling
- ✅ Use `DataHelper` for data manipulation

### 3. Test Naming Conventions

- **Test titles**: Must start with "Verify that"
- **Expected results**: Must start with "Should"
- **File names**: `feature-action.spec.ts`
- **Test IDs**: `MODULE-TYPE-NNN` (e.g., `LG-FUNC-001`)

### 4. Selector Hierarchy

Use in this order:
1. `getByRole` - buttons, links, headings
2. `getByLabel` - form inputs
3. `getByPlaceholder` - placeholder text
4. `getByText` - visible text
5. XPath - when semantic selectors fail
6. CSS - LAST RESORT

## QA Skills

QA skills are located in the `.claude/` directory and can be invoked using `/` commands.

### Available Skills

1. **/qa-script-writer** (`.claude/qa-script-writer.md`)
   - Generates Playwright automation scripts
   - Input: PNG designs, Gherkin, natural language
   - Output: 4-tier code (Locators, Pages, Data, Specs)

2. **/qa-tc-writer** (`.claude/qa-tc-writer.md`)
   - Writes manual test cases
   - Input: Figma frames, screenshots, descriptions
   - Output: Structured .txt files, TestRail import

3. **/qa-orchestrator** (`.claude/orchestrator.md`)
   - Coordinates between skills
   - Manages complex workflows
   - Ensures quality gates

See [.claude/README.md](.claude/README.md) for detailed usage instructions.

### When to Use Agents

| Scenario | Agent |
|----------|-------|
| Generate automation from designs | `tuliptech-qa-script-writer` |
| Write test cases for TestRail | `tuliptech-qa-tc-writer` |
| Setup complete QA framework | `tuliptech-qa-orchestrator` |
| Update tests after UI changes | `tuliptech-qa-orchestrator` |

## Common Workflows

### Creating New Feature Tests

1. **Verify design completeness** (all states, roles, mobile)
2. **Generate manual test cases** using `tuliptech-qa-tc-writer`
3. **Generate automation scripts** using `tuliptech-qa-script-writer`
4. **Import to TestRail** (optional)
5. **Set up CI/CD pipeline**

### Updating Existing Tests

1. **Analyze changes** (old vs new designs)
2. **Update affected test cases**
3. **Update automation scripts**
4. **Run regression tests**
5. **Verify all tests pass**

## Test Types

We have 8 test types - always tag correctly:

| Tag | Type | Purpose |
|-----|------|---------|
| `@smoke` | Smoke | Critical path |
| `@sanity` | Sanity | Post-deployment |
| `@uat` | UAT | User acceptance |
| `@functional` | Functional | Business logic |
| `@ui` | UI | Visual design |
| `@integration` | Integration | API/database |
| `@production` | Production | Health checks |
| `@cross-browser` | Cross-Browser | Compatibility |

## Code Examples

### Good Test

```typescript
test('TC-01: Verify that user can login with valid credentials', async ({ page }) => {
  const loginPage = new LoginPage(page);
  await loginPage.goto();
  await loginPage.login('test@example.com', 'Password123!');
  await expect(page).toHaveURL('/dashboard');
});
```

### Bad Test (violates rules)

```typescript
// WRONG: Loop in test
test('should verify multiple items', async ({ page }) => {
  for (let i = 0; i < 3; i++) {
    await page.click('.item');
  }
});

// CORRECT: Use LoopHelper
test('should verify multiple items', async ({ page }) => {
  await repeatAction(
    async () => await page.click('.item'),
    3
  );
});
```

## File Templates

### Page Object Template

```typescript
import { Page } from '@playwright/test';
import { BasePage } from './BasePage';
import { featureLocators } from '../locators/feature';

export class FeaturePage extends BasePage {
  private locators: ReturnType<typeof featureLocators>;

  constructor(page: Page) {
    super(page);
    this.locators = featureLocators(page);
  }

  async goto(): Promise<void> {
    await this.page.goto('/feature');
    await this.isLoaded();
  }

  async isLoaded(): Promise<void> {
    await this.waitForVisible(this.locators.heading);
  }

  // Add interaction methods here
  async clickButton(): Promise<void> {
    await this.click(this.locators.button);
  }

  async getValue(): Promise<string> {
    return await this.getText(this.locators.value);
  }
}
```

### Test File Template

```typescript
import { test, expect } from '@playwright/test';
import { FeaturePage } from '../../src/pages/FeaturePage';

test.describe('@smoke Feature Tests', () => {
  test('@critical should verify feature works', async ({ page }) => {
    const featurePage = new FeaturePage(page);
    await featurePage.goto();

    // Arrange, Act, Assert
    await featurePage.clickButton();
    const value = await featurePage.getValue();
    expect(value).toBeTruthy();
  });
});
```

## Quality Checklist

Before completing any task, verify:

- [ ] 4-tier architecture followed
- [ ] No zero-tolerance violations
- [ ] Helper system used correctly
- [ ] Naming conventions followed
- [ ] Test tagged appropriately
- [ ] Code is readable and maintainable
- [ ] All tests pass
- [ ] Documentation updated

## Getting Help

If unsure:
1. Check `documents/architecture/` for detailed guides
2. Review existing test files for examples
3. Consult QA agents for specific workflows
4. Ask for clarification rather than guess

## Important Reminders

- **Always** use BasePage for page objects
- **Always** use data-testid selectors
- **Always** follow the 4-tier model
- **Always** use helpers for control flow
- **Never** write CSS selectors unless absolutely necessary
- **Never** put assertions in page objects (except `verify*`)
- **Never** write loops/conditionals in tests

---

**Version**: 1.0.0
**Last Updated**: 2026-04-20
**Status**: PRODUCTION READY
