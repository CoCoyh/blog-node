/* eslint valid-jsdoc: "off" */

'use strict';

/**
 * @param {Egg.EggAppInfo} appInfo app info
 */
module.exports = appInfo => {
  /**
   * built-in config
   * @type {Egg.EggAppConfig}
   **/
  const config = {
    env: appInfo.env,
    name: 'blog-node',
    debug: true,
  };
  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1565663966226_6746';

  // add your middleware config here
  config.middleware = [];

  // add your user config here
  const userConfig = {
    // myAppName: 'egg',
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
    database: '',
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

  return {
    ...config,
    ...userConfig,
  };
};
