import { $ } from '@wdio/globals'


class LoginPageSelectors {
    protected get usernameInput(): ChainablePromiseElement {
        return $('[type="text"][id="username"]');
    }

    protected get passwordInput(): ChainablePromiseElement {
        return $('[type="password"][id="password"]');
    }

    protected get loginBtn(): ChainablePromiseElement {
        return $('[type="submit"][id="submit-login"]');
    }
}

class LoginPage extends LoginPageSelectors {
    async open(): Promise<void> {
        await browser.url('/login');
    }

    async setUsername(username: string): Promise<void> {
        await this.usernameInput.waitForDisplayed();
        await this.usernameInput.setValue(username);
    }

    async setPassword(passwd: string): Promise<void> {
        await this.passwordInput.waitForDisplayed();
        await this.passwordInput.setValue(passwd);
    }

    async clickLoginBtn(): Promise<void> {
        await this.loginBtn.waitForDisplayed();
        await this.loginBtn.scrollIntoView();
        await this.loginBtn.click();
    }

    async login(username: string, password: string): Promise<void> {
        await this.setUsername(username);
        await this.setPassword(password);
        await this.clickLoginBtn();
    }
}

export default new LoginPage();
