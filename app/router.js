'use strict';

module.exports = (app) => {
  const { router, controller } = app;
  // 健康检查
  router.get('/status', controller.status.check);
  router.get('/check_mysql', controller.status.checkMysql);

  // example
  router.get('/test', controller.status.checkMysql);
};
