import { expect } from 'chai';

import DisappearingElementsPage from '@pages/disappearingElementsPage/disappearingElements.page';

const elemsNames = ["Inbox", "Sent", "Spam", "Important", "Starred"]


describe('Disappearing Elements Page: ', async () => {
    it('could get messages quantity', async () => {
        await DisappearingElementsPage.open();


        const elems: {[key: string]: ChainablePromiseElement} = Object.fromEntries(
            await Promise.all(
                elemsNames.map(async (name) => {
                    const elem = await DisappearingElementsPage.getElementByName(name);
                    return [name, elem]
                })
            )
        )

        const values = Object.values(elems);
        for(const elem of values) {
            const isExists = await elem.isExisting();

            if(isExists) {
                expect(await DisappearingElementsPage.getMsgQty(elem)).to.be.greaterThan(0);
            }
        }
    })
})