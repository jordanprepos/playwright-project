# Playwright UI Testing - Learning Project

This project is a boilerplate and learning environment for automated UI testing using [Playwright](https://playwright.dev/). It demonstrates modern testing practices like the Page Object Model (POM), simultaneous multi-window testing, and global lifecycle management.

## 🚀 Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v16 or higher)
- npm (installed with Node.js)

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/jordanprepos/playwright-project.git
   cd playwright-project
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Install Playwright Browsers:
   ```bash
   npx playwright install
   ```

## 📁 Project Structure

```text
├── pages/                # Page Object Model (POM) files
│   ├── loginPage.js      # Locators and actions for Login
│   └── pinPage.js        # Logic for PIN entry workflows
├── tests/                # Test specifications
│   ├── simultaneous.spec.js  # Multi-window parallel testing example
│   └── auth.setup.js     # Authentication setup script
├── utils/                # Helper utilities
│   └── testData.js       # Centralized test data (URLs, credentials)
├── playwright.config.js  # Playwright configuration
└── global-teardown.js    # Script running after all tests finish
```

## 🧪 Running Tests

### Run all tests

```bash
npx playwright test
```

### Run a specific test in Headed mode (with Browser UI)

```bash
npx playwright test tests/simultaneous.spec.js --headed
```

### Run in Debug Mode

```bash
npx playwright test --debug
```

## 💡 Key Features Demonstrated

### 1. Simultaneous Multi-Window Testing

Located in `tests/simultaneous.spec.js`. This test demonstrates how to open two completely independent browser contexts at once. This is useful for:

- Testing multi-user interactions (e.g., chat, notifications).
- Parallelizing workflows.
- Performance comparisons.

### 2. Page Object Model (POM)

The project separates UI locators from test logic. For example, `pages/pinPage.js` contains a method `inputPin(pin)` that iterates through digits and clicks buttons, making the test code clean and maintainable.

### 3. Global Teardown

Configured in `playwright.config.js` via `globalTeardown`. It ensures that a specific script (`global-teardown.js`) runs at the very end of the test suite to perform cleanup or reporting.

### 4. Developer Tools Integration

The project is configured to automatically open the **Developer Tools (Network Tab)** when running in headed mode to help with debugging network requests during automated runs.

## ⚙️ Configuration

- **Retries**: Currently set to `0` in `playwright.config.js` for faster debugging.
- **Base URL**: Configured for the Nobu Bank UAT environment.
- **State Management**: Uses `.auth/user.json` to store session states and avoid redundant logins.

---

_Happy Testing!_
