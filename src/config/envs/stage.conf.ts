import 'tsconfig-paths/register';
import {config} from '@config/wdio.conf';

config.baseUrl = 'https://practice.expandtesting.com';

exports.config = config;
