import { browser } from '@wdio/globals'
import { $ } from '@wdio/globals'


class MainPageSelectors {
    protected get webInputs(): Promise<WebdriverIO.Element> {
        return $('[type="button"][href="/inputs"]');
    }

    protected get testLoginPage(): Promise<WebdriverIO.Element> {
        return $('[type="button"][href="/login"]');
    }

    protected get testRegisterInputs(): Promise<WebdriverIO.Element> {
        return $('[type="button"][href="/register"]');
    }

    protected get forgotPasswordForm(): Promise<WebdriverIO.Element> {
        return $('[type="button"][href="/forgot-password"]');
    }

    protected get oneTimePasswordForm(): Promise<WebdriverIO.Element> {
        return $('[type="button"][href="/otp-login"]');
    }

    protected get dynamicTable(): Promise<WebdriverIO.Element> {
        return $('[type="button"][href="/dynamic-table"]');
    }

    protected get dynamicPaginationTable(): Promise<WebdriverIO.Element> {
        return $('[type="button"][href="/dynamic-pagination-table"]');
    }

    protected get locatorsPage(): Promise<WebdriverIO.Element> {
        return $('[type="button"][href="/locators"]');
    }

    protected get myBrowserInformation(): Promise<WebdriverIO.Element> {
        return $('[type="button"][href="/my-browser"]');
    }

    protected get radioButtons(): Promise<WebdriverIO.Element> {
        return $('[type="button"][href="/radio-buttons"]');
    }

    protected get formValidation(): Promise<WebdriverIO.Element> {
        return $('[type="button"][href="/form-validation"]');
    }

    protected get fileUpload(): Promise<WebdriverIO.Element> {
        return $('[type="button"][href="/upload"]');
    }

    protected get fileDownloader(): Promise<WebdriverIO.Element> {
        return $('[type="button"][href="/download"]');
    }

    protected get addRemoveElements(): Promise<WebdriverIO.Element> {
        return $('[type="button"][href="/add-remove-elements"]');
    }

    protected get secureFileDownload(): Promise<WebdriverIO.Element> {
        return $('[type="button"][href="/download-secure"]');
    }

    protected get notificationMessage(): Promise<WebdriverIO.Element> {
        return $('[type="button"][href="/notification-message"]');
    }

    protected get autocomplete(): Promise<WebdriverIO.Element> {
        return $('[type="button"][href="/autocomplete"]');
    }

    protected get cypressSpiesStubsClocks(): Promise<WebdriverIO.Element> {
        return $('[type="button"][href="/spies-stubs-clocks"]');
    }

    protected get challengingDom(): Promise<WebdriverIO.Element> {
        return $('[type="button"][href="/challenging-dom"]');
    }

    protected get largeDeepDOM(): Promise<WebdriverIO.Element> {
        return $('[type="button"][href="/large"]');
    }

    protected get shadowDOM(): Promise<WebdriverIO.Element> {
        return $('[type="button"][href="/shadowdom"]');
    }

    protected get typos(): Promise<WebdriverIO.Element> {
        return $('[type="button"][href="/typos"]');
    }

    protected get myIPAddress(): Promise<WebdriverIO.Element> {
        return $('[type="button"][href="/my-ip"]');
    }

    protected get brokenImages(): Promise<WebdriverIO.Element> {
        return $('[type="button"][href="/broken-images"]');
    }

    protected get infiniteScroll(): Promise<WebdriverIO.Element> {
        return $('[type="button"][href="/infinite-scroll"]');
    }

    protected get slowResources(): Promise<WebdriverIO.Element> {
        return $('[type="button"][href="/slow"]');
    }

    protected get javaScriptDialogs(): Promise<WebdriverIO.Element> {
        return $('[type="button"][href="/js-dialogs"]');
    }

    protected get javaScriptError(): Promise<WebdriverIO.Element> {
        return $('[type="button"][href="/javascript-error"]');
    }

    protected get jQueryUI(): Promise<WebdriverIO.Element> {
        return $('[type="button"][href="/jqueryui/menu"]');
    }

