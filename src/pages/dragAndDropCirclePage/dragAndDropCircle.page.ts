import { browser, $ } from "@wdio/globals"

export enum Color {
    red = 'red',
    green = 'green',
    blue = 'blue'
}

class DragAndDropCirclePage {
    async open(): Promise<void> {
        await browser.url('/drag-and-drop-circles');
    }

    private get target(): Promise<WebdriverIO.Element> {
        return $('[id="target"]');
    }

    private get circlesInTarget(): Promise<WebdriverIO.ElementArray> {
        return $$('[id="target"] [class]');
    }

    async dragCircleToTarget(color: Color): Promise<void> {
        const circle = $(`[class="${color}"]`);
        const circleInTarget = $(`[id="target"] [class="${color}"]`);
        // wait for elements on starting position
        await circle.waitForDisplayed();
        await (await this.target).waitForDisplayed();
        await circle.dragAndDrop(await this.target);
        // wait for circle inside the target
        await circleInTarget.waitForDisplayed();

    }

    async isCircleInTarget(color: Color): Promise<boolean> {
        const circle = $(`[id="target"] [class="${color}"]`);

        await (await this.target).waitForDisplayed();
        return circle.isExisting();
    }

    async isColorSequenceValid(sequence: Color[]): Promise<boolean> {
        const circlesInTarget = await this.circlesInTarget;

        for(let i = 0; i < sequence.length; ++i) {
            if(await circlesInTarget[i].getAttribute('class') !== sequence[i]) return false;
        }
        return true;
    }
}

export default new DragAndDropCirclePage();
