import { $, browser } from '@wdio/globals';


class OtpPage {
    async open(): Promise<void> {
        await browser.url('/otp-login');
    }

    private get emailInput(): ChainablePromiseElement {
        return $('[id="email"]');
    }

    private get sendBtn(): ChainablePromiseElement {
        return $('[id="btn-send-otp"]');
    }

    private get infoMessage(): ChainablePromiseElement {
        return $('[id="otp-message"]');
    }

    private get verifyBtn(): ChainablePromiseElement {
        return $('[id="btn-send-verify"]');
    }

    private get otpInput(): ChainablePromiseElement {
        return $('[id="otp"]');
    }

    async setEmail(email: string): Promise<void> {
        await this.emailInput.waitForDisplayed();
        await this.emailInput.setValue(email);
    }

    async clickSendBtn(): Promise<void> {
        await this.sendBtn.waitForClickable();
        await this.sendBtn.scrollIntoView();
        await this.sendBtn.click();
    }

    async getInfoMessage(): Promise<string> {
        await this.infoMessage.waitForDisplayed();
        return this.infoMessage.getText();
    }

    async setOtp(opt: string): Promise<void> {
        await this.otpInput.waitForDisplayed();
        await this.otpInput.setValue(opt);
    }

    async clickVerifyBtn(): Promise<void> {
        await this.verifyBtn.waitForClickable();
        await this.verifyBtn.scrollIntoView();
        await this.verifyBtn.click();
    }

    async sendOtp(email: string): Promise<void> {
        await this.setEmail(email);
        await this.clickSendBtn();
    }

    async verifyOtp(otp: string): Promise<void> {
        await this.setOtp(otp);
        await this.clickVerifyBtn();
    }
}

export default new OtpPage();
