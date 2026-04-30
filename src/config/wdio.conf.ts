import type { Options } from '@wdio/types'

import 'tsconfig-paths/register';

import dotenv from 'dotenv';
import minimist from 'minimist';
const env = minimist(process.argv).ENV || '.env.example';
dotenv.config({ path: env })

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
    baseUrl: process.env.BASE_URL,
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
            prefs: {
                // preventing "weak password" warning
                'profile.password_manager_leak_detection': false            }
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
