export { $, browser } from '@wdio/globals';


class DynamicPaginationTablePageSelectors {
    protected get searchInput(): Promise<WebdriverIO.Element> {
        return $('input[type="search"]');
    }

    protected get previousPaginatorButton(): Promise<WebdriverIO.Element> {
        return $('[id="example_previous"]');
    }

    protected get nextPaginatorButton(): Promise<WebdriverIO.Element> {
        return $('[id="example_next"]');
    }

    protected get numeratedPaginatorButtons(): Promise<WebdriverIO.ElementArray> {
        return $$('[class*="paginate_button"]:not([class*="previous"]):not([class*="next"])');
    }

    protected get entriesSelectDropdown(): Promise<WebdriverIO.Element> {
        return $('[id="example_length"] [name="example_length"]');
    }

    protected get entriesQuantityDropdown(): Promise<WebdriverIO.ElementArray> {
        return $$('option[value]');
    }

    protected get tableRows(): Promise<WebdriverIO.ElementArray> {
        return $$('[id="demo"] tr')
    }

    protected get tableColumns(): Promise<WebdriverIO.ElementArray> {
        return $$('th[class*="sorting"]');
    }

    protected async getPageByIndex(pageIndex: number): Promise<WebdriverIO.Element> {
        await (await this.numeratedPaginatorButtons)[pageIndex].waitForDisplayed();
        return (await this.numeratedPaginatorButtons)[pageIndex];
    }

    protected async getDropdownOptionByIndex(index: number): Promise<WebdriverIO.Element> {
        await (await this.entriesQuantityDropdown)[index].waitForDisplayed();
        return (await this.entriesQuantityDropdown)[index];
    }

    protected async getColumnTitleByIndex(index: number): Promise<WebdriverIO.Element> {
        await (await this.tableColumns)[index].waitForDisplayed();
        return (await this.tableColumns)[index];
    }

    async getCellContentByIndex(columnIndex: number, rowIndex: number): Promise<string> {
        const row = (await this.tableRows)[rowIndex];

        await row.waitForDisplayed();
        const cell = await row.$$('td')[columnIndex];
        if (!cell) {
            throw new Error(`Cell with index ${columnIndex} and row index ${rowIndex} not found`);
        }

        return await cell.getText();
    }
}

class DynamicPaginationTablePage extends DynamicPaginationTablePageSelectors {
    async open(): Promise<void> {
        await browser.url('/dynamic-pagination-table');
    }

    async isPreviousButtonDisabled(): Promise<boolean> {
        await (await this.previousPaginatorButton).waitForDisplayed();
        return await (await this.previousPaginatorButton)
            .$('a[aria-controls]')
            .getAttribute('aria-disabled') === 'true';
    }

    async isNextButtonDisabled(): Promise<boolean> {
        await (await this.nextPaginatorButton).waitForDisplayed();
        return await (await this.nextPaginatorButton)
            .$('a[aria-controls]').getAttribute('aria-disabled') === 'true';
    }

    async isNumeratedButtonActive(pageIndex: number): Promise<boolean> {
        const page = await this.getPageByIndex(pageIndex);
        return (await page.getAttribute('class')).includes('active');
    }

    async getPageQuantity(): Promise<number> {
        return (await this.numeratedPaginatorButtons).length;
    }

    async toNextPage(): Promise<void> {
        await (await this.nextPaginatorButton).waitForDisplayed();
        await (await this.nextPaginatorButton).scrollIntoView();
        await (await this.nextPaginatorButton).click();
    }

    async toPreviousPage(): Promise<void> {
        await (await this.previousPaginatorButton).waitForDisplayed();
        await (await this.previousPaginatorButton).scrollIntoView();
        await (await this.previousPaginatorButton).click();
    }

    async toNumeratedPage(pageIndex: number): Promise<void> {
        await (await this.numeratedPaginatorButtons)[pageIndex].waitForDisplayed();
        await (await this.numeratedPaginatorButtons)[pageIndex].scrollIntoView();
        await (await this.getPageByIndex(pageIndex)).click();
    }

    async getRowsQuantity(): Promise<number> {
        return (await this.tableRows).length;
    }

    async getColumnsQuantity(): Promise<number> {
        return (await this.tableColumns).length;
    }

    async chooseDropdownValueByIndex(index: number): Promise<void> {
        await (await this.entriesSelectDropdown).waitForDisplayed();
        await (await this.entriesSelectDropdown).scrollIntoView();
        await (await this.entriesSelectDropdown).click();

        await (await this.getDropdownOptionByIndex(index)).click();
    }

    async getSortingDirection(columnIndex: number): Promise<string> {
        return await (await this.getColumnTitleByIndex(columnIndex)).getAttribute('aria-sort');
    }

    async sortTableByIndex(columnIndex: number, direction: "ascending" | "descending"): Promise<void> {
        const column = await this.getColumnTitleByIndex(columnIndex);
        while (await this.getSortingDirection(columnIndex) !== direction) {
            await column.scrollIntoView();
            await column.click();
        }
    }

    async search(searchingValue: string): Promise<void> {
        await (await this.searchInput).waitForDisplayed();
        await (await this.searchInput).setValue(searchingValue);
    }
}

export default new DynamicPaginationTablePage();