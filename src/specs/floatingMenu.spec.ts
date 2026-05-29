import { expect } from "chai";
import { faker } from "@faker-js/faker";

import FloatingMenuPage from "@pages/floatingMenuPage/floatingMenu.page";


describe("Floating menu: ", async () => {
    it('Menu should be visible while scrolling', async () => {
        await FloatingMenuPage.open();
        expect(await FloatingMenuPage.isMenuVisible()).to.be.true;

        const pageHeight = await FloatingMenuPage.getPageHeight();
        const randomPosition = faker.number.int({min: 0, max: pageHeight});

        // visible from top of the page
        expect(await FloatingMenuPage.isMenuVisible()).to.be.true;

        // visible from bottom of the page
        await FloatingMenuPage.scrollTo(pageHeight);
        expect(await FloatingMenuPage.isMenuVisible()).to.be.true;

        // visible from random position
        await FloatingMenuPage.scrollTo(randomPosition);
        expect(await FloatingMenuPage.isMenuVisible()).to.be.true;
    });
});
