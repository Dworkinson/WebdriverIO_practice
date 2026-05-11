import { expect } from "chai";
import { browser } from "@wdio/globals";

import MainPage from "@pages/mainPage/main.page";
import RegisterPage from "@pages/registerPage/register.page";
import LoginPage from "@pages/loginPage/login.page";
import Alert from "@pages/commonComponents/alert";

import { faker } from "@faker-js/faker";
import { randomString } from "@helpers/randomizer";
import * as consts from "@helpers/regExp.consts.json";
import * as dict from "@data/dictionary.json";
import SecurePage from "@pages/loginPage/secure.page";


describe.skip("Successful registration: ", async () => {
    before(async () => {
        const regExp = new RegExp(".*ads.*");
        (await browser.mock(regExp)).abort("Aborted");

        await MainPage.open();
        await MainPage.clickTestRegisterInputs();
    })

    it("User could be registered with 3 letters username", async () => {
        const username = randomString(consts.USERNAME_INPUT.value, 3);
        const password = randomString(consts.TEXT_INPUT.value, 15);
        await RegisterPage.registration(username, password);
        expect(await Alert.isAlertDisplayed()).to.be.true;
        expect(await Alert.getAlertText()).to.be.equal(dict.successful_registration_alert.us);

        const url = await browser.getUrl();
        expect(url).to.include("/login");
    });

    it("User could be registered with 39 letters username", async () => {
        const username = randomString(consts.USERNAME_INPUT.value, 39);
        const password = randomString(consts.TEXT_INPUT.value, 15);
        await RegisterPage.registration(username, password);
        expect(await Alert.isAlertDisplayed()).to.be.true;
        expect(await Alert.getAlertText()).to.be.equal(dict.successful_registration_alert.us);

        const url = await browser.getUrl();
        expect(url).to.include("/login");
    });

    it("User could be registered with a hyphen in the middle of username", async () => {
        const username = "lazy-user-with-hyphen";
        const password = randomString(consts.TEXT_INPUT.value, 15);
        await RegisterPage.registration(username, password);
        expect(await Alert.isAlertDisplayed()).to.be.true;
        expect(await Alert.getAlertText()).to.be.equal(dict.successful_registration_alert.us);

        const url = await browser.getUrl();
        expect(url).to.include("/login");
    });

    afterEach(async () => {
        await RegisterPage.open();
        // await AccountPage.deleteAccount();
        // site does not allow to delete account
    });
});

describe("Registration with invalid username: ", async () => {
    before(async () => {
        const regExp = new RegExp(".*ads.*");
        (await browser.mock(regExp)).abort("Aborted");

        await MainPage.open();
        await MainPage.clickTestRegisterInputs();
    });

    it("User could not be registered without username", async () => {
        const password = randomString(consts.TEXT_INPUT.value, 15);
        await RegisterPage.setPassword(password);
        await RegisterPage.setConfirmPassword(password);
        await RegisterPage.clickOnRegisterBtn();

        expect(await Alert.isAlertDisplayed()).to.be.true;
        expect(await Alert.getAlertText()).to.be.equal(dict.missed_regisration_fields_alert.us)

        const url = await browser.getUrl();
        expect(url).to.include("/register");
    });

    it("User could not be registered with username less than 3 characters", async () => {
        const username = randomString(consts.USERNAME_INPUT.value, 2);
        const password = randomString(consts.TEXT_INPUT.value, 15);

        await RegisterPage.registration(username, password);

        expect(await Alert.isAlertDisplayed()).to.be.true;
        expect(await Alert.getAlertText()).to.be.equal(dict.short_username_alert.us);

        const url = await browser.getUrl();
        expect(url).to.include("/register");
    });

    it("User could not be registered with username more than 39 characters", async () => {
        const username = randomString(consts.USERNAME_INPUT.value, 40);
        const password = randomString(consts.TEXT_INPUT.value, 15);

        await RegisterPage.registration(username, password);

        expect(await Alert.isAlertDisplayed()).to.be.true;
        expect(await Alert.getAlertText()).to.be.equal(dict.wrong_username_registration_alert.us);

        const url = await browser.getUrl();
        expect(url).to.include("/register");
    });

    it("User could not be registered with username starts with hyphen", async () => {
        // range 2-38 is used instead of 3-39 because a hyphen will be added
        const username = randomString(consts.USERNAME_INPUT.value, [2, 38]);
        const password = randomString(consts.TEXT_INPUT.value, 15);

        const invalidUsername = "-" + username;

        await RegisterPage.registration(invalidUsername, password);

        expect(await Alert.isAlertDisplayed()).to.be.true;
        expect(await Alert.getAlertText()).to.be.equal(dict.wrong_username_registration_alert.us);

        const url = await browser.getUrl();
        expect(url).to.include("/register");
    });

    it("User could not be registered with username ends with hyphen", async () => {
        // range 2-38 is used instead of 3-39 because a hyphen will be added
        const username = randomString(consts.USERNAME_INPUT.value, [2, 38]);
        const password = randomString(consts.TEXT_INPUT.value, 15);

        const invalidUsername = username + "-";

        await RegisterPage.registration(invalidUsername, password);
        expect(await Alert.isAlertDisplayed()).to.be.true;
        expect(await Alert.getAlertText()).to.be.equal(dict.wrong_username_registration_alert.us);

        const url = await browser.getUrl();
        expect(url).to.include("/register");
    });

    it("User could not be registered with special symbols in username", async () => {
        // range 2-38 is used instead of 3-39 because a hyphen will be added
        const randomSpecSymbol = randomString(consts.SPECIAL_SYMBOLS_EXCEPT_HYPHEN.value, 1)
        const username = randomString(consts.USERNAME_INPUT.value, [2, 38]);
        const password = randomString(consts.TEXT_INPUT.value, 15);

        const randomIndex = faker.number.int({min: 0, max: username.length});
        const invalidUsername = username.slice(0, randomIndex) + randomSpecSymbol + username.slice(randomIndex);

        await RegisterPage.registration(invalidUsername, password);
        expect(await Alert.isAlertDisplayed()).to.be.true;
        expect(await Alert.getAlertText()).to.be.equal(dict.wrong_username_registration_alert.us);

        const url = await browser.getUrl();
        expect(url).to.include("/register");

    });

    afterEach(async () => {
        await RegisterPage.open();
    });
});

