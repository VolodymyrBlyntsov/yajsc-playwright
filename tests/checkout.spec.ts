import { billingForm, paymentMethod } from "../data/data";
import { test } from "../fixtures";

test('Conduct a purchase', async ({ loggedInApp }) => {
     let product: { firstProductName: string; firstProductPrice: string };
     const { country, postalCode, houseNumber, street, city, state } = billingForm;
     const { payment } = paymentMethod;

    await test.step('Add product to the cart', async() => {
        await loggedInApp.open('/');
        product = await loggedInApp.homePage.openFirstProduct();
        await loggedInApp.productPage.addProductToCart();
        await loggedInApp.header.checkCartQuantity("1");
        await loggedInApp.header.openCart();
    })

    await test.step('Make an order', async () => {
        await loggedInApp.cartPage.cartItem.verifyProductInCart(product.firstProductName, product.firstProductPrice, "1");
        await loggedInApp.cartPage.cartItem.verifyTotalPrice(product.firstProductPrice);
        await loggedInApp.cartPage.proceed.proceedCheckout();

        await loggedInApp.cartPage.signIn.verifyUserLoggedIn();
        await loggedInApp.cartPage.proceed.proceedCheckout();

        await loggedInApp.cartPage.billingForm.submitBillingForm(country, postalCode, houseNumber, street, city, state);
        await loggedInApp.cartPage.proceed.proceedCheckout();

        await loggedInApp.cartPage.payment.selectPaymentMethod(payment);
        await loggedInApp.cartPage.proceed.proceedCheckout();
        await loggedInApp.cartPage.payment.checkThatOrderConduct();
    })
})