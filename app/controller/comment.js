'use strict';
const { Controller } = require('egg');

class CommentController extends Controller {
  /**
   * 添加评论（父级和自己评论，需要区分处理）
   */
  async addComment() {
    const { ctx, service } = this;
    ctx.validate({
      article_id: {
        type: 'string',
      },
      content: {
        type: 'string',
      }
    })
    const res = await service.comment.addComment(ctx.request.body);
    ctx.body = res;
  }

  /**
   * 更新评论（）
   */
  async updateComment() {
    const { ctx, service } = this;
    ctx.validate({
      state: {
        type: 'enum',
        values: [-2, -1, 0, 1],
        required: false,
      },
      id: {
        type: 'string'
      },
      article_id: {
        type: 'string',
      },
      content: {
        type: 'string',
      },
      to_user: {
        type: 'string'
      }
    })
    const res = await service.comment.updateComment(ctx.request.body);
    ctx.body = res;
  }

  /**
   * 获取评论列表
   */
  async getCommentList() {
    const { ctx, service } = this;
    ctx.validate({
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
    }, ctx.query);
    const res = await service.comment.getCommentList(ctx.query);
    ctx.body = res;
  }
}

module.exports = CommentController;