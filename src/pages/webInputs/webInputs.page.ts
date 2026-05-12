import { $, browser } from '@wdio/globals';

class WebInputsPageSelectors {
    protected get displayInputsBtn(): ChainablePromiseElement {
        return $('[id="btn-display-inputs"]');
    }

    protected get clearInputsBtn(): ChainablePromiseElement {
        return $('[id="btn-clear-inputs"]');
    }

    protected get inputNumberField(): ChainablePromiseElement {
        return $('[id="input-number"]');
    }

    protected get inputTextField(): ChainablePromiseElement {
        return $('[id="input-text"]');
    }

    protected  get inputPasswordField(): ChainablePromiseElement {
        return $('[id="input-password"]');
    }

    protected get inputDateField(): ChainablePromiseElement {
        return $('[id="input-date"]');
    }

    protected get outputNumberField(): ChainablePromiseElement {
        return $('[id="output-number"]');
    }

    protected get outputTextField(): ChainablePromiseElement {
        return $('[id="output-text"]');
    }

    protected get outputPasswordField(): ChainablePromiseElement {
        return $('[id="output-password"]');
    }

    protected get outputDateField(): ChainablePromiseElement {
        return $('[id="output-date"]');
    }
}

class WebInputsPage extends WebInputsPageSelectors {
    async open(): Promise<void> {
        await browser.url('/inputs')
    }
    async displayInputs(): Promise<void> {
        await this.displayInputsBtn.waitForDisplayed();
        await this.displayInputsBtn.scrollIntoView();
        await this.displayInputsBtn.click();
    }

    async clearInputs(): Promise<void> {
        await this.clearInputsBtn.waitForDisplayed();
        await this.clearInputsBtn.scrollIntoView();
        await this.clearInputsBtn.click();
    }

    async fillInputNumber(value: string|number): Promise<void> {
        await this.inputNumberField.waitForDisplayed();
        await this.inputNumberField.scrollIntoView();
        await this.inputNumberField.setValue(value);
    }

    async getNumberFieldText(): Promise<string> {
        await this.outputNumberField.waitForDisplayed();
        return this.outputNumberField.getText();
    }

    async fillInputText(value: string|number): Promise<void> {
        await this.inputTextField.waitForDisplayed();
        await this.inputTextField.scrollIntoView();
        await this.inputTextField.setValue(value);
    }

    async getTextFieldText(): Promise<string> {
        await this.outputTextField.waitForDisplayed();
        return this.outputTextField.getText();
    }

    async fillInputPassword(value: string|number): Promise<void> {
        await this.inputPasswordField.waitForDisplayed();
        await this.inputPasswordField.scrollIntoView();
        await this.inputPasswordField.setValue(value);
    }

    async getOutputPasswordText(): Promise<string> {
        await this.outputPasswordField.waitForDisplayed();
        return this.outputPasswordField.getText();
    }

    async getPasswordInputType(): Promise<string|null> {
        await this.inputPasswordField.waitForDisplayed();
        return this.inputPasswordField.getAttribute('type');
    }

    async fillInputDate(value: string | any): Promise<void> {
        await this.inputDateField.waitForDisplayed();
        await this.inputDateField.scrollIntoView();
        await this.inputDateField.setValue(value)
    }

    async getDateFieldText(): Promise<string> {
        await this.outputDateField.waitForDisplayed();
        return this.outputDateField.getText();
    }
}

export default new WebInputsPage();
