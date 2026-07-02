import { $, browser } from '@wdio/globals';

const colors = {
    red:    [255,   0,      0,      255],
    green:  [0,     255,    0,      255],
    blue:   [0,     0,      255,    255],
    pink:   [255,   20,     147,    255],
    black:  [0,     0,      0,      255],
    brown:  [165,   42,     42,     255],
    maroon: [176,   48,     96,     255],
    purple: [160,   32,     240,    255],
    gray:   [190,   190,    190,    255],
    yellow: [255,   255,    0,      255],
    orange: [255,   165,    0,      255],
    violet: [238,   130,    238,    255],
    white:  [255,   255,    255,    255]
} as Record<string, number[]>;

const point = {
    1: [150,50],
    2: [100,50],
    3: [50,50],
    4: [50,150],
    5: [100,150],
    6: [150,150],
} as Record<string, number[]>;

type WheelStep = number;
type Duration = number;

type Rotation = [WheelStep, Duration];


class WheelGame {
    async open(): Promise<void> {
        await browser.url('/color-wheel');
    }

    private get playBtn(): ChainablePromiseElement {
        return $('[id="playBtn"]');
    }

    private get resetBtn(): ChainablePromiseElement {
        return $('[id="resetBtn"]');
    }

    private get result(): ChainablePromiseElement {
        return $('[id="result"]');
    }

    private get wheel(): ChainablePromiseElement {
        return $('canvas[id="picker"]');
    }

    async getWheelRotation(): Promise<Rotation> {
        const style = await this.wheel.getAttribute('style');
        if (!style) throw new Error('could not get canvas style');
        const styles = Object.fromEntries(
            style
                //trim last ";"
                .replace(/;+$/, '')
                .split(';')
                .map((_style) => _style.split(': '))
        );
        if (!styles["-webkit-transition-duration"]) throw new Error('could not get rotation duration');
        const duration = Number(/(\d+(?:\.\d+)?)s/.exec(styles["-webkit-transition-duration"])?.[1]);
        const deg = Number(/rotate\((\d+)deg\)/.exec(styles["-webkit-transform"])?.[1]);
        // white box - got from source code
        const steps = Math.ceil(((deg + 90) % 360) / (60));
        return [steps, duration];
    }

    async isResultDisplayed(): Promise<boolean> {
        return Boolean(await this.result.getText());
    }

    async play(): Promise<void> {
        await this.playBtn.scrollIntoView();
        await this.playBtn.click();
        await browser.pause((await this.getWheelRotation())[1] * 1000);

        const color = await this.getColor();
        await this.clickColorBtn(color);
    }

    async reset(): Promise<void> {
        await this.resetBtn.scrollIntoView();
        await this.resetBtn.click();
    }

    async getColor(): Promise<any> {
        const step = (await this.getWheelRotation())[0];
        const _point = point[`${step}`];

        const rgba: number[] = await browser.execute((x, y) => {
            const canvas = document.querySelector('canvas');
            if(!canvas) throw new Error('canvas not found');

            const ctx = canvas.getContext('2d');
            if(!ctx) throw new Error('attr not found');

            return Array.from(ctx.getImageData(x, y, 1, 1).data);
        }, ..._point);

        return Object.entries(colors).find(([, value]) =>
            value.every((item, index) => item === rgba[index])
        )?.[0];
    }

    async clickColorBtn(color: string): Promise<void> {
        //language=XPath
        const colorBtn = $(`//*[contains(text(), "${color}")]`);
        await colorBtn.scrollIntoView();
        await colorBtn.click();
    }
}

export default new WheelGame();
