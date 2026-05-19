/**
 * Custom waiter for a function returning its result.
 *
 * @param {Function} func - function you want to wait for a result.
 * @param {any[]} args - optional arguments for function.
 * @param {number} timeout - waiting timeout in milliseconds.
 * @param {number} interval - interval (delay) to check in milliseconds.
 */
/**
 * Custom waiter for a function returning its result.
 *
 * @param func - function you want to wait for a result.
 * @param args - optional arguments for function.
 * @param timeout - waiting timeout in milliseconds.
 * @param interval - interval (delay) to check in milliseconds.
 */
async function waitForResult<T>(
    func: (...args: any[]) => T | Promise<T>,
    args: any[] = [],
    timeout: number = 10000,
    interval: number = 500
): Promise<T> {
    const startTime = Date.now();

    while (Date.now() - startTime < timeout) {
        const result = await func(...args);
        if (result) {
            return result;
        }

        await new Promise(resolve => setTimeout(resolve, interval));
    }

    throw new Error(`${func.name} still hasn't returned result.`);
}

export { waitForResult };