const { test, expect } = require('@playwright/test');
const { LoginPage } = require('../pages/loginPage');
const { TambahLimitManagementPage } = require('../pages/tambah-limit-management');
const testData = require('../utils/testData');

test.beforeEach(async ({ page }) => {
    const loginPage = new LoginPage(page);

    // 1. Mission: Login first
    await loginPage.goto();
    await loginPage.login(testData.validUser.email, testData.validUser.password);
    
    // 2. Verify login success
    await expect(page.getByText('DASHBOARD PAGE')).toBeVisible();
});

test('Tambah Limit Management', async ({ page }) => {
    const tambahLimitPage = new TambahLimitManagementPage(page);

    // 3. Navigate through Sidebar
    await tambahLimitPage.navigateToLimitManagement();
    
    // 4. Verify we reached the Limit Management page
    await expect(page).toHaveURL(/limit-config\/list/);
    
    // 5. Click Tambah
    await tambahLimitPage.clickTambah();
    
    // 6. Verify we are on the "Tambah Limit Management" form
    await expect(page.getByText('Tambah Limit Management')).toBeVisible();

    await tambahLimitPage.clickTambah();

    await tambahLimitPage.fillForm(
        testData.partnerInfo.partnerName,
        testData.services.cobrandSaving.serviceName,
        testData.services.apiServices.interbankTransfer,
        testData.services.cobrandSaving.serviceDescription
    );
    
    await expect(tambahLimitPage.submitButton).toBeEnabled();

    await page.waitForTimeout(0); // or a very large number like 9999999
    

});