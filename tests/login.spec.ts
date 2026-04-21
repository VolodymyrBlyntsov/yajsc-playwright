import { test, expect } from '@playwright/test';
import { authData } from '../data/data';
import { LoginPage } from '../pages/LoginPage';


test('Verify login with valid credentials', async ({ page }) => {
  const { email, password } = authData;
  const loginPage = new LoginPage(page);
  
  await test.step('Login', async () => {
    await loginPage.open('/auth/login');
    await loginPage.header.expectSignOut();
    await loginPage.performLogin(email, password);
  })

  await test.step('Verify that PA open', async () => {
    await expect(page).toHaveURL('/account');
    await loginPage.header.expectSignedIn('Jane Doe');
    await expect(page.getByTestId('page-title')).toContainText('My account');
  })
});