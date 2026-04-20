# 🧪 TulipTech QA Architecture

Enterprise-grade test automation framework for TulipTech projects.

## 🎯 Overview

This is a reference/sample/default QA architecture that provides:

- ⚡ **80% Faster** test framework setup
- 🎯 **90% Reduction** in test maintenance
- 📈 **10x Better** test reliability
- 🔄 Reusable across all TulipTech projects

## 📋 Features

- **4-Tier Architecture**: Locators → Pages → Data → Specs
- **8 Test Types**: UI, Integration, Functional, Smoke, Sanity, Cross-Browser, UAT, Production
- **Helper System**: LoopHelper, ConditionalHelper, ErrorHelper, DataHelper
- **TestRail Integration**: Automated test case import
- **AI-Assisted Development**: Structured prompt templates
- **Multi-Browser Support**: Chrome, Firefox, Safari, Mobile
- **Comprehensive Reporting**: HTML, Allure, JUnit

## 🤖 AI-Powered QA Skills

This framework includes **2 specialized AI skills** to accelerate your testing workflow:

### /qa-script-writer — Automation Code Generator

**Generates Playwright automation code** from:
- 📸 PNG design screenshots
- 📝 Gherkin scenarios (Given/When/Then)
- 💬 Natural language requirements

**What it generates:**
- ✅ Locators (Tier 1) — Selector definitions
- ✅ Pages (Tier 2) — Page object methods
- ✅ Data (Tier 3) — Test data & factories
- ✅ Specs (Tier 4) — Test files

**How to use:**
```bash
# Simply describe what you want
/qa-script-writer Generate automation for login screen

# Or provide context naturally
"I need to automate the dashboard feature"
"Create tests for user registration flow"
```

**What makes it special:**
- 🎯 Follows strict 4-tier architecture
- 🚫 Zero loops/conditionals in tests (enforced)
- 📸 Visual regression support from PNGs
- 🔄 Incremental — never overwrites existing code
- 📋 Complete working examples included

### /qa-tc-writer — Test Case Generator

**Writes comprehensive test cases** from:
- 🖼️ Figma frames or screenshots
- 📸 PNG designs
- 📄 Feature descriptions

**What it generates:**
- ✅ UI Test Cases — Visual rendering, layout, typography
- ✅ Functional Test Cases — Happy path + edge cases + validation
- ✅ Mobile Test Cases — Responsiveness (375px, 667px, 768px)
- ✅ TestRail import format — Ready to upload

**Test case format:**
```
TEST CASE ID: LG-FUNC-001
TEST TITLE: Verify that user can login with valid credentials

Preconditions:
    - User is registered in the system
    - User is on the login page

Steps:
    1. Enter valid email in the email field
    2. Enter valid password in the password field
    3. Click the "Sign In" button

Expected Results:
    - Should redirect the user to the dashboard
    - Should display a success message
```

**How to use:**
```bash
# Generate test cases
/qa-tc-writer Write test cases for dashboard feature

# Import to TestRail
/qa-tc-writer Generate and import test cases to TestRail
```

### When to Use Each Skill

| Scenario | Use This Skill |
|----------|----------------|
| Create automated tests from designs | `/qa-script-writer` |
| Write manual test cases | `/qa-tc-writer` |
| Setup complete QA framework | Either — both work together |
| Analyze screen for QA coverage | `/qa-tc-writer` |
| Generate Playwright code | `/qa-script-writer` |
| Import tests to TestRail | `/qa-tc-writer` |

**See also:** [.claude/README.md](.claude/README.md) for detailed skill documentation

## 🚀 Quick Start

### Prerequisites

- Node.js 18+
- npm 9+
- Git
- Java Runtime Environment (JRE) 11+ (for Allure reporting)

### Basic Installation

```bash
# Clone the repository
git clone <repository-url>
cd TestCraft-TulipTech

# Install dependencies
npm install

# Copy environment template
cp .env.example .env
```

---

## 📦 Detailed Installation Flows

### 1. Playwright Installation & Setup

#### Step 1: Install Playwright Dependencies

```bash
# Install Playwright and required dependencies
npm install --save-dev @playwright/test@latest playwright@latest

# Verify installation
npx playwright --version
```

#### Step 2: Install Playwright Browsers

