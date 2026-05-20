import { Locator, Page, expect } from '@playwright/test';

export class CartItemComponent {
    readonly productName: Locator;
    readonly productPrice: Locator;
    readonly productQuantity: Locator;
    protected readonly totalPrice: Locator;

    constructor(private readonly page: Page) {
        this.productName = this.page.getByTestId('product-title');
        this.productQuantity = this.page.getByTestId('product-quantity');
        this.productPrice = this.page.getByTestId('product-price');
        this.totalPrice = this.page.getByTestId('cart-total');
    }

    async verifyProductInCart(name: string, price?: string, quantity?: string): Promise<void> {
        await expect(this.productName).toHaveText(name);
        
        if (price != undefined) {
            await expect(this.productPrice).toHaveText(price);
        }
        
        if (quantity != undefined) {
            await expect(this.productQuantity).toHaveValue(quantity);
        }
    }

    async verifyTotalPrice(price: string): Promise<void> {
        await expect(this.totalPrice).toHaveText(price);
    }
}