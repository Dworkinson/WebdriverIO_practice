import { $, browser } from "@wdio/globals";


class SlowPage {
    async open(): Promise<void> {
        await browser.url('/slow');
    }

    private get resultMsg(): ChainablePromiseElement {
        return $('[id="result"] [class*="alert-info"]');
    }

    async getResultMsg(): Promise<string> {
        await this.resultMsg.waitForDisplayed({timeout: 15000});
        return this.resultMsg.getText();
    }
}

export default new SlowPage;