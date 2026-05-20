import { $, browser } from "@wdio/globals";


class JqueryPage {
    async open(): Promise<void> {
        await browser.url('/jqueryui/menu');
    }

    getMenuItem(itemText: string): ChainablePromiseElement {
        //language=XPath
        return $(`//a[text()="${itemText}"]`);
    }

    async moveToMenuItem(itemText: string): Promise<void> {
        const item = this.getMenuItem(itemText);
        await item.waitForDisplayed();
        await item.moveTo();
    }

    async clickMenuItem(itemText: string): Promise<void> {
        const item = this.getMenuItem(itemText);
        await item.waitForDisplayed();
        await item.click();
    }

    async getDownloadFileNameFromLinkByMenuItemText(itemText: string): Promise<string> {
        const item = this.getMenuItem(itemText);

        const href = await item.getAttribute('href');
        if(!href) throw new Error('Element does not have href attribute');

        const fileName = href.split('/').pop();
        if(!fileName) throw new Error('Could not get file name from href');
        return fileName;
    }
}

export default new JqueryPage;
