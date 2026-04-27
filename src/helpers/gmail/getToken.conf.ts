import {config} from '../../config/wdio.conf';

config.services = [['chromedriver', {
    port: 9515,
    hostname: "localhost"
}]];

config.capabilities = [{
    browserName: 'chrome',
    "goog:chromeOptions": {
        args: ['--start-maximized'],
    }
}];

config.reporters = [
]

config.logLevel = 'error';

exports.config = config;