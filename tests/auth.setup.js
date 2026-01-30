const { test: setup, expect } = require('@playwright/test');
const { LoginPage } = require('../pages/loginPage');
const path = require('path');
const testData = require('../utils/testData');


const authFile = path.join(__dirname, '../.auth/user.json');

setup('authenticate', async ({ page }) => {
  const loginPage = new LoginPage(page);
  // 1. Perform login steps
  await loginPage.goto();
  
  // Wait for the page to be fully loaded
  await page.waitForLoadState('networkidle');
  
  await loginPage.login(testData.validUser.email, testData.validUser.password);
  
  // 2. Verify login was successful
  // Use a longer timeout for the dashboard check as it might take time to redirect
  await expect(page.getByText('DASHBOARD PAGE')).toBeVisible({ timeout: 15000 });
  
  // 3. Save the storage state (cookies, local storage) to a file
  await page.context().storageState({ path: authFile });
});