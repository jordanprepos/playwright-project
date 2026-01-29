// playwright.config.js
import { defineConfig } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  retries: 1,
  use: {
    headless: true,
    baseURL: 'https://bima.meta-uat.nobubank.com/#/auth/login',
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
  },
});
