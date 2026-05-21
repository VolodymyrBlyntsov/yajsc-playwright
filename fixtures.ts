import { test as base } from '@playwright/test';
import { Application } from "./helper/Application"
import { apiLogin } from './helper/api-login';


type MyFixture = {
    app: Application
    loggedInApp: Application
}

export const test = base.extend<MyFixture>({
    app: async ({ page }, use) => {
        const app = new Application(page);
        
        await use(app);
    },
    loggedInApp: async ({ app, page, request }, use) => {
        await apiLogin(page, request);
        await use(app);
    }
});