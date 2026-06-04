import { expect } from 'chai'

import EntryAdPage from "@pages/entryAdPage/entryAd.page";


describe('Entry-ad page: ', async () => {
    beforeEach(async () => {
        await EntryAdPage.open();
    });

    it('modal window is displayed on first page load', async () => {
        await EntryAdPage.waitForModal();
        expect(await EntryAdPage.isModalDisplayed()).to.be.true;

        await EntryAdPage.closeModal();
        await EntryAdPage.waitForModal(true);
        expect(await EntryAdPage.isModalDisplayed()).to.be.false;
    });

    it('modal window is not displayed on second page load', async () => {
        expect(await EntryAdPage.isModalDisplayed()).to.be.false;
    });

    it('modal window could be restored', async () => {
        await EntryAdPage.restartModal();
        await EntryAdPage.open();
        await EntryAdPage.waitForModal();
        expect(await EntryAdPage.isModalDisplayed()).to.be.true;
    });
});
