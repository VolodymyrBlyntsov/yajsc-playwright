import { Locator, Page, expect } from '@playwright/test';

export class PaymentComponent {
    readonly orderConfirmedAlert: Locator;
    readonly paymentSelector: Locator;


    constructor(private readonly page: Page) {
        this.paymentSelector = this.page.getByTestId('payment-method');
        this.orderConfirmedAlert = this.page.getByTestId('payment-success-message');
    }

    async selectPaymentMethod(method: string): Promise<void> {
        await this.paymentSelector.selectOption(method);
    }

    async checkThatOrderConduct(): Promise<void> {
        await expect(this.orderConfirmedAlert).toBeVisible();
    }
}