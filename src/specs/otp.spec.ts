import {browser} from "@wdio/globals";
import {expect} from "chai";
import OtpPage from "@pages/otpPage/otp.page";
import { deleteAllMessages, getLatestMessageText } from "@helpers/gmail/getMailContent";
import { waitForResult } from "@helpers/waitForFunctionResult";
import SecurePage from "@pages/loginPage/secure.page";
import Alert from "@pages/commonComponents/alert";
import * as dict from "@data/dictionary.json";
import { randomString } from "@helpers/randomizer";

const otpRegExp = new RegExp(/\d{6}/);

function getOtpCode(regExp: RegExp, msg: string): string {
    const otp = msg.match(regExp);
    if (otp) {
        return otp[0];
    }
    throw new Error('OTP code not found');
}


describe('OTP: ', () => {
    before(async () => {
        const regExp = new RegExp('.*ads.*');
        (await browser.mock(regExp)).abort('Aborted');

        await OtpPage.open();
        await deleteAllMessages();
    });

    it('should be able to login with OTP', async () => {
        const email = process.env.USER_EMAIL || 'dummy@mail.test';
        await OtpPage.sendOtp(email)

        const infoMsg = await OtpPage.getInfoMessage();

        expect(infoMsg).to.contains(email);

        const emailText = await waitForResult(getLatestMessageText);
        const otp = getOtpCode(otpRegExp, emailText);
        expect(otp).to.be.exist;

        await OtpPage.verifyOtp(otp);
        const url = await browser.getUrl();
        expect(url).to.include("/secure");
        expect(await Alert.getAlertText()).to.be.equal(dict.success_alert.us);

        await SecurePage.clickOnLogoutBtn();
    });

    it('should not be able to login with invalid OTP', async () => {
        const email = process.env.USER_EMAIL || 'dummy@mail.test';
        await OtpPage.sendOtp(email);

        const emailText = await waitForResult(getLatestMessageText);
        const otp = getOtpCode(otpRegExp, emailText);
        expect(otp).to.be.exist;

        let invalidOTP: string;

        do {
            invalidOTP = randomString(String(otpRegExp), 6);
        } while (invalidOTP == otp)

        await OtpPage.verifyOtp(invalidOTP);
        expect(await OtpPage.getInfoMessage()).to.be.equal(dict.wrong_otp.us);

        const url = await browser.getUrl();
        expect(url).to.include("/otp-verification");
    });

    afterEach(async () => {
        await deleteAllMessages();
    });
});

afterEach(async () => {
    await deleteAllMessages();
});
