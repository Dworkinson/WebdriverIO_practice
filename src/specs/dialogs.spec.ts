import { expect } from 'chai';
import DialogsPage from '@pages/dialogsPage/dialogs.page';
import {randomString} from "@helpers/randomizer";
import * as consts from "@helpers/regExp.consts.json";


describe('Dialogs Page: ', async () => {
    before(async () => {
        await DialogsPage.open();
    });

    it('could handle alert', async () => {
        expect((await DialogsPage.getDialogResponseText()).toLowerCase()).to.be.equal('waiting');

        const handler = DialogsPage.handleDialog(true);

        await DialogsPage.clickAlert();
        const message = await handler;

        // it will always be "ok" for alert
        expect((await DialogsPage.getDialogResponseText()).toLowerCase()).to.contain('ok');
        expect(message.toLowerCase()).to.contain('alert');
    });

    it('could accept confirm', async () => {
        const handler = DialogsPage.handleDialog(true);

        await DialogsPage.clickConfirm();
        const message = await handler;

        expect((await DialogsPage.getDialogResponseText()).toLowerCase()).to.contain('ok');
        expect(message.toLowerCase()).to.contain('confirm');
    });

    it('could decline confirm', async () => {
        const handler = DialogsPage.handleDialog(false);

        await DialogsPage.clickConfirm();
        const message = await handler;

        expect((await DialogsPage.getDialogResponseText()).toLowerCase()).to.contain('cancel');
        expect(message.toLowerCase()).to.contain('confirm');
    });

    it('could accept prompt', async () => {
        let text = randomString(consts.TEXT_INPUT.value, 15)
            //to prevent from accepting special symbols as HTML tags
            .replace(/[<>]/g, "")
            // spaces are stipped in prompts
            .trim();

        const handler = DialogsPage.handleDialog(true, text);

        await DialogsPage.clickPrompt();
        const message = await handler;

        expect(await DialogsPage.getDialogResponseText()).to.be.equal(text);
        expect(message.toLowerCase()).to.contain('prompt');
    });

    it('could decline prompt', async () => {
        const handler = DialogsPage.handleDialog(false);
        await DialogsPage.clickPrompt();
        const message = await handler;
        expect((await DialogsPage.getDialogResponseText()).toLowerCase()).to.be.empty;
        expect(message.toLowerCase()).to.contain('prompt');
    });
});
