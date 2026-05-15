import { browser, $ } from "@wdio/globals";


class UploadFilePage {
    async open(): Promise<void> {
        await browser.url('/upload');
    }

    private get fileInput(): ChainablePromiseElement {
        return $('[data-testid="file-input"]');
    }

    private get uploadBtn(): ChainablePromiseElement {
        return $('[data-testid="file-submit"]');
    }

    private get uploadedInfo(): ChainablePromiseElement {
        return $('[id="uploaded-files"]');
    }

    private get alert(): ChainablePromiseElement {
        return $('[id="flash"]');
    }

    async fillUploadInput(filePath: string): Promise<void> {
        const remoteFilePath = await browser.uploadFile(filePath);

        await this.fileInput.waitForDisplayed();
        await this.fileInput.setValue(remoteFilePath);
    }

    async clickUploadBtn(): Promise<void> {
        await this.uploadBtn.waitForDisplayed();
        await this.uploadBtn.scrollIntoView();
        await this.uploadBtn.click();
    }

    async getAlertText(): Promise<string> {
        await this.alert.waitForDisplayed();
        return this.alert.getText();
    }

    async getUploadedText(): Promise<string> {
        await this.uploadedInfo.waitForDisplayed();
        return this.uploadedInfo.getText();
    }
}

export default new UploadFilePage();
