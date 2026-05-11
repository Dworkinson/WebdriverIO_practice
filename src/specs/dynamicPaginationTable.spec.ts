import { browser } from "@wdio/globals";
import { expect } from "chai";
import DynamicPaginationTablePage from "@pages/dynamicPaginationTablePage/dynamicPaginationTable.page";
import { faker } from "@faker-js/faker";


enum ColumnIndex {
    Name,
    Gender,
    ClassLevel,
    HomeState,
    Major,
    ExtracurricularAbility
}

enum DropdownValueIndex {
    Three,
    Five,
    Ten,
    All
}

// all cases are the same, so checks provided separately
async function checkSorting(field: ColumnIndex) {
    await DynamicPaginationTablePage.sortTableByIndex(field, 'ascending');

    const rowsQty = await DynamicPaginationTablePage.getRowsQuantity();
    let firstCellContent = await DynamicPaginationTablePage.getCellContentByIndex(field, 0);
    let lastCellContent = await DynamicPaginationTablePage.getCellContentByIndex(field, rowsQty - 1);

    let isComparisonValid = firstCellContent <= lastCellContent;
    expect(isComparisonValid).to.be.true;

    await DynamicPaginationTablePage.sortTableByIndex(field, 'descending');
    firstCellContent = await DynamicPaginationTablePage.getCellContentByIndex(field, 0);
    lastCellContent = await DynamicPaginationTablePage.getCellContentByIndex(field, rowsQty - 1);

    isComparisonValid = firstCellContent >= lastCellContent;
    expect(isComparisonValid).to.be.true;
}

// all tests are meaningless. It existed just for example.

// all sorting tests are meaningless. Each column has the same sorting rules. BUT.
// in case where new columns without sorting could be added, there is a separate test for each column.
describe("Sorting dynamic pagination table: ", async () => {
    before(async () => {
        const regExp = new RegExp('.*ads.*');
        (await browser.mock(regExp)).abort('Aborted');

        await DynamicPaginationTablePage.open();
        await DynamicPaginationTablePage.chooseDropdownValueByIndex(DropdownValueIndex.All);
    });

    it('check default table state', async () => {
        expect(await DynamicPaginationTablePage.getSortingDirection(ColumnIndex.Name)).to.be.equal('ascending');
    });

    it('could be sorted by name', async () => {
        await checkSorting(ColumnIndex.Name);
    });

    it('could be sorted by gender', async () => {
        await checkSorting(ColumnIndex.Gender);
    });

    it('could be sorted by class level', async () => {
        await checkSorting(ColumnIndex.ClassLevel);
    });

    it('could be sorted by home state', async () => {
        await checkSorting(ColumnIndex.HomeState);
    });

    it('could be sorted by major', async () => {
        await checkSorting(ColumnIndex.Major);
    });

    it('could be sorted by extracurricular activity', async () => {
        await checkSorting(ColumnIndex.ExtracurricularAbility);
    });
});

describe("Pagination of dynamic table: ", async () => {
    before(async () => {
        const regExp = new RegExp('.*ads.*');
        (await browser.mock(regExp)).abort('Aborted');

        await DynamicPaginationTablePage.open();
    });

    it('check paginator default state', async () => {
        expect(await DynamicPaginationTablePage.isPreviousButtonDisabled()).to.be.true;
        expect(await DynamicPaginationTablePage.isNextButtonDisabled()).to.be.false;
        expect(await DynamicPaginationTablePage.isNumeratedButtonActive(0)).to.be.true;
        expect(await DynamicPaginationTablePage.getPageQuantity()).greaterThan(1);
    });

    it('could check next/previous pages', async () => {
        await DynamicPaginationTablePage.toNextPage();

        expect(await DynamicPaginationTablePage.isPreviousButtonDisabled()).to.be.false;
        expect(await DynamicPaginationTablePage.isNumeratedButtonActive(1)).to.be.true;

        await DynamicPaginationTablePage.toPreviousPage();
        expect(await DynamicPaginationTablePage.isNumeratedButtonActive(0)).to.be.true;
    });

    it('could check middle page, next/previous buttons are enabled', async () => {
        const pagesQty = await DynamicPaginationTablePage.getPageQuantity();

        const penultimateIndex = pagesQty - 2
        const randomMiddlePage = faker.number.int({ min: 1, max: penultimateIndex });

        await DynamicPaginationTablePage.toNumeratedPage(randomMiddlePage);
        expect(await DynamicPaginationTablePage.isNumeratedButtonActive(randomMiddlePage)).to.be.true;

        expect(await DynamicPaginationTablePage.isNextButtonDisabled()).to.be.false;
        expect(await DynamicPaginationTablePage.isPreviousButtonDisabled()).to.be.false;
    });

    it('next button is disabled if user on the last page', async () => {
        const lastPageIndex = await DynamicPaginationTablePage.getPageQuantity() - 1;
        await DynamicPaginationTablePage.toNumeratedPage(lastPageIndex);
        expect(await DynamicPaginationTablePage.isNextButtonDisabled()).to.be.true;
    });
});

