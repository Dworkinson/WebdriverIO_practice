/**
 * Custom waiter for a function returning its result.
 *
 * @param {Function} func - function you want to wait for a result.
 * @param {any[]} args - optional arguments for function.
 * @param {number} timeout - waiting timeout in milliseconds.
 * @param {number} interval - interval (delay) to check in milliseconds.
 */
async function waitForResult(
    func: Function,
    args?: any[],
    timeout: number = 10000,
    interval: number = 500

):Promise<any> {
    const _timeout = setTimeout(async () => {
        throw new Error(`${func.name} still hasn't returned result.`);
    }, timeout);

    let result;
    do {
        result = await func.apply(null, args);
        setTimeout(() => {
        }, interval);
    } while (!result);
    clearTimeout(_timeout);
    return result;
}

export { waitForResult }
