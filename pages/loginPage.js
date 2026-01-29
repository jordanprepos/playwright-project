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
    await this.page.fill(this.emailInput, email);
    await this.page.fill(this.passwordInput, password);
    await this.page.click(this.signInButton);
  }
}

module.exports = { LoginPage };
