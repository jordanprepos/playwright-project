// pages/pinPage.js
const { expect } = require('@playwright/test');

class PinPage {
  constructor(page) {
    this.page = page;
    this.pinInstruction = 'Masukkan 6 digit PIN Kamu';
  }

  async verifyIsOnPinPage() {
    await expect(this.page.getByText(this.pinInstruction)).toBeVisible({ timeout: 15000 });
  }

  async inputPin(pin) {
    // Click each digit button sequentially
    for (const digit of pin) {
      await this.page.getByRole('button', { name: digit }).click();
    }
  }
}

module.exports = { PinPage };
