import express from 'express';
import { google } from 'googleapis';
import * as credentials from '@data/sensetive/credentials.json';
import * as fs from 'fs-extra';

const app = express();
let server: { close: () => any; };

const TOKEN_PATH = 'token.json';
const oAuth2Client = new google.auth.OAuth2(
    credentials.client_id, credentials.client_secret, credentials.redirect_uris[0]
);

export async function runServer(): Promise<any> {
    server = app.listen(3000, () => {
        console.log('connected');
    });
}

export async function closeServer(): Promise<void> {
    await server.close();
    console.log('disconnected');
}

export async function generateAuthUrl(): Promise<string> {
    return oAuth2Client.generateAuthUrl({
        access_type: 'offline',
        prompt: 'consent',
        scope: ['https://mail.google.com']
    });
}

app.use(express.json());
app.get('/oauth2Callback', async (req: express.Request, res: express.Response) => {
    try {
        const code = req.query.code as string;
        const result = await oAuth2Client.getToken(code);
        const tokens = result.tokens;

        await fs.writeFile('token.json', JSON.stringify(tokens));
        console.log(`Token successfully created and stored in ${TOKEN_PATH}`);
        return res.send("<script>window.close();</script>");
    } catch (err) {
        return res.send({error: err});
    }
});

export async function waitForTokenExists(timeout = 10000, interval = 500, timeoutMsg = 'Token still not exists'): Promise<void> {
    const _timeout = setTimeout(async () => {
        throw new Error(`${timeoutMsg}`);
    }, timeout);

    let tokenExists;
    do {
        setTimeout(() => {}, interval);
        tokenExists = await fs.pathExists(TOKEN_PATH)
    } while (!tokenExists);
    clearTimeout(_timeout);
}

// console.log(generateAuthUrl());
// runServer();