export async function adBlocker(): Promise<void> {
    const mock = await browser.mock('*ads*');
    mock.abort();
}
