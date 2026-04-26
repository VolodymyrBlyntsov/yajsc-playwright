import { Locator, Page, expect } from '@playwright/test';
import { BasePage } from './BasePage';

export class ProductPage extends BasePage {
    protected readonly name: Locator;
    protected readonly price: Locator
    protected readonly addToCartButton: Locator;
    protected readonly addToFavoritesButton: Locator;

    constructor(page: Page) {
        super(page);
        this.name = this.page.getByTestId('product-name');
        this.price = this.page.locator('.price-section');
        this.addToCartButton = this.page.getByTestId('add-to-cart');
        this.addToFavoritesButton = this.page.getByTestId('add-to-favorites');
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

        for (let button of buttons) {
            await expect(button).toBeVisible();
        }
    }
}