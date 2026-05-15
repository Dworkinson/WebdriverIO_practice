import { browser, $ } from "@wdio/globals";

export enum NavigatorKeys {
    userAgent = 'userAgent',
    codeName = 'appCodeName',
    version = 'appVersion',
    cookiesEnabled = 'cookieEnabled',
    platform = 'platform'
}

class BrowserInfoPage {
    async open(): Promise<void> {
        await browser.url('/my-browser');
    }

    private get browserToggleBtn(): ChainablePromiseElement {
        return $('[id="browser-toggle"]');
    }

    private get userAgent(): ChainablePromiseElement {
        return $('[id="browser-user-agent"]');
    }

    private get codeName(): ChainablePromiseElement {
        return $('[id="browser-code-name"]');
    }

    private get name(): ChainablePromiseElement {
        return $('[id="browser-name"]');
    }

    private get version(): ChainablePromiseElement {
        return $('[id="browser-version"]');
    }

    private get cookiesEnabled(): ChainablePromiseElement {
        return $('[id="browser-cookie"]');
    }

    private get platform(): ChainablePromiseElement {
        return $('[id="browser-platform"]');
    }

    async showBrowserInfo(): Promise<void> {
        await this.browserToggleBtn.waitForClickable()
        await this.browserToggleBtn.click();
    }

    async getUserAgent(): Promise<string> {
        await this.userAgent.waitForDisplayed();
        return this.userAgent.getText();
    }

    async getCodeName(): Promise<string> {
        await this.codeName.waitForDisplayed();
        return this.codeName.getText();
    }

    async getName(): Promise<string> {
        await this.name.waitForDisplayed();
        return this.name.getText();
    }

    async getVersion(): Promise<string> {
        await this.version.waitForDisplayed();
        return this.version.getText();
    }

    async getCookiesEnabled(): Promise<string> {
        await this.cookiesEnabled.waitForDisplayed();
        return this.cookiesEnabled.getText();
    }

    async getPlatform(): Promise<string> {
        await this.platform.waitForDisplayed();
        return this.platform.getText();
    }

    async getBrowserProperty(prop: NavigatorKeys): Promise<string> {
        return browser.execute((prop) => {
            return String(window.navigator[prop]);
        }, prop)
    }

    async getBrowserName():Promise<string> {
        const userAgent = await browser.execute(() => {
            return window.navigator.userAgent
        });

        if (userAgent.includes("Firefox")) return "Mozilla Firefox";
        if (userAgent.includes("SamsungBrowser")) return "Samsung Internet";
        if (userAgent.includes("Opera") || userAgent.includes("OPR")) return "Opera";
        if (userAgent.includes("Trident")) return "Internet Explorer";
        if (userAgent.includes("Edge") || userAgent.includes("Edg")) return "Microsoft Edge";
        if (userAgent.includes("Chrome")) return "Google Chrome";
        if (userAgent.includes("Safari")) return "Apple Safari";

        return "Unknown";
    }
}
export default new BrowserInfoPage();