describe("Rows quantity in pagination table: ", async () => {
    before(async () => {
        const regExp = new RegExp('.*ads.*');
        (await browser.mock(regExp)).abort('Aborted');

        await DynamicPaginationTablePage.open();
    });

    it('check default table state', async () => {
        expect(await DynamicPaginationTablePage.getRowsQuantity()).to.be.equal(3);
    });

    it('each dropdown option is functional', async () => {
        await DynamicPaginationTablePage.chooseDropdownValueByIndex(DropdownValueIndex.Three);
        expect(await DynamicPaginationTablePage.getRowsQuantity()).to.be.equal(3);

        await DynamicPaginationTablePage.chooseDropdownValueByIndex(DropdownValueIndex.Five);
        expect(await DynamicPaginationTablePage.getRowsQuantity()).to.be.equal(5);

        await DynamicPaginationTablePage.chooseDropdownValueByIndex(DropdownValueIndex.Ten);
        expect(await DynamicPaginationTablePage.getRowsQuantity()).to.be.equal(10);

        await DynamicPaginationTablePage.chooseDropdownValueByIndex(DropdownValueIndex.All);
        expect(await DynamicPaginationTablePage.isNextButtonDisabled()).to.be.true;
        expect(await DynamicPaginationTablePage.isPreviousButtonDisabled()).to.be.true;
    });
});

// no difference in searching by name, gender, etc.
describe("Search: ", async () => {
    before(async () => {
        const regExp = new RegExp('.*ads.*');
        (await browser.mock(regExp)).abort('Aborted');

        await DynamicPaginationTablePage.open();
        await DynamicPaginationTablePage.chooseDropdownValueByIndex(DropdownValueIndex.All);
    });

    it('could be successfully searched by complete match', async () => {
        const rowsQty = await DynamicPaginationTablePage.getRowsQuantity();
        const columnsQth = await DynamicPaginationTablePage.getColumnsQuantity();

        const randRowIndex = faker.number.int({ min: 0, max: rowsQty - 1 });
        const randColIndex = faker.number.int({ min: 0, max: columnsQth - 1 });

        const searchValue = await DynamicPaginationTablePage.getCellContentByIndex(randColIndex, randRowIndex);
        await DynamicPaginationTablePage.search(searchValue);

        const cellContent = await DynamicPaginationTablePage.getCellContentByIndex(randColIndex, 0);
        expect(cellContent).to.contain(searchValue);
    });

    it('could be successfully searched by partial match', async () => {
        function valuePart(searchValue: string): string {
            const length = searchValue.length;

            return searchValue.slice(faker.number.int(0), faker.number.int(length -1));
        }

        const rowsQty = await DynamicPaginationTablePage.getRowsQuantity();
        const columnsQth = await DynamicPaginationTablePage.getColumnsQuantity();

        const randRowIndex = faker.number.int({ min: 0, max: rowsQty - 1 });
        const randColIndex = faker.number.int({ min: 0, max: columnsQth - 1 });

        const searchValue = await DynamicPaginationTablePage.getCellContentByIndex(randColIndex, randRowIndex);
        const searchValuePart = valuePart(searchValue).toLowerCase();

        await DynamicPaginationTablePage.search(searchValuePart);

        const cellContent = (await DynamicPaginationTablePage.getCellContentByIndex(randColIndex, 0)).toLowerCase();
        expect(cellContent).to.contain(searchValuePart);
    });

    it('no result if searching by non-existing value', async () => {
        const invalidValue = "non-existing value";

        await DynamicPaginationTablePage.search(invalidValue);

        const emptyTableContent = await DynamicPaginationTablePage.getCellContentByIndex(0, 0);
        expect(emptyTableContent).to.be.contain('No matching');
    });

    afterEach(async () => {
        await DynamicPaginationTablePage.search('');
    });
});
