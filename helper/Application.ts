import { Page } from "@playwright/test";
import { AccountPage } from "../pages/AccountPage";
import { BasePage } from "../pages/BasePage";
import { CartPage } from "../pages/CartPage";
import { HomePage } from "../pages/HomePage";
import { LoginPage } from "../pages/LoginPage";
import { ProductPage } from "../pages/ProductPage";


export class Application extends BasePage {
    homePage: HomePage;
    cartPage: CartPage;
    loginPage: LoginPage;
    productPage: ProductPage;
    accountPage: AccountPage;

    constructor(page: Page) {
        super(page);
        this.homePage = new HomePage(page);
        this.loginPage = new LoginPage(page);
        this.productPage = new ProductPage(page);
        this.accountPage = new AccountPage(page);
        this.cartPage = new CartPage(page);
    }
};