# Project for restoring automation skills

## OAuth2:

>In this project we're getting content from emails, so we need to use Gmail API and OAuth2 to get access to it.

### Creating OAuth2 Client ID:
1. Create a new project in console.cloud.google.com
2. Create a new Client ID:
    1. Select Web Application
    2. Use http://localhost:3000 for JavaScript origins and http://localhost:3000/oauth2Callback for redirect
    3. Save Client ID and Client Secret
    4. Enable Gmail API in console.cloud.google.com
3. In a local project:
    1. install packages:
        1. `@badgateway/oauth2-client` (TypeScript definition for OAuth2 *(optional)*)
        2. `googleapis` (to use Google APIs, OAuth2 included)
        3. `express` (to create server, get code from URL – see [below](#express-example))

#### To use OAuth2 in a project:

OAuth2 is used to get access to Google APIs.

1. Store Client ID, Client secret and redirect URIs (in .json in this case)
2. [OAuth2 documentation](https://googleapis.dev/nodejs/googleapis/147.0.0/#oauth2-client)
    - creating OAuth2 client
    - generating authorization URL
    - getting access token (principle)
3. To get an access token:
    1. run server (in this case, `express` was used)
    2. go to generated URL in browser
    3. grant access to the application
    4. receive code (should be in URL)
       - [OAuth2 documentation](https://googleapis.dev/nodejs/googleapis/147.0.0/#oauth2-client)
       - [express documentation](https://expressjs.com/en/5x/api.html#app.get.method)
       - example code below
    5. get token using OAuth2 client (see [OAuth2 documentation](https://googleapis.dev/nodejs/googleapis/147.0.0/#oauth2-client))


## Gmail API:
1. Get an access token (see part [OAuth2](#to-use-oauth2-in-a-project), get access token)
2. Create a Gmail instance (see [example](#creating-a-gmail-instance-example) below)
3. Use Gmail API as needed. For more information see:
   - [Gmail API documentation](https://developers.google.com/workspace/gmail/api/reference/rest)
   - [Google APIs Node.js Client documentation](https://googleapis.dev/nodejs/googleapis/latest/gmail/)

### `express` example:
```ts
    ///
    const app = express();
    const server = app.listen(3000);
    app.use(express.json());
    app.get('/oauth2Callback', async (req: express.Request, res: express.Response) => {
        const code = req.query.code as string;
        const { tokens } = await oAuth2Client.getToken(code);
        //then store tokens elsewhere
    }
    ///
);
```

### creating a Gmail instance example:
```ts
import { google } from 'googleapis';
///
const gmail = google.gmail({
    version: 'v1',
    auth: await authorize(tokenPath),
});
// now you can use gmail API via "gmail" constant.
// For example, get last email:
const listResponse = await gmail.users.messages.list({
    userId: 'me',
    maxResults: 1,
});
```