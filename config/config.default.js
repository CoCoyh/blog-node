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
  config.middleware = [ 'auth', 'responseFormat' ];

  // add your user config here
  const userConfig = {
    // myAppName: 'egg',
  };

  config.logger = {
    outputJSON: true,
    level: 'DEBUG',
    consoleLevel: 'DEBUG',
  };

  config.security = {
    csrf: false,
  };

  config.mongoose = {
    client: {
      url: "mongodb://127.0.0.1:27017/blog",
      options: {
      //   auth: { authSource: "admin" },
      //   user: "",
      //   pass: "",
      },
      // plugins: [],
    }
  }

  config.session = {
    key: 'SID',
    maxAge: 5 * 60 * 1000,
    renew: true,
    httpOnly: true,
    encrypt: true,
  }

  config.validate = {
    convert: true,
  }

  /**
   * 获取GitHub用户信息URL
   * eg: https://api.github.com/user?access_token=****&scope=&token_type=bearer
   */
  config.github = {
    username: 'CoCoyh',
    url: 'https://github.com',
    oauth: '/login/oauth/authorize',
    access_token: '/login/oauth/access_token',
    user: '/user',
    redirect_url: "http://localhost:3001/login",
    client_id: "502176cec65773057a9e",
    client_secret: "65d444de381a026301a2c7cffb6952b9a86ac235",
  }

  config.auth = {
    ignore: '/login'
  }

  return {
    ...config,
    ...userConfig,
  };
};
