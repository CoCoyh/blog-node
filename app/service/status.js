'use strict';

const { Service } = require('egg');
const hmacsha1 = require('hmacsha1');

class StatusService extends Service {
  async checkMysql() {
    const { ctx } = this;
    const SQL_CHECK = 'show tables;';
    const data = await ctx.model.query(SQL_CHECK);
    return data;
  }
}

module.exports = StatusService;
