import { browser, $ } from '@wdio/globals';


class HoversPage {
    async open(): Promise<void> {
        await browser.url('/hovers');
    }

    private get profileUserName(): ChainablePromiseElement {
        return $('[class="row"] h2');
    }

    private getUserCardByNumber(number: number | string): ChainablePromiseElement {
        return $(`[data-testid="user-${number}"]`);
    }

    private userNameSelector(userCard: ChainablePromiseElement): ChainablePromiseElement {
        return userCard.$('h5');
    }

    private profileLinkSelector(userCard: ChainablePromiseElement): ChainablePromiseElement {
        return userCard.$('[href*="user"]');
    }

    async getUserNameByNumber(number: number | string): Promise<string> {
        const userCard = this.getUserCardByNumber(number);
        await userCard.moveTo();

        return await this.userNameSelector(userCard).getText();
    }

    async clickUserProfileByNumber(number: number | string): Promise<void> {
        const userCard = this.getUserCardByNumber(number);
        await userCard.moveTo();

        await this.profileLinkSelector(userCard).click();
    }

    async getProfileUserName(): Promise<string> {
        return await this.profileUserName.getText();
    }
}

export default new HoversPage();