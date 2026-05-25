import { $, browser } from '@wdio/globals';

class ChallengingDOMPage {
    async open(): Promise<void> {
        await browser.url('/challenging-dom');
    }

    private get functionalButtons(): ChainablePromiseArray {
        return $$('[class="row"] a[id]');
    }

    private getElementByText(text: string): ChainablePromiseElement {
        //language=XPath
        return $(`//table//td[contains(text(), "${text}")]`);
    }

    async deleteRowByCellsData(cellData: string): Promise<void> {
        const element = this.getElementByText(cellData);

        //language=XPath
        const deleteBtn = element.$('..//a[@href="#delete"]');
        await deleteBtn.scrollIntoView();
        await deleteBtn.click();
    }

    async editRowByCellsData(cellData: string, newData: string): Promise<void> {
        const element = this.getElementByText(cellData);

        //language=XPath
        const deleteBtn = element.$('..//a[@href="#edit"]');
        await deleteBtn.scrollIntoView();
        await deleteBtn.click();

        await element.setValue(newData);
    }

    async clickOnFunctionalButton(buttonsNumber: number): Promise<void> {
        const button = this.functionalButtons[buttonsNumber];

        await button.scrollIntoView();
        await button.click();
    }

    async getAnswer(): Promise<string|any> {
        const answerScript = $('[id="core"] script');
        const answerMatch = (await answerScript.getHTML({includeSelectorTag: false})).match( /Answer:\s*(\d+)/);
        if(!answerMatch) throw new Error('Could not get answer');
        return answerMatch;
    }
}

export default new ChallengingDOMPage();
