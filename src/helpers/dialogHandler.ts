import {browser} from "@wdio/globals";

/** Handles dialogs (alert, confirm, prompt) and returns dialog message
 * @param {boolean} accept - true if you want to accept dialog, false otherwise
 * @param {string} text - optional text to be entered in prompt
 * */
export function dialogHandler(accept: boolean, text?: string): Promise<string> {
    return new Promise<string>((resolve, reject) => {
        const handler = async (dialog: WebdriverIO.Dialog) => {
            try {
                await (accept ? dialog.accept(text) : dialog.dismiss())
                resolve(dialog.message());
            } catch (e) {
                reject(e);
            } finally {
                browser.off('dialog', handler)
                clearTimeout(timeout);
            }
        }

        const timeout = setTimeout(async () => {
            browser.off('dialog', handler)
            reject(new Error('Dialog was not handled'));
        }, browser.options.waitforTimeout || 10000);

        browser.on('dialog', handler);
    });
}