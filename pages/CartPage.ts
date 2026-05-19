import { Page } from '@playwright/test';
import { BasePage } from './BasePage';

import { CartItemComponent } from '../pages/components/cart/cartItemComponent';
import { BillingComponent } from '../pages/components/cart/billingComponent';
import { PaymentComponent } from '../pages/components/cart/paymentComponent';
import { ProceedButtonComponent } from '../pages/components/cart/proceedButtonComponent';
import { SignInComponent } from '../pages/components/cart/signInComponent';

export class CartPage extends BasePage {
    readonly cartItem: CartItemComponent;
    readonly billingForm: BillingComponent;
    readonly payment: PaymentComponent;
    readonly proceed: ProceedButtonComponent;
    readonly signIn: SignInComponent;

    constructor(page: Page) {
        super(page);

        this.cartItem = new CartItemComponent(page);
        this.billingForm = new BillingComponent(page);
        this.payment = new PaymentComponent(page);
        this.proceed = new ProceedButtonComponent(page);
        this.signIn = new SignInComponent(page);
    }
}
    // protected readonly productName: Locator;
    // protected readonly productPrice: Locator;
    // protected readonly productQuantity: Locator;
    // protected readonly proceedButtonCart: Locator;
    // protected readonly proceedButtonSignIn: Locator
    // protected readonly proceedButtonBillingAddress: Locator;
    // protected readonly proceedButtonPayment: Locator;
    // protected readonly totalPrice: Locator;
    // protected readonly singInForm: Locator;
    // protected readonly formCountry: Locator;
    // protected readonly formPostalCode: Locator;
    // protected readonly formHouseNumber: Locator;
    // protected readonly formStreet: Locator;
    // protected readonly formCity: Locator;
    // protected readonly formState: Locator;
    // protected readonly paymentSelector: Locator;
    // protected readonly confirmOrderButton: Locator;
    // protected readonly orderConfirmedAlert: Locator;

    // constructor(page: Page) {
    //     super(page);
    //     this.productName = this.page.getByTestId('product-title');
    //     this.productQuantity = this.page.getByTestId('product-quantity');
    //     this.productPrice = this.page.getByTestId('product-price');
    //     this.proceedButtonCart = this.page.getByTestId('proceed-1');
    //     this.proceedButtonSignIn = this.page.getByTestId('proceed-2');
    //     this.proceedButtonBillingAddress = this.page.getByTestId('proceed-3');
    //     this.proceedButtonPayment = this.page.getByTestId('proceed-4');
    //     this.totalPrice = this.page.getByTestId('cart-total');
    //     this.singInForm = this.page.getByTestId('guest-submit');
    //     this.formCountry = this.page.getByTestId('country');
    //     this.formPostalCode = this.page.getByTestId('postal_code');
    //     this.formHouseNumber = this.page.getByTestId('house_number');
    //     this.formStreet = this.page.getByTestId('street');
    //     this.formCity = this.page.getByTestId('city');
    //     this.formState = this.page.getByTestId('state');
    //     this.paymentSelector = this.page.getByTestId('payment-method');
    //     this.confirmOrderButton = this.page.getByTestId('finish');
    //     this.orderConfirmedAlert = this.page.getByTestId('payment-success-message');
    // }

    // async verifyProductInCart(name: string, price?: string, quantity?: string) {
    //     await expect(this.productName).toHaveText(name);
    //     if (price != undefined) {
    //         await expect(this.productPrice).toHaveText(price);
    //     }
    //     if (quantity != undefined) {
    //         await expect(this.productQuantity).toHaveValue(quantity);
    //     }
    // }

    // async verifyProceedCheckoutVisible() {
    //     await expect(this.proceedButtonCart).toBeVisible();
    // }

    // async verifyTotalPrice(price: string) {
    //     await expect(this.totalPrice).toHaveText(price);
    // }

    // async proceedCheckout() {
    //     const buttons = [
    //         this.proceedButtonCart,
    //         this.proceedButtonSignIn,
    //         this.proceedButtonBillingAddress,
    //         this.proceedButtonPayment,
    //         this.confirmOrderButton,
    //     ]

    //     for (const button of buttons) {
    //         if (await button.isVisible()) {
    //             await button.click();
    //             return;
    //         }
    //     }

    //     throw new Error('No proceed button found');
    // }

    // async verifyUserLoggedIn() {
    //     await expect(this.singInForm).toBeHidden();
    // }

    // async submitBillingForm(
    //     country: string,
    //     postalCode: string,
    //     houseNumber: string,
    //     street: string,
    //     city: string,
    //     state: string
    // ) {
    //     await this.formCountry.selectOption(country);
    //     await this.formPostalCode.fill(postalCode);
    //     await this.formHouseNumber.fill(houseNumber);
    //     await this.formStreet.fill(street);
    //     await this.formCity.fill(city);
    //     await this.formState.fill(state);
    // }

    // async selectPaymentMethod(method: string) {
    //     await this.paymentSelector.selectOption(method);
    // }

    // async checkThatOrderConduct() {
    //     await expect(this.orderConfirmedAlert).toBeVisible();
    // }
// }