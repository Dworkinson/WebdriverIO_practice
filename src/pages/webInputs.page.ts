class WebInputsPageSelectors {
    protected get displayInputsBtn(): Promise<WebdriverIO.Element> {
        return $('[id="btn-display-inputs"]');
    }

    protected get clearInputsBtn(): Promise<WebdriverIO.Element> {
        return $('[id="btn-clear-inputs"]');
    }

    protected get inputNumberField(): Promise<WebdriverIO.Element> {
        return $('[id="input-number"]');
    }

    protected get inputTextField(): Promise<WebdriverIO.Element> {
        return $('[id="input-text"]');
    }

    protected  get inputPasswordField(): Promise<WebdriverIO.Element> {
        return $('[id="input-password"]');
    }

    protected get inputDateField(): Promise<WebdriverIO.Element> {
        return $('[id="input-date"]');
    }

    protected get outputNumberField(): Promise<WebdriverIO.Element> {
        return $('[id="output-number"]');
    }

    protected get outputTextField(): Promise<WebdriverIO.Element> {
        return $('[id="output-text"]');
    }

    protected get outputPasswordField(): Promise<WebdriverIO.Element> {
        return $('[id="output-password"]');
    }

    protected get outputDateField(): Promise<WebdriverIO.Element> {
        return $('[id="output-date"]');
    }
}

class WebInputsPage extends WebInputsPageSelectors {
    async displayInputs(): Promise<void> {
        await (await this.displayInputsBtn).waitForDisplayed();
        await (await this.displayInputsBtn).scrollIntoView();
        await (await this.displayInputsBtn).click();
    }

    async clearInputs(): Promise<void> {
        await (await this.clearInputsBtn).waitForDisplayed();
        await (await this.clearInputsBtn).scrollIntoView();
        await (await this.clearInputsBtn).click();
    }

    async fillInputNumber(value: string|number): Promise<void> {
        await (await this.inputNumberField).waitForDisplayed();
        await (await this.inputNumberField).scrollIntoView();
        await (await this.inputNumberField).setValue(value);
    }

    async getNumberFieldText(): Promise<string> {
        await (await this.outputNumberField).waitForDisplayed();
        return (await this.outputNumberField).getText();
    }

    async fillInputText(value: string|number): Promise<void> {
        await (await this.inputTextField).waitForDisplayed();
        await (await this.inputTextField).scrollIntoView();
        await (await this.inputTextField).setValue(value);
    }

    async getTextFieldText(): Promise<string> {
        await (await this.outputTextField).waitForDisplayed();
        return (await this.outputTextField).getText();
    }

    async fillInputPassword(value: string|number): Promise<void> {
        await (await this.inputPasswordField).waitForDisplayed();
        await (await this.inputPasswordField).scrollIntoView();
        await (await this.inputPasswordField).setValue(value);
    }

    async getOutputPasswordText(): Promise<string> {
        await (await this.outputPasswordField).waitForDisplayed();
        return (await this.outputPasswordField).getText();
    }

    async getPasswordInputType(): Promise<string> {
        await (await this.inputPasswordField).waitForDisplayed();
        return (await this.inputPasswordField).getAttribute('type');
    }

    async fillInputDate(value: string | any): Promise<void> {
        await (await this.inputDateField).waitForDisplayed();
        await (await this.inputDateField).scrollIntoView();
        await (await this.inputDateField).setValue(value)
    }

    async getDateFieldText(): Promise<string> {
        await (await this.outputDateField).waitForDisplayed();
        return (await this.outputDateField).getText();
    }
}

export default new WebInputsPage();
