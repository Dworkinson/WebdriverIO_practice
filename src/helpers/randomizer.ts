import RandExp from "randexp";
import { faker } from '@faker-js/faker';


/**
 * Returns random generated number. Positive integer by default.
 *
 * @param {boolean} isFloat - if true, then random number be float.
 * @param {boolean} isNegative - if true, then random number be negative.
 */
export function randomNumber(isFloat?: boolean, isNegative?: boolean): number {
    let num = Math.random();
    let randNum =  isFloat ? num : Math.floor(num * 999) + 1;
    return isNegative ? -randNum : randNum;
}

/**
 * Returns random generated exponential number (e.g., `1.234e+5`).
 *
 * - _require `randomNumber` function_
 * @see randomNumber
 */
export function randomExponential() {
    const negativeRandomizer = Math.random() < 0.5 ? -1 : 1;
    const exponentRandomizer = Math.random() < 0.5;
    const randomNumber = Math.random() * negativeRandomizer;

    return exponentRandomizer
        ? (randomNumber * 1000).toExponential(3)
        : (randomNumber / 1000).toExponential(3);
}

/**
 * Returns random generated string of specified length, using specified regular expression.
 *
 * @param {string} regExp - specified regular expression. Example: `[a-zA-Z0-9]`.
 *
 * @param {number|number[]} length - exect length of string (e.g., 5 symbols long - `{5}`) or length diapason (e.g., from 1 to 5 symbols `{1, 5}`)
 *
 * Expressions with exact and diapason quantifiers in the middle of regular expression are supported.
 * Example: `([a-z0-9-]){qty-2}[a-z0-9]`. In this case, `qty` placeholder is required and could be used only with "+" operator
 * @returns random string
 */
export function randomString(regExp: string, length: number|LengthDiapason): string {
    const parsedRegExp = parseRegExp(regExp, length);
    if(parsedRegExp) {
        const randExpInstance = new RandExp(parsedRegExp);
        return randExpInstance.gen()
    }
    const randExpInstance = new RandExp(`${regExp}{${length}}`);
    return randExpInstance.gen();
}

/**
 * Returns a randomly generated date within the maximum range allowed in JavaScript
 *
 * - _require `faker` library_
 * @see {@link https://fakerjs.dev/api/date.html faker.Date module }
 * @see {@link https://262.ecma-international.org/5.1/#sec-15.9.1.1 Time Values and Time Range}
 */
export function randomDate(): Date {
    const firstTimestamp = -8640000000000000
    const lastTimestamp = 8640000000000000
    return faker.date.between({from: firstTimestamp, to: lastTimestamp})
}

// randomString helper-functions

type LengthDiapason = [number, number];

function validateLengthDiapason(lengthDiapason: LengthDiapason): void {
    if(lengthDiapason[0] >= lengthDiapason[1]) {
        throw new Error(
            `Second number(MAX) should be greater than first (MIN).
            Passed: [${lengthDiapason[0]}, ${lengthDiapason[1]}]`
        );
    }
}

function validateLength(uncalculatedLength: string): void {
    const placeholderLengthMatcher = /\d+/;
    const regExpLengthMatcher = /(?<=-)\d+/;

    const matchedPlaceholderLength = uncalculatedLength.match(placeholderLengthMatcher);
    const matchedRegExpLength = uncalculatedLength.match(regExpLengthMatcher);

    if(matchedRegExpLength && matchedPlaceholderLength) {
        const actualRegExpLength = Number(matchedRegExpLength[0]);
        const actualPlaceholderLength = Number(matchedPlaceholderLength[0]);

        if(actualPlaceholderLength < actualRegExpLength) {
            throw new Error(
                `Minimum length should be greater than "${actualRegExpLength}".
                "${actualPlaceholderLength}" was passed instead`
            )
        }
    }
}

function parseRegExp(regExpConst: string, length: number|LengthDiapason): string|void {
    function replacePlaceholderFromRegExp(length: number, matchedStr: string): number {
        matchedStr = matchedStr.replaceAll(/[{?}]/g, '').replace('qty', length.toString());
        validateLength(matchedStr);
        return eval(matchedStr);
    }

    const matcher = /({qty.*?})/;
    const matched = regExpConst.match(matcher);

    let matchedStr = '';
    if(!matched) {
        return;
    }
    matchedStr += matched[0];

    if(typeof length === 'number') {
        return regExpConst.replace(matcher, `{${replacePlaceholderFromRegExp(length, matchedStr)}}`)
    }

    validateLengthDiapason(length);
    length.forEach((item, index) => {
        length[index] = replacePlaceholderFromRegExp(length[index], matchedStr);
    });
    return regExpConst.replace(matcher, `{${length}}`);
}
