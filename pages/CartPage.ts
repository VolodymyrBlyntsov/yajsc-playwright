import { Locator, Page, expect } from '@playwright/test';
import { BasePage } from './BasePage';

export class CartPage extends BasePage {
    protected readonly productName: Locator;
    protected readonly productQuantity: Locator;
    protected readonly proceedButton: Locator;

    constructor(page: Page) {
        super(page);
        this.productName = this.page.getByTestId('product-title');
        this.productQuantity = this.page.getByTestId('product-quantity');
        this.proceedButton = this.page.getByTestId('proceed-1');
    }

    async verifyProductInCart(name: string, quantity: string) {
        await expect(this.productName).toHaveText(name);
        await expect(this.productQuantity).toHaveValue(quantity);
    }

    async verifyProceedCheckoutVisible() {
        await expect(this.proceedButton).toBeVisible();
    }
}