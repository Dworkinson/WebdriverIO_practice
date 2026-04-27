import DynamicTablePage from "@pages/dynamicTablePage/dynamicTable.page";
import { expect } from "chai";
import { browser } from "@wdio/globals";



describe('Dynamic table', async () => {
    before(async () => {
        const regExp = new RegExp('.*ads.*');
        (await browser.mock(regExp)).abort('Aborted');

        await DynamicTablePage.open();
    });
    it('any', async () => {
        const rowIndex = await DynamicTablePage.getRowIndexByText('Chrome');
        const colIndex = await DynamicTablePage.getColumnIndexByText('CPU');

        const calculatedCPU = await DynamicTablePage.getTableDataByPosition(rowIndex, colIndex);
        const actualCPU = await DynamicTablePage.getChromeCPU();
        expect(actualCPU).to.contain(calculatedCPU);
    });
});
