import { $ } from '@wdio/globals'


class SecurePage {
    async open(): Promise<void> {
        await browser.url('/secure');
    }

    private get logoutBtn(): Promise<WebdriverIO.Element> {
        return $('[class*="button"][href="/logout"]');
    }

    async clickOnLogoutBtn(): Promise<void> {
        await (await this.logoutBtn).waitForDisplayed();
        await (await this.logoutBtn).scrollIntoView();
        await (await this.logoutBtn).click();
    }
}

export default new SecurePage();
