import { browser, $ } from "@wdio/globals";


class UploadFilePage {
    async open(): Promise<void> {
        await browser.url('/upload');
    }

    private get fileInput(): Promise<WebdriverIO.Element> {
        return $('[data-testid="file-input"]');
    }

    private get uploadBtn(): Promise<WebdriverIO.Element> {
        return $('[data-testid="file-submit"]');
    }

    private get uploadedInfo(): Promise<WebdriverIO.Element> {
        return $('[id="uploaded-files"]');
    }

    private get alert(): Promise<WebdriverIO.Element> {
        return $('[id="flash"]');
    }

    async fillUploadInput(filePath: string): Promise<void> {
        const remoteFilePath = await browser.uploadFile(filePath);

        await (await this.fileInput).waitForDisplayed();
        await (await this.fileInput).setValue(remoteFilePath);
    }

    async clickUploadBtn(): Promise<void> {
        await (await this.uploadBtn).waitForDisplayed();
        await (await this.uploadBtn).scrollIntoView();
        await (await this.uploadBtn).click();
    }

    async getAlertText(): Promise<string> {
        await (await this.alert).waitForDisplayed();
        return (await this.alert).getText();
    }

    async getUploadedText(): Promise<string> {
        await (await this.uploadedInfo).waitForDisplayed();
        return (await this.uploadedInfo).getText();
    }
}

export default new UploadFilePage();
