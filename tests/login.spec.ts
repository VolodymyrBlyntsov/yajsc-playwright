import { test, expect } from '@playwright/test';
import { accountData, authData, headerData } from '../data/data';
import { LoginPage } from '../pages/LoginPage';
import { AccountPage } from '../pages/AccountPage';


test('Verify login with valid credentials', async ({ page }) => {
  const { email, password } = authData;
  const { profileName } = headerData;
  const { accountText } = accountData;
  const loginPage = new LoginPage(page);
  const accountPage = new AccountPage(page);
  
  await test.step('Login', async () => {
    await loginPage.open('/auth/login');
    await loginPage.header.expectSignOut();
    await loginPage.performLogin(email, password);
  })

  await test.step('Verify that PA open', async () => {
    await expect(page).toHaveURL('/account');
    await loginPage.header.expectSignedIn(profileName);
    await accountPage.checkAccountText(accountText);
  })
});