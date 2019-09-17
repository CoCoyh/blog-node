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
      const { title, content, desc, tags, category, state, type,  origin } = params;
      const res = await ctx.model.Article.findOne({ title: params.title });
      if (res) {
        throw new Error('文章标题已存在');
      }
      const userInfo = await ctx.model.User.findOne({ id: ctx.state.userId });
      if (!userInfo) {
        throw new Error('查找作者信息错误');
      }
      const author = userInfo.name;
      const author_id = ctx.state.userId;
      tags = tags.split(',');
      category = category.split(',');
      const numbers = content.length;
      const data = { title, author, author_id, content, desc, tags, category, state, type, origin, numbers };
      await ctx.model.Article.save(data);
      return true;
    } catch(e) {
      ctx.logger.error(`[${pre}.addArticle]: ${e}`);
      throw new Error(e);
    }
  }

  /**
   * 更新文章（包括用户点赞更新）
   */
  async updateArticle(params) {
    const { ctx } = this;
    try {
      const { id, title, content, desc, tags, category, state, type,  origin } = params;
      const userInfo = await ctx.model.User.findOne({ id: ctx.state.userId });
      if (!userInfo) {
        throw new Error('查找作者信息错误');
      }
      let conditions = {};
      if (tags) {
        conditions.tags = tags.split(',')
      }
      if (category) {
        conditions.category = category.split(',');
      }
      if (title) {
        conditions.title = title;
      }
      if (content) {
        conditions.content = content;
      }
      if (desc) {
        conditions.desc = desc;
      }
      if (state) {
        conditions.state = state;
      }
      if (type) {
        conditions.type = type;
      }
      if (origin) {
        conditions.origin = origin;
      }
      await ctx.model.Article.updateOne({ id }, conditions);
      return true;
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
      const { id } = params;
      await Promise.all([
        ctx.model.Article.deleteOne({ id }),
        ctx.model.Commet.deleteMany({ article_id: id })
      ])
      return true;
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
      const { pageIndex, pageSize, title, state, origin, sorter } = params;
      let conditions = {};
      const options = { skip, limit: pageSize, sort: { createdAt: -1 }};
      if (title) {
        conditions.title = title;
      }
      if (state) {
        conditions.state = state;
      }
      if (origin) {
        conditions.origin = origin;
      }
      if (sorter) {
        if (sorter.split('_')[0] === 'views') {
          options.sort = { views: -1 }
        }
        if (sorter.split('_')[0] === 'likes') {
          options.sort = { likes: -1 }
        }
      }
      const skip = (pageIndex - 1) * pageSize;
      const fields = { _id: 0, __v: 0 };
      const res = await Promise.all([
        ctx.model.Project.find(condition, fields, options),
        ctx.model.Project.countDocuments(condition),
      ])
      return {
        list: res[0],
        pagination: {
          total: res[1],
          pageSize,
          pageIndex,
        },
      }
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
      const res = await ctx.model.Article.findOne({ id }, { _id: 0, __v: 0 });
      return res;
    } catch(e) {
      ctx.logger.error(`[${pre}.getArtile]: ${e}`);
      throw new Error(e);
    }
  }
}

module.exports = ArticleService;