import { Locator, Page, expect } from '@playwright/test';

// ToDo cover all feature from header in future (if needed)

export class HeaderComponent {
    protected readonly singInLink: Locator;
    protected readonly loggedUsername: Locator;
    protected readonly cart: Locator;
    protected readonly cartQuantity: Locator;

    constructor(protected readonly page: Page) {
        this.singInLink = this.page.getByTestId('nav-sign-in');
        this.loggedUsername = this.page.getByTestId('nav-menu');
        this.cart = this.page.getByTestId('nav-cart');
        this.cartQuantity = this.page.getByTestId('cart-quantity');
    }

    async expectSignOut() {
        await expect(this.singInLink).toBeVisible();
    }

    async expectSignedIn(username: string) {
        await expect(this.loggedUsername).toBeVisible();
        await expect(this.loggedUsername).toContainText(username);
    }

    async checkCartQuantity(quantity: string) {
        await expect(this.cartQuantity).toHaveText(quantity);
    }

    async openCart() {
        await this.cart.click();
        await expect(this.page).toHaveURL('/checkout');
    }
}