describe("Registration with invalid password: ", async () => {
    before(async () => {
        const regExp = new RegExp(".*ads.*");
        (await browser.mock(regExp)).abort("Aborted");

        await MainPage.open();
        await MainPage.clickTestRegisterInputs();
    });

    it("User could not be registered without password", async () => {
        const username = randomString(consts.USERNAME_INPUT.value, [3, 39]);
        const password = randomString(consts.TEXT_INPUT.value, 15);
        await RegisterPage.setUsername(username);
        await RegisterPage.setConfirmPassword(password);
        await RegisterPage.clickOnRegisterBtn();

        expect(await Alert.isAlertDisplayed()).to.be.true;
        expect(await Alert.getAlertText()).to.be.equal(dict.missed_regisration_fields_alert.us)

        const url = await browser.getUrl();
        expect(url).to.include("/register");
    });

    it("User could not be registered without password confirmation", async () => {
        const username = randomString(consts.USERNAME_INPUT.value, [3, 39]);
        const password = randomString(consts.TEXT_INPUT.value, 15);
        await RegisterPage.setUsername(username);
        await RegisterPage.setPassword(password);
        await RegisterPage.clickOnRegisterBtn();

        expect(await Alert.isAlertDisplayed()).to.be.true;
        expect(await Alert.getAlertText()).to.be.equal(dict.missed_regisration_fields_alert.us)

        const url = await browser.getUrl();
        expect(url).to.include("/register");
    });

    it("User could not be registered with invalid password confirmation", async () => {
        const username = randomString(consts.USERNAME_INPUT.value, [3, 39]);
        const password = randomString(consts.TEXT_INPUT.value, 15);
        await RegisterPage.setUsername(username);
        await RegisterPage.setPassword(password);
        await RegisterPage.setPassword(password + "1");
        await RegisterPage.clickOnRegisterBtn();

        expect(await Alert.isAlertDisplayed()).to.be.true;
        expect(await Alert.getAlertText()).to.be.equal(dict.missed_regisration_fields_alert.us)

        const url = await browser.getUrl();
        expect(url).to.include("/register");
    });

    it("User could not be registered with short password", async () => {
        const username = randomString(consts.USERNAME_INPUT.value, [3, 36]);
        const password = randomString(consts.TEXT_INPUT.value, [1, 3]);
        await RegisterPage.registration(username, password);
        expect(await Alert.isAlertDisplayed()).to.be.true;
        expect(await Alert.getAlertText()).to.be.equal(dict.short_password_alert.us);

        const url = await browser.getUrl();
        expect(url).to.include("/register");
    });

    afterEach(async () => {
        await RegisterPage.open();
    });
})

describe.skip("e2e registration: ", async () => {
    it("New user could successfully login after registration", async () => {
        const regExp = new RegExp(".*ads.*");
        (await browser.mock(regExp)).abort("Aborted");

        await MainPage.open();
        await MainPage.clickTestRegisterInputs();

        const username = randomString(consts.USERNAME_INPUT.value, [3, 39]);
        const password = randomString(consts.TEXT_INPUT.value, [4, 15]);
        await RegisterPage.registration(username, password);
        expect(await Alert.isAlertDisplayed()).to.be.true;
        expect(await Alert.getAlertText()).to.be.equal(dict.successful_registration_alert.us);

        const loginUrl = await browser.getUrl();
        expect(loginUrl).to.include("/login");

        await LoginPage.login(username, password);
        expect(await Alert.isAlertDisplayed()).to.be.true;

        const secureUrl = await browser.getUrl();
        expect(secureUrl).to.include("/secure");
        expect(await Alert.getAlertText()).to.be.equal(dict.success_alert.us);
        expect(await SecurePage.getUsername()).to.include(username);

        await SecurePage.clickOnLogoutBtn();
    });
});
