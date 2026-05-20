import { expect } from 'chai';

import path from 'path';
import * as fs from 'fs';

import JQueryPage from '@pages/jqueryPage/jquery.page';
import {waitForResult} from '@helpers/waitForFunctionResult';

const testMenuItems = [
    'PDF',
    'CSV',
    'Excel'
]

describe('JQuery menu page: ', async () => {
    it('should be able to navigate menu and download file', async () => {
        await JQueryPage.open();

        const downloadDir = path.join(process.cwd(), 'tmp');
        for(const item of testMenuItems) {
            // sometimes is not opened while navigating, so open it by click
            await JQueryPage.clickMenuItem('Enabled');
            await JQueryPage.moveToMenuItem('Downloads');
            await JQueryPage.clickMenuItem(item);

            const fileName = await JQueryPage.getDownloadFileNameFromLinkByMenuItemText(item);
            const filePath = path.join(downloadDir, fileName);

            await waitForResult(fs.existsSync, [filePath]);
            expect(fs.existsSync(filePath)).to.be.true;

            fs.unlinkSync(filePath);
        }
    });
});
