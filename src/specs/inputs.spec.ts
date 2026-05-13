import WebInputsPage from "@pages/webInputs/webInputs.page";
import { expect } from "chai"
import { randomNumber, randomExponential, randomString, randomDate } from "@helpers/randomizer";
import * as consts from '@helpers/regExp.consts.json'


function formatDateOutput(dateString: string): string {
    const [year, month, day] = dateString.split('-');
    return `${month}.${day}.${year}`;
}

function generateRandomDateInput(): string {
    const date = randomDate();
    console.log(date.toISOString());
    const formattedDate = date.toISOString().split('T')[0].replace(/^\+0?/, '');
    const [year, month, day] = formattedDate.split('-');
    return `${month}.${day}.${year}`;
}

describe('Number inputs: ', () => {
    before(async () => {
        await WebInputsPage.open();
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
        let text = randomString(consts.NEGATIVE_TEST__NUMBER_INPUT.value, 15);

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
        await WebInputsPage.open();
    });

    it('any text could be inserted', async () => {
        // site has actual bug - "output password" could be read as HTML element, so need to avoid characters < >
        let text = randomString(consts.TEXT_INPUT.value, 15).replace(/[<>]/g, "");

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
        await WebInputsPage.open();
    });

    it('any text could be a password', async () => {
        // site has actual bug - "output password" could be read as HTML element, so need to avoid characters < >
        const password = randomString(consts.TEXT_INPUT.value, 15).replace(/[<>]/g, "");

        await WebInputsPage.fillInputPassword(password);
        await WebInputsPage.displayInputs();
        expect(await WebInputsPage.getOutputPasswordText()).to.be.equal(password.trim());
    });

    it('password should not be displayed', async () => {
        // site has actual bug - "output password" could be read as HTML element, so need to avoid characters < >
        const password = randomString(consts.TEXT_INPUT.value, 15).replace(/[<>]/g, "");

        await WebInputsPage.fillInputPassword(password);
        expect(await WebInputsPage.getPasswordInputType()).to.be.equal("password");
    });

    afterEach(async () => {
        await WebInputsPage.clearInputs();
    });
});

describe('Date inputs: ', () => {
    before(async () => {
        await WebInputsPage.open();
    });

    it('valid date could be inserted', async () => {
        const dateInput = generateRandomDateInput();

        await WebInputsPage.fillInputDate(dateInput);
        await WebInputsPage.displayInputs();

        const dateOutput = formatDateOutput(await WebInputsPage.getDateFieldText())
        expect(dateInput).to.be.equal(dateOutput);
    });

    it('invalid date could not be inserted', async () => {
        const invalidDate = randomString(consts.TEXT_INPUT.value, 15).replace(/[<>]/g, "");

        await WebInputsPage.fillInputDate(invalidDate);
        await WebInputsPage.displayInputs();
        expect(await WebInputsPage.getDateFieldText()).to.be.empty;
    });

    afterEach(async () => {
        await WebInputsPage.clearInputs();
    });
});
