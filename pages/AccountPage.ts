import { Locator, Page, expect } from '@playwright/test';


export class AccountPage {
    protected readonly account: Locator;

    constructor(protected readonly page: Page) {
        this.account = this.page.getByTestId('page-title');
    }

    async checkAccountText(accName: string): Promise<void> { 
        await expect(this.account).toContainText(accName);
    }
}