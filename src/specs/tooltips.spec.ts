import { expect } from 'chai';

import TooltipsPage from '@pages/tooltipsPage/tooltips.page';


describe('Tooltips Page: ', async () => {
    before(async () => {
        await TooltipsPage.open();
    });

    it('should be able to hover over the element and see tooltip', async () => {
        // added moveToTitle() to avoid flaky in case previous tooltip is still on the page

        expect(await TooltipsPage.isTooltipExists()).to.be.false;

        await TooltipsPage.moveToOnTop()
        expect(await TooltipsPage.isTooltipExists()).to.be.true;
        expect(await TooltipsPage.getTooltipLocation()).to.be.equal('top');
        expect(await TooltipsPage.isTooltipHasInnerElementsExecute()).to.be.false;
        await TooltipsPage.moveToTitle();

        await TooltipsPage.moveToOnBottom();
        expect(await TooltipsPage.isTooltipExists()).to.be.true;
        expect(await TooltipsPage.getTooltipLocation()).to.be.equal('bottom');
        expect(await TooltipsPage.isTooltipHasInnerElementsExecute()).to.be.false;
        await TooltipsPage.moveToTitle();

        await TooltipsPage.moveToOnEnd();
        expect(await TooltipsPage.isTooltipExists()).to.be.true;
        expect(await TooltipsPage.getTooltipLocation()).to.be.equal('right');
        expect(await TooltipsPage.isTooltipHasInnerElementsExecute()).to.be.false;
        await TooltipsPage.moveToTitle();

        await TooltipsPage.moveToOnStart();
        expect(await TooltipsPage.isTooltipExists()).to.be.true;
        expect(await TooltipsPage.getTooltipLocation()).to.be.equal('left');
        expect(await TooltipsPage.isTooltipHasInnerElementsExecute()).to.be.false;
        await TooltipsPage.moveToTitle();

        await TooltipsPage.moveToWithHTML();
        expect(await TooltipsPage.isTooltipExists()).to.be.true;
        expect(await TooltipsPage.getTooltipLocation()).to.be.equal('top');
        expect(await TooltipsPage.isTooltipHasInnerElementsExecute()).to.be.true;
        await TooltipsPage.moveToTitle();
    })
})
