import { Page } from "@playwright/test";
import { HeaderComponent } from "./components/headerComponent";


export abstract class BasePage {
    readonly header: HeaderComponent
    
    constructor(protected readonly page: Page) {
        this.header = new HeaderComponent(page);
    }

    async open(path: string): Promise<void> {
        await this.page.goto(path);
    }
}