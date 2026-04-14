import MainPage from "@pages/mainPage/main.page";
import WebInputsPage from "@pages/webInputs/webInputs.page";
import {expect} from "chai"
import RandExp from "randexp";
import { faker } from '@faker-js/faker';


function randomNumber(isFloat?: boolean, isNegative?: boolean): number {
    let num = Math.random();
    let randNum =  isFloat ? num : Math.floor(num * 999) + 1;
    return isNegative ? -randNum : randNum;
}

function randomExponential() {
    const negativeRandomizer = Math.random() < 0.5 ? -1 : 1;
    const exponentRandomizer = Math.random() < 0.5;
    const randomNumber = Math.random() * negativeRandomizer;

    return exponentRandomizer
        ? (randomNumber * 1000).toExponential(3)
        : (randomNumber / 1000).toExponential(3);
}

function randomString(fullRandom?: boolean): string {
    const fullRandomRex = new RandExp(/[!-~]{15}/);
    const symbolAlphabeticalRex = new RandExp(/[:-zA-~!-*,/]{15}/);
    let rex = fullRandom ? fullRandomRex : symbolAlphabeticalRex;
    return rex.gen()
}

function randomDate(): Date {
    const firstTimestamp = -8640000000000000
    const lastTimestamp = 8640000000000000
    return faker.date.between({from: firstTimestamp, to: lastTimestamp})
}

function dateToString(date: Date): string {
    return date.toLocaleDateString('uk', { day: 'numeric', month: 'numeric', year: 'numeric' });
}

function dateUkFormat(dateString: string): string {
    const dateArray = dateString.split('-');
    let ukDate = '';
    for ( let i = dateArray.length - 1; i > 0; i--) {
        ukDate += dateArray[i] + '.'
    }
    ukDate += dateArray[0];
    return ukDate;
}

describe('Number inputs: ', () => {
    before(async () => {
        const regExp = new RegExp('.*ads.*');
        (await browser.mock(regExp)).abort('Aborted');

        await MainPage.open();
        await MainPage.clickWebInputs();
    });

    it('positive number could be inserted', async() => {
        let number = randomNumber(false, false);

        await WebInputsPage.fillInputNumber(number);
        await WebInputsPage.displayInputs();
        expect(await WebInputsPage.getNumberFieldText()).to.equal(number.toString());
    });

    it('negative number could be inserted', async() => {
        let number = randomNumber(false, true);

        await WebInputsPage.fillInputNumber(number);
        await WebInputsPage.displayInputs();
        expect(await WebInputsPage.getNumberFieldText()).to.equal(number.toString());
    });

    it('zero could be inserted', async() => {
        let number = 0;

        await WebInputsPage.fillInputNumber(number);
        await WebInputsPage.displayInputs();
        expect(await WebInputsPage.getNumberFieldText()).to.equal(number.toString());
    })

    it('exponential could be inserted', async() => {
        let number = randomExponential();


        await WebInputsPage.fillInputNumber(number);
        await WebInputsPage.displayInputs();
        expect(await WebInputsPage.getNumberFieldText()).to.equal(number.toString());
    });

    it('float number could be inserted', async() => {
        let number = randomNumber(true);

        await WebInputsPage.fillInputNumber(number);
        await WebInputsPage.displayInputs();
        expect(await WebInputsPage.getNumberFieldText()).to.equal(number.toString());
    });

    it('text and symbols could not be inserted', async() => {
        let text = randomString();

        await WebInputsPage.fillInputNumber(text);
        await WebInputsPage.displayInputs();
        expect(await WebInputsPage.getNumberFieldText()).to.be.empty;
    });

    afterEach(async () => {
        await WebInputsPage.clearInputs();
    });
});

describe('Text inputs: ', () => {
    before(async () => {
        const regExp = new RegExp('.*ads.*');
        (await browser.mock(regExp)).abort('Aborted');

        await MainPage.open();
        await MainPage.clickWebInputs();
    });

    it('any text could be inserted', async () => {
        // site has actual bug - "output password" could be read as HTML element, so need to avoid characters < >
        let text = randomString(true).replace(/[<>]/g, "");

        await WebInputsPage.fillInputText(text);
        await WebInputsPage.displayInputs();
        expect(await WebInputsPage.getTextFieldText()).to.be.equal(text);
    });

    afterEach(async () => {
        await WebInputsPage.clearInputs();
    });

});

describe('Password inputs: ', () => {
    before(async () => {
        const regExp = new RegExp('.*ads.*');
        (await browser.mock(regExp)).abort('Aborted');

        await MainPage.open();
        await MainPage.clickWebInputs();
    });

    it('any text could be a password', async () => {
        // site has actual bug - "output password" could be read as HTML element, so need to avoid characters < >
        const password = randomString(true).replace(/[<>]/g, "");

        await WebInputsPage.fillInputPassword(password);
        await WebInputsPage.displayInputs();
        expect(await WebInputsPage.getOutputPasswordText()).to.be.equal(password);
    });

    it('password should not be displayed', async () => {
        // site has actual bug - "output password" could be read as HTML element, so need to avoid characters < >
        const password = randomString(true).replace(/[<>]/g, "");

        await WebInputsPage.fillInputPassword(password);
        expect(await WebInputsPage.getPasswordInputType()).to.be.equal("password");
    });

    afterEach(async () => {
        await WebInputsPage.clearInputs();
    });
});

describe('Date inputs: ', () => {
    before(async () => {
        const regExp = new RegExp('.*ads.*');
        (await browser.mock(regExp)).abort('Aborted');

        await MainPage.open();
        await MainPage.clickWebInputs();
    });

    it('valid date could be inserted', async () => {
        const date = dateToString(randomDate())

        await WebInputsPage.fillInputDate(date);
        await WebInputsPage.displayInputs();

        const dateOutput = await WebInputsPage.getDateFieldText()
        const formatedDate = dateUkFormat(dateOutput)
        expect(formatedDate).to.be.equal(date);
    });

    it('invalid date could not be inserted', async () => {
        const invalidDate = randomString();

        await WebInputsPage.fillInputDate(invalidDate);
        await WebInputsPage.displayInputs();
        expect(await WebInputsPage.getDateFieldText()).to.be.empty;
    });

    afterEach(async () => {
        await WebInputsPage.clearInputs();
    });
});