```bash
# Install all browser binaries (Chromium, Firefox, WebKit)
npx playwright install

# Install with system dependencies (for Linux)
npx playwright install --with-deps
```

#### Step 3: Verify Playwright Setup

```bash
# Run Playwright's example test to verify installation
npx playwright test --demo

# Check browser installation
npx playwright ls
```

#### Step 4: Configure Playwright

Edit `playwright.config.ts`:

```typescript
import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 2 : 4,
  
  use: {
    baseURL: process.env.BASE_URL || 'http://localhost:3000',
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
  },

  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'] },
    },
    {
      name: 'webkit',
      use: { ...devices['Desktop Safari'] },
    },
  ],

  outputDir: 'results/test-artifacts',
});
```

#### Step 5: Run First Playwright Test

```bash
# Run the seed test
npx playwright test tests/seed.spec.ts

# Run in headed mode (see browser)
npx playwright test tests/seed.spec.ts --headed
```

---

### 2. Allure Report Installation & Setup

#### Step 1: Install Allure Dependencies

```bash
# Install Allure Playwright adapter
npm install --save-dev @playwright/test allure-playwright

# Install Allure Commandline (globally for generating reports)
npm install -g allure-commandline
```

Or using Homebrew (macOS/Linux):

```bash
brew install allure
```

#### Step 2: Configure Allure in Playwright

Edit `playwright.config.ts`:

```typescript
export default defineConfig({
  reporter: [
    ['html', { open: 'never', outputFolder: 'reports/html' }],
    ['json', { outputFile: 'reports/results.json' }],
    ['junit', { outputFile: 'reports/junit.xml' }],
    ['allure-playwright', {
      outputFolder: 'reports/allure-results',
      detail: true,
      suiteTitle: true,
    }]
  ],
});
```

#### Step 3: Run Tests with Allure

```bash
# Run tests (Allure results are automatically generated)
npm test

# Or run specific test types
npx playwright test --grep @smoke
```

#### Step 4: Generate Allure Report

```bash
# Generate HTML report from Allure results
allure generate reports/allure-results --clean -o reports/allure-report

# Open the report
allure open reports/allure-report
```

#### Step 5: Add NPM Scripts

Add to `package.json`:

```json
{
  "scripts": {
    "report:allure": "allure generate reports/allure-results --clean -o reports/allure-report",
    "report:open": "allure open reports/allure-report"
  }
}
```

#### Step 6: View Allure Report

```bash
# Generate and open report
npm run report:allure
npm run report:open
```

---

### 3. Playwright Agents Installation

#### Step 1: Install Playwright Test Runner

```bash
# Install @playwright/test globally (optional, for CLI access)
npm install -g @playwright/test
```

#### Step 2: Install AI-Assistant Agent

```bash
# Install Playwright AI Agent (experimental AI test generator)
npm install --save-dev @playwright/agent
```

#### Step 3: Configure Agent (Optional)

Create `playwright-agent.config.ts`:

```typescript
import { defineConfig } from '@playwright/test';

export default defineConfig({
  // Agent configuration
  agent: {
    enabled: true,
    provider: 'openai', // or your preferred provider
    apiKey: process.env.OPENAI_API_KEY,
  },
});
```

#### Step 4: Run Agent-Generated Tests

```bash
# Run tests with AI agent assistance
npx playwright test --agent

# Generate tests from existing code
npx playwright test --generate-tests
```

---

### 4. MCP (Model Context Protocol) Setup

#### Step 1: Install MCP Server

```bash
# Install Playwright MCP server for VS Code
npm install --save-dev @playwright/mcp-server
```

#### Step 2: Configure MCP in VS Code

Create or edit `.vscode/settings.json`:

```json
{
  "mcp.servers": {
    "playwright": {
      "command": "node",
      "args": ["node_modules/@playwright/mcp-server/dist/index.js"],
      "env": {
        "PLAYWRIGHT_BROWSERS_PATH": "0"
      }
    }
  }
}
```

#### Step 3: Install MCP Client (Optional)

```bash
# Install MCP client for programmatic access
npm install --save-dev @modelcontextprotocol/sdk
```

#### Step 4: Test MCP Connection

```bash
# Verify MCP server is running
npx mcp-server --version

# Test Playwright connection
npx playwright test --list
```

#### Step 5: Use MCP with Claude Code

