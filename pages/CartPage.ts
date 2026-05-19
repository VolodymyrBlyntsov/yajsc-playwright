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