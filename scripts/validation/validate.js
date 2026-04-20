#!/usr/bin/env node

/**
 * Test Validation Script
 * Purpose: Validate test files for naming conventions and structure
 */

const fs = require('fs');
const path = require('path');
const glob = require('glob');

// Validation rules
const RULES = {
  testFileNaming: /^[a-z]+(-[a-z]+)*\.spec\.ts$/,
  testTitleFormat: /^Verify that/,
  expectedResultsFormat: /^Should/,
};

// Colors for terminal output
const colors = {
  reset: '\x1b[0m',
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
};

function log(message, color = colors.reset) {
  console.log(`${color}${message}${colors.reset}`);
}

function validateTestFile(filePath) {
  const errors = [];
  const warnings = [];

  try {
    const content = fs.readFileSync(filePath, 'utf8');
    const fileName = path.basename(filePath);

    // Check file naming
    if (!RULES.testFileNaming.test(fileName)) {
      errors.push(`File name doesn't match naming convention: ${fileName}`);
    }

    // Check for test descriptions
    if (!content.includes('test.describe(')) {
      warnings.push(`No test.describe found in ${fileName}`);
    }

    // Check test titles
    const testMatches = content.matchAll(/test\(['"]([^'"]+)['"]/g);
    for (const match of testMatches) {
      const title = match[1];
      if (!RULES.testTitleFormat.test(title)) {
        errors.push(`Test title doesn't start with "Verify that": ${title}`);
      }
    }

  } catch (error) {
    errors.push(`Failed to read file: ${error.message}`);
  }

  return { errors, warnings };
}

function main() {
  log('🔍 TulipTech QA Test Validation', colors.blue);
  log('=====================================\n');

  const testFiles = glob.sync('tests/**/*.spec.ts');

  if (testFiles.length === 0) {
    log('⚠️  No test files found', colors.yellow);
    return;
  }

  log(`Found ${testFiles.length} test files\n`, colors.blue);

  let totalErrors = 0;
  let totalWarnings = 0;

  testFiles.forEach((file) => {
    const { errors, warnings } = validateTestFile(file);

    if (errors.length > 0 || warnings.length > 0) {
      log(`\n📄 ${file}`, colors.blue);

      errors.forEach((error) => {
        log(`  ❌ ${error}`, colors.red);
        totalErrors++;
      });

      warnings.forEach((warning) => {
        log(`  ⚠️  ${warning}`, colors.yellow);
        totalWarnings++;
      });
    }
  });

  log('\n=====================================', colors.blue);
  log(`Total Errors: ${totalErrors}`, totalErrors > 0 ? colors.red : colors.green);
  log(`Total Warnings: ${totalWarnings}`, totalWarnings > 0 ? colors.yellow : colors.green);

  if (totalErrors > 0) {
    log('\n❌ Validation failed!', colors.red);
    process.exit(1);
  } else {
    log('\n✅ All tests validated successfully!', colors.green);
    process.exit(0);
  }
}

main();
