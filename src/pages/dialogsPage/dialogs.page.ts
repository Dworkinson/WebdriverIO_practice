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
}

export default new DialogsPage;