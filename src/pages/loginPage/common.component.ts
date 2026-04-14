import { $ } from '@wdio/globals'


class CommonComponent {
    private get alert(): Promise<WebdriverIO.Element> {
        return $('[id="flash"]');
    }

    async isAlertDisplayed(): Promise<boolean> {
        await (await this.alert).waitForDisplayed();
        return (await this.alert).isDisplayed();
    }

    async getAlertText(): Promise<string> {
        await (await this.alert).waitForDisplayed();
        return (await this.alert).getText();
    }
}

export default new CommonComponent();