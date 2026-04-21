import { test, expect } from '@playwright/test';
import { productData } from '../data/data';
import { HomePage } from '../pages/HomePage';

test('Verify user can view product details', async ({page}) => {
    const { name, price } = productData; 
    const homePage = new HomePage(page);

    await test.step('Open product', async () => {
        await homePage.open('/');
        const productNameLocator = homePage.getProductByName(name);
        await productNameLocator.click();
    })

    await test.step('Verify selected product details', async () => {
        await expect(page).toHaveURL(/\/product\/\w{26}$/); // took regex from Unit-10 video
        await expect(page.getByTestId('product-name')).toHaveText(name);
        await expect(page.locator('.price-section')).toHaveText(price);
        await expect(page.getByTestId('add-to-cart')).toBeVisible();
        await expect(page.getByTestId('add-to-favorites')).toBeVisible();
    })
});