    protected get abTesting(): Promise<WebdriverIO.Element> {
        return $('[type="button"][href="/abtest"]');
    }

    protected get checkBoxes(): Promise<WebdriverIO.Element> {
        return $('[type="button"][href="/checkboxes"]');
    }

    protected get contextMenu(): Promise<WebdriverIO.Element> {
        return $('[type="button"][href="/context-menu"]');
    }

    protected get keyPresses(): Promise<WebdriverIO.Element> {
        return $('[type="button"][href="/key-presses"]');
    }

    protected get disappearingElements(): Promise<WebdriverIO.Element> {
        return $('[type="button"][href="/disappearing-elements"]');
    }

    protected get dropdownList(): Promise<WebdriverIO.Element> {
        return $('[type="button"][href="/dropdown"]');
    }

    protected get redirectLink(): Promise<WebdriverIO.Element> {
        return $('[type="button"][href="/redirector"]');
    }

    protected get dragAndDrop(): Promise<WebdriverIO.Element> {
        return $('[type="button"][href="/drag-and-drop"]');
    }

    protected get dragAndDropCircles(): Promise<WebdriverIO.Element> {
        return $('[type="button"][href="/drag-and-drop-circles"]');
    }

    protected get horizontalSlider(): Promise<WebdriverIO.Element> {
        return $('[type="button"][href="/horizontal-slider"]');
    }

    protected get geolocation(): Promise<WebdriverIO.Element> {
        return $('[type="button"][href="/geolocation"]');
    }

    protected get hovers(): Promise<WebdriverIO.Element> {
        return $('[type="button"][href="/hovers"]');
    }

    protected get floatingMenu(): Promise<WebdriverIO.Element> {
        return $('[type="button"][href="/floating-menu"]');
    }

    protected get iFrame(): Promise<WebdriverIO.Element> {
        return $('[type="button"][href="/iframe"]');
    }

    protected get multipleWindows(): Promise<WebdriverIO.Element> {
        return $('[type="button"][href="/windows"]');
    }

    protected get sortableDataTables(): Promise<WebdriverIO.Element> {
        return $('[type="button"][href="/tables"]');
    }

    protected get tooltips(): Promise<WebdriverIO.Element> {
        return $('[type="button"][href="/tooltips"]');
    }

    protected get dynamicContent(): Promise<WebdriverIO.Element> {
        return $('[type="button"][href="/dynamic-content"]');
    }

    protected get dynamicControls(): Promise<WebdriverIO.Element> {
        return $('[type="button"][href="/dynamic-controls"]');
    }

    protected get dynamicLoading(): Promise<WebdriverIO.Element> {
        return $('[type="button"][href="/dynamic-loading"]');
    }

    protected get shiftingContent(): Promise<WebdriverIO.Element> {
        return $('[type="button"][href="/shifting-content"]');
    }

    protected get httpStatusCodes(): Promise<WebdriverIO.Element> {
        return $('[type="button"][href="/status-codes"]');
    }

    protected get dynamicID(): Promise<WebdriverIO.Element> {
        return $('[type="button"][href="/dynamic-id"]');
    }

    protected get entryAd(): Promise<WebdriverIO.Element> {
        return $('[type="button"][href="/entry-ad"]');
    }

    protected get exitIntent(): Promise<WebdriverIO.Element> {
        return $('[type="button"][href="/exit-intent"]');
    }

    protected get contactUs(): Promise<WebdriverIO.Element> {
        return $('[type="button"][href="/contact"]');
    }

    protected get googleTrackingEvents(): Promise<WebdriverIO.Element> {
        return $('[type="button"][href="/google-tracking-events"]');
    }

    protected get sampleUserProfile(): Promise<WebdriverIO.Element> {
        return $('[type="button"][href="/users/1"]');
    }

    protected get sampleFeedbackpage(): Promise<WebdriverIO.Element> {
        return $('[type="button"][href="/feedback"]');
    }

    protected get scrollbars(): Promise<WebdriverIO.Element> {
        return $('[type="button"][href="/scrollbars"]');
    }

