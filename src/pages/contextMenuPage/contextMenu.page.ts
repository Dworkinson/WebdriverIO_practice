import { $, browser } from '@wdio/globals';


class ContextMenuPage {
    async open(): Promise<void> {
        await browser.url('/context-menu');
    }

    private get hotSpot(): ChainablePromiseElement {
        return $('[id="hot-spot"]');
    }

    async rightClickHotSpot(): Promise<void> {
        await this.hotSpot.waitForDisplayed();
        await this.hotSpot.click({button: 'right'});
    }
}

export default new ContextMenuPage();
