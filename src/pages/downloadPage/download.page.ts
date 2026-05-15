import { browser, $ } from "@wdio/globals";


class DownloadPage {
    async open(): Promise<void> {
        await browser.url('/download');
    }

    async isDownloadVisible(dataTestId: string): Promise<boolean> {
        const fileLink = $(`[data-testid="${dataTestId}"]`);
        return fileLink.isDisplayed();
    }

    async downloadFileByDataTestId(dataTestId: string): Promise<void> {
        const fileLink = $(`[data-testid="${dataTestId}"]`);

        await fileLink.waitForDisplayed();
        await fileLink.scrollIntoView();
        await fileLink.click();
    }
}

export default new DownloadPage;
