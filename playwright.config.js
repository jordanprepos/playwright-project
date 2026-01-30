// playwright.config.js
import { defineConfig, devices } from '@playwright/test';
import path from 'path';

// Define the path where the session state will be stored
export const STORAGE_STATE = path.join(__dirname, '.auth/user.json');

export default defineConfig({
  testDir: './tests',
  retries: 0,
  globalTeardown: require.resolve('./global-teardown'),
  use: {
    headless: true,
    baseURL: 'https://bima.meta-uat.nobubank.com/#/auth/login',
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
  },
  projects: [
    // Project to handle the authentication once
    {
      name: 'setup',
      testMatch: /auth\.setup\.js/,
    },
    // Main testing project(s)
    {
      name: 'chromium',
      use: { 
        ...devices['Desktop Chrome'],
        // Use the saved authentication state in this project
        storageState: STORAGE_STATE,
      },
      // This project depends on 'setup' being successful
      // dependencies: ['setup'],
    },
  ],
});