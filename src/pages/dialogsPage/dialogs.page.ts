import { $, browser } from "@wdio/globals";


class DialogsPage {
    async open(): Promise<void> {
        await browser.url('/js-dialogs');
    }

    private get alertBtn(): ChainablePromiseElement {
        return $('[id="js-alert"]');
    }

    private get confirmBtn(): ChainablePromiseElement {
        return $('[id="js-confirm"]');
    }

    private get promptBtn(): ChainablePromiseElement {
        return $('[id="js-prompt"]');
    }

    private get dialogResponseText(): ChainablePromiseElement {
        return $('[id="dialog-response"]');
    }

    async clickAlert(): Promise<void> {
        await this.alertBtn.waitForDisplayed();
        await this.alertBtn.scrollIntoView();
        await this.alertBtn.click();
    }

    async clickConfirm(): Promise<void> {
        await this.confirmBtn.waitForDisplayed();
        await this.confirmBtn.scrollIntoView();
        await this.confirmBtn.click();
    }

    async clickPrompt(): Promise<void> {
        await this.promptBtn.waitForDisplayed();
        await this.promptBtn.scrollIntoView();
        await this.promptBtn.click();
    }

    async getDialogResponseText(): Promise<string> {
        await this.dialogResponseText.waitForDisplayed();
        return this.dialogResponseText.getText()
    }

    // handle dialogs (alert, confirm, prompt) and returns dialog message
    handleDialog(accept: boolean, text?: string): Promise<string> {
        return new Promise<string>((resolve, reject) => {
            const handler = async (dialog: WebdriverIO.Dialog) => {
                try {
                    await(accept ? dialog.accept(text) : dialog.dismiss())
                    resolve(dialog.message());
                } catch (e) {
                    reject(e);
                } finally {
                    browser.off('dialog', handler)
                    clearTimeout(timeout);
                }
            }

            const timeout = setTimeout(async () => {
                browser.off('dialog', handler)
                reject(new Error('Dialog was not handled'));
            }, browser.options.waitforTimeout || 10000);

            browser.on('dialog', handler);
        });
    }
}

export default new DialogsPage;