import { $ } from '@wdio/globals'


class Alert {
    private get alert(): Promise<WebdriverIO.Element> {
        return $('[id="flash"]');
    }

    private get alertCloseBtn(): Promise<WebdriverIO.Element> {
        return $('[id="flash"] button[type="button"]')
    }

    async isAlertDisplayed(): Promise<boolean> {
        await (await this.alert).waitForDisplayed();
        return (await this.alert).isDisplayed();
    }

    async getAlertText(): Promise<string> {
        await (await this.alert).waitForDisplayed();
        return (await this.alert).getText();
    }

    async clickAlertCloseBtn(): Promise<void> {
        await (await this.alert).waitForClickable();
        await (await this.alertCloseBtn).click();
    }
}

export default new Alert();
