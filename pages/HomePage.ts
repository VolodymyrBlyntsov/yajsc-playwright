import { Category } from '../data/enums';
import { BasePage } from './BasePage';
import { Page, Locator, expect } from '@playwright/test';

interface ProductDetails {
    firstProductName: string,
    firstProductPrice: string
}

export class HomePage extends BasePage {

    protected readonly sortSelector: Locator;  
    protected readonly productName: Locator;
    protected readonly productPrice: Locator;
    protected readonly items: Locator;
  
    constructor(page: Page) {
        super(page);
        this.sortSelector = this.page.getByTestId('sort');
        this.productName = this.page.getByTestId('product-name');
        this.productPrice = this.page.getByTestId('product-price');
        this.items = this.page.locator('.card');
    }

    getProductByName(name: string): Locator { 
        return this.page.getByTestId('product-name').filter({ hasText: new RegExp(name)});
    }

    async sortBy(selector: string): Promise<void> {
        await this.sortSelector.selectOption(selector);
        await this.page.waitForLoadState('networkidle');
    }

    async getProductNames(): Promise<string[]> {
        await this.productName.first().waitFor({ state: 'attached' });

        const names = await this.productName.allTextContents();
        return names.map(name => name.trim());
    }

    async getProductPrices(): Promise<number[]> {
        await this.productPrice.first().waitFor({ state: 'attached' });
        
        const prices = await this.productPrice.allTextContents();
        return prices.map(price => Number(price.replace('$', '').trim()));
    }

    async selectCategory(categoryValue: Category): Promise<void> {
        const checkbox = this.page.getByLabel(categoryValue, { exact: true });

        if (!(await checkbox.isChecked())) {
            await checkbox.check();
        }
        await this.page.waitForLoadState('networkidle');
    }

    async verifyProductsContain(text: string): Promise<void> {
        const productNames = await this.getProductNames();

        for (const name of productNames) {
            expect(name.toLowerCase()).toContain(text.toLowerCase());
        }
    }

    async openFirstProduct(): Promise<ProductDetails> {
        const firstCard = this.items.first();
        await expect(firstCard).toBeVisible();

        const firstProductName = await firstCard.locator('[data-test="product-name"]').innerText();
        const firstProductPrice = await firstCard.locator('[data-test="product-price"]').innerText();

        await firstCard.click();
        return { firstProductName, firstProductPrice };
    }
}