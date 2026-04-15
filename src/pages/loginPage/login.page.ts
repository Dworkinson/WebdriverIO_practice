import { $ } from '@wdio/globals'


class LoginPageSelectors {
    protected get usernameInput(): Promise<WebdriverIO.Element> {
        return $('[type="text"][id="username"]');
    }

    protected get passwordInput(): Promise<WebdriverIO.Element> {
        return $('[type="password"][id="password"]');
    }

    protected get loginBtn(): Promise<WebdriverIO.Element> {
        return $('[type="submit"][id="submit-login"]');
    }
}

class LoginPage extends LoginPageSelectors {
    async setUsername(username: string): Promise<void> {
        await (await this.usernameInput).waitForDisplayed();
        await (await this.usernameInput).setValue(username);
    }

    async setPassword(passwd: string): Promise<void> {
        await (await this.passwordInput).waitForDisplayed();
        await (await this.passwordInput).setValue(passwd);
    }

    async clickLoginBtn(): Promise<void> {
        await (await this.loginBtn).waitForDisplayed();
        await (await this.loginBtn).scrollIntoView();
        await (await this.loginBtn).click();
    }

    async login(username: string, password: string): Promise<void> {
        await this.setUsername(username);
        await this.setPassword(password);
        await this.clickLoginBtn();
    }
}

export default new LoginPage();
