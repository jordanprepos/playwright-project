const { Page } = require("@playwright/test");

class TambahLimitManagementPage {
  constructor(page) {
    this.page = page;
    this.apiMonetizingMenu = page.getByText('API Monetizing Configuration');
    this.limitManagementSubMenu = page.getByText('Limit Management');
    this.tambahButton = page.getByRole('button', { name: 'Tambah' });
  }

  async navigateToLimitManagement() {
    await this.apiMonetizingMenu.click();
    await this.limitManagementSubMenu.click();
  }

  async clickTambah() {
    await this.tambahButton.click();
  }

  // --- NEW ACTIONS ---
  async fillForm(partnerName, serviceName, serviceApi, description) {
    // Select Partner (Vue Select logic)
    await this.partnerSearchInput.click();
    await this.partnerSearchInput.fill(partnerName);
    await this.page.getByRole('option', { name: partnerName }).first().click();
    // Fill other fields
    await this.serviceNameInput.fill(serviceName);
    await this.serviceApiInput.fill(serviceApi);
    await this.descriptionTextarea.fill(description);
  }

}

module.exports = { TambahLimitManagementPage };
