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
  const config = exports = {};

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1608082332264_8040';

  // add your middleware config here
  config.middleware = [
    'errorHandler',
  ];

  // add your user config here
  const userConfig = {
    // myAppName: 'egg',
  };

  config.mongoose = {
    url: 'mongodb://127.0.0.1:27017/egg_x',
    options: {
    // useMongoClient: true,
      useUnifiedTopology: true,
      autoReconnect: true,
      reconnectTries: Number.MAX_VALUE,
      bufferMaxEntries: 0,
    },
  };
  config.swaggerdoc = {
    dirScanner: './app/controller',
    apiInfo: {
      title: '开课吧接口',
      description: '开课吧接口 swagger-ui for egg',
      version: '1.0.0',
    },
    schemes: [ 'http', 'https' ],
    consumes: [ 'application/json' ],
    produces: [ 'application/json' ],
    enableSecurity: false,
    // enableValidate:true,//有问题
    routerMap: true,
    enable: true,
  };

  config.jwt = {
    secret: 'Great4-M',
    enable: true,
    match: /^\/api/,
  };

  return {
    ...config,
    ...userConfig,
  };
};
