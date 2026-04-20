# Text File Generation Script

Quick reference for text generation commands.

## Quick Commands

```bash
# Generate test results text
node scripts/text-generation/generate.js test-results results.json output.txt

# Generate summary text
node scripts/text-generation/generate.js summary summary.json output.txt

# Generate test cases text
node scripts/text-generation/generate.js test-cases testcases.json output.txt
```

## Usage Examples

### After Running Tests
```bash
npm test
node scripts/text-generation/generate.js test-results test-results/results.json reports/latest-results.txt
cat reports/latest-results.txt
```

### Export Test Cases
```bash
node scripts/text-generation/generate.js test-cases testrail-export.json documents/test-cases/TEST_CASES.txt
```

### CI/CD Integration
```bash
# In GitHub Actions workflow
- name: Generate Text Report
  run: |
    npm test
    node scripts/text-generation/generate.js summary test-summary.json reports/summary.txt
```

For detailed documentation, see [scripts/text-generation/README.md](scripts/text-generation/README.md)
