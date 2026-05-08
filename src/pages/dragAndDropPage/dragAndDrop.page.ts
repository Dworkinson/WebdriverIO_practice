import { browser, $ } from "@wdio/globals";


class DragAndDropPage {
    async open(): Promise<void> {
        await browser.url('/drag-and-drop');
    }

    private get leftSquare(): Promise<WebdriverIO.Element> {
        return $('[id="column-a"]');
    }

    private get rightSquare(): Promise<WebdriverIO.Element> {
        return $('[id="column-b"]');
    }

    async getLeftSquareText(): Promise<string> {
        await (await this.leftSquare).waitForDisplayed();
        return (await this.leftSquare).getText();
    }

    async getRightSquareText(): Promise<string> {
        await (await this.rightSquare).waitForDisplayed();
        return (await this.rightSquare).getText();
    }

    async dragLeftSquare(): Promise<void> {
        await (await this.leftSquare).dragAndDrop(await this.rightSquare);
    }

    async dragRightSquare(): Promise<void> {
        await (await this.rightSquare).dragAndDrop(await this.leftSquare);
    }
}

export default new DragAndDropPage();
