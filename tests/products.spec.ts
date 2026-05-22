import { test, expect } from '@playwright/test';
import { products } from '../data/data';
import { PowerTools } from '../data/enums';
import { HomePage } from '../pages/HomePage';
import { ProductPage } from '../pages/ProductPage';
import { CartPage } from '../pages/CartPage';
import { sortNames, sortPrices } from '../utils/sortUtils';
import { MockProduct } from '../data/types';

let homePage: HomePage;
let productPage: ProductPage;
let cartPage: CartPage;
const { name, price } = products.slipJointPliers;

test.describe('Actions with Products', () => {
    test.beforeEach(async ({ page }) => {
        homePage = new HomePage(page);
        productPage = new ProductPage(page);
        cartPage = new CartPage(page);
        await homePage.open('/')
    })

    test('Verify user can view product details', async ({page}) => {
        const { name, price } = products.combinationPliers;

        await test.step('Open product', async () => {
            const productNameLocator = homePage.getProductByName(name);
            await productNameLocator.click();
        })

        await test.step('Verify selected product details', async () => {
            await expect(page).toHaveURL(/\/product\/\w{26}$/); // took regex from Unit-10 video
            await productPage.verifyProductName(name);
            await productPage.verifyProductPrice(price);
            await productPage.verifyProductActionButtonsVisible();
        });
    });

    test('Verify user can add product to cart', async ({page}) => {
        await test.step('Open product page and verify selected product details', async() => {
            await homePage.open('/');
            const productNameLocator = homePage.getProductByName('Slip Joint Pliers');
            await productNameLocator.click();

            await expect(page).toHaveURL(/\/product\/\w{26}$/);
            await productPage.verifyProductName(name);
            await productPage.verifyProductPrice(price);
        })

        await test.step('Add product to the card', async () => {
            await productPage.addProductToCart();
            await productPage.verifyAlertMessageAppear();
            await productPage.verifyAlertMessageDisappear();
            await productPage.header.checkCartQuantity("1");
        })
        
        await test.step('Verify product added to the cart', async () => {
            await productPage.header.openCart();
            await cartPage.cartItem.verifyProductInCart(name, undefined, "1");
            await cartPage.proceed.verifyProceedCheckoutVisible();
        })
    })
})

test.describe('Product sorting', () => {
    test.beforeEach(async ({ page }) => {
        homePage = new HomePage(page);
        await homePage.open('/');
    });


    [
        { label: 'A-Z', selector: 'name,asc', direction: 'asc' as const },
        { label: 'Z-A', selector: 'name,desc', direction: 'desc' as const }
    ].forEach(({ label, selector, direction }) => {
        test(`Verify user can perform sorting by ${label}`, async () => {
            await homePage.sortBy(selector);
            const actualNames = await homePage.getProductNames();
            const expectedNames = sortNames(actualNames, direction);

            expect(actualNames).toEqual(expectedNames);
        });
    });

    [
        { label: 'Price (High-Low)', selector: 'price,desc', direction: 'desc' as const },
        { label: 'Price (Low-High)', selector: 'price,asc', direction: 'asc' as const }
    ].forEach(({ label, selector, direction }) => {
        test(`Verify user can perform sorting by ${label}`, async () => {
            await homePage.sortBy(selector);
            const actualPrices = await homePage.getProductPrices();

            const expectedPrices = sortPrices(actualPrices, direction);
            expect(actualPrices).toEqual(expectedPrices);
        });
    });

    test('Verify user can filter products by category', async () => {
        await homePage.selectCategory(PowerTools.SANDER);
        await homePage.verifyProductsContain(PowerTools.SANDER);
    })
})

test.describe('Mocked products', () => {
     test.beforeEach(({ page }) => {
        homePage = new HomePage(page);
    });

    test('Verify mocked products on Home page', async ({ page }) => {

        const mockedData: MockProduct[] = [];       

        for (let i = 1; i <= 20; i++) {
            mockedData.push({
                id: i,
                name: `Item: ${i}`,
                price: i * 5
            })
        };

        await page.route(process.env.API_PRODUCTS_URL, async route => {
            await route.fulfill({
                status: 200,
                contentType: 'application/json',
                body: JSON.stringify({
                    data: mockedData,
                    current_page: 1,
                    from: 1,
                    last_page: 1,
                    per_page: 20,
                    to: 20,
                    total: 20
                })
            });
        })

        await page.goto('/');
        await expect(homePage.productName).toHaveCount(20);
    })
})