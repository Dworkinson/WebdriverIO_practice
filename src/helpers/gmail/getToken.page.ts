import * as mail from "@data/sensetive/mail.json";

class GetTokenPage {
    async approve(): Promise<void> {
        const emailField = browser.$('[type="email"]');
        await (await emailField).waitForDisplayed();
        await (await emailField).setValue(mail.email);

        const nextBtn = browser.$('[id="identifierNext"]');
        await (await nextBtn).waitForClickable();
        await (await nextBtn).click();

        const passwordField = browser.$('[type="password"]');
        await (await passwordField).waitForDisplayed();
        await (await passwordField).setValue(mail.passwd);

        const next = browser.$('[id="passwordNext"]');
        await (await next).waitForClickable();
        await (await next).click();

        await browser.pause(2000);
        const additional = browser.$('//div/*[@href="#"]');
        if (await (await additional).isDisplayed()) {
            await (await additional).click();

            const forward = browser.$('//p/*[@href="#"]');
            await (await forward).waitForClickable();
            await (await forward).click();
        }

        const continueBtn = browser.$('//*[@id="view_container"]/div/div/div[2]/div/div[2]/div/div/div[2]');
        await (await continueBtn).waitForClickable();
        await continueBtn.click();

        const continueBtn2 = browser.$('//*[@id="submit_approve_access"]/div/button');
        await (await continueBtn2).waitForClickable();
        await (await continueBtn2).click();
    }
}

export default new GetTokenPage();