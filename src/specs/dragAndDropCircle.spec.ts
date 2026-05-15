import { expect } from 'chai';

import DragAndDropCirclePage, {Color} from "@pages/dragAndDropCirclePage/dragAndDropCircle.page";

import { shuffleArray } from "@helpers/randomizer";


describe('Circle Drag and Drop', async () => {
    it('circles could be dragged to the box', async () => {
        await DragAndDropCirclePage.open();

        const colors = [
            Color.red,
            Color.blue,
            Color.green
        ]
        shuffleArray(colors);

        expect(await DragAndDropCirclePage.isCircleInTarget(Color.red)).to.be.false;
        expect(await DragAndDropCirclePage.isCircleInTarget(Color.blue)).to.be.false;
        expect(await DragAndDropCirclePage.isCircleInTarget(Color.green)).to.be.false;

        for(let i = 0; i < colors.length; ++i) {
            await DragAndDropCirclePage.dragCircleToTarget(colors[i]);
            expect(await DragAndDropCirclePage.isCircleInTarget(colors[i])).to.be.true;
        }

        expect(await DragAndDropCirclePage.isColorSequenceValid(colors)).to.be.true;
    });
});
