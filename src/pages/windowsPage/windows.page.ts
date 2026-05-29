import { $, browser } from '@wdio/globals';


class WindowsPage {
    async open(): Promise<void> {
        await browser.url('/windows');
    }

    private get newWindowHref(): ChainablePromiseElement {
        return $('[href="/windows/new"]');
    }

    async openNewWindow(): Promise<void> {
        await this.newWindowHref.waitForDisplayed();
        await this.newWindowHref.scrollIntoView();
        await this.newWindowHref.click();
    }
}

export default new WindowsPage();
