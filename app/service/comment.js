'use strict';
const { Service } = require('egg');
const pre = 'service.comment';

class CommentService extends Service {
  /**
   * 添加评论（父级和自己评论，需要区分处理）
   */
  async addComment(params) {
    const { ctx } = this;
    try {
      const { article_id, user_id, content } = params;
      
    } catch(e) {
      ctx.logger.error(`[${pre}.addComment]: ${e}`);
      throw new Error(e);
    }
  }

  /**
   * 更新评论（）
   */
  async updateComment(params) {
    const { ctx } = this;
    try {

    } catch (e) {
      ctx.logger.error(`[${pre}.updateComment]: ${e}`);
      throw new Error(e);
    }
  }

  /**
   * 获取评论列表
   */
  async getCommentList(params) {
    const { ctx } = this;
    try {

    } catch (e) {
      ctx.logger.error(`[${pre}.getCommentList]: ${e}`);
      throw new Error(e);
    }
  }
}

module.exports = CommentService;