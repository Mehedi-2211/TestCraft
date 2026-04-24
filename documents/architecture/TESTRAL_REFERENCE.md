 # TestRail Complete Reference Guide

**Project:** Universal TestRail Integration Guide
**Purpose:** Reference document for TestRail setup, structure, and formats
**Version:** 1.0
**Last Updated:** April 20, 2026

---

## 🤖 AI-Assisted Test Case Generation

**New:** Use the `/qa-tc-writer` skill to automatically generate test cases that follow the format standards in this guide.

- **See:** [QA Test Case Writer](../../.claude/qa-tc-writer.md)
- **Benefit:** Generate test cases from PNG designs or feature descriptions
- **Format:** Automatically follows TestRail-compatible format ("Verify that" / "Should")

---

## 📋 Table of Contents

1. [TestRail Project Structure](#testrail-project-structure)
2. [Section Organization Patterns](#section-organization-patterns)
3. [Test Case Format Standards](#test-case-format-standards)
4. [API Field Requirements](#api-field-requirements)
5. [Implementation Templates](#implementation-templates)
6. [Best Practices](#best-practices)
7. [Code Examples](#code-examples)
8. [Troubleshooting](#troubleshooting)

---

## 🏗️ TestRail Project Structure

### **Hierarchy Overview**

```
Project (ID: 13)
├── Suite (ID: 143) - Default Suite
│   ├── Section: Authentication (ID: 8172)
│   │   ├── Subsection: Sign Up (ID: 8408)
│   │   │   ├── UI (ID: 8418) - 15 test cases
│   │   │   ├── Functional (ID: 8419)
│   │   │   │   ├── Form Validation (ID: 8422) - 25 test cases
│   │   │   │   ├── Password Validation (ID: 8424) - 3 test cases
│   │   │   │   └── Post-Registration (ID: 8425) - 3 test cases
│   │   │   ├── Accessibility (ID: 8420) - 4 test cases
│   │   │   └── Mobile Responsive (ID: 8421) - 4 test cases
│   │   ├── Subsection: Sign In (ID: 8407)
│   │   └── Subsection: Forgot Password (ID: 8409)
│   ├── Section: Device Registry (ID: 7988)
│   │   ├── Headsets (ID: 7886)
│   │   ├── Gloves (ID: 7893)
│   │   ├── Pucks (ID: 7900)
│   │   └── Trackers (ID: 7907)
│   ├── Section: Groups (ID: 7914)
│   │   ├── UI (ID: 7915)
│   │   │   ├── Desktop (ID: 7916) - 35 test cases
│   │   │   └── Mobile Responsive (ID: 7917) - 20 test cases
│   │   └── Functional (ID: 7918) - 32 test cases
│   ├── Section: Wifi Profiles (ID: 7921)
│   │   ├── UI (ID: 7922)
│   │   │   ├── Desktop (ID: 7923) - 24 test cases
│   │   │   └── Mobile Responsive (ID: 7924) - 10 test cases
│   │   └── Functional (ID: 7925) - 28 test cases
│   ├── Section: User Management (ID: 7935)
│   │   ├── UI (ID: 7936)
│   │   │   ├── Desktop (ID: 7937) - 45 test cases
│   │   │   └── Mobile Responsive (ID: 7938) - 24 test cases
│   │   └── Functional (ID: 7939) - 52 test cases
│   ├── Section: Audit Logs (ID: 7942)
│   │   ├── UI (ID: 7943)
│   │   │   ├── Desktop (ID: 7944) - 14 test cases
│   │   │   └── Mobile Responsive (ID: 7945) - 8 test cases
│   │   └── Functional (ID: 7946) - 18 test cases
│   └── Section: Settings (ID: 7949)
│       ├── Profile (ID: 8046)
│       ├── Security (ID: 8047)
│       ├── Notifications (ID: 8080)
│       ├── About (ID: 8087)
│       └── Role Permission (ID: 8155)
```

### **Standard Section Pattern**

Every feature module follows this consistent structure:

```
Feature Name (ID: XXXX)
├── UI (ID: XXXX)
│   ├── Desktop (ID: XXXX) - UI test cases
│   └── Mobile Responsive (ID: XXXX) - Mobile UI test cases
└── Functional (ID: XXXX) - Functional test cases
    ├── Positive (optional)
    └── Negative (optional)
```

---

## 📂 Section Organization Patterns

### **1. Feature-Based Sections**

Each major feature gets its own section with consistent subsections:

```
Section: [Feature Name]
├── UI
│   ├── Desktop
│   └── Mobile Responsive
└── Functional
```

### **2. Test Case Type Distribution**

**UI Test Cases (type_id: 13):**
- Desktop UI: Visual design, layout, styling
- Mobile Responsive: Touch targets, gestures, orientations
- Focus: User interface testing

**Functional Test Cases (type_id: 6):**
- Business logic, workflows
- Positive and negative scenarios
- Focus: Functional behavior testing

### **3. Section ID Assignment**

TestRail automatically assigns section IDs, but follow these guidelines:
- Main sections: Use round numbers when possible
- UI subsections: Increment by 1-2
- Functional subsections: Increment by 1-2
- Consistency helps with maintenance

---

## 📝 Test Case Format Standards

### **CRITICAL: Separate Fields Format**

**TestRail requires TWO separate API fields** - this is the only correct format:

#### ✅ **CORRECT Format**

```javascript
{
  title: "Verify user can create a new group",
  type_id: 6,  // Functional
  priority_id: 3,  // High
  custom_preconds: "User logged in\nHas admin permissions",
  custom_testdata: "Group name: Test Group\nDescription: Test description",
  custom_case_environment: 1,
  custom_steps: "1. Navigate to Groups page\n2. Click Create Group button\n3. Enter group name\n4. Click Save",
  custom_expected: "1. Groups page loads successfully\n2. Create Group modal appears\n3. Group name field accepts input\n4. Group is created and appears in list"
}
```

#### ❌ **WRONG Formats**

```javascript
❌ {
  custom_steps: "Steps:\n\n1. Step one\n\nExpected Results:\n\n1. Expected one"
}

❌ {
  custom_steps: "<p>Steps:</p><ol><li>Step one</li></ol>"
}

❌ {
  custom_steps: "1. Step one → Expected one"
}
```

### **Field-by-Field Requirements**

#### **1. Title** (required)
- Clear, concise description
- Format: "Verify [feature] [action]" or "Test [feature] [scenario]"
- Example: "Verify user can create a new group"

#### **2. type_id** (required)
- **6** = Functional test cases
- **13** = UI test cases  
- **3** = Automated test cases
- **1** = Acceptance test cases
- **Other** = Check TestRail configuration

#### **3. priority_id** (required)
- **4** = Critical
- **3** = High
- **2** = Medium (default)
- **1** = Low

#### **4. custom_preconds** (optional)
- Preconditions for test execution
- Format: Plain text, newline-separated
- Example: "User logged in\nHas admin permissions\nDevice is online"

#### **5. custom_testdata** (optional)
- Specific test data required
- Format: Plain text, newline-separated
- Example: "Username: test@example.com\nPassword: Test123!"

#### **6. custom_case_environment** (required)
- **1** = Production/Staging
- Usually set to 1 by default

#### **7. custom_steps** (required) ✅ **KEY FIELD**
- **ONLY test steps** - no expected results
- Format: Plain text with numbering
- Example: "1. Navigate to page\n2. Click button\n3. Verify action"

#### **8. custom_expected** (required) ✅ **KEY FIELD**
- **ONLY expected results** - no steps
- Format: Plain text with numbering
- Example: "1. Page loads successfully\n2. Modal appears\n3. Action completes"

---

## 🔌 API Field Requirements

### **Required Fields**

Every test case MUST include:
- `title` - Test case title
- `type_id` - Test case type
- `priority_id` - Priority level
- `custom_case_environment` - Environment
- `custom_steps` - Test steps only
- `custom_expected` - Expected results only

### **Optional but Recommended**

- `custom_preconds` - Preconditions
- `custom_testdata` - Test data

### **Field Validation Rules**

1. **No HTML tags** in `custom_steps` or `custom_expected`
2. **No markdown formatting** - plain text only
3. **Numbering must match** - Step 1 corresponds to Expected Result 1
4. **No section headers** within fields - just numbered content
5. **No separators** like "→", "|", etc.

---

## 🧩 Implementation Templates

### **1. Basic TestRail API Class**

```javascript
class TestRailAPI {
  constructor(config) {
    this.host = config.TESTRAIL_HOST.replace(/\/$/, '');
    this.username = config.TESTRAIL_USERNAME;
    this.apiKey = config.TESTRAIL_API_KEY;
    this.projectId = parseInt(config.TESTRAIL_PROJECT_ID);
    this.suiteId = parseInt(config.TESTRAIL_SUITE_ID);
  }

  getAuthHeader() {
    return Buffer.from(`${this.username}:${this.apiKey}`).toString('base64');
  }

  async makeRequest(method, endpoint, body = null) {
    const formattedEndpoint = endpoint.startsWith('/index.php?') ? 
                             endpoint : `/index.php?${endpoint}`;
    const url = `${this.host}${formattedEndpoint}`;

    const options = {
      method,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Basic ${this.getAuthHeader()}`
      }
    };

    if (body && (method === 'POST' || method === 'PUT')) {
      options.body = JSON.stringify(body);
    }

    const response = await fetch(url, options);

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`TestRail API error: ${response.status} ${response.statusText} - ${errorText}`);
    }

    return response.json();
  }

  async getCases(sectionId) {
    const endpoint = `/api/v2/get_cases/${this.projectId}&suite_id=${this.suiteId}&section_id=${sectionId}`;
    return await this.makeRequest('GET', endpoint);
  }

  async deleteCase(caseId) {
    const endpoint = `/api/v2/delete_case/${caseId}`;
    const url = `${this.host}/index.php?${endpoint}`;
    
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Basic ${this.getAuthHeader()}`
      }
    };

    const response = await fetch(url, options);
    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`TestRail API error: ${response.status} ${response.statusText} - ${errorText}`);
    }
    return { success: true };
  }

  async addCase(sectionId, testCase) {
    const endpoint = `/api/v2/add_case/${sectionId}`;
    return await this.makeRequest('POST', endpoint, testCase);
  }
}
```

### **2. Steps to Separate Fields Converter**

```javascript
function convertStepsToSeparateFields(steps) {
  if (!steps || steps.length === 0) {
    return { steps: '', expected: '' };
  }

  // Steps field - plain text with numbering
  let stepsText = '';
  steps.forEach((step, index) => {
    stepsText += `${index + 1}. ${step.content}\n`;
  });

  // Expected Results field - plain text with numbering
  let expectedText = '';
  steps.forEach((step, index) => {
    expectedText += `${index + 1}. ${step.expected}\n`;
  });

  return {
    steps: stepsText.trim(),
    expected: expectedText.trim()
  };
}
```

### **3. Environment Configuration**

```javascript
// .env file
TESTRAIL_HOST=https://your-project.testrail.io
TESTRAIL_USERNAME=your-email@example.com
TESTRAIL_API_KEY=your-api-key-here
TESTRAIL_PROJECT_ID=13
TESTRAIL_SUITE_ID=143
```

---

## 🎯 Best Practices

### **1. Project Setup**

✅ **DO:**
- Create consistent section hierarchy
- Use standard naming conventions
- Plan section structure before importing
- Test with small batches first

❌ **DON'T:**
- Mix test case types in same section
- Use inconsistent naming
- Skip the planning phase
- Import all test cases at once without testing

### **2. Test Case Writing**

✅ **DO:**
- Use clear, actionable titles
- Include specific test data when needed
- Match step numbers with expected result numbers
- Write detailed preconditions

❌ **DON'T:**
- Use vague titles like "Test Page"
- Combine steps and expected results
- Skip numbering consistency
- Leave out important preconditions

### **3. Format Compliance**

✅ **DO:**
- Always use separate `custom_steps` and `custom_expected` fields
- Use plain text only
- Include test data in separate field
- Verify format in TestRail UI after import

❌ **DON'T:**
- Use HTML tags or markdown
- Put everything in `custom_steps`
- Use "→" or other separators
- Skip verification step

### **4. Maintenance**

✅ **DO:**
- Keep documentation updated
- Archive old test scripts properly
- Maintain section ID reference
- Document any custom formats

❌ **DON'T:**
- Leave multiple versions of scripts
- Ignore format updates
- Skip documentation
- Mix different formats

---

## 💻 Code Examples

### **Complete Import Script Example**

```javascript
/**
 * TestRail Import Template
 * Use this for all TestRail imports
 */

const fs = require('fs');
const path = require('path');

// Load environment variables
function loadEnv() {
  const envPath = path.join(__dirname, '..', '.env');
  const envContent = fs.readFileSync(envPath, 'utf-8');
  const env = {};

  envContent.split('\n').forEach(line => {
    const [key, ...valueParts] = line.split('=');
    if (key && !key.startsWith('#')) {
      env[key.trim()] = valueParts.join('=').trim();
    }
  });

  return env;
}

// Parse test cases from markdown
function parseTestCases(markdown, sectionName) {
  const lines = markdown.split('\n');
  const testCases = [];
  let currentCase = {};
  let inSteps = false;
  let inExpectedResult = false;
  let steps = [];
  let currentStep = { content: '', expected: '' };
  let stepNumber = 1;

  const priorityMap = {
    'Critical': 4,
    'High': 3,
    'Medium': 2,
    'Low': 1
  };

  let inTargetSection = false;
  let caseCount = 0;

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    const trimmedLine = line.trim();

    // Detect target section
    if (trimmedLine.includes(sectionName)) {
      inTargetSection = true;
      console.log(`📋 Found ${sectionName} section`);
      continue;
    }

    // Exit section at next major heading
    if (trimmedLine.startsWith('# ') && inTargetSection && !trimmedLine.includes(sectionName)) {
      inTargetSection = false;
      console.log(`✅ Parsed ${caseCount} test cases`);
      break;
    }

    if (!inTargetSection) continue;

    // Test case header
    const tcMatch = trimmedLine.match(/^## (TC-[\w-]+)/);
    if (tcMatch) {
      if (currentCase.title && steps.length > 0) {
        currentCase.custom_steps = steps;
        testCases.push({ ...currentCase });
        caseCount++;
        console.log(`  ✓ Parsed: ${currentCase.title}`);
      }

      currentCase = {
        title: '',
        type_id: 6,
        priority_id: 2,
        custom_preconds: '',
        custom_testdata: ''
      };
      steps = [];
      inSteps = false;
      inExpectedResult = false;
      stepNumber = 1;
      currentStep = { content: '', expected: '' };
      continue;
    }

    // Title
    const titleMatch = trimmedLine.match(/^\*\*Title:\*\* (.+)/);
    if (titleMatch) {
      currentCase.title = titleMatch[1];
      continue;
    }

    // Priority
    const priorityMatch = trimmedLine.match(/^\*\*Priority:\*\* (\w+)/);
    if (priorityMatch) {
      currentCase.priority_id = priorityMap[priorityMatch[1]] || 2;
      continue;
    }

    // Preconditions
    if (trimmedLine === '**Preconditions:**') {
      let preconditions = [];
      let j = i + 1;
      while (j < lines.length && (lines[j].trim().startsWith('-') || lines[j].trim() === '')) {
        if (lines[j].trim().startsWith('-')) {
          preconditions.push(lines[j].trim().substring(1).trim());
        }
        j++;
      }
      currentCase.custom_preconds = preconditions.join('\n');
      i = j - 1;
      continue;
    }

    // Test Data
    if (trimmedLine === '**Test Data:**') {
      let testData = [];
      let j = i + 1;
      while (j < lines.length && (lines[j].trim().startsWith('-') || lines[j].trim() === '')) {
        if (lines[j].trim().startsWith('-')) {
          testData.push(lines[j].trim().substring(1).trim());
        }
        j++;
      }
      if (testData.length > 0) {
        currentCase.custom_testdata = testData.join('\n');
      }
      i = j - 1;
      continue;
    }

    // Steps
    if (trimmedLine === '**Steps:**') {
      inSteps = true;
      inExpectedResult = false;
      continue;
    }

    // Expected Result
    if (trimmedLine === '**Expected Result:**') {
      inExpectedResult = true;
      if (currentStep.content) {
        steps.push({ ...currentStep });
        currentStep = { content: '', expected: '' };
        stepNumber++;
      }
      continue;
    }

    // Step content
    const stepMatch = trimmedLine.match(/^(\d+)\.\s+(.+)/);
    if (stepMatch && inSteps && !inExpectedResult) {
      const stepNum = parseInt(stepMatch[1]);
      if (stepNum === stepNumber) {
        if (currentStep.content) {
          steps.push({ ...currentStep });
        }
        currentStep = { content: stepMatch[2], expected: '' };
        stepNumber++;
      }
      continue;
    }

    // Expected result
    const expectedMatch = trimmedLine.match(/^(\d+)\.\s+(.+)/);
    if (expectedMatch && inSteps && inExpectedResult) {
      const stepNum = parseInt(expectedMatch[1]);
      if (stepNum <= steps.length) {
        if (steps[stepNum - 1]) {
          steps[stepNum - 1].expected = expectedMatch[2];
        }
      }
      continue;
    }
  }

  // Save last test case
  if (currentCase.title && steps.length > 0) {
    currentCase.custom_steps = steps;
    testCases.push({ ...currentCase });
    console.log(`  ✓ Parsed: ${currentCase.title}`);
  }

  return testCases;
}

// Convert steps to separate fields
function convertStepsToSeparateFields(steps) {
  if (!steps || steps.length === 0) {
    return { steps: '', expected: '' };
  }

  let stepsText = '';
  steps.forEach((step, index) => {
    stepsText += `${index + 1}. ${step.content}\n`;
  });

  let expectedText = '';
  steps.forEach((step, index) => {
    expectedText += `${index + 1}. ${step.expected}\n`;
  });

  return {
    steps: stepsText.trim(),
    expected: expectedText.trim()
  };
}

// Main execution
async function main() {
  console.log('🔧 Importing Test Cases to TestRail...\n');

  const env = loadEnv();
  const api = new TestRailAPI(env);

  // Configuration
  const targetSectionId = 7946;  // UPDATE THIS
  const sectionName = "Audit Logs Functional Test Cases";  // UPDATE THIS
  const testCasesPath = path.join(__dirname, '..', 'your-test-cases.md');  // UPDATE THIS

  // Get existing cases
  console.log(`📋 Fetching existing test cases...`);
  const casesResponse = await api.getCases(targetSectionId);
  const existingCases = casesResponse.cases || [];

  // Delete existing cases
  if (existingCases.length > 0) {
    console.log(`🗑️  Deleting ${existingCases.length} existing test cases...\n`);
    for (const existingCase of existingCases) {
      await api.deleteCase(existingCase.id);
      console.log(`  ✅ Deleted: ${existingCase.title}`);
      await new Promise(resolve => setTimeout(resolve, 300));
    }
    console.log('\n');
  }

  // Parse test cases
  const markdown = fs.readFileSync(testCasesPath, 'utf-8');
  const testCases = parseTestCases(markdown, sectionName);
  const validTestCases = testCases.filter(tc => tc.title && tc.title.trim().length > 0);

  console.log(`\n✅ Parsed ${validTestCases.length} test cases\n`);

  // Import test cases
  console.log('📤 Importing test cases to TestRail...\n');
  let successCount = 0;

  for (const tc of validTestCases) {
    const stepsFormatted = convertStepsToSeparateFields(tc.custom_steps);

    const testCase = {
      title: tc.title,
      type_id: tc.type_id,
      priority_id: tc.priority_id,
      custom_preconds: tc.custom_preconds || '',
      custom_testdata: tc.custom_testdata || '',
      custom_case_environment: 1,
      custom_steps: stepsFormatted.steps,
      custom_expected: stepsFormatted.expected
    };

    try {
      await api.addCase(targetSectionId, testCase);
      successCount++;
      console.log(`  ✅ [${successCount}/${validTestCases.length}] ${tc.title}`);
      await new Promise(resolve => setTimeout(resolve, 500));
    } catch (error) {
      console.error(`  ❌ Failed: ${tc.title} - ${error.message}`);
    }
  }

  console.log(`\n🎉 Successfully imported ${successCount} test cases!`);
  console.log(`🌐 View: https://your-project.testrail.io/index.php?/suites/view/143&group_id=${targetSectionId}`);
}

main().catch(error => {
  console.error('❌ Fatal error:', error);
  process.exit(1);
});
```

---

## 🔧 Troubleshooting

### **Common Issues and Solutions**

#### **1. Expected Results appearing in Steps section**

**Problem:** Expected Results show up in the Steps section instead of separate Expected Result section.

**Solution:** Use separate `custom_steps` and `custom_expected` fields instead of combining them.

```javascript
❌ WRONG: custom_steps: "Steps:\n\n1. Step one\n\nExpected Results:\n\n1. Expected one"
✅ CORRECT: 
  custom_steps: "1. Step one",
  custom_expected: "1. Expected one"
```

#### **2. HTML tags showing in TestRail**

**Problem:** HTML tags like `<p>`, `<ol>`, `<li>` appear in TestRail UI.

**Solution:** Use plain text format only.

```javascript
❌ WRONG: custom_steps: "<ol><li>Step one</li></ol>"
✅ CORRECT: custom_steps: "1. Step one"
```

#### **3. Authentication failures**

**Problem:** "Authentication failed" error when calling TestRail API.

**Solution:** Verify credentials and API key:
- Check email is correct
- Verify API key hasn't expired
- Ensure API key has proper permissions
- Check Base64 encoding is working

#### **4. Section not found**

**Problem:** "Section not found" error.

**Solution:** Verify section ID:
- Check section exists in TestRail
- Verify correct project and suite IDs
- Use `getSections()` to list available sections

#### **5. Rate limit exceeded**

**Problem:** "Rate limit exceeded" error.

**Solution:** Add delays between requests:
```javascript
await new Promise(resolve => setTimeout(resolve, 500));  // 500ms delay
```

### **Verification Checklist**

Before considering an import complete, verify:

- [ ] Steps appear in "Steps" section only
- [ ] Expected Results appear in "Expected Result" section only
- [ ] No HTML tags visible in either section
- [ ] Numbering is correct (1, 2, 3...)
- [ ] Test data appears in correct field
- [ ] Preconditions are included
- [ ] All test cases imported successfully
- [ ] No error messages in TestRail UI

---

## 📚 Quick Reference

### **Test Case Types**
- **type_id: 6** = Functional
- **type_id: 13** = UI
- **type_id: 3** = Automated
- **type_id: 1** = Acceptance

### **Priority Levels**
- **priority_id: 4** = Critical
- **priority_id: 3** = High
- **priority_id: 2** = Medium
- **priority_id: 1** = Low

### **Standard Section Pattern**
```
Feature Name
├── UI
│   ├── Desktop
│   └── Mobile Responsive
└── Functional
```

### **Correct Format Template**
```javascript
{
  title: "Verify [feature] [action]",
  type_id: 6,
  priority_id: 3,
  custom_preconds: "Precondition text",
  custom_testdata: "Test data if needed",
  custom_case_environment: 1,
  custom_steps: "1. Step one\n2. Step two\n3. Step three",
  custom_expected: "1. Expected one\n2. Expected two\n3. Expected three"
}
```

---

## 🎓 Additional Resources

### **TestRail API Documentation**
- Official API docs: https://www.gurock.com/testrail/docs/api
- API v2 reference: https://www.gurock.com/testrail/docs/api/overview

### **Project-Specific References**
- Memory file: `memory/testrail-format-standard.md`
- Template script: `scripts/testrail-import-template.js`
- Scripts guide: `scripts/TESTRAIL-SCRIPTS-GUIDE.md`

### **Environment Setup**
```bash
# .env file configuration
TESTRAIL_HOST=https://your-project.testrail.io
TESTRAIL_USERNAME=your-email@example.com
TESTRAIL_API_KEY=your-api-key-here
TESTRAIL_PROJECT_ID=13
TESTRAIL_SUITE_ID=143
```

---

**Remember:** This guide provides the foundation for TestRail integration across all projects. Adapt the structure and formats to match your specific requirements while maintaining the core principles of separate fields and clear organization.

**Last Updated:** April 17, 2026  
**Maintained By:** QA Team  
**Version:** 1.0
