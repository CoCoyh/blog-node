'use strict';

const { Service } = require("egg");
const pre = 'service.article';

class ArticleService extends Service {

  /**
   * 添加文章
   */
  async addArticle(params) {
    const { ctx } = this;
    try {
      const { title, author, content, desc, img_url, tags, category, state, type,  origin } = params;
      const res = await ctx.model.Article.findOne({ title: params.title });
      if (res) {
        throw new Error('文章标题已存在');
      }
      tags = tags.split(',');
      category = category.split(',');
      const data = {  };
      await ctx.model.Article.save();
    } catch(e) {
      ctx.logger.error(`[${pre}.addArticle]: ${e}`);
      throw new Error(e);
    }
  }

  /**
   * 更新文章（包括用户点赞更新）
   */
  async updateArticle() {
    const { ctx } = this;
    try {

    } catch(e) {
      ctx.logger.error(`[${pre}.updateArticle]: ${e}`);
      throw new Error(e);
    }
  }

  /**
   * 删除文章
   */
  async deleteArticle() {
    const { ctx } = this;
    try {

    } catch(e) {
      ctx.logger.error(`[${pre}.deleteArticle]: ${e}`);
      throw new Error(e);
    }
  }

  /**
   * 获取文章列表
   */
  async getArticleList() {
    const { ctx } = this;
    try {

    } catch(e) {
      ctx.logger.error(`[${pre}.getArticleList]: ${e}`);
      throw new Error(e);
    }
  }

  /**
   * 获取文章详情
   */
  async getArticle() {
    const { ctx } = this;
    try {

    } catch(e) {
      ctx.logger.error(`[${pre}.getArtile]: ${e}`);
      throw new Error(e);
    }
  }
}

module.exports = ArticleService;