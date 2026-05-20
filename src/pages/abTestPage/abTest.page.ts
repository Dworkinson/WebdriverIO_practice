import { $, browser } from '@wdio/globals';


class AbTestPage {
    async open(abTestOff?: boolean): Promise<void> {
        await browser.url(`/abtest${abTestOff ? '?abtest_off=true' : ''}`);
    }

    private get currentPageBreadCrumb(): ChainablePromiseElement {
        return $('[aria-current="page"]')
    }

    async getCurrentPageBreadCrumbText(): Promise<string> {
        await this.currentPageBreadCrumb.waitForDisplayed();
        return this.currentPageBreadCrumb.getText();
    }
}

export default new AbTestPage();