    protected get cookieConsentAlert(): Promise<WebdriverIO.Element> {
        return $('[type="button"][href="/cookie-alert"]');
    }

    protected get httpHeaders(): Promise<WebdriverIO.Element> {
        return $('[type="button"][href="/http-headers"]');
    }

    protected get checkConsoleLogs(): Promise<WebdriverIO.Element> {
        return $('[type="button"][href="/console-logs"]');
    }

    protected get oAuthProviders(): Promise<WebdriverIO.Element> {
        return $('[type="button"][href="/notes/app/login"]');
    }

    protected get basicAuthentication(): Promise<WebdriverIO.Element> {
        return $('[type="button"][href="/basic-auth"]');
    }

    protected get digestAuthentication(): Promise<WebdriverIO.Element> {
        return $('[type="button"][href="/digest-auth"]');
    }

    protected get randomNumber(): Promise<WebdriverIO.Element> {
        return $('[type="button"][href="/random-number"]');
    }

    protected get flakyTestPage(): Promise<WebdriverIO.Element> {
        return $('[type="button"][href="/flaky-test"]');
    }

    protected get aboutPage(): Promise<WebdriverIO.Element> {
        return $('[type="button"][href="/about"]');
    }

}

class MainPage extends MainPageSelectors {
    async open(): Promise<void> {
        await browser.url('/');
    }

    async clickWebInputs(): Promise<void> {
        await (await this.webInputs).waitForDisplayed();
        await (await this.webInputs).scrollIntoView();
        await (await this.webInputs).click();
    }

    async clickTestLoginPage(): Promise<void> {
        await (await this.testLoginPage).waitForDisplayed();
        await (await this.testLoginPage).scrollIntoView();
        await (await this.testLoginPage).click();
    }

    async clickTestRegisterInputs(): Promise<void> {
        await (await this.testRegisterInputs).waitForDisplayed();
        await (await this.testRegisterInputs).scrollIntoView();
        await (await this.testRegisterInputs).click();
    }

    async clickForgotPasswordForm(): Promise<void> {
        await (await this.forgotPasswordForm).waitForDisplayed();
        await (await this.forgotPasswordForm).scrollIntoView();
        await (await this.forgotPasswordForm).click();
    }

    async clickOneTimePasswordForm(): Promise<void> {
        await (await this.oneTimePasswordForm).waitForDisplayed();
        await (await this.oneTimePasswordForm).scrollIntoView();
        await (await this.oneTimePasswordForm).click();
    }

    async clickDynamicTable(): Promise<void> {
        await (await this.dynamicTable).waitForDisplayed();
        await (await this.dynamicTable).scrollIntoView();
        await (await this.dynamicTable).click();
    }

    async clickDynamicPaginationTable(): Promise<void> {
        await (await this.dynamicPaginationTable).waitForDisplayed();
        await (await this.dynamicPaginationTable).scrollIntoView();
        await (await this.dynamicPaginationTable).click();
    }

    async clickLocatorsPage(): Promise<void> {
        await (await this.locatorsPage).waitForDisplayed();
        await (await this.locatorsPage).scrollIntoView();
        await (await this.locatorsPage).click();
    }

    async clickMyBrowserInformation(): Promise<void> {
        await (await this.myBrowserInformation).waitForDisplayed();
        await (await this.myBrowserInformation).scrollIntoView();
        await (await this.myBrowserInformation).click();
    }

    async clickRadioButtons(): Promise<void> {
        await (await this.radioButtons).waitForDisplayed();
        await (await this.radioButtons).scrollIntoView();
        await (await this.radioButtons).click();
    }

    async clickFormValidation(): Promise<void> {
        await (await this.formValidation).waitForDisplayed();
        await (await this.formValidation).scrollIntoView();
        await (await this.formValidation).click();
    }

    async clickFileUpload(): Promise<void> {
        await (await this.fileUpload).waitForDisplayed();
        await (await this.fileUpload).scrollIntoView();
        await (await this.fileUpload).click();
    }