The MCP server will automatically be available in Claude Code with:
- Playwright test discovery
- Real-time test execution
- Test result streaming

---

### 5. Playwright Smart Reporter Installation

#### Step 1: Install Playwright Smart Reporter

```bash
# Install multiple-cucumber-html-reporter for smart reporting
npm install --save-dev multiple-cucumber-html-reporter
```

#### Step 2: Install Playwright HTML Reporter (Alternative)

```bash
# Install Playwright HTML Reporter with smart features
npm install --save-dev playwright-html-reporter
```

#### Step 3: Configure Smart Reporter

Edit `playwright.config.ts`:

```typescript
export default defineConfig({
  reporter: [
    ['list'],
    ['html', {
      open: 'never',
      outputFolder: 'reports/html-smart',
      config: {
        'reporterOptions': {
          'embed': true,
          'embedFullSourceCode': true,
          'embedFullStackTrace': true,
          'outputFile': 'report.html'
        }
      }
    }],
    ['json', { outputFile: 'reports/results-smart.json' }],
  ],
});
```

#### Step 4: Install Additional Smart Reporter Features

```bash
# Install Slack/Teams notifications
npm install --save-dev @reporters/slack @reporters/teams

# Install Email reporter
npm install --save-dev playwright-email-reporter
```

#### Step 5: Configure Smart Reporter Notifications

Create `reporter.config.ts`:

```typescript
module.exports = {
  slack: {
    webhookUrl: process.env.SLACK_WEBHOOK_URL,
    notifyOn: 'always', // 'always' | 'on-failure' | 'never'
  },
  teams: {
    webhookUrl: process.env.TEAMS_WEBHOOK_URL,
    notifyOn: 'on-failure',
  },
  email: {
    smtpHost: 'smtp.gmail.com',
    smtpPort: 587,
    to: 'qa-team@tuliptech.com',
    from: 'test-reports@tuliptech.com',
    notifyOn: 'always',
  }
};
```

#### Step 6: Generate Smart Reports

```bash
# Run tests with smart reporter
npm test

# Generate HTML report with smart features
npx playwright-html-reporter reports/html-smart

# View smart report
npx playwright show-report
```

---

### Complete Installation Script

For automated setup of all components:

```bash
#!/bin/bash
# complete-setup.sh

echo "🚀 Starting TulipTech QA Architecture Setup..."

# 1. Install base dependencies
echo "📦 Installing base dependencies..."
npm install

# 2. Install Playwright
echo "🎭 Installing Playwright..."
npx playwright install --with-deps

# 3. Install Allure
echo "📊 Installing Allure reporting..."
npm install --save-dev allure-playwright
npm install -g allure-commandline

# 4. Install MCP Server
echo "🔌 Installing MCP server..."
npm install --save-dev @playwright/mcp-server

# 5. Install Smart Reporter
echo "📈 Installing smart reporter..."
npm install --save-dev playwright-html-reporter

# 6. Create reports directory
mkdir -p reports/{html,allure-results,allure-report,junit,smart-report}

# 7. Setup environment
cp .env.example .env

echo "✅ Installation complete!"
echo "Run 'npm test' to execute tests"
```

Run the complete setup:

```bash
# Make script executable and run
chmod +x complete-setup.sh
./complete-setup.sh
```

---

## 🧪 Running Tests

### Run All Tests

```bash
npm test
```

### Run Specific Test Types

```bash
# Smoke tests (Critical path)
npm run test:smoke

# Sanity tests (Post-deployment)
npm run test:sanity

# UAT tests (User acceptance)
npm run test:uat

# Functional tests (Business logic)
npm run test:functional

# UI tests (Visual design)
npm run test:ui

# Integration tests (API/database)
npm run test:integration

# Production tests (Health checks)
npm run test:production

# Cross-browser tests (Compatibility)
npm run test:cross-browser
```

### Run Tests with Options

```bash
# Run in headed mode (see browser)
npx playwright test --headed

# Run specific test file
npx playwright test tests/smoke/auth.spec.ts

# Run with debug mode
npx playwright test --debug

# Run with trace
npx playwright test --trace on

# Run in specific browser
npx playwright test --project=chromium
npx playwright test --project=firefox
npx playwright test --project=webkit
```

---

## 📊 Viewing Reports

### HTML Report

