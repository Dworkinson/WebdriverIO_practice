import { $, browser } from '@wdio/globals';
import { Key } from 'webdriverio';

type Direction = 'left' | 'right';

type SliderConfig = {
    min: number;
    max: number;
    step: number;
};

type SlideMethod = 'click' | 'keyboard';


class HorizontalSliderPage {
    // creating sliderConfig property to cache slider config and prevent unnecessary calls to its selector
    private sliderConfig?: SliderConfig;

    async open(): Promise<void> {
        await browser.url('/horizontal-slider');
    }

    private get range(): ChainablePromiseElement {
        return $('[id="range"]');
    }

    private get slider(): ChainablePromiseElement {
        return $('input[type="range"]');
    }

    private async getSliderConfig(): Promise<SliderConfig> {
        if (this.sliderConfig) {
            return this.sliderConfig;
        }

        const min = await this.slider.getAttribute('min');
        if (!min) throw new Error('Could not get min value from range');

        const max = await this.slider.getAttribute('max');
        if (!max) throw new Error('Could not get max value from range');

        const step = await this.slider.getAttribute('step');
        if (!step) throw new Error('Could not get step value from range');

        this.sliderConfig = {
            min: Number(min),
            max: Number(max),
            step: Number(step),
        };

        return this.sliderConfig;
    }

    async getRangeValue(): Promise<number> {
        await this.range.waitForDisplayed();
        return Number(await this.range.getText());
    }

    private async moveSliderViaKeyboard(direction: Direction): Promise<void> {
        switch (direction) {
            case 'left':
                await browser.keys(Key.ArrowLeft);
                return;

            case 'right':
                await browser.keys(Key.ArrowRight);
                return;
        }
    }

    // just for training purposes
    // would NEVER be used in real life because of its complexity, readability and flaky
    private async moveSliderViaClick(position: number): Promise<void> {
        const { min, max, step } = await this.getSliderConfig();
        const sliderWidth = (await this.slider.getSize()).width;
        const steps = Math.floor((max - min) / step);
        const stepWidth = Math.floor(sliderWidth / steps);

        const isCenterOnStep = (steps+1) % 2 !== 0;

        if (isCenterOnStep) {
            const centralStep = max / 2;

            const stepsNeeded = (position - centralStep) / step;
            const clickPosition = (stepsNeeded * stepWidth);

            await this.slider.click({x: clickPosition});
            return;
        }

        if(!isCenterOnStep) {
            const centralPosition = max / 2;

            const stepsNeeded = (position - centralPosition) / step;
            const clickPosition = Math.floor(stepsNeeded * stepWidth);

            await this.slider.click({x: clickPosition});
        }
    }

    private async positionValidator(position: number): Promise<void> {
        const { min, max, step } = await this.getSliderConfig();

        if (position < min || position > max) {
            throw new Error('Position is out of range');
        }

        if (position % step !== 0) {
            throw new Error(`Position must be a multiple of step (step == ${step})`);
        }
    }

    async moveSliderToPosition(position: number, slideMethod: SlideMethod): Promise<void> {
        await this.positionValidator(position);
        await this.slider.waitForDisplayed();

        await browser.execute((slider) => {
            slider.focus();
        }, await this.slider);

        if(slideMethod === 'click') {
            return this.moveSliderViaClick(position);
        }

        if(slideMethod == 'keyboard') {
            const currentPosition = await this.getRangeValue();
            const { step } = await this.getSliderConfig();
            const stepsToMove = Math.round((position - currentPosition) / step);

            const direction: Direction = stepsToMove > 0 ? 'right' : 'left';

            for (let i = 0; i < Math.abs(stepsToMove); i++) {
                await this.moveSliderViaKeyboard(direction);
            }
        }
    }
}

export default new HorizontalSliderPage();