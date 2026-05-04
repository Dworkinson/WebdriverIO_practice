import { $, browser } from '@wdio/globals';


class OtpPage {
    async open(): Promise<void> {
        await browser.url('/otp-login');
    }

    private get emailInput(): Promise<WebdriverIO.Element> {
        return $('[id="email"]');
    }

    private get sendBtn(): Promise<WebdriverIO.Element> {
        return $('[id="btn-send-otp"]');
    }

    private get infoMessage(): Promise<WebdriverIO.Element> {
        return $('[id="otp-message"]');
    }

    private get verifyBtn(): Promise<WebdriverIO.Element> {
        return $('[id="btn-send-verify"]');
    }

    private get otpInput(): Promise<WebdriverIO.Element> {
        return $('[id="otp"]');
    }

    async setEmail(email: string): Promise<void> {
        await (await this.emailInput).waitForDisplayed();
        await (await this.emailInput).setValue(email);
    }

    async clickSendBtn(): Promise<void> {
        await (await this.sendBtn).waitForClickable();
        await (await this.sendBtn).scrollIntoView();
        await (await this.sendBtn).click();
    }

    async getInfoMessage(): Promise<string> {
        await (await this.infoMessage).waitForDisplayed();
        return (await this.infoMessage).getText();
    }

    async setOtp(opt: string): Promise<void> {
        await (await this.otpInput).waitForDisplayed();
        await (await this.otpInput).setValue(opt);
    }

    async clickVerifyBtn(): Promise<void> {
        await (await this.verifyBtn).waitForClickable();
        await (await this.verifyBtn).scrollIntoView();
        await (await this.verifyBtn).click();
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
