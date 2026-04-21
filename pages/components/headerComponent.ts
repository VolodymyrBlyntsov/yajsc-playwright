import { Locator, Page, expect } from '@playwright/test';

// ToDo cover all feature from header in future (if needed)

export class HeaderComponent {
    protected readonly singInLink: Locator;
    protected readonly loggedUsername: Locator;

    constructor(protected readonly page: Page) {
        this.singInLink = this.page.getByTestId('nav-sign-in');
        this.loggedUsername = this.page.getByTestId('nav-menu');
    }

    async expectSignOut() {
        await expect(this.singInLink).toBeVisible();
    }

    async expectSignedIn(username: string) {
        await expect(this.loggedUsername).toBeVisible();
        await expect(this.loggedUsername).toContainText(username);
    }
}