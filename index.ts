import {google} from 'googleapis';
import * as creds from '@data/sensetive/credentials.json';
import { waitForTokenExists} from "@helpers/gmail/getToken";
const { exec } = require('child_process');
const fs = require('fs-extra');

const TOKEN_PATH = './token.json';
let token;

async function authorize(needToRestoreToken?: boolean) {
    if (needToRestoreToken) {
        await restoreToken();
    }
    const oAuthClient = new google.auth.OAuth2(
        creds.client_id, creds.client_secret
    );
    const isTokenExists = await fs.pathExists(TOKEN_PATH);
    if (!isTokenExists) {
        exec("wdio run src/helpers/gmail/getToken.conf.ts --spec src/helpers/gmail/getToken.spec.ts");
        await waitForTokenExists(60000);
    }
    token = await fs.readFile(TOKEN_PATH, 'utf8');
    oAuthClient.setCredentials(JSON.parse(token));
    return oAuthClient;
}

async function getMessageId() {
    const gmail = google.gmail({version: 'v1'});
    const messages = await gmail.users.messages.list({
        maxResults: 1,
        userId: 'me',
    });
    if (messages.data.messages) {
        return messages.data.messages[0].id;
    }
}

async function getMessageContent(messageId: string) {
    try {
        const gmail = google.gmail({version: 'v1'});
        const message = await gmail.users.messages.get({
            id: messageId,
            userId: 'me'
        });
        return message.data.snippet;
    } catch (err) {
        console.log("Error: " + err);
    }
}

async function flow() : Promise<string|null|undefined> {
    google.options({
        auth: await authorize()
    })
    const messageId = await getMessageId();
    if (typeof messageId === 'string') {
        return getMessageContent(messageId);
    }
}

async function restoreToken(): Promise<void> {
    console.log('restoring');
    exec("wdio run src/helpers/gmail/getToken.conf.ts --spec src/helpers/gmail/getToken.spec.ts");
    await waitForTokenExists(60000);
}

flow().then((snippet) => {
    console.log(snippet);
})