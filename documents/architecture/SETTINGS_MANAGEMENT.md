# TulipTech QA Settings Management

## Overview

This document explains the settings management system for the TulipTech QA Architecture.

## Settings Files Structure

### 1. Environment Settings (.env)
```
# Application Configuration
BASE_URL=http://localhost:3000

# Test Configuration
HEADLESS=false
SLOW_MO=0
TIMEOUT_MULTIPLIER=1

# Reporting Settings
REPORT_PORT=9323
```

### 2. Playwright Settings (playwright.config.ts)
```typescript
export default defineConfig({
  use: {
    baseURL: process.env.BASE_URL,
    headless: process.env.HEADLESS === 'true',
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
  },
});
```

### 3. TypeScript Settings (tsconfig.json)
```json
{
  "compilerOptions": {
    "strict": true,
    "target": "ES2022",
    "module": "ESNext"
  }
}
```

## Configuration Priority

Settings are loaded in this order (later overrides earlier):

1. **Default Values** (hardcoded in framework)
2. **Environment Variables** (.env file)
3. **Command Line Arguments** (--flag=value)
4. **Runtime Configuration** (programmatic changes)

## Available Settings

### Test Execution Settings

| Setting | Environment Variable | Default | Description |
|---------|---------------------|---------|-------------|
| Base URL | `BASE_URL` | http://localhost:3000 | Application base URL |
| Headless Mode | `HEADLESS` | false | Run tests without UI |
| Slow Motion | `SLOW_MO` | 0 | Slow down actions (ms) |
| Timeout Multiplier | `TIMEOUT_MULTIPLIER` | 1 | Multiply all timeouts |
| CI Mode | `CI` | false | Enable CI optimizations |

### Test Data Settings

| Setting | Environment Variable | Default | Description |
|---------|---------------------|---------|-------------|
| Test Username | `TEST_USERNAME` | test@example.com | Default test user |
| Test Password | `TEST_PASSWORD` | TestPassword123! | Default test password |
| Production User | `PRODUCTION_TEST_USER` | prod_test@example.com | Production test user |
| Production Password | `PRODUCTION_TEST_PASSWORD` | ProdTestPassword123! | Production test password |

### Reporting Settings

| Setting | Environment Variable | Default | Description |
|---------|---------------------|---------|-------------|
| Report Port | `REPORT_PORT` | 9323 | HTML report server port |
| Allure Results | `ALLURE_RESULTS_DIR` | reports/allure-results | Allure results directory |

### TestRail Settings (Optional)

| Setting | Environment Variable | Default | Description |
|---------|---------------------|---------|-------------|
| TestRail Host | `TESTRAIL_HOST` | - | TestRail instance URL |
| TestRail Username | `TESTRAIL_USERNAME` | - | TestRail username |
| TestRail API Key | `TESTRAIL_API_KEY` | - | TestRail API key |
| Project ID | `TESTRAIL_PROJECT_ID` | 1 | TestRail project ID |
| Suite ID | `TESTRAIL_SUITE_ID` | 1 | TestRail suite ID |

## Environment-Specific Configuration

### Development Environment (.env.development)
```bash
BASE_URL=http://localhost:3000
HEADLESS=false
SLOW_MO=100
```

### Staging Environment (.env.staging)
```bash
BASE_URL=https://staging.tuliptech.com
HEADLESS=true
SLOW_MO=0
```

### Production Environment (.env.production)
```bash
BASE_URL=https://app.tuliptech.com
HEADLESS=true
TIMEOUT_MULTIPLIER=2
PRODUCTION_TEST_USER=prod_test@example.com
```

## Runtime Configuration

### Override Settings via Command Line

```bash
# Run tests with specific base URL
BASE_URL=https://staging.tuliptech.com npm test

# Run in headless mode
HEADLESS=true npm test

# Increase timeout
TIMEOUT_MULTIPLIER=2 npm test
```

### Programmatic Configuration

```typescript
// In test file
test.beforeEach(async ({ page }) => {
  await page.goto(process.env.BASE_URL || 'http://localhost:3000');
});
```

## Settings Validation

The framework validates required settings on startup:

```typescript
// src/helpers/env.ts
function validateEnv(): void {
  const required = ['baseUrl', 'testUsername', 'testPassword'];
  const missing = required.filter(key => !ENV[key]);
  
  if (missing.length > 0) {
    throw new Error(`Missing required environment variables: ${missing.join(', ')}`);
  }
}
```

## Secure Settings Management

### .gitignore Configuration

```
# Environment variables
.env
.env.local
.env.*.local

# Sensitive data
credentials.json
secrets/
```

### .env.example Template

Always provide `.env.example` with all required keys (no values):

```bash
# Application Configuration
BASE_URL=
API_URL=

# Test Credentials
TEST_USERNAME=
TEST_PASSWORD=

# TestRail Configuration (Optional)
TESTRAIL_HOST=
TESTRAIL_USERNAME=
TESTRAIL_API_KEY=
```

## Best Practices

1. **Never commit actual .env files** - Only commit .env.example
2. **Document all settings** - Maintain this README
3. **Use environment-specific files** - .env.development, .env.staging, etc.
4. **Validate settings on load** - Fail fast on missing required settings
5. **Provide sensible defaults** - Framework should work with minimal configuration
6. **Use strong passwords** - For test accounts
7. **Rotate secrets regularly** - Update API keys and passwords

## Configuration Files Summary

| File | Purpose | Managed By |
|------|---------|------------|
| `.env` | Local development settings | Developer |
| `.env.example` | Template for all settings | Version Control |
| `playwright.config.ts` | Framework configuration | QA Team |
| `tsconfig.json` | TypeScript configuration | QA Team |
| `package.json` | Dependencies and scripts | QA Team |
| `.gitignore` | Files to exclude from Git | QA Team |

---

**Version**: 1.0.0
**Last Updated**: 2026-04-20
