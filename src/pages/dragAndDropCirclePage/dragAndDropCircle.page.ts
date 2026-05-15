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

    private get target(): ChainablePromiseElement {
        return $('[id="target"]');
    }

    private get circlesInTarget(): ChainablePromiseArray {
        return $$('[id="target"] [class]');
    }

    async dragCircleToTarget(color: Color): Promise<void> {
        const circle = $(`[class="${color}"]`);
        const circleInTarget = $(`[id="target"] [class="${color}"]`);
        // wait for elements on starting position
        await circle.waitForDisplayed();
        await this.target.waitForDisplayed();
        await circle.dragAndDrop(this.target);
        // wait for circle inside the target
        await circleInTarget.waitForDisplayed();

    }

    async isCircleInTarget(color: Color): Promise<boolean> {
        const circle = $(`[id="target"] [class="${color}"]`);

        await this.target.waitForDisplayed();
        return circle.isExisting();
    }

    async isColorSequenceValid(sequence: Color[]): Promise<boolean> {
        const circlesInTarget = this.circlesInTarget;

        for(let i = 0; i < sequence.length; ++i) {
            if(await circlesInTarget[i].getAttribute('class') !== sequence[i]) return false;
        }
        return true;
    }
}

export default new DragAndDropCirclePage();
