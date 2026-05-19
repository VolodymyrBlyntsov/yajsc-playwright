import { test, expect } from '@playwright/test';
import { productData, productInfo, productASCsort, productDESCsort, productHighLowPriceSort, productLowHighPriceSort } from '../data/data';
import { HomePage } from '../pages/HomePage';
import { ProductPage } from '../pages/ProductPage';
import { CartPage } from '../pages/CartPage';
import { PowerTools } from '../data/enums';

let homePage: HomePage;
let productPage: ProductPage;
let cartPage: CartPage;
const { name, price } = productInfo;

test.describe('Actions with Products', () => {
    test.beforeEach(async ({ page }) => {
        homePage = new HomePage(page);
        productPage = new ProductPage(page);
        cartPage = new CartPage(page);
        await homePage.open('/')
    })

    test('Verify user can view product details', async ({page}) => {
        const { name, price } = productData;

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
        { label: 'A-Z', selector: 'name,asc', expectedList: productASCsort },
        { label: 'Z-A', selector: 'name,desc', expectedList: productDESCsort }
    ].forEach(({ label, selector, expectedList }) => {
        test(`Verify user can perform sorting by ${label}`, async () => {
            await homePage.sortBy(selector);
            const productList = await homePage.getProductNames();
            expect(productList).toEqual(expectedList);
        })
    });

    [
        { label: 'Price (High-Low)', selector: 'price,desc', expectedList: productHighLowPriceSort },
        { label: 'Price (Low-High)', selector: 'price,asc', expectedList: productLowHighPriceSort }
    ].forEach(({ label, selector, expectedList }) => {
        test(`Verify user can perform sorting by ${label}`, async () => {
            await homePage.sortBy(selector);
            const productList = await homePage.getProductNames();
            expect(productList).toEqual(expectedList);
        })
    })

    test('Verify user can filter products by category', async () => {
        await homePage.selectCategory(PowerTools.SANDER);
        await homePage.verifyProductsContain(PowerTools.SANDER);
    })
})