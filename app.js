'use strict';
const path = require('path');

class AppBootHook {
  constructor(app) {
    this.app = app;
  }

  async willReady() {
    // 执行定时任务
    // await this.app.runSchedule('pk');
    const validatePath = path.join(this.app.config.baseDir, 'app/validate');
    this.app.loader.loadToApp(validatePath, 'validate');
  }

  async serverDidReady() {
    this.app.logger.debug('debug info');
    this.app.logger.info(`============= env: ${this.app.config.env} =============`);
    
    // 错误捕获
    this.app.on('error', err => {
      this.app.logger.error('catch sys with err', err);
    });
  }
}

module.exports = AppBootHook;
