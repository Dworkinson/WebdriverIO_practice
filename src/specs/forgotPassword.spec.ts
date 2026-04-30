import { browser } from "@wdio/globals";
import { expect } from "chai";

import ForgotPasswordPage from "@pages/forgotPasswordPage/forgotPassword.page";
import { deleteAllMessages, getLatestMessageText } from "@helpers/gmail/getMailContent";
import { waitForResult } from "@helpers/waitForFunctionResult";

const urlRegExp = new RegExp(/https:\/\/\S*\/login/);


function getRedirectUrl(regExp: RegExp, msg: string) {
    const url = msg.match(regExp);
    if (url) {
        return url[0];
    }
}

describe('Forgot Password', async () => {
    before(async () => {
        const regExp = new RegExp('.*ads.*');
        (await browser.mock(regExp)).abort('Aborted');

        await ForgotPasswordPage.open();
        await deleteAllMessages();
    });

    it('link should be received', async () => {
        await ForgotPasswordPage.forgotPassword(process.env.USER_EMAIL || 'dummy@mail.com');

        expect(await ForgotPasswordPage.isConfirmationAlertDisplayed()).to.be.true;
        const msg = await waitForResult(getLatestMessageText);
        const url = getRedirectUrl(urlRegExp, msg);

        // in live conditions should get real url
        // -> open url in browser
        // -> pass restoring password process
        // -> login with new password
        expect(url).to.be.exist;
    });

    //delete all messages after each successful test
    afterEach(async () => {
        await deleteAllMessages();
    })
});

//delete all messages after each suite (need in case of failure in any test)
afterEach(async () => {
    await deleteAllMessages();
});
