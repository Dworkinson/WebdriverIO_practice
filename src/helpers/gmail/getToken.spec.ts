import { runServer, closeServer, waitForTokenExists, generateAuthUrl } from "./getToken";
import GetTokenPage from "./getToken.page";

describe('Get new token: ', async () => {
    it("Token successfully created and stored", async () => {
        try {
            await runServer();
            const url = await generateAuthUrl();
            await browser.url(url);
            await GetTokenPage.approve();
            await waitForTokenExists();
        } finally {
            await closeServer();
        }
    });
});