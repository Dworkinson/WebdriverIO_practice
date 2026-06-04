import { $, browser } from '@wdio/globals';

class ExitIntentPage {
    async open(): Promise<void> {
        await browser.url('/exit-intent');
    }

    private get closeModalBtn(): ChainablePromiseElement {
        return $('[id="close-modal-btn"]');
    }

    private async moveMouseOutOfScreen(): Promise<void> {
        await browser.execute(() => {
            const event = new MouseEvent('mouseleave', {
                bubbles: true,
            });

            document.body.dispatchEvent(event);
        });
    }

    private async waitForModal(reverse?: boolean): Promise<void> {
        await this.closeModalBtn.waitForDisplayed({reverse: reverse});
    }

    async showModal(): Promise<void> {
        await this.moveMouseOutOfScreen();
        await this.waitForModal();
    }

    async hideModal(): Promise<void> {
        await this.closeModalBtn.click();
        await this.waitForModal(true);
    }

    async isModalDisplayed(): Promise<boolean> {
        return await this.closeModalBtn.isDisplayed();
    }
}

export default new ExitIntentPage();