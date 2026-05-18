import { expect } from 'chai';
import DialogsPage from '@pages/dialogsPage/dialogs.page';
import {randomString} from "@helpers/randomizer";
import * as consts from "@helpers/regExp.consts.json";


describe('Dialogs Page: ', async () => {
    before(async () => {
        await DialogsPage.open();
    });

    it('could handle alert', async () => {
        DialogsPage.handleDialog(true);

        await DialogsPage.clickAlert();
        // it will always be "ok" for alert
        expect((await DialogsPage.getDialogResponseText()).toLowerCase()).to.contain('ok');
    });

    it('could accept confirm', async () => {
        DialogsPage.handleDialog(true);

        await DialogsPage.clickConfirm();
        expect((await DialogsPage.getDialogResponseText()).toLowerCase()).to.contain('ok');
    });

    it('could decline confirm', async () => {
        DialogsPage.handleDialog(false);
        await DialogsPage.clickConfirm();
        expect((await DialogsPage.getDialogResponseText()).toLowerCase()).to.contain('cancel');
    });

    it('could accept prompt', async () => {
        let text = randomString(consts.TEXT_INPUT.value, 15)
            //to prevent from accepting special symbols as HTML tags
            .replace(/[<>]/g, "")
            // spaces are stipped in prompts
            .trim();

        DialogsPage.handleDialog(true, text);
        await DialogsPage.clickPrompt();
        expect(await DialogsPage.getDialogResponseText()).to.be.equal(text);
    });

    it('could decline prompt', async () => {
        DialogsPage.handleDialog(false);
        await DialogsPage.clickPrompt();
        expect((await DialogsPage.getDialogResponseText()).toLowerCase()).to.be.empty;
    });
});
