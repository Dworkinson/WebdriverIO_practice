import { $, browser } from '@wdio/globals';


class FloatingMenuPage {
     async open(): Promise<void> {
         await browser.url('/floating-menu');
     }

     private get menu(): ChainablePromiseElement {
         return $('[id="menu"]');
     }

     async isMenuVisible(): Promise<boolean> {
         return await this.menu.isDisplayed({withinViewport: true});
     }

     async getPageHeight(): Promise<number> {
         const height =  await browser.execute(() => {
             return document.body.scrollHeight;
         })
         console.log('height: ', height);
         return height;
     }

     async scrollTo(destination: number): Promise<void> {
         await browser.execute((destination) => {
             window.scroll({
                 top: destination,
                 behavior: 'instant',
             });
         }, destination);
     }
}

export default new FloatingMenuPage();
