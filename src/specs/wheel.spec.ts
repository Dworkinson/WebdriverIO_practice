import { expect } from "chai";

import WheelGame from "@pages/wheelPage/wheel.page";


describe("WheelPage", async () => {
    it('play wheel', async () => {
        await WheelGame.open();
        for(let i = 0; i < 10; i++) {
            await WheelGame.play();
            expect(await WheelGame.isResultDisplayed()).to.be.false;
        }
        await WheelGame.reset();
        await WheelGame.play();

        expect(await WheelGame.isResultDisplayed()).to.be.false;
    });
});