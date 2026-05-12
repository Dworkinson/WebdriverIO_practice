import { browser, $ } from '@wdio/globals'


class RegisterPageSelectors {
    protected get usernameInput(): ChainablePromiseElement {
        return $('input[id="username"]');
    }

    protected get passwordInput(): ChainablePromiseElement {
        return $('input[id="password"]');
    }

    protected get confirmPasswordInput(): ChainablePromiseElement {
        return $('input[id="confirmPassword"]');
    }

    protected get registerBtn(): ChainablePromiseElement {
        return $('button[type="submit"]');
    }
}

class RegisterPage extends RegisterPageSelectors {
    async open(): Promise<void> {
        await browser.url('/register');
    }

    async setUsername(username: string): Promise<void> {
        await this.usernameInput.waitForDisplayed();
        await this.usernameInput.setValue(username);
    }

    async setPassword(password: string): Promise<void> {
        await this.passwordInput.waitForDisplayed();
        await this.passwordInput.setValue(password);
    }

    async setConfirmPassword(password: string): Promise<void> {
        await this.confirmPasswordInput.waitForDisplayed();
        await this.confirmPasswordInput.setValue(password);
    }

    async clickOnRegisterBtn(): Promise<void> {
        await this.registerBtn.waitForClickable();
        await this.registerBtn.scrollIntoView();
        await this.registerBtn.click();
    }

    async registration(username: string, password: string, confirmPassword: string = password): Promise<void> {
        await this.setUsername(username);
        await this.setPassword(password);
        await this.setConfirmPassword(confirmPassword);
        await this.clickOnRegisterBtn();
    }
}

export default new RegisterPage();
