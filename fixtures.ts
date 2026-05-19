import { test as base } from '@playwright/test';
import { Application } from "./helper/Application"
import { authData } from './data/data';


type MyFixture = {
    app: Application
    loggedInApp: Application
}

export const test = base.extend<MyFixture>({
    app: async ({ page }, use) => {
        const app = new Application(page);
        
        await use(app);
    },
    loggedInApp: async ({ app }, use) => {
        await app.open('/auth/login');
        const { email, password } = authData;
        await app.loginPage.performLogin(email, password);
        
        await use(app);
    }
});