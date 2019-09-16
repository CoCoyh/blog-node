'use strict';

const { Controller } = require("egg");

class ArticleController extends Controller {

  /**
   * 添加文章
   */
  async addArticle() {
    const { ctx, service } = this;
    ctx.validate({
      title: {
        type: 'string',
        min: 2,
        max: 50
      },
      author: {
        type: 'string',
      },
      content: {
        type: 'string',
        min: 1,
        max: 7000,
      },
      desc: {
        type: 'string',
        min: 0,
        max: 400,
        required: false,
      },
      img_url: {
        type: 'string',
        required: false,
      },
      tags: {
        type: 'string',
      },
      category: {
        type: 'string',
      },
      state: [0, 1],
      origin:  [0, 1, 2],
      type: [0, 1, 2],
    })
    const res = await service.article.addArticle(ctx.request.body);
    ctx.body = res;
  }

  /**
   * 更新文章（包括用户点赞更新）
   */
  async updateArticle() {
    const { ctx, service } = this;
    ctx.validate({
      id: {
        type: 'number',
      },
      title: {
        type: 'string',
        min: 2,
        max: 50,
        required: false,
      },
      author: {
        type: 'string',
        required: false,
      },
      content: {
        type: 'string',
        min: 1,
        max: 7000,
        required: false,
      },
      desc: {
        type: 'string',
        min: 0,
        max: 400,
        required: false,
      },
      img_url: {
        type: 'string',
        required: false,
      },
      tags: {
        type: 'string',
        required: false,
      },
      category: {
        type: 'string',
        required: false,
      },
      state: {
        type: 'enum',
        required: false,
        values: [0, 1],
      },
      origin: {
        type: 'enum',
        required: false,
        values: [0, 1, 2],
      },
      type: {
        type: 'enum',
        required: false,
        values: [0, 1, 2],
      }
    })
    const res = await service.article.updateArticle(ctx.request.body);
    ctx.body = res;
  }

  /**
   * 删除文章
   */
  async deleteArticle() {
    const { ctx, service } = this;
    ctx.validate({
      id: {
        type: 'number',
      }
    })
    const res = await service.article.deleteArticle(ctx.request.body);
    ctx.body = res;
  }

  /**
   * 获取文章列表
   */
  async getArticleList() {
    const { ctx, service } = this;
    ctx.validate({
      title: {
        type: 'string',
        required: false,
      },
      sorter: {
        type: 'string',
        required: false,
      },
      origin: {
        type: 'enum',
        values: [0, 1, 2],
        required: false,
      },
      state: {
        type: 'enum',
        values: [0, 1],
        required: false
      },
      pageSize: {
        type: 'number',
        required: false,
        default: 10,
      },
      pageIndex: {
        type: 'number',
        required: false,
        default: 1
      }
    })
    const res = await service.article.getArticleList(ctx.query);
    ctx.body = res;
  }

  /**
   * 获取文章详情
   */
  async getArticle() {
    const { ctx, service } = this;
    const res = await service.article.getArticle(ctx.query);
    ctx.body = res;
  }
}

module.exports = ArticleController;