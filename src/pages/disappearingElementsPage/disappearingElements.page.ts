import { $, browser } from '@wdio/globals';


class DisappearingElementsPage {
    async open(): Promise<void> {
        await browser.url('/disappearing-elements');
    }

    getElementByName(name: string): ChainablePromiseElement {
        //language=XPath
        return $(`//button[contains(text(), "${name}")]`);
    }

    async getMsgQty(elem: ChainablePromiseElement): Promise<number> {
        //language=XPath
        const numberElem = elem.$('//span');
        const number = Number(await numberElem.getText());

        if(!number) throw new Error('Messages qty is not found');
        return number;
    }
}

export default new DisappearingElementsPage();
