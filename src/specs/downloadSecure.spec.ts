import { browser } from "@wdio/globals"
import { expect } from "chai";

import DownloadPage from "@pages/downloadPage/download.page";
import {randomString} from "@helpers/randomizer";
import * as consts from "@helpers/regExp.consts.json";


const fileDataTestId = 'some-file.json'


describe('Download secure', async () => {
    it('files should be visible after authorization', async () => {
        await browser.url('/download-secure', {
            auth: {
                user: process.env.ADMIN || 'admin',
                pass: process.env.PASSWORD || 'admin',
            },
        });

        expect(await DownloadPage.isDownloadVisible(fileDataTestId)).to.be.true;
    });

    it('could not download files with invalid credentials', async () => {
        const name = randomString(consts.USERNAME_INPUT.value);
        const password = randomString(consts.USERNAME_INPUT.value);

        const baseUrl = browser.options.baseUrl;
        let invalidUrl;
        if(baseUrl) {
            const [https, url] = baseUrl.split('//');
            invalidUrl = `${https}//${name}:${password}@${url}/download-secure`;
        }

        if(!invalidUrl) {
            throw new Error('No url provided');
        }

        await browser.url(invalidUrl);

        const url = await browser.getUrl();
        expect(url).to.contain('/download-secure');

        expect(await DownloadPage.isDownloadVisible(fileDataTestId)).to.be.false;
    });

    it('could not download files without authorization', async () => {
        await browser.url('/download-secure');

        expect(await DownloadPage.isDownloadVisible(fileDataTestId)).to.be.false;
    });
});
