import { Locator, Page, expect } from '@playwright/test';

export class ProceedButtonComponent {
    readonly proceedButtonCart: Locator;
    readonly proceedButtonSignIn: Locator
    readonly proceedButtonBillingAddress: Locator;
    readonly confirmOrderButton: Locator;


    constructor(private readonly page: Page) {
        this.proceedButtonCart = this.page.getByTestId('proceed-1');
        this.proceedButtonSignIn = this.page.getByTestId('proceed-2');
        this.proceedButtonBillingAddress = this.page.getByTestId('proceed-3');
        this.confirmOrderButton = this.page.getByTestId('finish');
    }

    async proceedCheckout() {
        const buttons = [
            this.proceedButtonCart,
            this.proceedButtonSignIn,
            this.proceedButtonBillingAddress,
            this.confirmOrderButton,
        ]

        for (const button of buttons) {
            if (await button.isVisible()) {
                await button.click();
                return;
            }
        }

        throw new Error('No proceed button found');
    }

    async verifyProceedCheckoutVisible() {
        await expect(this.proceedButtonCart).toBeVisible();
    }
}