    async clickFileDownloader(): Promise<void> {
        await (await this.fileDownloader).waitForDisplayed();
        await (await this.fileDownloader).scrollIntoView();
        await (await this.fileDownloader).click();
    }

    async clickAddRemoveElements(): Promise<void> {
        await (await this.addRemoveElements).waitForDisplayed();
        await (await this.addRemoveElements).scrollIntoView();
        await (await this.addRemoveElements).click();
    }

    async clickSecureFileDownload(): Promise<void> {
        await (await this.secureFileDownload).waitForDisplayed();
        await (await this.secureFileDownload).scrollIntoView();
        await (await this.secureFileDownload).click();
    }

    async clickNotificationMessage(): Promise<void> {
        await (await this.notificationMessage).waitForDisplayed();
        await (await this.notificationMessage).scrollIntoView();
        await (await this.notificationMessage).click();
    }

    async clickAutocomplete(): Promise<void> {
        await (await this.autocomplete).waitForDisplayed();
        await (await this.autocomplete).scrollIntoView();
        await (await this.autocomplete).click();
    }

    async clickCypressSpiesStubsClocks(): Promise<void> {
        await (await this.cypressSpiesStubsClocks).waitForDisplayed();
        await (await this.cypressSpiesStubsClocks).scrollIntoView();
        await (await this.cypressSpiesStubsClocks).click();
    }

    async clickChallengingDom(): Promise<void> {
        await (await this.challengingDom).waitForDisplayed();
        await (await this.challengingDom).scrollIntoView();
        await (await this.challengingDom).click();
    }

    async clickLargeDeepDOM(): Promise<void> {
        await (await this.largeDeepDOM).waitForDisplayed();
        await (await this.largeDeepDOM).scrollIntoView();
        await (await this.largeDeepDOM).click();
    }

    async clickShadowDOM(): Promise<void> {
        await (await this.shadowDOM).waitForDisplayed();
        await (await this.shadowDOM).scrollIntoView();
        await (await this.shadowDOM).click();
    }

    async clickTypos(): Promise<void> {
        await (await this.typos).waitForDisplayed();
        await (await this.typos).scrollIntoView();
        await (await this.typos).click();
    }

    async clickMyIPAddress(): Promise<void> {
        await (await this.myIPAddress).waitForDisplayed();
        await (await this.myIPAddress).scrollIntoView();
        await (await this.myIPAddress).click();
    }

    async clickBrokenImages(): Promise<void> {
        await (await this.brokenImages).waitForDisplayed();
        await (await this.brokenImages).scrollIntoView();
        await (await this.brokenImages).click();
    }

    async clickInfiniteScroll(): Promise<void> {
        await (await this.infiniteScroll).waitForDisplayed();
        await (await this.infiniteScroll).scrollIntoView();
        await (await this.infiniteScroll).click();
    }

    async clickSlowResources(): Promise<void> {
        await (await this.slowResources).waitForDisplayed();
        await (await this.slowResources).scrollIntoView();
        await (await this.slowResources).click();
    }

    async clickJavaScriptDialogs(): Promise<void> {
        await (await this.javaScriptDialogs).waitForDisplayed();
        await (await this.javaScriptDialogs).scrollIntoView();
        await (await this.javaScriptDialogs).click();
    }

    async clickJavaScriptError(): Promise<void> {
        await (await this.javaScriptError).waitForDisplayed();
        await (await this.javaScriptError).scrollIntoView();
        await (await this.javaScriptError).click();
    }

    async clickJQueryUI(): Promise<void> {
        await (await this.jQueryUI).waitForDisplayed();
        await (await this.jQueryUI).scrollIntoView();
        await (await this.jQueryUI).click();
    }

    async clickAbTesting(): Promise<void> {
        await (await this.abTesting).waitForDisplayed();
        await (await this.abTesting).scrollIntoView();
        await (await this.abTesting).click();
    }

    async clickCheckBoxes(): Promise<void> {
        await (await this.checkBoxes).waitForDisplayed();
        await (await this.checkBoxes).scrollIntoView();
        await (await this.checkBoxes).click();
    }

