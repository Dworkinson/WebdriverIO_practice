import { browser, $ } from "@wdio/globals";


class DownloadPage {
    async open(): Promise<void> {
        await browser.url('/download');
    }

    async downloadFileByDataTestId(dataTestId: string): Promise<void> {
        const fileLink = $(`[data-testid="${dataTestId}"]`);

        await fileLink.waitForDisplayed();
        await fileLink.scrollIntoView();
        await fileLink.click();
    }
}

export default new DownloadPage;
