import express, { Express } from 'express';
import { google } from 'googleapis';
import * as fs from 'fs-extra';
import { Server } from "node:http";
import { OAuth2Client } from "google-auth-library";

import dotenv from 'dotenv';
import minimist from 'minimist';
const env = minimist(process.argv).ENV || '.env.example';
dotenv.config({ path: env })

type Params = {
    timeout?: number,
    interval?: number,
    timeoutMsg?: string,
    tokenPath?: string
}

async function getOAuthClient(): Promise<OAuth2Client> {
    return new google.auth.OAuth2(
        process.env.CLIENT_ID,
        process.env.CLIENT_SECRET,
        process.env.REDIRECT_URI
    )
}

async function generateAuthUrl(oAuth2Client: OAuth2Client): Promise<string> {
    return oAuth2Client.generateAuthUrl({
        access_type: 'offline',
        prompt: 'consent',
        scope: ['https://mail.google.com/'],
    });
}

async function runServer(app: Express) {
    return app.listen(3000)
}

async function closeServer(server: Server): Promise<void> {
    server.close();
    server.closeAllConnections();
}

async function writeToken(app: Express, oAuth2Client: OAuth2Client, token_path = process.env.TOKEN_PATH || 'token.json'): Promise<void> {
    app.get('/oauth2Callback', async (req: express.Request, res: express.Response) => {
        try {
            const code = req.query.code as string;

            if (!code) {
                return res.status(400).send('No code received');
            }

            const { tokens } = await oAuth2Client.getToken(code);

            fs.appendFileSync(token_path, JSON.stringify(tokens, null, 2));
            res.send('Token saved. You can close this tab.');
        } catch (error) {
            console.error(error);
            res.status(500).send('OAuth failed');
        }
    });
}

// only when no file exists
async function waitForTokenExists(
    timeout = 60000,
    interval = 500,
    timeoutMsg = 'Token still not exists',
    token_path = process.env.TOKEN_PATH || "token.json"
):Promise<void> {
    const _timeout = setTimeout(async () => {
        throw new Error(`${timeoutMsg}`);
    }, timeout);

    let tokenExists;
    do {
        setTimeout(() => {}, interval);
        tokenExists = await fs.pathExists(token_path)
    } while (!tokenExists);
    clearTimeout(_timeout);
}

async function getToken(params?: Params): Promise<void> {
    const app = express();
    const oAuthClient = await getOAuthClient();
    const server = await runServer(app);
    const url = await generateAuthUrl(oAuthClient);
    console.log('Open the following URL in your browser:');
    console.log(url)

    try {
        await writeToken(app, oAuthClient, params?.tokenPath);
        await waitForTokenExists(
            params?.timeout,
            params?.interval,
            params?.timeoutMsg,
            params?.tokenPath
        );
    } catch (e) {
        console.log(e);
    }

    await closeServer(server);
}

getToken().then(() => {
    console.log('Token saved.');
});
