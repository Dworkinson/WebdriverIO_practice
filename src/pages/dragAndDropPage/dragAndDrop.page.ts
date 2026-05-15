import { browser, $ } from "@wdio/globals";


class DragAndDropPage {
    async open(): Promise<void> {
        await browser.url('/drag-and-drop');
    }

    private get leftSquare(): ChainablePromiseElement {
        return $('[id="column-a"]');
    }

    private get rightSquare(): ChainablePromiseElement {
        return $('[id="column-b"]');
    }

    async getLeftSquareText(): Promise<string> {
        await this.leftSquare.waitForDisplayed();
        return this.leftSquare.getText();
    }

    async getRightSquareText(): Promise<string> {
        await this.rightSquare.waitForDisplayed();
        return this.rightSquare.getText();
    }

    async dragLeftSquare(): Promise<void> {
        await this.leftSquare.dragAndDrop(this.rightSquare);
    }

    async dragRightSquare(): Promise<void> {
        await this.rightSquare.dragAndDrop(this.leftSquare);
    }
}

export default new DragAndDropPage();
