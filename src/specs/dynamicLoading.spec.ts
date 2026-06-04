import { expect } from 'chai'

import DynamicLoadingPage from "@pages/dynamicLoadingPage/dynamicLoading.page";


describe('Dynamic loading page: ', () => {
    beforeEach(async () => {
        await DynamicLoadingPage.open();
    });

    it('Should be able to get hidden element', async () => {
        await DynamicLoadingPage.clickOnHiddenElementHref();
        await DynamicLoadingPage.showResult();

        expect(await DynamicLoadingPage.isResultDisplayed()).to.be.true;
    });

    it('Should be able to get rendered element', async () => {
        await DynamicLoadingPage.clickOnRenderedElementHref();
        await DynamicLoadingPage.showResult();

        expect(await DynamicLoadingPage.isResultDisplayed()).to.be.true;
    })
});