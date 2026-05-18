import { Locator, Page, expect } from '@playwright/test';
import { BasePage } from './BasePage';

export class ProductPage extends BasePage {
    protected readonly name: Locator;
    protected readonly price: Locator;
    protected readonly addToCartButton: Locator;
    protected readonly addToFavoritesButton: Locator;
    protected readonly alertMessage: Locator;

    constructor(page: Page) {
        super(page);
        this.name = this.page.getByTestId('product-name');
        this.price = this.page.locator('.price-section');
        this.addToCartButton = this.page.getByTestId('add-to-cart');
        this.addToFavoritesButton = this.page.getByTestId('add-to-favorites');
        this.alertMessage = this.page.getByRole('alert', { name: 'Product added to shopping cart.' });

    }

    async verifyProductName(name: string) {
        await expect(this.name).toHaveText(name);
    }
    
    async verifyProductPrice(price: string) {
        await expect(this.price).toHaveText(price);
    }

    async verifyProductActionButtonsVisible() {
        // In case if number of buttons to be checked increases
        const buttons = [
            this.addToCartButton,
            this.addToFavoritesButton
        ]

        for (const button of buttons) {
            await expect(button).toBeVisible();
        }
    }

    async addProductToCart() {
        await this.addToCartButton.click(); 
        await expect(this.alertMessage).toBeVisible();
        
    }

    async verifyAlertMessageAppear() {
        await expect(this.alertMessage).toBeVisible();
        await expect(this.alertMessage).toHaveText('Product added to shopping cart.');
    }

    async verifyAlertMessageDisappear() {
        await expect(this.alertMessage).not.toBeVisible({ timeout: 8000 });
    }
}