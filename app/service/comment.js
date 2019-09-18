'use strict';
const { Service } = require('egg');
const pre = 'service.comment';

class CommentService extends Service {
  /**
   * 添加评论(父级)
   */
  async addComment(params) {
    const { ctx } = this;
    try {
      const { article_id, content } = params;
      const userId = ctx.state.userId;  
      const commentData = {
        articles: article_id,
        content,
        user: userId,
      };
      const article = await ctx.model.Article.findById(article_id);
      const comment = ctx.model.Comment(commentData);
      await comment.save();
      article.comments.push(comment);
      await article.save();
      return true;      
    } catch(e) {
      ctx.logger.error(`[${pre}.addComment]: ${e}`);
      throw new Error(e);
    }
  }

  /**
   * 更新评论（添加第三方评论）
   */
  async updateComment(params) {
    const { ctx } = this;
    try {
      const { article_id, content, to_user, id } = params;
      const userId = ctx.state.userId;
      const nowDate = new Date();
      let data = {
        content,
        create_time: nowDate,
        user: userId,
      };
      data.to_user = to_user;
      data.third_comment.push(obj);
      

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