import { APIRequestContext, expect, Page } from "@playwright/test"
import { authData } from "../data/data"

type TApiResponse = {
    access_token: string;
}

const { email, password } = authData;

export async function apiLogin(page: Page, request: APIRequestContext): Promise<void> {
    const response = await request.post(process.env.API_LOGIN_URL, {
        data: { email, password }
    });

    const jsonData = await response.json() as TApiResponse;
    const token: string = jsonData.access_token;

    expect (response.ok()).toBeTruthy();

    await page.goto('/');

    await page.evaluate(token => {
        localStorage.setItem('auth-token', token);
    }, token);

    await page.reload();
}