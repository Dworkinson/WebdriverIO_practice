class Alert {
    private get alert(): ChainablePromiseElement {
        return $('[id="flash"]');
    }

    private get alertCloseBtn(): ChainablePromiseElement {
        return $('[id="flash"] button[type="button"]')
    }

    async isAlertDisplayed(): Promise<boolean> {
        await this.alert.waitForDisplayed();
        return this.alert.isDisplayed();
    }

    async getAlertText(): Promise<string> {
        await this.alert.waitForDisplayed();
        return this.alert.getText();
    }

    async clickAlertCloseBtn(): Promise<void> {
        await this.alert.waitForClickable();
        await this.alertCloseBtn.click();
    }
}

export default new Alert();
