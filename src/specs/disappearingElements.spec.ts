import { expect } from 'chai';

import DisappearingElementsPage from '@pages/disappearingElementsPage/disappearingElements.page';

//very synthetic case - potentially it is an email, so all elements should have good selectors, BUT
// in case we don't know what elements will be on the page,
// we can use object with test data (could be in some env-specific space)
const elementsTestData = {
    inbox: 'Inbox',
    sent: 'Sent',
    spam: 'Spam',
    important: 'Important',
    starred: 'Starred',
    ignored: 'Ignored',
    newFunc: 'New Function',
    others: 'Others'
};

describe('Disappearing Elements Page: ', async () => {
    it('could get messages quantity', async () => {
        await DisappearingElementsPage.open();

        type ElementKey = keyof typeof elementsTestData;

        // creating an object with elements by their names in runtime,
        // so we could use it in tests by "elements.name"
        const elements = Object.fromEntries(
            Object.entries(elementsTestData).map(([keyName, keyValue]) => [
                keyName,
                DisappearingElementsPage.getElementByName(keyValue)
            ])
            //using default TypeScript Record type, so we could use it in tests by "elements.name"
            // see: https://www.typescriptlang.org/docs/handbook/utility-types.html#recordkeys-type
        ) as Record<ElementKey, ChainablePromiseElement>;

        if(await elements.inbox.isExisting()) {
            console.log(await DisappearingElementsPage.getMsgQty(elements.inbox));
            expect(await DisappearingElementsPage.getMsgQty(elements.inbox)).to.be.greaterThan(0);
        }

        //case 1:
        // get "sent" qty
        // sent message
        // assert "sent" qty is incremented

        //case 2:
        // if (newFunc.isExisting()) -> test new functional

        //etc.
    })
})