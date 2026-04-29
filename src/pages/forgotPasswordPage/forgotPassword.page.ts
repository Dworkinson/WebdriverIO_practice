import { $, browser } from '@wdio/globals'

class ForgotPasswordPage {
    async open(): Promise<void> {
        await browser.url("/forgot-password");
    }

    private get emailInput(): Promise<WebdriverIO.Element> {
        return $('[id="forgot_password"] [id="email"]');
    }

    private get submitBtn(): Promise<WebdriverIO.Element> {
        return $('[id="forgot_password"] button[type="submit"]');
    }

    private get confirmationAlert(): Promise<WebdriverIO.Element> {
        return $('[id="confirmation-alert"]');
    }

    async setEmail(email: string): Promise<void> {
        await (await this.emailInput).waitForDisplayed();
        await (await this.emailInput).setValue(email);
    }

    async clickOnSubmitBtn(): Promise<void> {
        await (await this.submitBtn).waitForDisplayed();
        await (await this.submitBtn).scrollIntoView();
        await (await this.submitBtn).click();
    }

    async forgotPassword(email: string): Promise<void> {
        await this.setEmail(email);
        await this.clickOnSubmitBtn();
    }

    async isConfirmationAlertDisplayed(): Promise<boolean> {
        await (await this.confirmationAlert).waitForDisplayed();
        return (await this.confirmationAlert).isDisplayed();
    }
}

export default new ForgotPasswordPage();
