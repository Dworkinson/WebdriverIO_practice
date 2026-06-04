import { $, browser } from '@wdio/globals';


class DynamicLoadingPage {
    async open(): Promise<void> {
        await browser.url('/dynamic-loading');
    }

    private get hiddenElementHref(): ChainablePromiseElement {
        return $('[href="/dynamic-loading/1"]');
    }

    private get renderedElementHref(): ChainablePromiseElement {
        return $('[href="/dynamic-loading/2"]');
    }

    private get startBtn(): ChainablePromiseElement {
        return $('[id="start"] button');
    }

    private get result(): ChainablePromiseElement {
        return $('[id="finish"]');
    }

    async clickOnHiddenElementHref(): Promise<void> {
        await this.hiddenElementHref.scrollIntoView();
        await this.hiddenElementHref.click();
    }

    async clickOnRenderedElementHref(): Promise<void> {
        await this.renderedElementHref.scrollIntoView();
        await this.renderedElementHref.click();
    }

    async clickStartBtn(): Promise<void> {
        await this.startBtn.scrollIntoView();
        await this.startBtn.click();
    }

    async showResult(): Promise<void> {
        await this.startBtn.click();
        await browser.waitUntil(async () => {
            return await this.result.isDisplayed();
        })
    }

    async isResultDisplayed(): Promise<boolean> {
        return await this.result.isDisplayed();
    }
}

export default new DynamicLoadingPage;