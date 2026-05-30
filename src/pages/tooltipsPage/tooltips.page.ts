import {$, browser} from '@wdio/globals';


class TooltipsPage {
    async open(): Promise<void> {
        await browser.url('/tooltips');
    }

    private get title(): ChainablePromiseElement {
        return $('[id="core"] h1');
    }

    private get onTop(): ChainablePromiseElement {
        return $('[id="btn1"]');
    }

    private get onEnd(): ChainablePromiseElement {
        return $('[id="btn2"]');
    }

    private get onBottom(): ChainablePromiseElement {
        return $('[id="btn3"]');
    }

    private get onStart(): ChainablePromiseElement {
        return $('[id="btn4"]');
    }

    private get withHTML(): ChainablePromiseElement {
        return $('[id="btn5"]');
    }

    private get tooltip(): ChainablePromiseElement {
        return $('[id*="tooltip"]');
    }

    async moveToTitle(): Promise<void> {
        await this.title.moveTo();
        await this.tooltip.waitForExist({timeout: 1000, reverse: true});
    }

    async moveToOnTop(): Promise<void> {
        await this.onTop.moveTo();
        await this.tooltip.waitForExist({timeout: 1000});
    }

    async moveToOnEnd(): Promise<void> {
        await this.onEnd.moveTo();
        await this.tooltip.waitForExist({timeout: 1000});
    }

    async moveToOnBottom(): Promise<void> {
        await this.onBottom.moveTo();
        await this.tooltip.waitForExist({timeout: 1000});
    }

    async moveToOnStart(): Promise<void> {
        await this.onStart.moveTo();
        await this.tooltip.waitForExist({timeout: 1000});
    }

    async moveToWithHTML(): Promise<void> {
        await this.withHTML.moveTo();
        await this.tooltip.waitForExist({timeout: 1000});
    }

    async isTooltipExists(): Promise<boolean> {
        return await this.tooltip.isExisting();
    }

    async getTooltipLocation(): Promise<string | null> {
        return await this.tooltip.getAttribute('data-popper-placement');
    }

    // better performance than isTooltipHasInnerElements
    async isTooltipHasInnerElementsExecute(): Promise<boolean> {
        return await browser.execute(() => {
            const tooltip = document.querySelector('[id*="tooltip"] [class="tooltip-inner"]');
            if(!tooltip) throw new Error('Tooltip not found');
            return tooltip.children.length > 0;
        });
    }

    // better readability?
    async isTooltipHasInnerElements(): Promise<boolean> {
        const inner = this.tooltip.$('[class="tooltip-inner"]');
        const children = inner.$$('*');
        return await children.length > 0;
    }
}

export default new TooltipsPage();
