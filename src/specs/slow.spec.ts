import { expect } from 'chai';

import SlowPage from '@pages/slowPage/slow.page';
import * as dict from "@data/dictionary.json"


describe('Slow Page', async () => {
    it('could wait until result is shown', async () => {
        await SlowPage.open();
        expect(await SlowPage.getResultMsg()).to.be.equal(dict.slow_resource_message.us);
    });
});