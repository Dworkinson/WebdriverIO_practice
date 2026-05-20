import { expect } from 'chai';
import { Key } from 'webdriverio'

import KeyPressesPage from '@pages/keyPressesPage/keyPresses.page';

// some of available keys added to test data
const testData = {
    CONTROL: Key.Control,
    CANCEL: Key.Cancel,
    BACK_SPACE: Key.Backspace,
    SHIFT: Key.Shift,
    ALT: Key.Alt,
    PAUSE: Key.Pause,
    ESCAPE: Key.Escape,
    SPACE: Key.Space,
    PAGE_UP: Key.PageUp,
    PAGE_DOWN: Key.PageDown,
    END: Key.End,
    Q: 'q',
    W: 'w',
    E: 'e',
    R: 'r',
    T: 't',
    Y: 'y',
    U: 'u',
    I: 'i',
    O: 'o',
    P: 'p',
    A: 'a',
    S: 's',
}

function getRandomEntry(): [string, string] {
    const entries = Object.entries(testData);
    return entries[Math.floor(Math.random() * entries.length)];
}

describe('Key Presses Page: ', async () => {
    it('should be able to press keys', async () => {
        await KeyPressesPage.open();
        await KeyPressesPage.selectKeyInputField();

        // in this example random key-value pair is selected for test
        // could be used with foreach loop to test all available keys
        const [key, value] = getRandomEntry();

        await browser.keys(value);
        const result = await KeyPressesPage.getResultValue();
        expect(result).to.be.equal(key);
    })
});