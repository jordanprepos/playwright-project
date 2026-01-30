// pages/loginPage.js
/**
 * Put CCS selector in this pages folder
 */
const { Page } = require("@playwright/test");

class LoginPage {
  constructor(page) {
    this.page = page;
    this.emailInput = "//label[contains(text(),'Username')]/following-sibling::input";
    this.passwordInput = "//input[@type='password']";
    this.signInButton = "//button[@type='submit']";
  }

  async goto() {
    await this.page.goto('https://bima.meta-uat.nobubank.com/#/auth/login');
  }

  async login(email, password) {
    // Using pressSequentially to ensure reactive forms pick up the input
    const emailField = this.page.locator(this.emailInput);
    await emailField.click();
    await emailField.pressSequentially(email, { delay: 50 });
    
    const passwordField = this.page.locator(this.passwordInput);
    await passwordField.click();
    await passwordField.pressSequentially(password, { delay: 50 });
    
    // Wait for the button to be enabled (some apps need a bit of time)
    await this.page.locator(this.signInButton).waitFor({ state: 'visible' });
    
    await this.page.click(this.signInButton);
  }
}

module.exports = { LoginPage };
