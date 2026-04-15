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
 * @param {string} regExp - specified regular expression. Example: `[a-zA-Z0-9]`
 *
 * @param {number|number[]} length - exect length of string (e.g., 5 symbols long - {5}) or length diapason (e.g., from 1 to 5 symbols {1, 5})
 * @returns random string
 */
export function randomString(regExp: string, length: number|number[]): string {
    const randExpInstance = new RandExp(String.raw`${regExp}{${length}}`);
    return randExpInstance.gen()
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
