import DynamicTablePage from "@pages/dynamicTablePage/dynamicTable.page";
import { expect } from "chai";


describe('Dynamic table', async () => {
    before(async () => {
        await DynamicTablePage.open();
    });
    it('any', async () => {
        // await browser.pause();
        const rowIndex = await DynamicTablePage.getRowIndexByText('Chrome');
        const colIndex = await DynamicTablePage.getColumnIndexByText('CPU');

        const calculatedCPU = await DynamicTablePage.getTableDataByPosition(rowIndex, colIndex);
        const actualCPU = await DynamicTablePage.getChromeCPU();
        expect(actualCPU).to.contain(calculatedCPU);
    });
});
