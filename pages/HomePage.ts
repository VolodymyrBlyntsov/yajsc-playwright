import { BasePage } from './BasePage';
import { Page } from '@playwright/test';

export class HomePage extends BasePage {
    
    constructor(page: Page) {
        super(page);
    }

    getProductByName(name: string) { 
        return this.page.getByTestId('product-name').filter({ hasText: new RegExp(name)});
    }
}