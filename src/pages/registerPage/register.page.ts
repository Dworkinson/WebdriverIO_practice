import { browser, $ } from '@wdio/globals'


class RegisterPageSelectors {
    protected get usernameInput(): Promise<WebdriverIO.Element> {
        return $('input[id="username"]');
    }

    protected get passwordInput(): Promise<WebdriverIO.Element> {
        return $('input[id="password"]');
    }

    protected get confirmPasswordInput(): Promise<WebdriverIO.Element> {
        return $('input[id="confirmPassword"]');
    }

    protected get registerBtn(): Promise<WebdriverIO.Element> {
        return $('button[type="submit"]');
    }
}

class RegisterPage extends RegisterPageSelectors {
    async open(): Promise<void> {
        await browser.url('/register');
    }

    async setUsername(username: string): Promise<void> {
        await (await this.usernameInput).waitForDisplayed();
        await (await this.usernameInput).setValue(username);
    }

    async setPassword(password: string): Promise<void> {
        await (await this.passwordInput).waitForDisplayed();
        await (await this.passwordInput).setValue(password);
    }

    async setConfirmPassword(password: string): Promise<void> {
        await (await this.confirmPasswordInput).waitForDisplayed();
        await (await this.confirmPasswordInput).setValue(password);
    }

    async clickOnRegisterBtn(): Promise<void> {
        await (await this.registerBtn).waitForClickable();
        await (await this.registerBtn).scrollIntoView();
        await (await this.registerBtn).click();
    }

    async registration(username: string, password: string, confirmPassword: string = password): Promise<void> {
        await this.setUsername(username);
        await this.setPassword(password);
        await this.setConfirmPassword(confirmPassword);
        await this.clickOnRegisterBtn();
    }
}

export default new RegisterPage();
