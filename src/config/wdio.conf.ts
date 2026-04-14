import type { Options } from '@wdio/types'
export const config: Options.Testrunner = {
    runner: 'local',
    autoCompileOpts: {
        autoCompile: true,
        tsNodeOpts: {
            project: './tsconfig.json',
            transpileOnly: true
        }
    },
    rootDir: ".",
    specs: [
        './src/specs/**/*.spec.ts'
    ],
    exclude: [
    ],
    maxInstances: 10,
    services: ['chromedriver'],
    capabilities: [{
        browserName: 'chrome',
        'goog:chromeOptions': {
            args: [
                '--disable-background-networking',
                '--disable-sync',
                '--disable-extensions'
            ],
        }
    }],

    logLevel: 'error',
    bail: 0,
    waitforTimeout: 10000,
    connectionRetryTimeout: 120000,
    connectionRetryCount: 3,
    framework: 'mocha',
    
    reporters: ['spec'],

    mochaOpts: {
        ui: 'bdd',
        timeout: 60000
    },
}
