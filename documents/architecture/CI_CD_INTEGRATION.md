# CI/CD Integration Guide

## Overview

This guide explains how to integrate the TulipTech QA Architecture into your CI/CD pipeline.

## Supported Platforms

- GitHub Actions
- GitLab CI
- Jenkins
- Azure DevOps

---

## GitHub Actions Integration

### Workflow Templates

#### Smoke Tests on PR

```yaml
name: Smoke Tests

on:
  pull_request:
    branches: [main, develop]

jobs:
  smoke:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: '18'
      - run: npm ci
      - run: npx playwright install --with-deps
      - run: npx playwright test --grep @smoke
```

#### Full Test Suite on Merge

```yaml
name: Full Test Suite

on:
  push:
    branches: [main]

jobs:
  test:
    runs-on: ubuntu-latest
    strategy:
      matrix:
        shard: [1/4, 2/4, 3/4, 4/4]
    steps:
      - uses: actions/checkout@v4
      - name: Setup Node.js
        uses: actions/setup-node@v4
      - run: npm ci
      - run: npx playwright install --with-deps
      - run: npx playwright test --shard=${{ matrix.shard }}
      - uses: actions/upload-artifact@v4
        if: always()
        with:
          name: test-results-${{ matrix.shard }}
          path: test-results/
```

---

## GitLab CI Integration

### .gitlab-ci.yml

```yaml
stages:
  - test
  - report

smoke-tests:
  stage: test
  image: mcr.microsoft.com/playwright:v1.58.0-jammy
  script:
    - npm ci
    - npx playwright install --with-deps
    - npx playwright test --grep @smoke
  artifacts:
    when: always
    paths:
      - test-results/
    reports:
      junit: test-results/junit.xml

full-tests:
  stage: test
  image: mcr.microsoft.com/playwright:v1.58.0-jammy
  script:
    - npm ci
    - npx playwright install --with-deps
    - npx playwright test
  artifacts:
    when: always
    paths:
      - test-results/
      - playwright-report/
    reports:
      junit: test-results/junit.xml
  only:
    - main
```

---

## Docker Integration

### Dockerfile for Tests

```dockerfile
FROM mcr.microsoft.com/playwright:v1.58.0-jammy

WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY . .

RUN npx playwright install --with-deps

CMD ["npx", "playwright", "test"]
```

### Docker Compose

```yaml
version: '3.8'
services:
  tests:
    build: .
    environment:
      - BASE_URL=http://app:3000
    depends_on:
      - app
```

---

## Environment Variables

### Required Variables

```bash
# Application
BASE_URL=http://localhost:3000
API_URL=http://localhost:3000/api

# Test Credentials
TEST_USERNAME=test@example.com
TEST_PASSWORD=TestPassword123!

# CI/CD
CI=true
BUILD_NUMBER=${{ github.run_number }}
```

### Optional Variables

```bash
# TestRail
TESTRAIL_HOST=https://your-instance.testrail.io
TESTRAIL_USERNAME=your-email@example.com
TESTRAIL_API_KEY=your-api-key

# Reporting
SLACK_WEBHOOK_URL=https://hooks.slack.com/...
```

---

## Reporting

### HTML Reports

Reports are automatically generated and can be viewed:

```bash
# Local
npx playwright show-report

# CI - Upload as artifact
- uses: actions/upload-artifact@v4
  with:
    name: html-report
    path: playwright-report/
```

### Allure Reports

```bash
# Generate
npm run report:allure

# View
npm run report:open

# CI - Deploy to GitHub Pages
- name: Deploy to GitHub Pages
  uses: peaceiris/actions-gh-pages@v3
  with:
    github_token: ${{ secrets.GITHUB_TOKEN }}
    publish_dir: ./allure-report
```

### Slack Notifications

```yaml
- name: Slack Notification
  if: always()
  uses: slackapi/slack-github-action@v1
  with:
    webhook-url: ${{ secrets.SLACK_WEBHOOK_URL }}
    payload: |
      {
        "text": "Test Results: ${{ job.status }}",
        "blocks": [
          {
            "type": "section",
            "text": {
              "type": "mrkdwn",
              "text": "*Test Suite: ${{ github.workflow }}*\n*Status: ${{ job.status }}*"
            }
          }
        ]
      }
```

---

## Test Parallelization

### Sharding Strategy

```yaml
strategy:
  matrix:
    shard: [1/4, 2/4, 3/4, 4/4]
steps:
  - run: npx playwright test --shard=${{ matrix.shard }}
```

### Parallel Projects

```yaml
strategy:
  matrix:
    project: [chromium, firefox, webkit]
steps:
  - run: npx playwright test --project=${{ matrix.project }}
```

---

## Quality Gates

### Pre-commit Hooks

```json
{
  "husky": {
    "hooks": {
      "pre-commit": "npm run validate && npm run test:smoke"
    }
  }
}
```

### PR Requirements

- All smoke tests must pass
- Code coverage threshold: 80%
- No critical defects open
- Code review approval required

---

## Monitoring

### Test Trends

Track metrics over time:
- Pass rate trends
- Execution time trends
- Flaky test identification
- Coverage growth

### Alerts

Configure alerts for:
- Test failures in main branch
- Flaky test detection
- Performance degradation
- Production test failures

---

## Best Practices

1. **Run smoke tests on every PR**
2. **Run full suite before merging to main**
3. **Use parallel execution to reduce time**
4. **Archive test results for analysis**
5. **Send notifications on failures**
6. **Monitor trends and identify issues early**
7. **Keep test environment configurations consistent**
8. **Use secrets for sensitive data**

---

## Troubleshooting

### Common Issues

**Tests pass locally but fail in CI**
- Check environment variables
- Verify test data setup
- Check timing issues (increase timeouts)
- Review browser versions

**Flaky tests in CI**
- Increase wait times
- Use proper wait strategies
- Check for race conditions
- Review network dependencies

**Slow test execution**
- Enable parallel execution
- Use test sharding
- Optimize test data setup
- Remove unnecessary waits

---

**Version**: 1.0.0
**Last Updated**: 2026-04-20
