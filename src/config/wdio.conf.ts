import dotenv from 'dotenv';
import minimist from 'minimist';
import path from "path";
import fs from 'fs';

const env = minimist(process.argv).ENV || '.env.example';
dotenv.config({ path: env })


const downloadDir = path.resolve(process.cwd(), 'tmp')

if (!fs.existsSync(downloadDir)) {
    fs.mkdirSync(downloadDir, { recursive: true })
}

export const config: WebdriverIO.Config = {
    runner: 'local',
    tsConfigPath: './tsconfig.json',
    rootDir: '.',
    specs: [
        './src/specs/**/*.spec.ts'
    ],
    baseUrl: process.env.BASE_URL,
    exclude: [
    ],
    maxInstances: 10,
    capabilities: [{
        webSocketUrl: false,
        browserName: 'chrome',
        pageLoadStrategy: "normal",
        'goog:chromeOptions': {
            args: [
                '--disable-background-networking',
                '--disable-sync',
                '--disable-extensions',
                '--lang=en-US'
            ],
            prefs: {
                // preventing "weak password" warning
                'profile.password_manager_leak_detection': false,
                // downloading prefs
                'download.default_directory': downloadDir,
                'download.prompt_for_download': false,
                'download.directory_upgrade': true,
                'safebrowsing.enabled': true
            }
        }
    }],

    logLevel: 'error',
    bail: 0,
    waitforTimeout: 10000,
    connectionRetryTimeout: 120000,
    connectionRetryCount: 3,
    framework: 'mocha',
    
    reporters: ['spec',
        // [
        //     'allure',
        //     {
        //         outputDir: 'allure-results',
        //         disableWebdriverStepsReporting: true,
        //         disableMochaHooks: true
        //     }
        // ]
    ],

    mochaOpts: {
        ui: 'bdd',
        timeout: 60000
    },

    async before() {
        (await browser.mock('*ads*')).abort()
    }
}
