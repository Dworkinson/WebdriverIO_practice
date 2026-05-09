import { browser, $ } from "@wdio/globals"

export enum CircleColor {
    red = 'red',
    green = 'green',
    blue = 'blue'
}

class DragAndDropCirclePage {
    async open(): Promise<void> {
        await browser.url('/drag-and-drop-circles');
    }

    private get red(): Promise<WebdriverIO.Element> {
        return $('[id="red"]');
    }

    private get green(): Promise<WebdriverIO.Element> {
        return $('[id="green"]');
    }

    private get blue(): Promise<WebdriverIO.Element> {
        return $('[id="blue"]');
    }

    private get target(): Promise<WebdriverIO.Element> {
        return $('[id="target"]');
    }

    async dragRedCircle(): Promise<void> {
        await (await this.red).waitForDisplayed();
        await (await this.target).waitForDisplayed();
        await (await this.red).dragAndDrop(await this.target);
    }

    async dragGreenCircle(): Promise<void> {
        await (await this.green).waitForDisplayed();
        await (await this.target).waitForDisplayed();
        await (await this.green).dragAndDrop(await this.target);
    }

    async dragBlueCircle(): Promise<void> {
        await (await this.blue).waitForDisplayed();
        await (await this.target).waitForDisplayed();
        await (await this.blue).dragAndDrop(await this.target);
    }

    async isCircleInTarget(color: CircleColor): Promise<boolean> {
        const circle = (await this.target).$(`[id="${color}"]`);
        const c = await circle;
        const f = Boolean(c);
        let a;
        return Boolean(await circle);
    }
}

export default new DragAndDropCirclePage();
