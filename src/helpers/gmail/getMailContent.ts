import { google } from 'googleapis';
import * as fs from 'fs-extra';
import { OAuth2Client } from "google-auth-library";

const TOKEN_PATH = process.env.TOKEN_PATH || 'token.json';

async function authorize(): Promise<OAuth2Client> {
    const oAuth2Client = new google.auth.OAuth2(
        process.env.CLIENT_ID,
        process.env.CLIENT_SECRET,
        process.env.REDIRECT_URI
    );

    const token = await fs.readFile(TOKEN_PATH, 'utf8');
    oAuth2Client.setCredentials(JSON.parse(token));
    return oAuth2Client;
}

async function getLatestMessageText(email: string): Promise<string|null> {
    const gmail = google.gmail({
        version: 'v1',
        auth: await authorize(),
    });

    const listResponse = await gmail.users.messages.list({
        userId: 'me',
        maxResults: 1,
        q: `to:${email}`
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

async function deleteMessages(email: string) {
    const gmail = google.gmail({
        version: 'v1',
        auth: await authorize(),
    });

    while (true) {
        const listResponse = await gmail.users.messages.list({
            userId: 'me',
            maxResults: 500,
            q: `to:${email}`
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
    return true;
}

export { getLatestMessageText, deleteMessages }
