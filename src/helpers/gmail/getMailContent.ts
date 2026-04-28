import { google } from 'googleapis';
import * as fs from 'fs-extra';
import * as credentials from '@data/sensetive/credentials.json';
import { OAuth2Client } from "google-auth-library";


async function authorize(tokenPath: string): Promise<OAuth2Client> {
    const oAuth2Client = new google.auth.OAuth2(
        credentials.client_id,
        credentials.client_secret,
        credentials.redirect_uris[0]
    );

    const token = await fs.readFile(tokenPath, 'utf8');
    oAuth2Client.setCredentials(JSON.parse(token));
    return oAuth2Client;
}

async function getLatestMessageText(tokenPath: string): Promise<string|null|undefined> {
    const gmail = google.gmail({
        version: 'v1',
        auth: await authorize(tokenPath),
    });

    const listResponse = await gmail.users.messages.list({
        userId: 'me',
        maxResults: 1,
    });

    const messageId = listResponse.data.messages?.[0]?.id;

    if (!messageId) {
        return null;
    }

    const message =  await gmail.users.messages.get({
        userId: 'me',
        id: messageId,
        format: 'full',
    });

    return message.data.snippet;
}

export { getLatestMessageText }
