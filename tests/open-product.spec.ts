import { test, expect } from '@playwright/test';
import { productData } from '../data/data';
import { HomePage } from '../pages/HomePage';
import { ProductPage } from '../pages/ProductPage';

test('Verify user can view product details', async ({page}) => {
    const { name, price } = productData;
    const homePage = new HomePage(page);
    const productPage = new ProductPage(page);

    await test.step('Open product', async () => {
        await homePage.open('/');
        const productNameLocator = homePage.getProductByName(name);
        await productNameLocator.click();
    })

    await test.step('Verify selected product details', async () => {
        await expect(page).toHaveURL(/\/product\/\w{26}$/); // took regex from Unit-10 video
        await productPage.verifyProductName(name);
        await productPage.verifyProductPrice(price);
        await productPage.verifyProductActionButtonsVisible();
    });
});