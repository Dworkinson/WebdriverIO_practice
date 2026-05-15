import {expect} from "chai";

import BrowserInfoPage, {NavigatorKeys} from "@pages/browserInfoPage/browserInfo.page";

describe('Browser info: ', async () => {
    it('could get browser info', async () => {
        await BrowserInfoPage.open();
        await BrowserInfoPage.showBrowserInfo();

        expect(await BrowserInfoPage.getBrowserProperty(NavigatorKeys.userAgent))
            .to.be.equal(await BrowserInfoPage.getUserAgent());

        expect(await BrowserInfoPage.getBrowserProperty(NavigatorKeys.codeName))
            .to.be.equal(await BrowserInfoPage.getCodeName());

        expect(await BrowserInfoPage.getBrowserName())
            .to.be.equal(await BrowserInfoPage.getName());

        expect(await BrowserInfoPage.getBrowserProperty(NavigatorKeys.version))
            .to.be.equal(await BrowserInfoPage.getVersion());

        expect(await BrowserInfoPage.getBrowserProperty(NavigatorKeys.cookiesEnabled))
            .to.be.equal(await BrowserInfoPage.getCookiesEnabled());

        expect(await BrowserInfoPage.getBrowserProperty(NavigatorKeys.platform))
            .to.be.equal(await BrowserInfoPage.getPlatform());
    });
});
