import { BasePage } from './BasePage';
import { Locator, Page } from '@playwright/test';

export class LoginPage extends BasePage {
    protected readonly email: Locator;
    protected readonly password: Locator;
    private readonly loginButton: Locator;

    constructor(page: Page) {
        super(page);
        this.email = this.page.getByTestId('email');
        this.password = this.page.getByTestId('password');
        this.loginButton = this.page.getByTestId('login-submit');
    }

    async performLogin(accEmail: string, accPass: string) {
        await this.email.fill(accEmail);
        await this.password.fill(accPass);
        await this.loginButton.click();
    }
}