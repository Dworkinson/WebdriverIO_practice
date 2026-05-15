import { browser, $ } from "@wdio/globals";
import { expect } from "chai";

import DragAndDropPage from "@pages/dragAndDropPage/dragAndDrop.page";


describe('Drag and drop: ', async () => {
    it('right square could be dragged to the left square', async () => {
        await DragAndDropPage.open();

        expect(await DragAndDropPage.getLeftSquareText()).to.be.equal('A');
        expect(await DragAndDropPage.getRightSquareText()).to.be.equal('B');

        await DragAndDropPage.dragRightSquare();
        expect(await DragAndDropPage.getLeftSquareText()).to.be.equal('B');
        expect(await DragAndDropPage.getRightSquareText()).to.be.equal('A');
    });

    it('left square could be dragged to the right square', async () => {
        await DragAndDropPage.open();

        expect(await DragAndDropPage.getLeftSquareText()).to.be.equal('A');
        expect(await DragAndDropPage.getRightSquareText()).to.be.equal('B');

        await DragAndDropPage.dragLeftSquare();
        expect(await DragAndDropPage.getLeftSquareText()).to.be.equal('B');
        expect(await DragAndDropPage.getRightSquareText()).to.be.equal('A');
    });
});

// the case is simple. Here is an implementation without pageObject
describe("Drag and drop: ", async () => {
    it("squares could be dragged", async () => {
        await browser.url('/drag-and-drop');

        const a = $('[id="column-a"]');
        const b = $('[id="column-b"]');

        expect(await (a.$('header')).getText()).to.be.equal('A');
        expect(await (b.$('header')).getText()).to.be.equal('B');

        await a.dragAndDrop(b);
        expect(await (a.$('header')).getText()).to.be.equal('B');
        expect(await (b.$('header')).getText()).to.be.equal('A');

        await b.dragAndDrop(a);
        expect(await (a.$('header')).getText()).to.be.equal('A');
        expect(await (b.$('header')).getText()).to.be.equal('B');
    });
});
