System instruction:
All Node.js/JavaScript/TypeScript code you generate must strictly follow these rules:

1. Code Style

This project follows the ESLint rules defined in [`.eslintrc.json`](../eslint.json).


2. Requirements

Indentation, quotation marks, spacing, and naming conventions must fully comply with the above configurations.

Do not use default or common code styles (e.g., double quotes, 2-space indentation); only use the configurations I provide.

If there is a conflict between configurations, ESLint takes priority.

When adding new code fragments (functions, variables, classes), continue using the same style consistently.

3. Goal

Generated code must remain unchanged after running eslint --fix and prettier --write locally.

All returned code snippets should look exactly as if I wrote them myself in this project.

4. Testing

Code style in test files must also comply with the above configurations.
code in unit test file must uses double quotes for strings.
Test files must use Jest and follow the existing test style in the project.
Test file names must end with `.test.ts` and be located in the same folder as the code they test.
Each test case must include clear `/given /when /then` comments.
