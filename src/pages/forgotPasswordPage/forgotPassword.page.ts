import { $, browser } from '@wdio/globals'

class ForgotPasswordPage {
    async open(): Promise<void> {
        await browser.url("/forgot-password");
    }

    private get emailInput(): ChainablePromiseElement {
        return $('[id="forgot_password"] [id="email"]');
    }

    private get submitBtn(): ChainablePromiseElement {
        return $('[id="forgot_password"] button[type="submit"]');
    }

    private get confirmationAlert(): ChainablePromiseElement {
        return $('[id="confirmation-alert"]');
    }

    async setEmail(email: string): Promise<void> {
        await this.emailInput.waitForDisplayed();
        await this.emailInput.setValue(email);
    }

    async clickOnSubmitBtn(): Promise<void> {
        await this.submitBtn.waitForDisplayed();
        await this.submitBtn.scrollIntoView();
        await this.submitBtn.click();
    }

    async forgotPassword(email: string): Promise<void> {
        await this.setEmail(email);
        await this.clickOnSubmitBtn();
    }

    async isConfirmationAlertDisplayed(): Promise<boolean> {
        await this.confirmationAlert.waitForDisplayed();
        return this.confirmationAlert.isDisplayed();
    }
}

export default new ForgotPasswordPage();
