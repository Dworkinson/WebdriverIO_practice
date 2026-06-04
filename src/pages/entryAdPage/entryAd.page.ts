import { $, browser } from '@wdio/globals';


class EntryAdPage {
    async open(): Promise<void> {
        await browser.url('/entry-ad');
    }

    private get restartButton(): ChainablePromiseElement {
        return $('[id="restart-ad"]')
    }

    private get closeModalBtn(): ChainablePromiseElement {
        return $('[id="close-modal-btn"]');
    }

    async waitForModal(reverse?: boolean): Promise<void> {
        await this.closeModalBtn.waitForDisplayed({reverse: reverse});
    }

    async restartModal(): Promise<void> {
        await this.restartButton.scrollIntoView();
        await this.restartButton.click();
    }

    async closeModal(): Promise<void> {
        await this.closeModalBtn.click();
        await this.waitForModal(true);
    }

    async isModalDisplayed(): Promise<boolean> {
        return await this.closeModalBtn.isDisplayed();
    }
}

export default new EntryAdPage;