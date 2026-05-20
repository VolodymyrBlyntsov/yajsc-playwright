import { test } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { authData } from '../data/data';

const cookieFilePath = './auth/user.json';

test('Setup login authentication session', async({page, context}) => {    
    const { email, password } = authData;
    const loginPage = new LoginPage(page);

    await loginPage.open('/auth/login');
    await loginPage.performLogin(email, password);

    await context.storageState({ path: cookieFilePath });
})