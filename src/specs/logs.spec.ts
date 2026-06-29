import { expect } from 'chai';

import LogsPage from "@pages/logsPage/logs.page";
import { Value2 } from "@pages/logsPage/logs.interface";
import {randomString} from "@helpers/randomizer";

describe('Logs Page: ', async () => {
    before(async () => {
        await LogsPage.open();
        LogsPage.createLogger();
    });

    it('could read logs from console', async () => {
        const randStr = randomString();
        await LogsPage.generateLog('log', randStr);

        const log = LogsPage.browserLogs[0];
        expect(log.method).to.be.equal('log');
        expect(log.args[0].value).to.contain(randStr);
    });

    it('could read warn from console', async () => {
        const randStr = randomString();
        await LogsPage.generateLog('warn', randStr);

        const log = LogsPage.browserLogs[0];
        expect(log.method).to.be.equal('warn');
        expect(log.args[0].value).to.contain(randStr);
    });

    it('could read error from console', async () => {
        const randStr = randomString();
        await LogsPage.generateLog('error', randStr);

        const log = LogsPage.browserLogs[0];
        expect(log.method).to.be.equal('error');
        expect(log.args[0].value).to.contain(randStr);
    });

    it('could read info from console', async () => {
        const randStr = randomString();
        await LogsPage.generateLog('info', randStr);

        const log = LogsPage.browserLogs[0];
        expect(log.method).to.be.equal('info');
        expect(log.args[0].value).to.contain(randStr);
    });

    it('could read debug from console', async () => {
        const randStr = randomString();
        await LogsPage.generateLog('warn', randStr);

        const log = LogsPage.browserLogs[0];
        expect(log.method).to.be.equal('warn');
        expect(log.args[0].value).to.contain(randStr);
    });

    it('could read table from console', async () => {
        const randStr = 'message, message, msg123';
        const testData = randStr.split(', ');

        await LogsPage.generateLog('table', randStr);

        const log = LogsPage.browserLogs[0];
        expect(log.method).to.be.equal('table');

        const logData = log.args[0].value as Value2[];

        expect(testData.length).to.be.equal(logData.length);
        for(let i = 0; i < testData.length; ++i) {
            expect(logData[i].value[1][1].value).to.be.equal(testData[i]);
        }
    });

    afterEach(async () => {
        LogsPage.clearBrowserLogs()
    });

    after(async () => {
        LogsPage.destroyLogger();
    });
});