Conduit E2E Automation Tests (Playwright)

This project contains end-to-end automated tests for the Conduit demo application, built using Playwright and TypeScript.

The purpose of this project is to demonstrate practical knowledge of QA Automation, including test structure, Page Object Model design, reusable helpers, and stable locator strategies.

Tech Stack

- Playwright
- TypeScript
- Page Object Model (POM)
- Git & GitHub

Test Coverage

The automated tests cover several key user flows of the Conduit application.

Authentication

- User signup
- User signin
- Positive and negative scenarios
- Authentication helper for faster test setup

Article Management

- Create a new article
- Edit an existing article
- Delete an article
- Like an article

Comments

- Add a comment to an article
- Delete a comment

User Settings

- Update profile information

The project follows the Page Object Model (POM) design pattern to keep tests readable and maintainable by separating test logic from UI interactions.

How to Run the Tests

Install dependencies:

npm install

Run all tests:

npx playwright test

Run tests in UI mode:

npx playwright test --ui

View the Playwright HTML report:

npx playwright show-report

What This Project Demonstrates

This project showcases several QA Automation practices:

- Test automation using Playwright
- Page Object Model architecture
- Reusable helper functions
- Unique test data generation
- Stable locators
- Independent and readable test scenarios
