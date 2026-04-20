import { test, expect } from '@playwright/test';
import { authData } from '../data/auth';

test('Verify login with valid credentials', async ({ page }) => {
  const { email, password } = authData;
  
  await test.step('Login', async () => {
    await page.goto('/auth/login');
    await page.getByTestId('email').fill(email);
    await page.getByTestId('password').fill(password);
    await page.getByTestId('login-submit').click();
  })

  await test.step('Verify that PA open', async () => {
    await expect(page).toHaveURL('/account');
    await expect(page.getByTestId('page-title')).toHaveText('My account');
    await expect(page.getByTestId('nav-menu')).toContainText('Jane Doe');
  })
});