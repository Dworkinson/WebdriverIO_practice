import { $ } from '@wdio/globals'


class SecurePage {
    async open(): Promise<void> {
        await browser.url('/secure');
    }

    private get logoutBtn(): ChainablePromiseElement {
        return $('[class*="button"][href="/logout"]');
    }

    private get username(): ChainablePromiseElement {
        return $('[id="username"]');
    }

    async clickOnLogoutBtn(): Promise<void> {
        await this.logoutBtn.waitForDisplayed();
        await this.logoutBtn.scrollIntoView();
        await this.logoutBtn.click();
    }

    async getUsername(): Promise<string> {
        await this.username.waitForDisplayed();
        return this.username.getText();
    }
}

export default new SecurePage();
