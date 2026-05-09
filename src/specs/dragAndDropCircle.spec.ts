import {expect} from 'chai';

import DragAndDropCirclePage, {CircleColor} from "@pages/dragAndDropCirclePage/dragAndDropCircle.page";
import {browser} from "@wdio/globals";


describe('Circle Drag and Drop', async () => {
    before(async () => {
        const regExp = new RegExp('.*ads.*');
        (await browser.mock(regExp)).abort('Aborted');
    });

    it('circles could be dragged to the box', async () => {
        await DragAndDropCirclePage.open();

        expect(await DragAndDropCirclePage.isCircleInTarget(CircleColor.red)).to.be.false;

        await DragAndDropCirclePage.dragRedCircle();
        expect(await DragAndDropCirclePage.isCircleInTarget(CircleColor.red)).to.be.true
    })
});