    async clickContextMenu(): Promise<void> {
        await (await this.contextMenu).waitForDisplayed();
        await (await this.contextMenu).scrollIntoView();
        await (await this.contextMenu).click();
    }

    async clickKeyPresses(): Promise<void> {
        await (await this.keyPresses).waitForDisplayed();
        await (await this.keyPresses).scrollIntoView();
        await (await this.keyPresses).click();
    }

    async clickDisappearingElements(): Promise<void> {
        await (await this.disappearingElements).waitForDisplayed();
        await (await this.disappearingElements).scrollIntoView();
        await (await this.disappearingElements).click();
    }

    async clickDropdownList(): Promise<void> {
        await (await this.dropdownList).waitForDisplayed();
        await (await this.dropdownList).scrollIntoView();
        await (await this.dropdownList).click();
    }

    async clickRedirectLink(): Promise<void> {
        await (await this.redirectLink).waitForDisplayed();
        await (await this.redirectLink).scrollIntoView();
        await (await this.redirectLink).click();
    }

    async clickDragAndDrop(): Promise<void> {
        await (await this.dragAndDrop).waitForDisplayed();
        await (await this.dragAndDrop).scrollIntoView();
        await (await this.dragAndDrop).click();
    }

    async clickDragAndDropCircles(): Promise<void> {
        await (await this.dragAndDropCircles).waitForDisplayed();
        await (await this.dragAndDropCircles).scrollIntoView();
        await (await this.dragAndDropCircles).click();
    }

    async clickHorizontalSlider(): Promise<void> {
        await (await this.horizontalSlider).waitForDisplayed();
        await (await this.horizontalSlider).scrollIntoView();
        await (await this.horizontalSlider).click();
    }

    async clickGeolocation(): Promise<void> {
        await (await this.geolocation).waitForDisplayed();
        await (await this.geolocation).scrollIntoView();
        await (await this.geolocation).click();
    }

    async clickHovers(): Promise<void> {
        await (await this.hovers).waitForDisplayed();
        await (await this.hovers).scrollIntoView();
        await (await this.hovers).click();
    }

    async clickFloatingMenu(): Promise<void> {
        await (await this.floatingMenu).waitForDisplayed();
        await (await this.floatingMenu).scrollIntoView();
        await (await this.floatingMenu).click();
    }

    async clickIFrame(): Promise<void> {
        await (await this.iFrame).waitForDisplayed();
        await (await this.iFrame).scrollIntoView();
        await (await this.iFrame).click();
    }

    async clickMultipleWindows(): Promise<void> {
        await (await this.multipleWindows).waitForDisplayed();
        await (await this.multipleWindows).scrollIntoView();
        await (await this.multipleWindows).click();
    }

    async clickSortableDataTables(): Promise<void> {
        await (await this.sortableDataTables).waitForDisplayed();
        await (await this.sortableDataTables).scrollIntoView();
        await (await this.sortableDataTables).click();
    }

    async clickTooltips(): Promise<void> {
        await (await this.tooltips).waitForDisplayed();
        await (await this.tooltips).scrollIntoView();
        await (await this.tooltips).click();
    }

    async clickDynamicContent(): Promise<void> {
        await (await this.dynamicContent).waitForDisplayed();
        await (await this.dynamicContent).scrollIntoView();
        await (await this.dynamicContent).click();
    }

    async clickDynamicControls(): Promise<void> {
        await (await this.dynamicControls).waitForDisplayed();
        await (await this.dynamicControls).scrollIntoView();
        await (await this.dynamicControls).click();
    }

    async clickDynamicLoading(): Promise<void> {
        await (await this.dynamicLoading).waitForDisplayed();
        await (await this.dynamicLoading).scrollIntoView();
        await (await this.dynamicLoading).click();
    }

    async clickShiftingContent(): Promise<void> {
        await (await this.shiftingContent).waitForDisplayed();
        await (await this.shiftingContent).scrollIntoView();
        await (await this.shiftingContent).click();
    }

