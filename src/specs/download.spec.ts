import { expect } from 'chai';
import fs from 'fs';
import path from 'path';

import DownloadPage from "@pages/downloadPage/download.page";

const fileIds: string[] = [
    'some-file.json',
    'some-file.txt',
    'cdct.jpg',
    'wdio.png',
    'xpath-css.png'
];

describe("Downloading files: ", async () => {
    it('existing files could be downloaded', async () => {
        const downloadDir = path.join(process.cwd(), 'tmp');
        await DownloadPage.open();

        for (const fileId of fileIds) {
            const filePath = path.join(downloadDir, fileId);

            await DownloadPage.downloadFileByDataTestId(fileId);
            await browser.waitUntil(() => {
                return fs.existsSync(filePath);
            });

            expect(fs.existsSync(filePath)).to.be.true;

            fs.unlinkSync(filePath);
            await browser.waitUntil(() => {
                return !fs.existsSync(filePath);
            })
        }
    });
});
