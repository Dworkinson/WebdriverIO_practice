import { browser, $, $$ } from "@wdio/globals";


class DynamicTablePage {
    async open(): Promise<void> {
        await browser.url('/dynamic-table');
    }

    private get chromeCPU(): Promise<WebdriverIO.Element> {
        return $('[id="chrome-cpu"]');
    }

    async getColumnIndexByText(text: string): Promise<number>  {
        const columns = await $$('thead tr th');
        const texts = await Promise.all(await columns.map(el=> el.getText()));

        return texts.indexOf(text);
    }

    async getRowIndexByText(text: string): Promise<number>  {
        const cells = await $$('tbody tr td:first-child')
        const texts = await Promise.all(await cells.map(el => el.getText()));

        return texts.indexOf(text);
    }

    async getTableDataByPosition(rowIndex: number, columnIndex: number): Promise<string> {
        const chromeCPU = await $(`tbody tr:nth-child(${rowIndex+1}) td:nth-child(${columnIndex+1})`)
        await chromeCPU.waitForDisplayed();
        return (await chromeCPU.getText());
    }

    async getChromeCPU(): Promise<string> {
        await (await this.chromeCPU).waitForDisplayed();
        return (await this.chromeCPU).getText();
    }
}

export default new DynamicTablePage();
