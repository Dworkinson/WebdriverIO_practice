import { expect } from 'chai';

import ContextMenuPage from '@pages/contextMenuPage/contextMenu.page';
import { dialogHandler } from '@helpers/dialogHandler';


describe('Context Menu Page: ', async () => {
    it('should be able to trigger context menu', async () => {
        await ContextMenuPage.open();

        const handler = dialogHandler(true);
        await ContextMenuPage.rightClickHotSpot();

        const message = await handler;
        expect(message.toLowerCase()).to.contain('context menu');
    })
})