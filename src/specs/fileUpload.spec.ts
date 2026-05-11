import { browser } from "@wdio/globals";
import { expect } from "chai";

import UploadFilePage from "@pages/uploadFilePage/uploadFile.page";


// add any files to this folder with the same name
const fileLess500KbPath = 'src/data/uploadFileLess500KbPath.upload';
const fileLess500KbName = 'uploadFileLess500KbPath.upload';

const fileLarger500KbPath = 'src/data/fileLarger500KbPath.upload';

describe('File uploading', async () => {
    before(async () => {
        const regExp = new RegExp('.*ads.*');
        (await browser.mock(regExp)).abort('Aborted');
    });

    it('should be able to upload file', async () => {
        await UploadFilePage.open();
        await UploadFilePage.fillUploadInput(fileLess500KbPath);
        await UploadFilePage.clickUploadBtn();

        expect(await UploadFilePage.getUploadedText()).to.contain(fileLess500KbName);
    });

    it('should not be able to upload file more then 500kb', async () => {
        await UploadFilePage.open();
        await UploadFilePage.fillUploadInput(fileLarger500KbPath);

        expect(await UploadFilePage.getAlertText()).to.contain('File too large');
    });
});