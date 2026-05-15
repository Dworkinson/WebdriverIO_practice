export { $, browser } from '@wdio/globals';


class DynamicPaginationTablePageSelectors {
    protected get searchInput(): ChainablePromiseElement {
        return $('input[type="search"]');
    }

    protected get previousPaginatorButton(): ChainablePromiseElement {
        return $('[id="example_previous"]');
    }

    protected get nextPaginatorButton(): ChainablePromiseElement {
        return $('[id="example_next"]');
    }

    protected get numeratedPaginatorButtons(): ChainablePromiseArray {
        return $$('[class*="paginate_button"]:not([class*="previous"]):not([class*="next"])');
    }

    protected get entriesSelectDropdown(): ChainablePromiseElement {
        return $('[id="example_length"] [name="example_length"]');
    }

    protected get entriesQuantityDropdown(): ChainablePromiseArray {
        return $$('option[value]');
    }

    protected get tableRows(): ChainablePromiseArray {
        return $$('[id="demo"] tr')
    }

    protected get tableColumns(): ChainablePromiseArray {
        return $$('th[class*="sorting"]');
    }

    protected async getPageByIndex(pageIndex: number): Promise<ChainablePromiseElement> {
        return this.numeratedPaginatorButtons[pageIndex];
    }

    protected async getDropdownOptionByIndex(index: number): Promise<ChainablePromiseElement> {
        return this.entriesQuantityDropdown[index];
    }

    protected async getColumnTitleByIndex(index: number): Promise<ChainablePromiseElement> {
        return this.tableColumns[index];
    }

    async getCellContentByIndex(columnIndex: number, rowIndex: number): Promise<string> {
        const row = this.tableRows[rowIndex];

        await row.waitForDisplayed();
        const cell = row.$$('td')[columnIndex];
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
        await this.previousPaginatorButton.waitForDisplayed();
        return await this.previousPaginatorButton
            .$('a[aria-controls]')
            .getAttribute('aria-disabled') === 'true';
    }

    async isNextButtonDisabled(): Promise<boolean> {
        await this.nextPaginatorButton.waitForDisplayed();
        return await this.nextPaginatorButton
            .$('a[aria-controls]').getAttribute('aria-disabled') === 'true';
    }

    async isNumeratedButtonActive(pageIndex: number): Promise<boolean> {
        const page = await this.getPageByIndex(pageIndex);
        const exists = await page.getAttribute('class');
        return exists ? exists.includes('active') : false;
    }

    async getPageQuantity(): Promise<number> {
        return this.numeratedPaginatorButtons.length;
    }

    async toNextPage(): Promise<void> {
        await this.nextPaginatorButton.waitForDisplayed();
        await this.nextPaginatorButton.scrollIntoView();
        await this.nextPaginatorButton.click();
    }

    async toPreviousPage(): Promise<void> {
        await this.previousPaginatorButton.waitForDisplayed();
        await this.previousPaginatorButton.scrollIntoView();
        await this.previousPaginatorButton.click();
    }

    async toNumeratedPage(pageIndex: number): Promise<void> {
        await this.numeratedPaginatorButtons[pageIndex].waitForDisplayed();
        await this.numeratedPaginatorButtons[pageIndex].scrollIntoView();
        await (await this.getPageByIndex(pageIndex)).click();
    }

    async getRowsQuantity(): Promise<number> {
        return this.tableRows.length;
    }

    async getColumnsQuantity(): Promise<number> {
        return this.tableColumns.length;
    }

    async chooseDropdownValueByIndex(index: number): Promise<void> {
        await this.entriesSelectDropdown.waitForDisplayed();
        await this.entriesSelectDropdown.scrollIntoView();
        await this.entriesSelectDropdown.click();

        await (await this.getDropdownOptionByIndex(index)).click();
    }

    async getSortingDirection(columnIndex: number): Promise<string | null> {
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
        await this.searchInput.waitForDisplayed();
        await this.searchInput.setValue(searchingValue);
    }

    async getRowContentByIndex(rowIndex: number): Promise<string> {
        const row = this.tableRows[rowIndex];
        await row.waitForDisplayed();
        return await row.getText();
    }
}

export default new DynamicPaginationTablePage();