    async clickHttpStatusCodes(): Promise<void> {
        await (await this.httpStatusCodes).waitForDisplayed();
        await (await this.httpStatusCodes).scrollIntoView();
        await (await this.httpStatusCodes).click();
    }

    async clickDynamicID(): Promise<void> {
        await (await this.dynamicID).waitForDisplayed();
        await (await this.dynamicID).scrollIntoView();
        await (await this.dynamicID).click();
    }

    async clickEntryAd(): Promise<void> {
        await (await this.entryAd).waitForDisplayed();
        await (await this.entryAd).scrollIntoView();
        await (await this.entryAd).click();
    }

    async clickExitIntent(): Promise<void> {
        await (await this.exitIntent).waitForDisplayed();
        await (await this.exitIntent).scrollIntoView();
        await (await this.exitIntent).click();
    }

    async clickContactUs(): Promise<void> {
        await (await this.contactUs).waitForDisplayed();
        await (await this.contactUs).scrollIntoView();
        await (await this.contactUs).click();
    }

    async clickGoogleTrackingEvents(): Promise<void> {
        await (await this.googleTrackingEvents).waitForDisplayed();
        await (await this.googleTrackingEvents).scrollIntoView();
        await (await this.googleTrackingEvents).click();
    }

    async clickSampleUserProfile(): Promise<void> {
        await (await this.sampleUserProfile).waitForDisplayed();
        await (await this.sampleUserProfile).scrollIntoView();
        await (await this.sampleUserProfile).click();
    }

    async clickSampleFeedbackpage(): Promise<void> {
        await (await this.sampleFeedbackpage).waitForDisplayed();
        await (await this.sampleFeedbackpage).scrollIntoView();
        await (await this.sampleFeedbackpage).click();
    }

    async clickScrollbars(): Promise<void> {
        await (await this.scrollbars).waitForDisplayed();
        await (await this.scrollbars).scrollIntoView();
        await (await this.scrollbars).click();
    }

    async clickCookieConsentAlert(): Promise<void> {
        await (await this.cookieConsentAlert).waitForDisplayed();
        await (await this.cookieConsentAlert).scrollIntoView();
        await (await this.cookieConsentAlert).click();
    }

    async clickHttpHeaders(): Promise<void> {
        await (await this.httpHeaders).waitForDisplayed();
        await (await this.httpHeaders).scrollIntoView();
        await (await this.httpHeaders).click();
    }

    async clickCheckConsoleLogs(): Promise<void> {
        await (await this.checkConsoleLogs).waitForDisplayed();
        await (await this.checkConsoleLogs).scrollIntoView();
        await (await this.checkConsoleLogs).click();
    }

    async clickOAuthProviders(): Promise<void> {
        await (await this.oAuthProviders).waitForDisplayed();
        await (await this.oAuthProviders).scrollIntoView();
        await (await this.oAuthProviders).click();
    }

    async clickBasicAuthentication(): Promise<void> {
        await (await this.basicAuthentication).waitForDisplayed();
        await (await this.basicAuthentication).scrollIntoView();
        await (await this.basicAuthentication).click();
    }

    async clickDigestAuthentication(): Promise<void> {
        await (await this.digestAuthentication).waitForDisplayed();
        await (await this.digestAuthentication).scrollIntoView();
        await (await this.digestAuthentication).click();
    }

    async clickRandomNumber(): Promise<void> {
        await (await this.randomNumber).waitForDisplayed();
        await (await this.randomNumber).scrollIntoView();
        await (await this.randomNumber).click();
    }

    async clickFlakyTestPage(): Promise<void> {
        await (await this.flakyTestPage).waitForDisplayed();
        await (await this.flakyTestPage).scrollIntoView();
        await (await this.flakyTestPage).click();
    }

    async clickAboutPage(): Promise<void> {
        await (await this.aboutPage).waitForDisplayed();
        await (await this.aboutPage).scrollIntoView();
        await (await this.aboutPage).click();
    }
}

export default new MainPage();
