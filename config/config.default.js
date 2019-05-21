'use strict';

const path = require('path');

module.exports = (appInfo) => {
  const config = {
    env: appInfo.env,
    name: 'device-server',
    keys: 'my-cookie-secret-key',
    debug: true,
  };
  config.logger = {
    outputJSON: true,
    level: 'DEBUG',
    consoleLevel: 'DEBUG',
  };
  config.sequelize = {
    host: '',
    port: 3306,
    user: 'root',
    password: '',
    database: 'device_server',
    dialect: 'mysql',
    operatorsAliases: false,
    timezone: '+08:00',
    pool: {
      max: 10,
      min: 0,
      acquire: 30000,
      idle: 1000,
      connectionLimit: 10,
      dateStrings: true,
    },
  };
  config.redis = {
    // eslint-disable-next-line global-require
    Redis: require('ioredis'),
    client: {
      port: 6379,
      host: '127.0.0.1',
      password: '',
      db: 0,
    },
  };
  config.middleware = ['auth', 'responseFormat'];
  config.bodyParser = {
    enableTypes: ['json', 'form'],
    formLimit: '2mb',
    jsonLimit: '3mb',
  };
  config.joi = {
    options: {},
    locale: {
      'zh-cn': {},
    },
    // 校验出错时是否自动抛出错误
    throw: true,
    // throw为true时对抛出的错误做格式化处理
    throwHandle: (error) => error,
    // throw为false时错误会作为结果返回， 默认{error, value}，此函数可以对错误做格式化
    errorHandle: (error) => error,
    // 对返回结果做处理的函数，默认返回结果{ error, value }
    resultHandle: (result) => result,
  };
  config.security = {
    csrf: {
      enable: false,
    },
  };
  return config;
};
