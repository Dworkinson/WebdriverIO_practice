import {$, browser} from "@wdio/globals";
import {Log} from "./logs.interface";

type LogType = 'log' | 'warn' | 'error' | 'info' | 'debug'| 'table';

class LogsPage {
    _browserLogs: Log[] = [];

    createLogger(): void {
        browser.on('log.entryAdded', (log: any) => this._browserLogs.push(log));
    }

    destroyLogger(): void {
        browser.off('log.entryAdded', (log: any)=> this._browserLogs.push(log));
    }

    get browserLogs(): Log[] {
        return this._browserLogs;
    }

    clearBrowserLogs(): void {
        this._browserLogs = [];
    }

    async open(): Promise<void> {
        await browser.url('/console-logs');
    }

    private get logInput(): ChainablePromiseElement {
        return $('[id="input-log"]');
    }

    private get logBtn(): ChainablePromiseElement {
        return $('[id="btn-log"]');
    }

    private get warnInput(): ChainablePromiseElement {
        return $('[id="input-warn"]');
    }

    private get warnBtn(): ChainablePromiseElement {
        return $('[id="btn-warn"]');
    }

    private get errorInput(): ChainablePromiseElement {
        return $('[id="input-error"]');
    }

    private get errorBtn(): ChainablePromiseElement {
        return $('[id="btn-error"]');
    }

    private get infoInput(): ChainablePromiseElement {
        return $('[id="input-info"]');
    }

    private get infoBtn(): ChainablePromiseElement {
        return $('[id="btn-info"]');
    }

    private get debugInput(): ChainablePromiseElement {
        return $('[id="input-debug"]');
    }

    private get debugBtn(): ChainablePromiseElement {
        return $('[id="btn-debug"]');
    }

    private get tableInput(): ChainablePromiseElement {
        return $('[id="input-table"]');
    }

    private get tableBtn(): ChainablePromiseElement {
        return $('[id="btn-table"]');
    }

    async setLog(log: string): Promise<void> {
        await this.logInput.setValue(log);
    }

    async clickLog(): Promise<void> {
        await this.logBtn.scrollIntoView();
        await this.logBtn.click();
    }

    async setWarn(log: string): Promise<void> {
        await this.warnInput.setValue(log);
    }

    async clickWarn(): Promise<void> {
        await this.warnBtn.scrollIntoView();
        await this.warnBtn.click();
    }

    async setError(log: string): Promise<void> {
        await this.errorInput.setValue(log);
    }

    async clickError(): Promise<void> {
        await this.errorBtn.scrollIntoView();
        await this.errorBtn.click();
    }

    async setInfo(log: string): Promise<void> {
        await this.infoInput.setValue(log);
    }

    async clickInfo(): Promise<void> {
        await this.infoBtn.scrollIntoView();
        await this.infoBtn.click();
    }

    async setDebug(log: string): Promise<void> {
        await this.debugInput.setValue(log);
    }

    async clickDebug(): Promise<void> {
        await this.debugBtn.scrollIntoView();
        await this.debugBtn.click();
    }

    async setTable(log: string): Promise<void> {
        await this.tableInput.setValue(log)
    }

    async clickTable(): Promise<void> {
        await this.tableBtn.scrollIntoView();
        await this.tableBtn.click();
    }

    async generateLog(logType: LogType, message: string): Promise<void> {
        const logsCount = this.browserLogs.length;

        switch (logType) {
            case 'log':
                await this.setLog(message);
                await this.clickLog();
                break;
            case 'warn':
                await this.setWarn(message);
                await this.clickWarn();
                break;
            case 'error':
                await this.setError(message);
                await this.clickError();
                break;
            case 'info':
                await this.setInfo(message);
                await this.clickInfo();
                break;
            case 'debug':
                await this.setDebug(message);
                await this.clickDebug();
                break;
            case 'table':
                await this.setTable(message);
                await this.clickTable();
                break;
            default:
                throw new Error('Unknown log type');
        }

        await browser.waitUntil(async () => {
            return this.browserLogs.length > logsCount;
        });
    }
}

export default new LogsPage;