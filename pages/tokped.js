const { expect } = require("@playwright/test");
const testData = require('../utils/testData');

class SimpleSearchTokpedPage {
    constructor(page) {
        this.page = page;
        this.pageInstruction = 'Cari di Tokopedia';
    }

    async navigateToSimpleSearchTokped() {
        await this.page.goto(testData.tokped.tokpedUrl);
        // await expect(this.page).toHaveTitle('Tokopedia');
    }

    async searchTokped() {
        await this.page.getByPlaceholder('Cari di Tokopedia').fill(testData.tokped.searchTokpedValue);
        await this.page.keyboard.press('Enter');
    }

    async verifyProductExist() {
        // Assert that the product "iPhone 17" exists in the results
        // You can verify by specific text visible in the image
        // await expect(this.page.getByText('iPhone 17 5G 256GB | 512GB').first()).toBeVisible();
        // await expect(this.page.getByText('Rp17.600.000').first()).toBeVisible();
        // await expect(this.page.getByText('Doran Gadget Store').first()).toBeVisible();

        // Find the specific product card for Doran Gadget using the link structure in the HTML
        // This ensures we are targeting the correct card even if it's not the first result
        const productCard = this.page
            .locator('a[href*="tokopedia.com/dorangadget"]')
            .filter({ hasText: 'iPhone 17 5G' })
            .first();

        // Scroll to the card to ensure it loads (lazy loading)
        await productCard.scrollIntoViewIfNeeded();

        await expect(productCard).toBeVisible();
        
        // Verify details inside this specific card
        await expect(productCard).toContainText('iPhone 17 5G 256GB | 512GB');
        await expect(productCard).toContainText('Rp17.600.000');
        await expect(productCard).toContainText('Doran Gadget Store');
    }
}

module.exports = { SimpleSearchTokpedPage };