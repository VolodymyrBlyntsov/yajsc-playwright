import { Locator, Page, expect } from '@playwright/test';


export class SignInComponent {
    readonly singInForm: Locator;

    constructor(private readonly page: Page) {
        this.singInForm = this.page.getByTestId('guest-submit');
    }

    async verifyUserLoggedIn() {
        await expect(this.singInForm).toBeHidden();
    }
}