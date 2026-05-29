import { expect } from 'chai';

import WindowsPage from '@pages/windowsPage/windows.page';


describe('Windows Page: ', async () => {
    it('should be able to open new window', async () => {
        await WindowsPage.open();
        await WindowsPage.openNewWindow();

        const windowHandlers = await browser.getWindowHandles();

        expect(windowHandlers.length).to.be.equal(2);

        await browser.switchToWindow(windowHandlers[1]);
        expect(await browser.getUrl()).to.contain('/windows/new');
    });
});
