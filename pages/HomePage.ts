import { Category } from '../data/enums';
import { BasePage } from './BasePage';
import { Page, Locator, expect } from '@playwright/test';

export class HomePage extends BasePage {

    protected readonly sortSelector: Locator;  
    protected readonly productName: Locator;
    protected readonly items: Locator;
  
    constructor(page: Page) {
        super(page);
        this.sortSelector = this.page.getByTestId('sort');
        this.productName = this.page.getByTestId('product-name');
        this.items = this.page.locator('.card');
    }

    getProductByName(name: string) { 
        return this.page.getByTestId('product-name').filter({ hasText: new RegExp(name)});
    }

    async sortBy(selector: string) {
        await expect(this.sortSelector).toBeVisible();
        await Promise.all([
            this.page.waitForLoadState('networkidle'),
            this.sortSelector.selectOption(selector),
        ]);
    }

    async getProductNames(): Promise<string[]> {
        await expect(this.productName.first()).toBeVisible();
        const names = await this.productName.allTextContents();

        return names.map(name => name.trim());
    }

    async selectCategory(categoryValue: Category) {
        const checkbox = this.page.getByLabel(categoryValue, { exact: true });

        if (!(await checkbox.isChecked())) {
            await checkbox.check();
        }
        await this.page.waitForLoadState('networkidle');
    }

    async verifyProductsContain(text: string) {
        const productNames = await this.getProductNames();

        for (const name of productNames) {
            expect(name.toLowerCase()).toContain(text.toLowerCase());
        }
    }

    async openFirstProduct() {
        const firstCard = this.items.first();
        await expect(firstCard).toBeVisible();

        const firstProductName = await firstCard.locator('[data-test="product-name"]').innerText();
        const firstProductPrice = await firstCard.locator('[data-test="product-price"]').innerText();

        await firstCard.click();
        return { firstProductName, firstProductPrice };
    }
}