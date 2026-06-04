import { expect } from 'chai';

import ExitIntentPage from "@pages/exitIntentPage/exitIntent.page";


describe('Exit intent: ', async () => {
    it('modal is shown while cursor is out of page', async () => {
        await ExitIntentPage.open();

        await ExitIntentPage.showModal();
        expect(await ExitIntentPage.isModalDisplayed()).to.be.true;

        await ExitIntentPage.hideModal();
        expect(await ExitIntentPage.isModalDisplayed()).to.be.false;
    })
});