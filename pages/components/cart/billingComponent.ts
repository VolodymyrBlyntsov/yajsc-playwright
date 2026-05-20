import { Locator, Page } from '@playwright/test';

export class BillingComponent {
    readonly formCountry: Locator;
    readonly formPostalCode: Locator;
    readonly formHouseNumber: Locator;
    readonly formStreet: Locator;
    readonly formCity: Locator;
    readonly formState: Locator;
    
    constructor(private readonly page: Page) {
        this.formCountry = this.page.getByTestId('country');
        this.formPostalCode = this.page.getByTestId('postal_code');
        this.formHouseNumber = this.page.getByTestId('house_number');
        this.formStreet = this.page.getByTestId('street');
        this.formCity = this.page.getByTestId('city');
        this.formState = this.page.getByTestId('state');
    }
    
    async submitBillingForm(
        country: string,
        postalCode: string,
        houseNumber: string,
        street: string,
        city: string,
        state: string
    ): Promise<void> {
        await this.formCountry.selectOption(country);
        await this.formPostalCode.fill(postalCode);
        await this.formHouseNumber.fill(houseNumber);
        await this.formStreet.fill(street);
        await this.formCity.fill(city);
        await this.formState.fill(state);
    }
}