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

async function getLatestMessageText(tokenPath: string): Promise<string|null> {
    const gmail = google.gmail({
        version: 'v1',
        auth: await authorize(tokenPath),
    });

    const listResponse = await gmail.users.messages.list({
        userId: 'me',
        maxResults: 1,
    });

    const messageId = listResponse.data.messages?.[0]?.id;

    if (!messageId) return null;

    const message =  await gmail.users.messages.get({
        userId: 'me',
        id: messageId,
        format: 'full',
    });
    const encodedBody = message.data.payload?.parts?.[0]?.body?.data;

    if (!encodedBody) return null;

    return Buffer.from(encodedBody, 'base64').toString('utf-8');
}

async function deleteAllMessages(tokenPath: string): Promise<void> {
    const gmail = google.gmail({
        version: 'v1',
        auth: await authorize(tokenPath),
    });

    while (true) {
        const listResponse = await gmail.users.messages.list({
            userId: 'me',
            maxResults: 500,
        });

        const messages = listResponse.data.messages ?? [];

        if (messages.length === 0) {
            break;
        }

        const ids = messages
            .map((message) => message.id)
            .filter((id): id is string => Boolean(id));

        if (ids.length === 0) {
            break;
        }

        await gmail.users.messages.batchDelete({
            userId: 'me',
            requestBody: {
                ids,
            },
        });
    }
}

export { getLatestMessageText, deleteAllMessages , authorize}
