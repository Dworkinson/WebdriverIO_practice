import { expect } from 'chai';
import DynamicControlsPage from "@pages/dynamicControlsPage/dynamicControls.page";


describe('Switch dynamic controls states: ', async () => {
    before(async () => {
        await DynamicControlsPage.open();
    });

    it('Should be able to add/remove checkbox', async () => {
        expect(await DynamicControlsPage.isCheckBoxOnPage()).to.be.true;

        await DynamicControlsPage.switchCheckBox();
        expect(await DynamicControlsPage.isCheckBoxOnPage()).to.be.false;

        await DynamicControlsPage.switchCheckBox();
        expect(await DynamicControlsPage.isCheckBoxOnPage()).to.be.true;
    });

    it('Should be able to enable/disable input', async () => {
        expect(await DynamicControlsPage.isInputEnabled()).to.be.false;

        await DynamicControlsPage.switchInput();
        expect(await DynamicControlsPage.isInputEnabled()).to.be.true;

        await DynamicControlsPage.switchInput();
        expect(await DynamicControlsPage.isInputEnabled()).to.be.false;
    });

    it('Waiter should not be displayed after operation is completed', async () => {})
});

describe('Waiter displaying: ', async () => {
    beforeEach(async () => {
        await DynamicControlsPage.open();
    });

    it('Waiter should not be displayed after checkbox switch completed', async () => {
        expect(await DynamicControlsPage.isLoading()).to.be.false;
        await DynamicControlsPage.switchCheckBox();
        expect(await DynamicControlsPage.isLoading()).to.be.false;

        await DynamicControlsPage.switchCheckBox();
        expect(await DynamicControlsPage.isLoading()).to.be.false;
    });

    it('Waiter should not be displayed after input switch completed', async () => {
        expect(await DynamicControlsPage.isLoading()).to.be.false;
        await DynamicControlsPage.switchInput();
        expect(await DynamicControlsPage.isLoading()).to.be.false;

        await DynamicControlsPage.switchInput();
        expect(await DynamicControlsPage.isLoading()).to.be.false;
    });

    // skipped because of bug in functionality
    xit('Waiter should not be displayed after input+checkbox switch completed', async () => {
        await DynamicControlsPage.switchInput(false);
        await DynamicControlsPage.switchCheckBox(false);
        expect(await DynamicControlsPage.isLoading()).to.be.false;
    });
});