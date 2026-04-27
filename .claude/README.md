# TulipTech QA Skills

This directory contains custom skills for Claude Code to assist with QA automation tasks.

## Available Skills

### /qa-script-writer
Generates Playwright automation scripts from PNG designs, Gherkin scenarios, or natural language requirements.

**Use when:**
- Creating automated tests from design screenshots
- Generating 4-tier architecture code (Locators, Pages, Data, Specs)
- Implementing visual regression tests

**Example:** `/qa-script-writer Generate automation for login screen`

### /qa-tc-writer
Writes comprehensive test cases from Figma frames, screenshots, or feature descriptions with TestRail integration.

**Use when:**
- Writing manual test cases
- Importing tests to TestRail
- Analyzing screens for QA coverage

**Example:** `/qa-tc-writer Write test cases for dashboard feature`

### /qa-strategist
Creates comprehensive Test Strategy documents from Figma frames, PNG screenshots, or feature descriptions.

**Use when:**
- Creating test strategy documents
- Analyzing scope and test approach
- Identifying risks and resource requirements
- Planning test coverage and timelines

**Example:** `/qa-strategist Create test strategy for new feature`

### /qa-pipeline
Automated end-to-end QA pipeline that chains all skills together: Test Strategy → Test Cases → Automation Code.

**Use when:**
- Running complete automated QA pipeline from designs
- Generating all QA artifacts in one execution
- Setting up testing for new features/projects
- Automating everything from Figma/screenshots

**Example:** `/qa-pipeline Run complete pipeline from designs/checkout/`

### /qa-orchestrator
Coordinates between QA agents and manages complex workflows for comprehensive test coverage.

**Use when:**
- Setting up complete QA framework
- Managing complex multi-step workflows
- Ensuring quality gates are met

**Example:** `/qa-orchestrator Setup complete QA framework for new project`

## How to Invoke Skills

### Method 1: Slash Command
```
/qa-script-writer [your instructions]
```

### Method 2: Natural Language
Claude will automatically detect trigger phrases and invoke the appropriate agent.

## Additional Resources

- [Architecture Overview](documents/architecture/ARCHITECTURE_OVERVIEW.md)
- [4-Tier Model](documents/architecture/4-TIER_MODEL.md)

---

**Last Updated:** 2026-04-20
**Version:** 1.0.0
