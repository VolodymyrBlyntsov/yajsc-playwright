import { APIRequestContext, expect, Page } from "@playwright/test"
import { authData } from "../data/data"

type TApiResponse = {
    access_token: string;
}

const { email, password } = authData;
let token: string;

export async function apiLogin(page: Page, request: APIRequestContext): Promise<void> {
    const response = await request.post(process.env.API_LOGIN_URL, {
        data: {
            "email": email,
            "password": password
        }
    });

    const jsonData = await response.json() as TApiResponse;
    token = jsonData.access_token;

    expect (response.ok()).toBeTruthy();

    await page.goto('/');

    await page.evaluate(token => {
        localStorage.setItem('auth-token', token);
    }, token);

    await page.reload();
}