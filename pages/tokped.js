const { expect } = require("@playwright/test");
const testData = require('../utils/testData');

class SimpleSearchTokpedPage {
    constructor(page) {
        this.page = page;
        this.pageInstruction = 'Cari di Tokopedia';
        this.pageTitle = 'Situs Jual Beli Online Terlengkap, Mudah & Aman | Tokopedia';
    }

    async navigateToSimpleSearchTokped() {
        await this.page.goto(testData.tokped.tokpedUrl);
        // Use getByPlaceholder to target the search input specifically
        await expect(this.page.getByPlaceholder(this.pageInstruction)).toBeVisible();
        await expect(this.page).toHaveTitle(this.pageTitle);
    }

    async searchTokped() {
        await this.page.getByPlaceholder('Cari di Tokopedia').fill(testData.tokped.searchTokpedValue);
        await this.page.keyboard.press('Enter');
    }

    async verifyProductExist() {
        // Scroll to the bottom of the page to trigger lazy loading
        await this.page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));

        // Find the specific product element using the accessible role and name
        const productElement = this.page.getByRole('link', { name: 'product-image Campaign Apple iPhone 17 256GB 512GB A19 Chip with Ceramic Shield' }).first();

        // Verify the element is attached and visible
        await expect(productElement).toBeVisible();
    }

    async scrollToText(text) {
        // Use exact: false to allow partial matches if the text is long or has whitespace issues
        const element = this.page.getByText(text, { exact: false }).first();
        
        // Verify the element is attached before trying to scroll
        await element.waitFor();

        // Force scroll to center without smooth behavior for better reliability
        await element.evaluate(element => element.scrollIntoView({ block: 'center', inline: 'center' }));
        
        await expect(element).toBeVisible();
    }
}

module.exports = { SimpleSearchTokpedPage };