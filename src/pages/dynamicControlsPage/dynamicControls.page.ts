import { $, $$, browser } from '@wdio/globals';


class DynamicControlsPage {
    async open(): Promise<void> {
        await browser.url('/dynamic-controls');
    }

    private get checkBox(): ChainablePromiseElement {
        return $('[id="checkbox"]');
    }

    private get checkBoxControllerBtn(): ChainablePromiseElement {
        return $('[id*="checkbox"] button');
    }

    private get inputField(): ChainablePromiseElement {
        return $('[id*="input"] input');
    }

    private get inputControllerBtn(): ChainablePromiseElement {
        return $('[id*="input"] button');
    }

    // taking array of loaders, because previous loaders are not removing, it's just disabling
    private get loaders(): ChainablePromiseArray {
        return $$('[id="loading"]');
    }

    async switchCheckBox(waitForComplete = true): Promise<void> {
        await this.checkBoxControllerBtn.click();

        if(!waitForComplete) return;
        await browser.waitUntil(async () => {
            return (await this.checkBoxControllerBtn.isEnabled());
        });
    }

    async switchInput(waitForComplete = true): Promise<void> {
        await this.inputControllerBtn.click();

        if(!waitForComplete) return;
        await browser.waitUntil(async () => {
            return (await this.inputControllerBtn.isEnabled());
        });
    }

    async isCheckBoxOnPage(): Promise<boolean> {
        return await this.checkBox.isDisplayed();
    }

    async isInputEnabled(): Promise<boolean> {
        return await this.inputField.isEnabled();
    }

    async isLoading(): Promise<boolean> {
        await browser.waitUntil(async () => {
            return (await this.checkBoxControllerBtn.isEnabled()) && (await this.inputControllerBtn.isEnabled());
        });

        const visibility = await this.loaders.map(loader => loader.isDisplayed());
        return visibility.some(Boolean);
    }
}

export default new DynamicControlsPage();
