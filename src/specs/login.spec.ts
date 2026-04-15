import {expect} from "chai"
import MainPage from "@pages/mainPage/main.page";
import LoginPage from "@pages/loginPage/login.page";
import SecurePage from "@pages/loginPage/secure.page";
import Alert from "@pages/commonComponents/alert";

import { randomString } from "@helpers/randomizer";

import * as data from "src/data/test.data.json"
import * as dict from "src/data/dictionary.json"


describe("Login: ", async () => {
    before(async () => {
        const regExp = new RegExp('.*ads.*');
        (await browser.mock(regExp)).abort('Aborted');

        await MainPage.open();
        await MainPage.clickTestLoginPage();
    });

    it('should be able to login', async () => {
        const loginUrl = await browser.getUrl();
        expect(loginUrl).to.include("/login");

        await LoginPage.login(data.username, data.password);
        expect(await Alert.isAlertDisplayed()).to.be.true;

        const url = await browser.getUrl();
        expect(url).to.include("/secure");
        expect(await Alert.getAlertText()).to.be.equal(dict.success_alert.us);

        await SecurePage.clickOnLogoutBtn();
    });

    it('should not be able to login with wrong username', async () => {
        const loginUrl = await browser.getUrl();
        expect(loginUrl).to.include("/login");

        await LoginPage.login(randomString(), data.password);
        expect(await Alert.isAlertDisplayed()).to.be.true;
        expect(await Alert.getAlertText()).to.be.equal(dict.wrong_username_alert.us);
    });

    it('should not be able to login with wrong password', async () => {
        const loginUrl = await browser.getUrl();
        expect(loginUrl).to.include("/login");

        await LoginPage.login(data.username, randomString());
        expect(await Alert.isAlertDisplayed()).to.be.true;
        expect(await Alert.getAlertText()).to.be.equal(dict.wrong_password_alert.us);
    });

    it('unauthorized user should not be able to access secure page', async () => {
        await SecurePage.open();

        const url = await browser.getUrl();
        expect(url).to.include("/login").and.not.include("/secure");
        expect(await Alert.isAlertDisplayed()).to.be.true;
        expect(await Alert.getAlertText()).to.be.equal(dict.unauthorized_alert.us);
    });

    afterEach(async () => {
        await Alert.clickAlertCloseBtn();
    });
});