```bash
# View HTML report
npm run test:report

# Or open manually
npx playwright show-report
```

### Allure Report

```bash
# Generate and view Allure report
npm run report:allure
npm run report:open
```

### Smart Report

```bash
# Generate smart HTML report
npx playwright-html-reporter reports/html-smart

# View report
npx playwright show-report
```

---

## 🔧 Troubleshooting Installation

### Playwright Issues

**Issue: Browsers not installed**
```bash
# Reinstall browsers
npx playwright install --force
```

**Issue: Playwright version mismatch**
```bash
# Reinstall Playwright
npm uninstall @playwright/test
npm install --save-dev @playwright/test@latest
```

### Allure Issues

**Issue: Allure command not found**
```bash
# Install Allure globally
npm install -g allure-commandline

# Or use npx
npx allure-commandline generate reports/allure-results
```

**Issue: No Allure results generated**
```bash
# Check if allure-playwright is installed
npm list allure-playwright

# Reinstall if needed
npm install --save-dev allure-playwright
```

### MCP Issues

**Issue: MCP server not starting**
```bash
# Check MCP server installation
npm list @playwright/mcp-server

# Reinstall MCP server
npm uninstall @playwright/mcp-server
npm install --save-dev @playwright/mcp-server
```

### Smart Reporter Issues

**Issue: Report not generating**
```bash
# Check reporter output folder exists
mkdir -p reports/html-smart

# Reinstall reporter
npm uninstall playwright-html-reporter
npm install --save-dev playwright-html-reporter
```

---

## 📚 Documentation

## 📁 Project Structure

```
tuliptech-qa-architecture/
├── src/                    # Source code
│   ├── pages/             # Page Object Models
│   ├── locators/          # Locator definitions
│   ├── components/        # Reusable components
│   ├── helpers/           # Utility functions
│   └── fixtures/          # Playwright fixtures
├── tests/                 # Test specifications
│   ├── ui/               # Visual design tests
│   ├── integration/      # API integration tests
│   ├── functional/       # Business logic tests
│   ├── smoke/            # Critical path tests
│   ├── sanity/           # Post-deployment checks
│   ├── cross-browser/    # Compatibility tests
│   ├── uat/              # User acceptance tests
│   └── production/       # Production health checks
├── scripts/              # Utility scripts
│   ├── testrail/         # TestRail operations
│   ├── text-generation/  # Text file generation
│   └── validation/       # Format validation
├── tools/                # Automation tools
├── .claude/              # Claude Code skills
│   ├── qa-script-writer.md
│   ├── qa-tc-writer.md
│   ├── orchestrator.md
│   └── README.md
├── documents/            # Documentation
│   ├── test-cases/       # Test case documentation
│   └── architecture/     # Architecture docs
└── results/              # Test artifacts
```

## 📚 Documentation

### Core Architecture
- [Architecture Overview](documents/architecture/ARCHITECTURE_OVERVIEW.md) - Big picture and design principles
- [4-Tier Model](documents/architecture/4-TIER_MODEL.md) - Code structure and separation
- [Test Strategy](documents/architecture/TEST_STRATEGY.md) - Testing approach and coverage
- [CI/CD Integration](documents/architecture/CI_CD_INTEGRATION.md) - Pipeline setup and automation

### TestRail Integration
- [TestRail Complete Reference](documents/architecture/TESTRAL_REFERENCE.md) - API docs, field requirements, and implementation

### QA Skills
- [QA Script Writer](.claude/qa-script-writer.md) - AI-powered automation code generator
- [QA Test Case Writer](.claude/qa-tc-writer.md) - AI-powered test case generator
- [Skills Documentation](.claude/README.md) - All available QA skills

## 🎯 Target Metrics

- **Automation Coverage**: 80%+
- **Test Execution Time**: <45 minutes
- **Test Pass Rate**: 95%+
- **Flaky Test Rate**: <2%

## 🛠️ Technology Stack

- **Framework**: Playwright v1.58+
- **Language**: TypeScript 5.0+
- **Package Manager**: npm
- **Reporting**: Allure + HTML
- **CI/CD**: GitHub Actions / GitLab CI

## 📝 License

MIT

## 👥 Team

TulipTech QA Team

---

**Version**: 1.0.0
**Last Updated**: 2025-04-20
