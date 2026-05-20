import { $, browser } from '@wdio/globals';


class KeyPressesPage {
    async open(): Promise<void> {
        await browser.url('key-presses')
    }

    private get result(): ChainablePromiseElement {
        return $('[id="result"]');
    }

    private get keyInputField(): ChainablePromiseElement {
        return $('[id="target"]');
    }

    async selectKeyInputField(): Promise<void> {
        await this.keyInputField.waitForDisplayed();
        await this.keyInputField.scrollIntoView();
        await this.keyInputField.click();
    }

    async getResultValue(): Promise<string> {
        await this.result.waitForExist();

        const result = await this.result.getText();
        const pressed = result.split(': ').pop();
        if(!pressed) throw new Error('Could not get pressed key');
        return pressed;
    }
}

export default new KeyPressesPage();