import { $ } from '@wdio/globals'


class SecurePage {
    async open(): Promise<void> {
        await browser.url('/secure');
    }

    private get logoutBtn(): Promise<WebdriverIO.Element> {
        return $('[class*="button"][href="/logout"]');
    }

    private get username(): Promise<WebdriverIO.Element> {
        return $('[id="username"]');
    }

    async clickOnLogoutBtn(): Promise<void> {
        await (await this.logoutBtn).waitForDisplayed();
        await (await this.logoutBtn).scrollIntoView();
        await (await this.logoutBtn).click();
    }

    async getUsername(): Promise<string> {
        await (await this.username).waitForDisplayed();
        return (await this.username).getText();
    }
}

export default new SecurePage();
