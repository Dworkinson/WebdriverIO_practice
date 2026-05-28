import { expect } from 'chai';
import HorizontalSliderPage from "@pages/horizontalSliderPage/horizontalSlider.page";

const max = 5;
const min = 0;
const step = 0.5;

describe('Horizontal slider', async () => {
    it('', async () => {
        await HorizontalSliderPage.open();

        for(let i = max; i >= min; i -= step) {
            await HorizontalSliderPage.moveSliderToPosition(i, 'click');
            expect(await HorizontalSliderPage.getRangeValue()).to.be.equal(i);
        }

        for(let i = max; i >= min; i -= step) {
            await HorizontalSliderPage.moveSliderToPosition(i, 'click');
            expect(await HorizontalSliderPage.getRangeValue()).to.be.equal(i);
        }
    });
});