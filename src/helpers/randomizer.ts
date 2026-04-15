import RandExp from "randexp";
import { faker } from '@faker-js/faker';

export function randomNumber(isFloat?: boolean, isNegative?: boolean): number {
    let num = Math.random();
    let randNum =  isFloat ? num : Math.floor(num * 999) + 1;
    return isNegative ? -randNum : randNum;
}

export function randomExponential() {
    const negativeRandomizer = Math.random() < 0.5 ? -1 : 1;
    const exponentRandomizer = Math.random() < 0.5;
    const randomNumber = Math.random() * negativeRandomizer;

    return exponentRandomizer
        ? (randomNumber * 1000).toExponential(3)
        : (randomNumber / 1000).toExponential(3);
}

export function randomString(regExp: string, length: number): string {
    const randExpInstance = new RandExp(String.raw`${regExp}{${length}}`);
    return randExpInstance.gen()
}

export function randomDate(): Date {
    const firstTimestamp = -8640000000000000
    const lastTimestamp = 8640000000000000
    return faker.date.between({from: firstTimestamp, to: lastTimestamp})
}
