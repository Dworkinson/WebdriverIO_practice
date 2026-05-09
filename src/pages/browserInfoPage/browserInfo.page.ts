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

    private get userAgent(): Promise<WebdriverIO.Element> {
        return $('[id="browser-user-agent"]');
    }

    private get codeName(): Promise<WebdriverIO.Element> {
        return $('[id="browser-code-name"]');
    }

    private get name(): Promise<WebdriverIO.Element> {
        return $('[id="browser-name"]');
    }

    private get version(): Promise<WebdriverIO.Element> {
        return $('[id="browser-version"]');
    }

    private get cookiesEnabled(): Promise<WebdriverIO.Element> {
        return $('[id="browser-cookie"]');
    }

    private get platform(): Promise<WebdriverIO.Element> {
        return $('[id="browser-platform"]');
    }

    async getUserAgent(): Promise<string> {
        await (await this.userAgent).waitForDisplayed();
        return (await this.userAgent).getText();
    }

    async getCodeName(): Promise<string> {
        await (await this.codeName).waitForDisplayed();
        return (await this.codeName).getText();
    }

    async getName(): Promise<string> {
        await (await this.name).waitForDisplayed();
        return (await this.name).getText();
    }

    async getVersion(): Promise<string> {
        await (await this.version).waitForDisplayed();
        return (await this.version).getText();
    }

    async getCookiesEnabled(): Promise<string> {
        await (await this.cookiesEnabled).waitForDisplayed();
        return (await this.cookiesEnabled).getText();
    }

    async getPlatform(): Promise<string> {
        await (await this.platform).waitForDisplayed();
        return (await this.platform).getText();
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
