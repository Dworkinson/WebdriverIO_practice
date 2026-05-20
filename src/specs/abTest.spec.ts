import { expect } from 'chai';

import AbTestPage from '@pages/abTestPage/abTest.page';


describe('AB Test Page: ', async () => {
    it('should be able to switch between two versions', async () => {
        await AbTestPage.open();

        const currentPage = await AbTestPage.getCurrentPageBreadCrumbText();
        const variant = currentPage.split(' ').pop();

        switch (variant) {
            case '1':
                // do some important actions
                break;
            case '2':
                // do other important actions
                break
            default:
                throw new Error('Unknown variant');
        }

        await AbTestPage.open(true);

        const newPage = await AbTestPage.getCurrentPageBreadCrumbText();
        expect(newPage.toLowerCase()).to.contain('no a/b test');
    });
})