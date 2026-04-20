# Text File Generation

This directory contains scripts for generating text files from test results and documentation.

## Available Scripts

### generate.js
Main script for generating various text-based reports and documentation.

## Usage

### Generate Test Results Text File

Convert JSON test results to formatted text file:

```bash
node scripts/text-generation/generate.js test-results results.json output.txt
```

**Input Format (results.json):**
```json
{
  "total": 100,
  "passed": 95,
  "failed": 5,
  "skipped": 0,
  "duration": 45000,
  "failedTests": [
    {
      "title": "Test case title",
      "error": "Error message"
    }
  ],
  "passedTests": [
    {
      "title": "Passed test title"
    }
  ]
}
```

### Generate Summary Text File

Create summary text file from test metrics:

```bash
node scripts/text-generation/generate.js summary summary.json output.txt
```

**Input Format (summary.json):**
```json
{
  "project": "TulipTech QA",
  "environment": "staging",
  "automationCoverage": "85%",
  "executionTime": "42 minutes",
  "passRate": "96%",
  "flakyRate": "1.5%",
  "smokeTests": 20,
  "smokePassed": 20,
  "sanityTests": 10,
  "sanityPassed": 10,
  "uatTests": 30,
  "uatPassed": 28,
  "functionalTests": 100,
  "functionalPassed": 95,
  "uiTests": 25,
  "uiPassed": 24,
  "integrationTests": 15,
  "integrationPassed": 15,
  "productionTests": 5,
  "productionPassed": 5,
  "crossBrowserTests": 10,
  "crossBrowserPassed": 9
}
```

### Generate Test Cases Text File

Export test cases to formatted text file:

```bash
node scripts/text-generation/generate.js test-cases testcases.json output.txt
```

**Input Format (testcases.json):**
```json
{
  "module": "User Authentication",
  "total": 25,
  "sections": [
    {
      "name": "UI Test Cases",
      "testCases": [
        {
          "id": "AUTH-UI-001",
          "title": "Verify that login form displays all required elements",
          "preconditions": [
            "User is on the login page",
            "Page has finished loading"
          ],
          "steps": [
            "Navigate to the login page",
            "Observe the login form layout"
          ],
          "testData": [
            "N/A"
          ],
          "expectedResults": [
            "Should display the email/username input field",
            "Should display the password input field",
            "Should display the Sign In button"
          ]
        }
      ]
    }
  ]
}
```

## Output Examples

### Test Results Output
```
========================================
TEST RESULTS SUMMARY
========================================
Date: 2026-04-20T20:00:00.000Z
Total Tests: 100
Passed: 95
Failed: 5
Skipped: 0
Duration: 45000ms

========================================
FAILED TESTS
========================================
❌ Test case title
   Error: Error message

========================================
PASSED TESTS
========================================
✅ Passed test title
```

### Summary Output
```
========================================
TULIPTECH QA TEST SUMMARY
========================================
Project: TulipTech QA
Date: 2026-04-20T20:00:00.000Z
Environment: staging

========================================
COVERAGE SUMMARY
========================================
Automation Coverage: 85%
Test Execution Time: 42 minutes
Test Pass Rate: 96%
Flaky Test Rate: 1.5%
```

## Integration with Test Workflow

### After Test Execution

```bash
# Run tests
npm test

# Generate text report
node scripts/text-generation/generate.js test-results test-results/results.json reports/test-results.txt
```

### For Documentation

```bash
# Generate test cases text file from TestRail export
node scripts/text-generation/generate.js test-cases testrail-export.json documents/test-cases/AUTH_TEST_CASES.txt
```

### For CI/CD Pipelines

```bash
# Always generate text results after test run
npm test
node scripts/text-generation/generate.js summary test-summary.json reports/summary.txt
cat reports/summary.txt
```

## NPM Scripts

Add to `package.json`:

```json
{
  "scripts": {
    "report:text": "node scripts/text-generation/generate.js summary test-summary.json reports/summary.txt",
    "report:results": "node scripts/text-generation/generate.js test-results test-results.json reports/test-results.txt",
    "export:testcases": "node scripts/text-generation/generate.js test-cases testcases.json documents/test-cases/export.txt"
  }
}
```

## File Formats

All generated text files use:
- ✅ ASCII-compatible formatting
- ✅ Clear section separators
- ✅ Easy to read in terminals
- ✅ Compatible with text editors
- ✅ Version control friendly

## Troubleshooting

**Script not executing:**
```bash
# Make script executable
chmod +x scripts/text-generation/generate.js
```

**Input file not found:**
```bash
# Verify file path
ls -la results/results.json
```

**Permission denied:**
```bash
# Fix permissions
chmod 755 scripts/text-generation/
```

---

**Last Updated:** 2026-04-20
**Version:** 1.0.0
