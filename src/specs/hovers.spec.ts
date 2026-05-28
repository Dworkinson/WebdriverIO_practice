import { expect } from 'chai';
import HoversPage from "@pages/abTestPage/hovers.page";
import { faker } from '@faker-js/faker';


describe('Hovers Page: ', async () => {
    it('could check user1 info', async () => {
        await HoversPage.open();
        const randomNumber = faker.number.int({ min: 1, max: 3 });

        const user1 = await HoversPage.getUserNameByNumber(randomNumber);
        expect(user1).to.contain(`user${randomNumber}`);

        await HoversPage.clickUserProfileByNumber(randomNumber);
        expect(await HoversPage.getProfileUserName()).to.contain(`user${randomNumber}`);
    });
});